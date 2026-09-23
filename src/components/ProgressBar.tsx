import { cx } from '../utils';
import './ProgressBar.css';

export interface CircularProgressProps {
  /** Diameter in px. @default 40 (ProgressDialog uses ~56–60). */
  size?: number;
  /** Stroke width in px. @default 3.5 */
  strokeWidth?: number;
  /**
   * Determinate value 0–100. Omit for the indeterminate spinner
   * (`?android:attr/progressBarStyle`).
   */
  value?: number;
  /** Small centered message (e.g. "45%") — circle dialog behaviour. */
  message?: string;
  className?: string;
  'aria-label'?: string;
}

/** SeslProgressBar circular indicator (indeterminate or determinate ring). */
export function CircularProgress({
  size = 40,
  strokeWidth = 3.5,
  value,
  message,
  className,
  'aria-label': ariaLabel,
}: CircularProgressProps) {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const determinate = typeof value === 'number';
  const pct = determinate ? Math.min(100, Math.max(0, value)) : 0;

  return (
    <div
      className={cx(
        'oui-progress-circle',
        !determinate && 'is-indeterminate',
        className
      )}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuemin={determinate ? 0 : undefined}
      aria-valuemax={determinate ? 100 : undefined}
      aria-valuenow={determinate ? Math.round(pct) : undefined}
      aria-label={ariaLabel ?? (determinate ? 'Progress' : 'Loading')}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle
          className="oui-progress-circle__track"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
        />
        <circle
          className="oui-progress-circle__bar"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={determinate ? `${(pct / 100) * c} ${c}` : undefined}
          strokeDashoffset={determinate ? c * 0.25 : undefined}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {message ? <span className="oui-progress-circle__message">{message}</span> : null}
    </div>
  );
}

export interface LinearProgressProps {
  /** Determinate value 0–100. Omit for indeterminate. */
  value?: number;
  /** Row rendered under the bar: `{ number, percent }` (horizontal dialog). */
  numberText?: string;
  showPercent?: boolean;
  className?: string;
  'aria-label'?: string;
}

/** SeslProgressBar horizontal indicator. */
export function LinearProgress({
  value,
  numberText,
  showPercent = false,
  className,
  'aria-label': ariaLabel,
}: LinearProgressProps) {
  const determinate = typeof value === 'number';
  const pct = determinate ? Math.min(100, Math.max(0, value)) : 0;
  const rounded = Math.round(pct);

  return (
    <div className={cx('oui-progress-linear-wrap', className)}>
      <div
        className={cx(
          'oui-progress-linear',
          !determinate && 'is-indeterminate'
        )}
        role="progressbar"
        aria-valuemin={determinate ? 0 : undefined}
        aria-valuemax={determinate ? 100 : undefined}
        aria-valuenow={determinate ? rounded : undefined}
        aria-label={ariaLabel ?? 'Loading'}
      >
        <div className="oui-progress-linear__bar" style={{ width: `${pct}%` }} />
      </div>
      {numberText || showPercent ? (
        <div className="oui-progress-linear__footer">
          <span className="oui-progress-linear__number">{numberText}</span>
          <span className="oui-progress-linear__percent">
            {showPercent ? `${rounded}%` : ''}
          </span>
        </div>
      ) : null}
    </div>
  );
}

export interface ProgressBarProps extends CircularProgressProps {
  variant?: 'circular' | 'linear';
}

/** Convenience wrapper choosing the circular or horizontal indicator. */
export function ProgressBar({
  variant = 'circular',
  ...props
}: ProgressBarProps) {
  return variant === 'circular' ? (
    <CircularProgress {...props} />
  ) : (
    <LinearProgress value={props.value} />
  );
}
