#!/usr/bin/env node
/**
 * Converts the Android vector drawables from OneUIProject/oneui-icons
 * (lib/src/main/res/drawable/ic_oui_*.xml) into a single TypeScript module of
 * React SVG components + a name registry.
 *
 *   node scripts/generate-icons.mjs
 *
 * Conversion rules:
 *  - @color/oui_primary_icon_color  -> currentColor (follows CSS `color`,
 *    so light/dark theming works exactly like the Android day/night resource)
 *  - #00000000 fills/strokes        -> omitted (fill:none / no stroke)
 *  - other literal colors           -> preserved (multicolor icons)
 *  - <clip-path>                    -> <clipPath> + wrapping <g clip-path>
 *  - <group>                        -> nested <g> (no transforms in this repo,
 *    but translate/rotate/scale are supported for safety)
 *  - path numbers are rounded to 2 decimals (viewport units up to ~190 — the
 *    extra ~14 decimals in the sources are float noise)
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
// Vector sources: pass a path argument, or clone OneUIProject/oneui-icons
// next to this project (../oneui-icons-src).
const SRC_DIR =
  process.argv[2] && process.argv[2] !== '.'
    ? path.resolve(process.argv[2])
    : path.join(root, '..', 'oneui-icons-src', 'lib/src/main/res/drawable');
const OUT_DIR = path.join(root, 'src/oneui-icons');
const OUT_FILE = path.join(OUT_DIR, 'generated.tsx');

const RESOURCE_COLOR = '@color/oui_primary_icon_color';
const TRANSPARENT = '#00000000';

/* ------------------------------------------------------------------ */
/* tiny XML parser (subset sufficient for vector drawables)            */
/* ------------------------------------------------------------------ */

function parseXml(xml) {
  xml = xml.replace(/<\?[\s\S]*?\?>/g, '').replace(/<!--[\s\S]*?-->/g, '');
  const stack = [];
  const rootNodes = [];
  const tagRe = /<(\/?)([A-Za-z_][\w.:-]*)((?:[^"'>]|"[^"]*")*)>/g;
  let m;
  while ((m = tagRe.exec(xml))) {
    const [, closing, name, rawAttrs] = m;
    if (closing) {
      const node = stack.pop();
      if (stack.length > 0) stack[stack.length - 1].children.push(node);
      else rootNodes.push(node);
    } else {
      const selfClosing = /\/\s*$/.test(rawAttrs);
      const attrs = {};
      const attrRe = /([\w.:-]+)\s*=\s*"([^"]*)"/g;
      let a;
      while ((a = attrRe.exec(rawAttrs))) {
        let key = a[1];
        if (key.includes(':')) key = key.split(':').pop();
        if (key.startsWith('xmlns')) continue;
        attrs[key] = a[2];
      }
      const node = { name, attrs, children: [] };
      if (selfClosing) {
        if (stack.length > 0) stack[stack.length - 1].children.push(node);
        else rootNodes.push(node);
      } else {
        stack.push(node);
      }
    }
  }
  return rootNodes;
}

/* ------------------------------------------------------------------ */
/* value helpers                                                       */
/* ------------------------------------------------------------------ */

function num(value) {
  if (value == null) return null;
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : null;
}

/** Round float-noise numbers to 2 decimals, keep SVG-valid formatting. */
function cleanNumber(n) {
  let r = Math.round(n * 100) / 100;
  if (Object.is(r, -0)) r = 0;
  return String(r);
}

function cleanPathData(d) {
  if (!d) return '';
  // collapse whitespace first
  let out = d.replace(/\s+/g, ' ').trim();
  // round every number to 2 decimals
  out = out.replace(/-?\d+\.\d+|-?\d+/g, (token) => {
    const n = parseFloat(token);
    return Number.isFinite(n) ? cleanNumber(n) : token;
  });
  // tidy: ", " -> ",", drop space after command letters
  out = out.replace(/\s*,\s*/g, ',');
  out = out.replace(/([MmLlHhVvCcSsQqTtAaZz])\s+/g, '$1');
  out = out.replace(/\s+/g, ' ').trim();
  return out;
}

/** Resolve a color attribute to an SVG paint value (or null = omit). */
function resolveColor(value, { missing = null } = {}) {
  if (value == null) return missing;
  const v = value.trim();
  if (v === RESOURCE_COLOR) return 'currentColor';
  if (v === TRANSPARENT) return 'none';
  if (v === '#ff000000') return 'currentColor';
  if (v === '@android:color/transparent') return 'none';
  if (v.startsWith('#')) {
    // #aarrggbb -> #rrggbb + separate alpha (kept simple: drop aa if ff)
    const m = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{6})$/.exec(v);
    if (m) {
      const [, aa, rgb] = m;
      return aa.toLowerCase() === 'ff' ? `#${rgb.toLowerCase()}` : `${rgbToRgba(rgb, aa)}`;
    }
    return v.toLowerCase();
  }
  return v; // unknown reference — leave as-is
}

