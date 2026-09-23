import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { canUseDOM, cx, useEscapeKey } from '../utils';
import { useStrings } from '../theme';
import './Drawer.css';

export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  /** Panel content. */
  children?: ReactNode;
  /** Optional header rendered above the drawer content. */
  header?: ReactNode;
  /** @default 320 */
  width?: number;
  /** Custom scrim color (defaults to `--oui-drawer-dim`). */
  dimColor?: string;
  /** Hide the scrim / disable outside-click closing. */
  disableScrim?: boolean;
  className?: string;
  'aria-label'?: string;
}

/**
 * Navigation drawer — port of `DrawerLayout`
 * (top margin 16dp, `oui_background_color` panel, dimmed scrim).
 */
export function Drawer({
  open,
  onClose,
  children,
  header,
  width = 320,
  dimColor,
  disableScrim = false,
  className,
  'aria-label': ariaLabel,
}: DrawerProps) {
  const strings = useStrings();
  const panelRef = useRef<HTMLDivElement>(null);
  const prevOpen = useRef(open);

  useEscapeKey(open, () => onClose?.());

  // Move focus into the drawer when opened.
  useEffect(() => {
    if (open && !prevOpen.current) {
      panelRef.current?.focus();
    }
    prevOpen.current = open;
  }, [open]);

  if (!canUseDOM) return null;

  return createPortal(
    <div className={cx('oui-drawer-root', open && 'is-open')} aria-hidden={!open}>
      <div
        className="oui-drawer__scrim"
        style={dimColor ? { background: dimColor } : undefined}
        onClick={disableScrim ? undefined : onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className={cx('oui-drawer', className)}
        style={{ width: `min(${width}px, 86vw)` }}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ?? strings.navigationDrawer}
        tabIndex={-1}
      >
        {header ? <div className="oui-drawer__header">{header}</div> : null}
        <div className="oui-drawer__content">{children}</div>
      </div>
    </div>,
    document.body
  );
}
