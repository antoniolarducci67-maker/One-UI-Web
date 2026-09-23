import { type CSSProperties, type ReactNode } from 'react';
import { type OneUIStrings, type PartialStrings } from './strings';
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
    accent?: string | {
        primary: string;
        dark?: string;
    };
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
export declare function OneUIProvider({ theme, onThemeChange, strings, accent, radius, scope, className, style, children, }: OneUIProviderProps): import("react").JSX.Element;
/** Access the active theme + localized strings. */
export declare function useOneUI(): OneUIContextValue;
export declare function useTheme(): {
    theme: "dark" | "light";
    preference: Theme;
    setTheme: (theme: Theme) => void;
};
export declare function useStrings(): OneUIStrings;
//# sourceMappingURL=theme.d.ts.map