import type { ReactNode } from 'react';
import { cx } from '../utils';
import './BottomNav.css';

export interface BottomNavItem {
  key: string;
  label: string;
  icon: ReactNode;
  /** Small count/"N" badge on the icon. */
  badge?: number | string;
  disabled?: boolean;
}

export interface BottomNavProps {
  items: BottomNavItem[];
  value: string;
  onChange?: (key: string) => void;
  /** `fixed` shows all labels, `shifting` only the active one (Material). */
  variant?: 'fixed' | 'shifting';
  className?: string;
  'aria-label'?: string;
}

/**
 * Footer bottom navigation (`BottomNavigationView` in
 * `oui_layout_toolbar_layout_footer.xml`).
 */
export function BottomNav({
  items,
  value,
  onChange,
  variant = 'fixed',
  className,
  'aria-label': ariaLabel,
}: BottomNavProps) {
  return (
    <nav
      className={cx('oui-bottom-nav', `oui-bottom-nav--${variant}`, className)}
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        const active = item.key === value;
        return (
          <button
            key={item.key}
            type="button"
            className={cx('oui-bottom-nav__item', active && 'is-active')}
            aria-current={active ? 'page' : undefined}
            disabled={item.disabled}
            onClick={() => onChange?.(item.key)}
          >
            <span className="oui-bottom-nav__icon" aria-hidden="true">
              {item.icon}
              {item.badge != null && item.badge !== 0 && item.badge !== '' ? (
                <span className="oui-bottom-nav__badge">
                  {typeof item.badge === 'number' && item.badge > 9
                    ? '9+'
                    : item.badge}
                </span>
              ) : null}
            </span>
            <span className="oui-bottom-nav__label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
