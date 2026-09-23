import { type CSSProperties } from 'react';
import './Slider.css';
export type SliderValue = number | [number, number];
export interface SliderProps {
    /** Single value, or `[low, high]` for the dual/overlap mode. */
    value: SliderValue;
    onChange?: (value: SliderValue) => void;
    /** Called once at the end of an interaction. */
    onCommit?: (value: SliderValue) => void;
    min?: number;
    max?: number;
    /** @default 1 */
    step?: number;
    disabled?: boolean;
    /**
     * Show the discrete tick dots (`oui_seekbar_tick_mark`, 7dp ovals
     * in `oui_seekbar_circle_marker_color`).
     */
    ticks?: boolean;
    /** Show the −/+ stepper buttons (`SeekBarPreferencePro` adjustable mode). */
    stepper?: boolean;
    /** Centered value readout under the track (`seekbar_value`, colorPrimaryDark). */
    showValue?: boolean;
    /** Suffix appended to the readout, e.g. `%`. */
    units?: string;
    /** Custom readout formatter. */
    formatValue?: (value: number) => string;
    /** Accessible name. */
    label?: string;
    className?: string;
    style?: CSSProperties;
}
/**
 * Slider — port of `HapticSeekBar` / `SeekBarPreferencePro`.
 * Supports tick marks, ± steppers, value readout and the dual-thumb
 * overlap mode (orange `sesl_seekbar_overlap_color_activated`).
 */
export declare function Slider({ value, onChange, onCommit, min, max, step, disabled, ticks, stepper, showValue, units, formatValue, label, className, style, }: SliderProps): import("react").JSX.Element;
//# sourceMappingURL=Slider.d.ts.map