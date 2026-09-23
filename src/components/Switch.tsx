import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cx, useControllableState } from '../utils';
import './Switch.css';

export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value'> {
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
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  function Switch(
    {
      checked,
      defaultChecked = false,
      onChange,
      label,
      className,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) {
    const [isChecked, setChecked] = useControllableState(
      checked,
      defaultChecked,
      onChange
    );

    return (
      <button
        ref={ref}
        type={type}
        role="switch"
        aria-checked={isChecked}
        aria-label={label}
        disabled={disabled}
        className={cx('oui-switch', className)}
        onClick={() => setChecked(!isChecked)}
        {...props}
      >
        <span className="oui-switch__track" aria-hidden="true">
          <span className="oui-switch__thumb" />
        </span>
      </button>
    );
  }
);
