import { Preference, type PreferenceProps } from './Preference';
import { Switch } from './Switch';

export interface SwitchPreferenceProps
  extends Omit<PreferenceProps, 'end' | 'onClick' | 'children'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

/** Preference row with a trailing One UI switch. */
export function SwitchPreference({
  checked,
  defaultChecked,
  onChange,
  disabled,
  title,
  ...rest
}: SwitchPreferenceProps) {
  return (
    <Preference
      {...rest}
      title={title}
      disabled={disabled}
      onClick={disabled ? undefined : () => onChange?.(!checked)}
      className={['oui-pref-switch', rest.className].filter(Boolean).join(' ')}
      end={
        <Switch
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          label={typeof title === 'string' ? title : undefined}
          onClick={(event) => event.stopPropagation()}
        />
      }
    />
  );
}
