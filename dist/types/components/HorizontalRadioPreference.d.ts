import type { ReactNode } from 'react';
import './Preference.css';
export interface RadioOption {
    value: string;
    label: string;
    subtitle?: string;
    /** Image shown above the label (viewType=image). */
    image?: ReactNode;
    disabled?: boolean;
}
export interface HorizontalRadioPreferenceProps {
    options: RadioOption[];
    value: string;
    onChange?: (value: string) => void;
    /** Render the image layout (`viewType=image`). */
    withImages?: boolean;
    /** Accessible name. */
    label?: string;
    className?: string;
}
/**
 * `HorizontalRadioPreference` — 2–3 equal columns with title (20sp),
 * subtitle (15sp) and a radio underneath; selected uses colorPrimaryDark.
 */
export declare function HorizontalRadioPreference({ options, value, onChange, withImages, label, className, }: HorizontalRadioPreferenceProps): import("react").JSX.Element;
//# sourceMappingURL=HorizontalRadioPreference.d.ts.map