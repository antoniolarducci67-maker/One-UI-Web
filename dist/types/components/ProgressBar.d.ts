import './ProgressBar.css';
export interface CircularProgressProps {
    /** Diameter in px. @default 40 (ProgressDialog uses ~56–60). */
    size?: number;
    /** Stroke width in px. @default 3.5 */
    strokeWidth?: number;
    /**
     * Determinate value 0–100. Omit for the indeterminate spinner
     * (`?android:attr/progressBarStyle`).
     */
    value?: number;
    /** Small centered message (e.g. "45%") — circle dialog behaviour. */
    message?: string;
    className?: string;
    'aria-label'?: string;
}
/** SeslProgressBar circular indicator (indeterminate or determinate ring). */
export declare function CircularProgress({ size, strokeWidth, value, message, className, 'aria-label': ariaLabel, }: CircularProgressProps): import("react").JSX.Element;
export interface LinearProgressProps {
    /** Determinate value 0–100. Omit for indeterminate. */
    value?: number;
    /** Row rendered under the bar: `{ number, percent }` (horizontal dialog). */
    numberText?: string;
    showPercent?: boolean;
    className?: string;
    'aria-label'?: string;
}
/** SeslProgressBar horizontal indicator. */
export declare function LinearProgress({ value, numberText, showPercent, className, 'aria-label': ariaLabel, }: LinearProgressProps): import("react").JSX.Element;
export interface ProgressBarProps extends CircularProgressProps {
    variant?: 'circular' | 'linear';
}
/** Convenience wrapper choosing the circular or horizontal indicator. */
export declare function ProgressBar({ variant, ...props }: ProgressBarProps): import("react").JSX.Element;
//# sourceMappingURL=ProgressBar.d.ts.map