function rgbToRgba(rgb, aa) {
  const r = parseInt(rgb.slice(0, 2), 16);
  const g = parseInt(rgb.slice(2, 4), 16);
  const b = parseInt(rgb.slice(4, 6), 16);
  const a = parseInt(aa, 16) / 255;
  return `rgba(${r},${g},${b},${Math.round(a * 1000) / 1000})`;
}

const LINECAP = { butt: 'butt', round: 'round', square: 'square' };
const LINEJOIN = { miter: 'miter', round: 'round', bevel: 'bevel' };

/* ------------------------------------------------------------------ */
/* element conversion                                                  */
/* ------------------------------------------------------------------ */

function attrsToString(map) {
  return Object.entries(map)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`)
    .join(' ');
}

function convertPath(node, idFactory) {
  const a = node.attrs;
  const svg = {};
  const d = cleanPathData(a.pathData);
  if (!d) return null;
  svg.d = d;

  const fill = resolveColor(a.fillColor, { missing: a.strokeColor ? 'none' : 'currentColor' });
  svg.fill = fill;
  if (a.fillType === 'evenOdd') svg.fillRule = 'evenodd';
  if (a.fillAlpha != null && a.fillAlpha !== '1') svg.fillOpacity = cleanNumber(num(a.fillAlpha));

  const stroke = resolveColor(a.strokeColor, { missing: null });
  if (stroke && stroke !== 'none') {
    svg.stroke = stroke;
    if (a.strokeWidth != null) svg.strokeWidth = a.strokeWidth;
    if (a.strokeAlpha != null && a.strokeAlpha !== '1') svg.strokeOpacity = cleanNumber(num(a.strokeAlpha));
    if (a.strokeLineCap && LINECAP[a.strokeLineCap]) svg.strokeLinecap = LINECAP[a.strokeLineCap];
    if (a.strokeLineJoin && LINEJOIN[a.strokeLineJoin]) svg.strokeLinejoin = LINEJOIN[a.strokeLineJoin];
  } else if (stroke === 'none' && fill === 'none') {
    return null; // fully invisible path (transparent fill + transparent stroke)
  }

  return `<path ${attrsToString(svg)} />`;
}

function groupTransform(a) {
  const tx = num(a.translateX) ?? 0;
  const ty = num(a.translateY) ?? 0;
  const rot = num(a.rotation) ?? 0;
  const sx = num(a.scaleX) ?? 1;
  const sy = num(a.scaleY) ?? 1;
  const px = num(a.pivotX) ?? 0;
  const py = num(a.pivotY) ?? 0;
  const parts = [];
  if (tx || ty) parts.push(`translate(${cleanNumber(tx)} ${cleanNumber(ty)})`);
  if (rot) parts.push(`rotate(${cleanNumber(rot)} ${cleanNumber(px)} ${cleanNumber(py)})`);
  if (sx !== 1 || sy !== 1) {
    parts.push(
      `translate(${cleanNumber(px)} ${cleanNumber(py)}) scale(${cleanNumber(sx)} ${cleanNumber(sy)}) translate(${cleanNumber(-px)} ${cleanNumber(-py)})`
    );
  }
  return parts.join(' ');
}

function convertNode(node, out, ctx, clipSiblings) {
  switch (node.name) {
    case 'vector':
    case 'group': {
      const kids = [];
      let currentClip = null;
      for (const child of node.children) {
        if (child.name === 'clip-path') {
          currentClip = ctx.nextClipId();
          const d = cleanPathData(child.attrs.pathData);
          const rule =
            child.attrs.fillType === 'evenOdd' ? ' fillRule="evenodd"' : '';
          ctx.defs.push(
            `<clipPath id="${currentClip}"><path d="${d}"${rule} /></clipPath>`
          );
          kids.push(`CLIP:${currentClip}`);
          continue;
        }
        convertNode(child, kids, ctx, currentClip);
      }
      // flatten clip groups: consecutive children after a CLIP marker belong
      // to that clip until the group ends (Android semantics: clip applies to
      // everything after it in the same group)
      let html = '';
      let openClip = null;
      for (const k of kids) {
        if (typeof k === 'string' && k.startsWith('CLIP:')) {
          if (openClip) html += '</g>';
          const id = k.slice(5);
          html += '<g clipPath={`url(#' + id + ')`}>';
          openClip = id;
        } else {
          html += k;
        }
      }
      if (openClip) html += '</g>';

      if (node.name === 'group') {
        const t = groupTransform(node.attrs);
        out.push(t ? `<g transform="${t}">${html}</g>` : html ? `<g>${html}</g>` : '');
      } else {
        out.push(html);
      }
      break;
    }
    case 'path': {
      const p = convertPath(node, ctx.nextClipId);
      if (p) out.push(p);
      break;
    }
    default:
      ctx.unknown.add(node.name);
  }
}

