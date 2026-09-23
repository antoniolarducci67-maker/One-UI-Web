import type { ReactNode } from 'react';
import { cx } from '../utils';
import './Preference.css';

export interface PreferenceGroupProps {
  /** Subheader above the group (13sp bold sesl subheader). */
  title?: ReactNode;
  /**
   * Render the group as an inset rounded card (One UI 4 `InsetPreferenceCategory`
   * look, radius 26). Default is the classic flat section.
   */
  variant?: 'flat' | 'card';
  className?: string;
  children?: ReactNode;
}

/**
 * Preference section — `InsetPreferenceCategory` / category subheader.
 * First/last children automatically receive the rounded corners
 * (`positionMode` first_item behaviour).
 */
export function PreferenceGroup({
  title,
  variant = 'flat',
  className,
  children,
}: PreferenceGroupProps) {
  return (
    <div
      className={cx(
        'oui-pref-group',
        variant === 'card' && 'oui-pref-group--card',
        className
      )}
    >
      {title != null && title !== '' ? (
        <div className="oui-pref-group__subheader" role="presentation">
          {title}
        </div>
      ) : null}
      <div className="oui-pref-group__items">{children}</div>
    </div>
  );
}
