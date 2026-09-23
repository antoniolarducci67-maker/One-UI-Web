import type { ReactNode } from 'react';
import { cx } from '../utils';
import { Dialog, type DialogProps } from './Dialog';
import { CircularProgress, LinearProgress } from './ProgressBar';
import './ProgressDialog.css';

export interface ProgressDialogProps
  extends Omit<DialogProps, 'title' | 'actions' | 'children'> {
  /**
   * - `circle` — 55–60dp spinner with optional centered % (`oui_dialog_progress_dialog_circle`)
   * - `spinner` — horizontal spinner + message row (`oui_dialog_progress_dialog_spinner`)
   * - `horizontal` — message + determinate bar with number/percent
   *   (`oui_dialog_progress_dialog_horizontal`)
   * @default 'circle'
   */
  variant?: 'circle' | 'spinner' | 'horizontal';
  message?: ReactNode;
  /** `horizontal` variant: determinate value 0–100. */
  value?: number;
  /** `horizontal` variant: left-side counter, e.g. "34/100". */
  numberText?: string;
  /** `circle` variant: show the value as a % inside the spinner. */
  percentText?: string;
}

/** ProgressDialog port (circle / spinner / horizontal layouts). */
export function ProgressDialog({
  open,
  onClose,
  variant = 'circle',
  message,
  value,
  numberText,
  percentText,
  disableDismiss = true,
  className,
  maxWidth,
  'aria-label': ariaLabel,
}: ProgressDialogProps) {
  let body: ReactNode = null;

  if (variant === 'circle') {
    body = (
      <div className="oui-progress-dialog__circle">
        <CircularProgress
          size={56}
          strokeWidth={4}
          value={value}
          message={
            percentText ??
            (typeof value === 'number' ? `${Math.round(value)}%` : undefined)
          }
          aria-label={typeof message === 'string' ? message : 'Loading'}
        />
      </div>
    );
  } else if (variant === 'spinner') {
    body = (
      <div className="oui-progress-dialog__spinner">
        <CircularProgress size={40} aria-label="Loading" />
        {message != null ? (
          <div className="oui-progress-dialog__message">{message}</div>
        ) : null}
      </div>
    );
  } else {
    body = (
      <div className="oui-progress-dialog__horizontal">
        {message != null ? (
          <div className="oui-progress-dialog__message">{message}</div>
        ) : null}
        <div className="oui-progress-dialog__bar-space">
          <LinearProgress value={value} />
        </div>
        <div className="oui-progress-dialog__footer">
          <span>{numberText}</span>
          <span>{typeof value === 'number' ? `${Math.round(value)}%` : ''}</span>
        </div>
      </div>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableDismiss={disableDismiss}
      maxWidth={maxWidth ?? (variant === 'circle' ? 300 : 360)}
      className={cx('oui-progress-dialog', `oui-progress-dialog--${variant}`, className)}
      aria-label={ariaLabel ?? (typeof message === 'string' ? message : 'Loading')}
    >
      {body}
    </Dialog>
  );
}
