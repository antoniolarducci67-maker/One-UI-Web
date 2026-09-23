import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../utils';
import { Dialog, type DialogProps } from './Dialog';
import './GridMenuDialog.css';

export interface GridMenuItem {
  key: string;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  /** "N" new badge (or any short text) on the icon. */
  badge?: string | number;
  disabled?: boolean;
}

export interface GridMenuDialogProps
  extends Omit<DialogProps, 'title' | 'actions' | 'children'> {
  items: GridMenuItem[];
  /**
   * Preferred number of columns (the RecyclerView auto-fits based on width).
   * @default 4
   */
  columns?: number;
  title?: ReactNode;
}

/**
 * GridMenuDialog — icon grid inside a One UI dialog
 * (padding 16/20dp, 8dp gap, 12dp item ripples, `N` badges).
 */
export function GridMenuDialog({
  open,
  onClose,
  items,
  columns = 4,
  title,
  disableDismiss = false,
  maxWidth,
  className,
  'aria-label': ariaLabel,
}: GridMenuDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      disableDismiss={disableDismiss}
      maxWidth={maxWidth ?? 400}
      className={cx('oui-grid-menu', className)}
      aria-label={ariaLabel ?? (typeof title === 'string' ? title : 'Menu')}
    >
      <div
        className="oui-grid-menu__grid"
        style={
          {
            '--oui-grid-columns': columns,
          } as CSSProperties
        }
        role="menu"
      >
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            role="menuitem"
            className="oui-grid-menu__item oui-press"
            disabled={item.disabled}
            onClick={() => {
              item.onClick?.();
              onClose?.();
            }}
          >
            <span className="oui-grid-menu__icon" aria-hidden="true">
              {item.icon}
              {item.badge != null && item.badge !== '' ? (
                <span className="oui-grid-menu__badge">{item.badge}</span>
              ) : null}
            </span>
            <span className="oui-grid-menu__label">{item.label}</span>
          </button>
        ))}
      </div>
    </Dialog>
  );
}
