import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { mergeStrings, type OneUIStrings, type PartialStrings } from './strings';

export type Theme = 'light' | 'dark' | 'system';

export interface OneUIProviderProps {
  /** Color theme. `system` follows `prefers-color-scheme`. Default: `system`. */
  theme?: Theme;
  /** Called when the resolved theme changes. */
  onThemeChange?: (theme: Theme) => void;
  /** Override any subset of the built-in English strings. */
  strings?: PartialStrings;
  /**
   * Accent color. Sets `--oui-primary`; the pressed/dark accent is derived
   * automatically (or pass `{ primary, dark }`).
   */
  accent?: string | { primary: string; dark?: string };
  /** Override the main content corner radius (px). */
  radius?: number;
  /**
   * Where to apply the `data-oneui-theme` attribute.
   * `document` (default) also updates `<html>` so portaled dialogs/toasts inherit it.
   */
  scope?: 'document' | 'element';
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export interface OneUIContextValue {
  /** Currently resolved theme (`light` | `dark`, never `system`). */
  theme: 'light' | 'dark';
  /** The requested theme preference. */
  preference: Theme;
  setTheme: (theme: Theme) => void;
  strings: OneUIStrings;
}

const OneUIContext = createContext<OneUIContextValue | null>(null);

function resolveTheme(preference: Theme): 'light' | 'dark' {
  if (preference !== 'system') return preference;
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function OneUIProvider({
  theme = 'system',
  onThemeChange,
  strings,
  accent,
  radius,
  scope = 'document',
  className,
  style,
  children,
}: OneUIProviderProps) {
  const preference = theme;

  const setTheme = (next: Theme) => onThemeChange?.(next);

  // Track the OS preference while in `system` mode.
  useEffect(() => {
    if (preference !== 'system') return;
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => onThemeChange?.('system'); // re-render to re-resolve
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [preference, onThemeChange]);

  const resolved = resolveTheme(preference);

  // Mirror the theme attribute onto <html> for portals.
  useEffect(() => {
    if (scope !== 'document' || typeof document === 'undefined') return;
    const root = document.documentElement;
    root.setAttribute('data-oneui-theme', resolved);
    return () => {
      if (root.getAttribute('data-oneui-theme') === resolved) {
        root.removeAttribute('data-oneui-theme');
      }
    };
  }, [resolved, scope]);

  const accentVars = useMemo<CSSProperties | undefined>(() => {
    if (!accent) return radius === undefined ? undefined : {};
    const primary = typeof accent === 'string' ? accent : accent.primary;
    const dark =
      typeof accent === 'string'
        ? `color-mix(in srgb, ${primary}, #000 20%)`
        : accent.dark ?? primary;
    return {
      ...({ '--oui-primary': primary, '--oui-primary-dark': dark } as CSSProperties),
    };
  }, [accent]);

  const styleWithRadius: CSSProperties | undefined =
    radius !== undefined
      ? ({ '--oui-radius-page': `${radius}px`, ...style } as CSSProperties)
      : style;

  const finalStyle = accentVars
    ? ({ ...accentVars, ...styleWithRadius } as CSSProperties)
    : styleWithRadius;

  const value = useMemo<OneUIContextValue>(
    () => ({
      theme: resolved,
      preference,
      setTheme,
      strings: mergeStrings(strings),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resolved, preference, strings]
  );

  return (
    <OneUIContext.Provider value={value}>
      <div
        className={className}
        data-oneui-theme={scope === 'element' ? resolved : undefined}
        data-oneui-root=""
        style={finalStyle}
      >
        {children}
      </div>
    </OneUIContext.Provider>
  );
}

/** Access the active theme + localized strings. */
export function useOneUI(): OneUIContextValue {
  const ctx = useContext(OneUIContext);
  if (ctx) return ctx;
  // Standalone usage without a provider still gets sane defaults.
  return {
    theme: resolveTheme('system'),
    preference: 'system',
    setTheme: () => {},
    strings: mergeStrings(undefined),
  };
}

export function useTheme() {
  const { theme, preference, setTheme } = useOneUI();
  return { theme, preference, setTheme };
}

export function useStrings(): OneUIStrings {
  return useOneUI().strings;
}
