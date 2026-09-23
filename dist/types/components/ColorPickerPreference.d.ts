import { type PreferenceProps } from './Preference';
import './Preference.css';
export interface ColorPickerPreferenceProps extends Omit<PreferenceProps, 'end' | 'onClick' | 'children'> {
    /** Selected color (any CSS color string). */
    value: string;
    onChange?: (value: string) => void;
    /** Swatch palette. Defaults to a Samsung-flavoured preset set. */
    swatches?: string[];
    /** Show the alpha slider (`showAlphaSlider` in attrs.xml). */
    showAlpha?: boolean;
    /** Alpha 0–1 (used with `showAlpha`). */
    alpha?: number;
    onAlphaChange?: (alpha: number) => void;
}
/**
 * `ColorPickerPreference` — swatch grid with optional alpha slider.
 */
export declare function ColorPickerPreference({ value, onChange, swatches, showAlpha, alpha, onAlphaChange, title, summary, disabled, className, ...rest }: ColorPickerPreferenceProps): import("react").JSX.Element;
//# sourceMappingURL=ColorPickerPreference.d.ts.map