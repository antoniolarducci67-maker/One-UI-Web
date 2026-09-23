import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/**
 * Library build: after bundling, make sure the emitted CSS file is named
 * `oneui-react.css` and that the ESM bundle imports it automatically so
 * consumers get styles with a single `import '@oneuiproject/react'`.
 */
function finalizeLib(): Plugin {
  return {
    name: 'oneui-finalize-lib',
    apply: 'build',
    closeBundle() {
      const dist = path.join(projectRoot, 'dist');
      if (!fs.existsSync(dist)) return;

      // Normalize CSS file name (Vite's lib CSS name can vary across versions)
      const cssFiles = fs
        .readdirSync(dist)
        .filter((f) => f.endsWith('.css') && !f.endsWith('.map'));
      const targetCss = 'oneui-react.css';
      if (!cssFiles.includes(targetCss) && cssFiles.length > 0) {
        fs.renameSync(path.join(dist, cssFiles[0]), path.join(dist, targetCss));
      }

      // Auto-import the stylesheet from the ESM bundle
      const esm = path.join(dist, 'oneui-react.js');
      if (fs.existsSync(esm) && fs.existsSync(path.join(dist, targetCss))) {
        const src = fs.readFileSync(esm, 'utf8');
        if (!src.includes(targetCss)) {
          fs.writeFileSync(esm, `import "./${targetCss}";\n${src}`);
        }
      }
    },
  };
}

export default defineConfig(({ command }) => {
  // `vite` (dev) → run the showcase app from /demo
  if (command === 'serve') {
    return {
      root: path.join(projectRoot, 'demo'),
      plugins: [react()],
      resolve: {
        alias: {
          'oneui-react/icons': path.join(
            projectRoot,
            'src/oneui-icons/index.ts'
          ),
          'oneui-react': path.join(projectRoot, 'src/index.ts'),
        },
      },
      server: {
        host: true,
        port: 5173,
        // Accept the sandbox preview host (Vite ≥6.1 allowlist).
        allowedHosts: true,
      },
    };
  }

  // `vite build` → build the library
  return {
    plugins: [react(), finalizeLib()],
    build: {
      lib: {
        entry: {
          index: path.join(projectRoot, 'src/index.ts'),
          icons: path.join(projectRoot, 'src/oneui-icons/index.ts'),
        },
        name: 'OneUIReact',
        formats: ['es', 'cjs'],
        fileName: (format, entryName) => {
          const es = format === 'es';
          if (entryName === 'index') return es ? 'oneui-react.js' : 'oneui-react.cjs';
          return es ? 'icons.js' : 'icons.cjs';
        },
        cssFileName: 'oneui-react',
      },
      rollupOptions: {
        external: [
          'react',
          'react/jsx-runtime',
          'react-dom',
          'react-dom/client',
        ],
      },
      sourcemap: true,
      target: 'es2020',
    },
  };
});
