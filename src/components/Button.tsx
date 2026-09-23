import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * `colored`  — filled accent button (`OneUI.ButtonStyleColored`)
   * `outline`  — hairline outline button (`OneUI.ButtonStyleOutline`)
   * `transparent` — borderless text button (`OneUI.ButtonStyleTransparent`)
   * @default 'colored'
   */
  variant?: 'colored' | 'outline' | 'transparent';
  /** Stretch to the container width. */
  fullWidth?: boolean;
  children?: ReactNode;
}

export function Button({
  variant = 'colored',
  fullWidth = false,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        'oui-btn',
        `oui-btn--${variant}`,
        fullWidth && 'oui-btn--full',
        'oui-press',
        className
      )}
      {...props}
    >
      <span className="oui-btn__label">{children}</span>
    </button>
  );
}
