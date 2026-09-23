# @oneuiproject/react

**Samsung One UI design system components for React** — an open web port of
[`OneUIProject/oneui-design`](https://github.com/OneUIProject/oneui-design)
(the Android library of custom One UI components).

Every design token, dimension and behaviour in this package is transcribed from
the original Android resources (`values/colors.xml`, `dimens.xml`, `styles.xml`,
the `oui_*` layouts/drawables) plus the `sesl_*` base values from
[`oneui-core`](https://github.com/OneUIProject/oneui-core), so the web UI
matches what Samsung apps look like — light **and** dark.

```bash
npm install @oneuiproject/react react react-dom
```

```tsx
import { OneUIProvider, Page, Button, toast } from '@oneuiproject/react';
// (the build auto-imports the stylesheet; you can also add it manually)
// import '@oneuiproject/react/style.css';

export function App() {
  return (
    <OneUIProvider theme="system">
      <Page title="Settings" subtitle="One UI for the web" onNavClick={() => {}}>
        <Button onClick={() => toast('Saved')}>Save</Button>
      </Page>
    </OneUIProvider>
  );
}
```

Run the bundled showcase with `npm run dev`, build with `npm run build`.

---

## Component map

Each React component is a port of a class/layout from the Android library:

| React component | Android origin |
| --- | --- |
| `Page` | `ToolbarLayout` — collapsing big title, pinned toolbar, search mode, action (selection) mode, footer slot |
| `Drawer` | `DrawerLayout` — 16dp top margin, themeable scrim (`#33000000` / `#cc000000`) |
| `BottomNav` | `BottomNavigationView` in `oui_layout_toolbar_layout_footer.xml` |
| `SwitchBar` | `SwitchBarLayout` — 64dp bar + top-rounded content container |
| `Switch` | `SeslSwitch` |
| `RoundBox` | `RoundFrameLayout` / `RoundLinearLayout` — Android-style `roundedCorners` bit mask |
| `Separator` | `Separator` / list subheader (13sp bold, `#8c8c8c`) |
| `Splash` | `SplashLayout` — 80dp logo, 30sp title, wiggle intro (`oui_splash_animation`) |
| `AppInfo` | `AppInfoLayout` — 38sp name, version line, pill actions (radius 22) |
| `Button` | `OneUI.ButtonStyleColored` / `Outline` / `Transparent` |
| `Tabs` | `MarginsTabLayout` (24dp inset) — underline or pill variant |
| `Slider` | `HapticSeekBar` + `SeekBarPreferencePro` — ticks (7dp dots), ± steppers, value readout, dual-thumb **overlap** mode (orange `sesl_seekbar_overlap_color_activated`) |
| `CircularProgress` / `LinearProgress` / `ProgressBar` | `SeslProgressBar` |
| `Dialog` + `DialogButton` | sesl alert dialog (28dp window, equal-width footer buttons) |
| `ProgressDialog` | `ProgressDialog` — `circle` / `spinner` / `horizontal` layouts |
| `GridMenuDialog` | `GridMenuDialog` — icon grid, 16/20dp padding, 8dp gap, `N` badge |
| `RelatedCard` | `RelatedCard` (`oui_view_relative_link`) — “Looking for something else?” |
| `TipPopup` | `TipPopup` — `#474747` balloon, 16×12 arrow, action button |
| `toast()` / `Toast` | `Toast` — translucent pill, radius 22, 16sp text |
| `PreferenceGroup` | `InsetPreferenceCategory` + category subheader (flat or `card` variant) |
| `Preference` | generic preference row (icon/title/summary/end) |
| `SwitchPreference` | switch preference row |
| `SliderPreference` | `SeekBarPreferencePro` (expand layout, `colorPrimaryDark` value) |
| `DescriptionPreference` | `DescriptionPreference` (unclickable text, 14sp +4sp leading) |
| `HorizontalRadioPreference` | `HorizontalRadioPreference` (text & image view types) |
| `TipsCard` | `TipsCardPreference` |
| `ColorPickerPreference` | `ColorPickerPreference` (`showAlphaSlider` supported) |

Icons (`IconMenu`, `IconAppInfo`, `IconClose`, `IconAdd`, `IconRemove`, …) are
the vector drawables from `res/drawable/` converted to SVG.

---

## Theming

### Light / dark / system

```tsx
const [theme, setTheme] = useState<Theme>('system');

<OneUIProvider theme={theme} onThemeChange={setTheme}>…</OneUIProvider>
```

The provider mirrors `data-oneui-theme="light|dark"` onto `<html>` (so portaled
dialogs/toasts inherit it) and falls back to `prefers-color-scheme` via CSS when
no provider is present. Use `scope="element"` to keep the attribute local.

### Accent, radius, strings

```tsx
<OneUIProvider
  accent="#7e57c2"              // sets --oui-primary (+ derived dark accent)
  radius={28}                   // main content corner radius (Page/RoundBox)
  strings={{ cancel: 'Nope' }}  // override any subset of the built-in strings
>
```

Built-in English strings are ported from `values/strings.xml`
(`relatedDescription`, `actionModeSelected`, `versionInfo`, `cancel`, …) and are
available via `useStrings()` / `useOneUI()`.

### Design tokens

All colors are plain CSS custom properties (see `src/styles/tokens.css`), so
they can be overridden globally or per subtree:

| Token (excerpt) | Light | Dark | Source |
| --- | --- | --- | --- |
| `--oui-bg` | `#f6f6f6` | `#010101` | `sesl_round_and_bgcolor_*` |
| `--oui-surface` | `#fcfcfc` | `#171717` | `sesl_background_color_*` |
| `--oui-text` | `#010101` | `#fafafa` | `oui_primary_text_color` |
| `--oui-primary` | `#0381fe` | `#0381fe` | `sesl_primary_color_*` |
| `--oui-primary-dark` | `#0072de` | `#3e91ff` | `sesl_primary_dark_color_*` |
| `--oui-green` / `orange` / `red` | `#14a866` / `#ef5e16` / `#db332a` | `#5ad69e` / `#f6874f` / `#f76f68` | `sesl_functional_*` |
| `--oui-divider` | `rgba(0,0,0,.08)` | `rgba(255,255,255,.15)` | `sesl_list_divider_color_*` |
| `--oui-slider-overlap` | `#ef5e16` | `#ff6021` | `sesl_seekbar_overlap_color_activated_*` |
| `--oui-switch-track-off/on` | `#999999` / `#0381fe` | `#666660` / `#3e91ff` | `sesl_switch_track_*` |
| `--oui-link-bg` | primary @ 6% | primary @ 30% | `oui_relative_link_background_color*` |
| `--oui-badge` | `#ef5e16` | `#ef5e16` | `oui_n_badge_background_color` |
| `--oui-radius-xl` | `26px` | `26px` | 26dp drawables |
| `--oui-radius-dialog` | `28px` | `28px` | sesl dialog window |

Radii follow the original drawables: `12px` grid-menu ripples, `18px` outline
buttons, `22px` toast/app-info pills, `26px` cards & content surfaces, `28px`
dialogs.

---

## Usage examples

### Page (collapsing toolbar)

```tsx
<Page
  title="Settings"
  expandedTitle="Settings"
  subtitle="One UI 7"
  onNavClick={() => setDrawer(true)}
  navBadge="N"
  actions={<button className="oui-page__nav oui-press"><IconSearch /></button>}
  searchMode={searching}
  searchQuery={query}
  onSearchQueryChange={setQuery}
  onSearchClose={() => setSearching(false)}
  actionMode={selected.length ? {
    count: selected.length,
    onClose: () => setSelected([]),
    allChecked: allSelected,
    onToggleAll: toggleAll,
  } : null}
  footer={<BottomNav items={items} value={tab} onChange={setTab} />}
>
  …scrollable content with a 26dp rounded top surface…
</Page>
```

### Preferences

```tsx
<PreferenceGroup title="Network" variant="card">
  <SwitchPreference title="Wi-Fi" summary="Galaxy-5G" checked={wifi} onChange={setWifi} />
  <SliderPreference title="Data limit" value={limit} onChange={setLimit} units=" GB" stepper ticks />
  <DescriptionPreference>
    Non-copyable explanatory text with <a href="…">links</a>.
  </DescriptionPreference>
</PreferenceGroup>
```

### Slider (single, dual overlap, steppers)

```tsx
<Slider value={volume} onChange={setVolume} showValue units="%" ticks stepper />
<Slider value={[min, max]} onChange={setRange} showValue /> // orange overlap fill
```

### Dialogs & toasts

```tsx
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Turn off Wi-Fi?"
  actions={<>
    <DialogButton onClick={() => setOpen(false)}>Cancel</DialogButton>
    <DialogButton emphasis onClick={turnOff}>Turn off</DialogButton>
  </>}
>
  You’ll stop connecting to open networks near you.
</Dialog>

<ProgressDialog open={loading} variant="spinner" message="Searching…" />
<GridMenuDialog open={menu} onClose={setMenu(false)} items={gridItems} />

toast('Saved');                                  // bottom pill
toast('Copied', { position: 'top', duration: 1200 });
```

---

## Icons

The package also ships the complete **[OneUIProject/oneui-icons](https://github.com/OneUIProject/oneui-icons)**
catalog — **883 vector icons** found in Samsung apps — as a separate
tree-shakeable entry point:

```tsx
// named components (best tree-shaking)
import { IcOuiAlarm, IcOuiWifi, IcOuiBluetooth } from '@oneuiproject/react/icons';

<IcOuiAlarm size={32} />
<IcOuiWifi style={{ color: '#0381fe' }} />

// or look them up by name (short or full Android resource name)
import { OneIcon, iconNames } from '@oneuiproject/react/icons';

<OneIcon name="alarm" size={24} />
<OneIcon name="ic_oui_wifi" size={24} />
{iconNames.length} // 883
```

Conversion notes:

- The day/night resource `@color/oui_primary_icon_color` is mapped to
  **`currentColor`**, so icons inherit the CSS `color` (theme-aware for free).
- Literal colors on multicolor icons (white, grey, accent fills) are preserved.
- `<clip-path>`/`<group>` structures become `<clipPath>`/`<g>`; `<layer-list>`
  wrappers are unwrapped; intrinsic dp sizes (16/24/36/48) become default
  `size` values.
- Component names are the resource names in PascalCase: `ic_oui_add_pdf` →
  `IcOuiAddPdf`; the `icons` registry uses the short name (`'add_pdf'`).
- The catalog entry is ~289 KB gzipped in full. Prefer named imports so unused
  icons are shaken away, or load `<OneIcon>` only when you need dynamic lookup.
- Regenerate after upstream updates with `npm run generate:icons`
  (`node scripts/generate-icons.mjs [path/to/oneui-icons/res/drawable]`).

The showcase app includes a searchable gallery of all 883 icons
(`demo/IconsSection.tsx`).

---

## Development

```bash
npm install       # install dev dependencies
npm run dev       # showcase app (demo/)
npm run build     # library → dist/ (ESM + CJS + CSS + .d.ts)
npm run typecheck # tsc --noEmit
npm run generate:icons  # rebuild src/oneui-icons/generated.tsx
```

`npm run build` emits:

```
dist/
├── oneui-react.js      # ESM entry (auto-imports the CSS)
├── oneui-react.cjs     # CommonJS entry
├── oneui-react.css     # all component styles + tokens
├── icons.js / icons.cjs# 883-icon catalog (`@oneuiproject/react/icons`)
└── types/              # TypeScript declarations
```

## Scope notes

- Pure CSS/DOM ports of the view layer — Android-only utilities
  (`QREncoder`, `IndexScrollUtils`, haptics, reflection helpers) are out of scope.
- Type sizes map `sp/dp → px` 1:1 (the standard approach on the web).
- Samsung’s proprietary fonts (`SamsungOne`, `Samsung Sharp Sans`) are **not**
  bundled; the stack falls back to the platform UI font if they are absent.
- `StartEndTimePickerDialog` is not ported yet — use native `input type="time"`
  controls inside a `Dialog`.

## Credits

- Original Android library: [OneUIProject/oneui-design](https://github.com/OneUIProject/oneui-design)
  (MIT © 2022 Yanndroid & BlackMesa123) and its `sesl_*` base from
  [oneui-core](https://github.com/OneUIProject/oneui-core).
- Icon catalog: [OneUIProject/oneui-icons](https://github.com/OneUIProject/oneui-icons)
  (MIT © 2022 Yanndroid & BlackMesa123), converted from the Android vector
  drawables to React SVG components.
- Design language: [Samsung One UI Design Guide](https://developer.samsung.com/one-ui/index.html).

## License

MIT — see [LICENSE](./LICENSE).
