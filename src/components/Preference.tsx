import type { MouseEvent, ReactNode } from 'react';
import { cx } from '../utils';
import './Preference.css';

export interface PreferenceProps {
  /** 24dp leading icon. */
  icon?: ReactNode;
  title: ReactNode;
  summary?: ReactNode;
  /** Trailing widget (value text, switch, radio…). */
  end?: ReactNode;
  /** Makes the row interactive. */
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  disabled?: boolean;
  /** Visually emphasise as the selected option. */
  selected?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Single preference row — title 16sp + summary 14sp, 24dp horizontal
 * padding, inset dividers (`?attr/listPreferredItemHeight` family).
 */
export function Preference({
  icon,
  title,
  summary,
  end,
  onClick,
  disabled = false,
  selected = false,
  className,
  children,
}: PreferenceProps) {
  const interactive = !!onClick && !disabled;

  return (
    <div
      className={cx(
        'oui-pref',
        interactive && 'oui-pref--interactive oui-press',
        disabled && 'is-disabled',
        selected && 'is-selected',
        icon ? 'has-icon' : 'no-icon',
        className
      )}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-disabled={disabled || undefined}
      onClick={
        interactive
          ? (event) => {
              onClick?.(event);
            }
          : undefined
      }
      onKeyDown={
        interactive
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClick?.(event as unknown as MouseEvent<HTMLDivElement>);
              }
            }
          : undefined
      }
    >
      {icon != null ? <div className="oui-pref__icon">{icon}</div> : null}
      <div className="oui-pref__text">
        <div className="oui-pref__title">{title}</div>
        {summary != null && summary !== '' ? (
          <div className="oui-pref__summary">{summary}</div>
        ) : null}
        {children}
      </div>
      {end != null ? <div className="oui-pref__end">{end}</div> : null}
    </div>
  );
}
