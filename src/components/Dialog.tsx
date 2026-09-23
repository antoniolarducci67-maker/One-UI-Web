import { useId, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { canUseDOM, cx, useEscapeKey } from '../utils';
import './Dialog.css';

export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  /** Dialog title (sesl dialog title, 20sp). */
  title?: ReactNode;
  /** Dialog body. */
  children?: ReactNode;
  /**
   * Action buttons. They are laid out in the classic One UI footer:
   * a hairline-separated row of equal-width text buttons.
   */
  actions?: ReactNode;
  /** Disable scrim click / Escape closing. @default false */
  disableDismiss?: boolean;
  /** Max window width in px. @default 360 */
  maxWidth?: number;
  className?: string;
  'aria-label'?: string;
}

/**
 * Base One UI alert dialog (rounded 28dp window, footer button bar).
 * Used directly, or as the shell for `ProgressDialog` / `GridMenuDialog`.
 */
export function Dialog({
  open,
  onClose,
  title,
  children,
  actions,
  disableDismiss = false,
  maxWidth = 360,
  className,
  'aria-label': ariaLabel,
}: DialogProps) {
  const titleId = useId();
  useEscapeKey(open && !disableDismiss, () => onClose?.());

  if (!open || !canUseDOM) return null;

  return createPortal(
    <div className="oui-dialog-root">
      <div
        className="oui-dialog__scrim"
        onClick={disableDismiss ? undefined : onClose}
        aria-hidden="true"
      />
      <div
        className={cx('oui-dialog', className)}
        role="alertdialog"
        aria-modal="true"
        aria-label={ariaLabel ?? (title ? undefined : 'Dialog')}
        aria-labelledby={title ? titleId : undefined}
        style={{ maxWidth }}
      >
        {title ? (
          <h2 className="oui-dialog__title" id={titleId}>
            {title}
          </h2>
        ) : null}
        {children != null ? (
          <div className="oui-dialog__body">{children}</div>
        ) : null}
        {actions ? <div className="oui-dialog__actions">{actions}</div> : null}
      </div>
    </div>,
    document.body
  );
}

export interface DialogButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  /** Draw stronger emphasis (still uses the action color). */
  emphasis?: boolean;
  className?: string;
  autoFocus?: boolean;
}

/** Footer button styled like a sesl dialog action. */
export function DialogButton({
  children,
  onClick,
  disabled,
  emphasis,
  className,
  autoFocus,
}: DialogButtonProps) {
  return (
    <button
      type="button"
      className={cx('oui-dialog__button', emphasis && 'is-emphasis', className)}
      onClick={onClick}
      disabled={disabled}
      autoFocus={autoFocus}
    >
      {children}
    </button>
  );
}
