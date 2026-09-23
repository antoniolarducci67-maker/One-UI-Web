import { type PreferenceProps } from './Preference';
import { type SliderValue } from './Slider';
export interface SliderPreferenceProps extends Omit<PreferenceProps, 'end' | 'onClick' | 'children'> {
    value: SliderValue;
    onChange?: (value: SliderValue) => void;
    min?: number;
    max?: number;
    step?: number;
    /** Show the centered value readout (colorPrimaryDark). @default true */
    showValue?: boolean;
    units?: string;
    formatValue?: (value: number) => string;
    /** Show the −/+ stepper buttons. */
    stepper?: boolean;
    ticks?: boolean;
}
/**
 * `SeekBarPreferencePro` — preference header with an inline slider,
 * optional value readout, units and steppers.
 */
export declare function SliderPreference({ value, onChange, min, max, step, showValue, units, formatValue, stepper, ticks, title, summary, disabled, className, ...rest }: SliderPreferenceProps): import("react").JSX.Element;
//# sourceMappingURL=SliderPreference.d.ts.map