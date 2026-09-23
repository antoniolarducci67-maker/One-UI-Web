import { type ButtonHTMLAttributes } from 'react';
import './Switch.css';
export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value'> {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    /** Accessible label (falls back to the button's aria-label). */
    label?: string;
}
/**
 * One UI switch — ported from `SeslSwitch`
 * (sesl_switch_track/thumb colors from oneui-core).
 */
export declare const Switch: import("react").ForwardRefExoticComponent<SwitchProps & import("react").RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Switch.d.ts.map