/* ------------------------------------------------------------------ */
/* naming                                                              */
/* ------------------------------------------------------------------ */

function pascal(fileName) {
  return fileName
    .replace(/^ic_oui_/, '')
    .split('_')
    .filter(Boolean)
    .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
    .join('');
}

function shortName(fileName) {
  return fileName.replace(/^ic_oui_/, '');
}

/* ------------------------------------------------------------------ */
/* main                                                                */
/* ------------------------------------------------------------------ */

const files = readdirSync(SRC_DIR)
  .filter((f) => f.endsWith('.xml'))
  .sort();

const components = [];
const registry = [];
const seen = new Set();
const unknownElements = new Set();
let clipSeq = 0;
let bytes = 0;
let clipCount = 0;
let groupCount = 0;

for (const file of files) {
  const base = file.replace(/\.xml$/, '');
  const exportName = 'IcOui' + pascal(base);
  if (seen.has(exportName)) {
    console.error(`COLLISION: ${exportName} (${file})`);
    process.exitCode = 1;
    continue;
  }
  seen.add(exportName);

  const xml = readFileSync(path.join(SRC_DIR, file), 'utf8');
  const roots = parseXml(xml);
  const findVector = (nodes) => {
    for (const n of nodes) {
      if (n.name === 'vector') return n;
      const deep = findVector(n.children ?? []);
      if (deep) return deep;
    }
    return null;
  };
  // Most files root at <vector>; a couple wrap it in a <layer-list>.
  const vector = findVector(roots);
  if (!vector) {
    console.error(`NO VECTOR ROOT: ${file}`);
    process.exitCode = 1;
    continue;
  }

  const vw = num(vector.attrs.viewportWidth) ?? 24;
  const vh = num(vector.attrs.viewportHeight) ?? 24;
  const dpWidth = num((vector.attrs.width ?? '24dp').replace('dip', 'dp')) ?? 24;
  const viewBox = `0 0 ${cleanNumber(vw)} ${cleanNumber(vh)}`;
  const defaultSize = cleanNumber(dpWidth);

  const hadClip = xml.includes('clip-path');
  const hadGroup = xml.includes('<group');
  if (hadClip) clipCount++;
  if (hadGroup) groupCount++;

  const ctx = {
    defs: [],
    unknown: unknownElements,
    nextClipId: () => `${exportName.toLowerCase()}-c${clipSeq++}`,
  };
  const body = [];
  convertNode(vector, body, ctx, null);

  const defsHtml = ctx.defs.length ? `<defs>${ctx.defs.join('')}</defs>` : '';
  const bodyHtml = body.filter(Boolean).join('');

  const component = [
    `/** ${base}.xml — viewport ${cleanNumber(vw)}×${cleanNumber(vh)} */`,
    `export const ${exportName} = ({ size, ...rest }: IconProps) => (`,
    `  <IconBase size={size ?? ${defaultSize}} viewBox="${viewBox}" {...rest}>`,
    `    ${defsHtml}${bodyHtml}`,
    `  </IconBase>`,
    `);`,
  ].join('\n');

  components.push(component);
  registry.push(`  '${shortName(base)}': ${exportName}`);

  bytes += component.length;
}

const header = `/* eslint-disable */
/**
 * AUTO-GENERATED FILE — DO NOT EDIT.
 *
 * Source: https://github.com/OneUIProject/oneui-icons
 * (lib/src/main/res/drawable, MIT © 2022 Yanndroid & BlackMesa123)
 * Regenerate with: node scripts/generate-icons.mjs ../oneui-icons-src/lib/src/main/res/drawable
 *
 * ${files.length} icons. The resource color \`@color/oui_primary_icon_color\`
 * is mapped to \`currentColor\` so icons follow the CSS \`color\`.
 */
import type { JSX } from 'react';
import type { IconProps } from '../icons';
import { IconBase } from '../icons';

`;

const footer = `

/** Short-name registry, e.g. \`icons['alarm']\`. */
export const icons = {
${registry.join(',\n')}
} as const;

/** All short names (the Android resource name without the \`ic_oui_\` prefix). */
export const iconNames: readonly string[] = Object.keys(icons);

/** Original Android resource names, e.g. \`ic_oui_alarm\`. */
export const iconResourceNames: readonly string[] = iconNames.map(
  (name) => \`ic_oui_\${name}\`
);

export type OneuiIconComponent = (props: IconProps) => JSX.Element;
`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, header + components.join('\n\n') + footer);

console.log(`generated ${components.length} icons -> ${path.relative(root, OUT_FILE)}`);
console.log(`  component code: ${(bytes / 1024).toFixed(0)} KB`);
console.log(`  files with clip-path: ${clipCount}, files with <group>: ${groupCount}`);
if (unknownElements.size) console.log('  unknown elements:', [...unknownElements].join(', '));
