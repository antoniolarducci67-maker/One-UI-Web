import { type PreferenceProps } from './Preference';
export interface SwitchPreferenceProps extends Omit<PreferenceProps, 'end' | 'onClick' | 'children'> {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
}
/** Preference row with a trailing One UI switch. */
export declare function SwitchPreference({ checked, defaultChecked, onChange, disabled, title, ...rest }: SwitchPreferenceProps): import("react").JSX.Element;
//# sourceMappingURL=SwitchPreference.d.ts.map