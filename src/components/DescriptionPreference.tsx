import type { ReactNode } from 'react';
import { cx } from '../utils';
import './Preference.css';

export interface DescriptionPreferenceProps {
  /** Body copy (unclickable preference text, 14sp, +4sp line spacing). */
  children?: ReactNode;
  /**
   * `subheader` renders the text as a category label instead of body copy.
   * @default 'body'
   */
  variant?: 'body' | 'subheader';
  className?: string;
}

/**
 * `DescriptionPreference` — non-interactive explanatory text
 * (`OneUI.UnclickablePreferenceTextStyle`).
 */
export function DescriptionPreference({
  children,
  variant = 'body',
  className,
}: DescriptionPreferenceProps) {
  return (
    <div
      className={cx(
        'oui-pref-description',
        variant === 'subheader' && 'oui-pref-description--subheader',
        className
      )}
    >
      {children}
    </div>
  );
}
