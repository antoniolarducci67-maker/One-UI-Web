import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { clamp, cx } from '../utils';
import { IconAdd, IconRemove } from '../icons';
import './Slider.css';

export type SliderValue = number | [number, number];

export interface SliderProps {
  /** Single value, or `[low, high]` for the dual/overlap mode. */
  value: SliderValue;
  onChange?: (value: SliderValue) => void;
  /** Called once at the end of an interaction. */
  onCommit?: (value: SliderValue) => void;
  min?: number;
  max?: number;
  /** @default 1 */
  step?: number;
  disabled?: boolean;
  /**
   * Show the discrete tick dots (`oui_seekbar_tick_mark`, 7dp ovals
   * in `oui_seekbar_circle_marker_color`).
   */
  ticks?: boolean;
  /** Show the −/+ stepper buttons (`SeekBarPreferencePro` adjustable mode). */
  stepper?: boolean;
  /** Centered value readout under the track (`seekbar_value`, colorPrimaryDark). */
  showValue?: boolean;
  /** Suffix appended to the readout, e.g. `%`. */
  units?: string;
  /** Custom readout formatter. */
  formatValue?: (value: number) => string;
  /** Accessible name. */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

function percentOf(value: number, min: number, max: number) {
  if (max <= min) return 0;
  return ((value - min) / (max - min)) * 100;
}

function snap(value: number, min: number, max: number, step: number) {
  if (step <= 0) return clamp(value, min, max);
  const steps = Math.round((value - min) / step);
  return clamp(min + steps * step, min, max);
}

/**
 * Slider — port of `HapticSeekBar` / `SeekBarPreferencePro`.
 * Supports tick marks, ± steppers, value readout and the dual-thumb
 * overlap mode (orange `sesl_seekbar_overlap_color_activated`).
 */
export function Slider({
  value,
  onChange,
  onCommit,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  ticks = false,
  stepper = false,
  showValue = false,
  units = '',
  formatValue,
  label,
  className,
  style,
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<0 | 1 | null>(null);

  const isRange = Array.isArray(value);
  const low = isRange ? value[0] : value;
  const high = isRange ? value[1] : value;

  const format = useCallback(
    (v: number) =>
      formatValue
        ? formatValue(v)
        : `${Math.round(v * 100) / 100}${units}`,
    [formatValue, units]
  );

  const valueFromPointer = useCallback(
    (clientX: number): number => {
      const track = trackRef.current;
      if (!track) return min;
      const rect = track.getBoundingClientRect();
      const ratio = rect.width > 0 ? (clientX - rect.left) / rect.width : 0;
      const raw = min + ratio * (max - min);
      return snap(raw, min, max, step);
    },
    [min, max, step]
  );

  const emit = useCallback(
    (next: number, thumb: 0 | 1) => {
      if (!isRange) {
        onChange?.(next);
        return;
      }
      let [lo, hi] = [low, high];
      if (thumb === 0) lo = Math.min(next, hi);
      else hi = Math.max(next, lo);
      onChange?.([lo, hi]);
    },
    [isRange, low, high, onChange]
  );

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled || !trackRef.current) return;
    event.preventDefault();
    trackRef.current.focus?.();
    const next = valueFromPointer(event.clientX);
    const thumb: 0 | 1 =
      isRange && Math.abs(next - high) < Math.abs(next - low) ? 1 : 0;
    setDragging(thumb);
    emit(next, thumb);
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled || dragging === null) return;
    emit(valueFromPointer(event.clientX), dragging);
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragging === null) return;
    setDragging(null);
    (event.currentTarget as HTMLElement).releasePointerCapture?.(
      event.pointerId
    );
    onCommit?.(value);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;
    const big = step * 10;
    let next: number | null = null;
    let thumb: 0 | 1 = isRange ? 1 : 0;
    const current = isRange ? high : value;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        next = clamp(current + step, min, max);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        next = clamp(current - step, min, max);
        break;
      case 'PageUp':
        next = clamp(current + big, min, max);
        break;
      case 'PageDown':
        next = clamp(current - big, min, max);
        break;
      case 'Home':
        next = min;
        if (isRange) thumb = 1;
        break;
      case 'End':
        next = max;
        break;
      default:
        return;
    }
    event.preventDefault();
    emit(next, thumb);
    onCommit?.(value);
  };

  const stepCount =
    ticks && step > 0 ? Math.round((max - min) / step) : 0;
  const showTicks = stepCount > 0 && stepCount <= 40;

  const lowPct = percentOf(low, min, max);
  const highPct = percentOf(high, min, max);
  const fillStart = isRange ? lowPct : 0;
  const fillEnd = isRange ? highPct : percentOf(value as number, min, max);

  const thumb = (which: 0 | 1) => {
    const v = which === 0 ? low : high;
    const pct = percentOf(v, min, max);
    return (
      <span
        key={which}
        className={cx(
          'oui-slider__thumb',
          dragging === which && 'is-dragging'
        )}
        style={{ left: `${pct}%` }}
        aria-hidden="true"
      />
    );
  };

  const singleValue = isRange ? high : (value as number);

  const control = (
    <div
      ref={trackRef}
      className={cx(
        'oui-slider',
        disabled && 'is-disabled',
        isRange && 'is-range'
      )}
      style={
        {
          '--oui-slider-fill-start': `${fillStart}%`,
          '--oui-slider-fill-end': `${fillEnd}%`,
        } as CSSProperties
      }
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={singleValue}
      aria-valuetext={format(singleValue)}
      aria-disabled={disabled || undefined}
      aria-orientation="horizontal"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
    >
      <div className="oui-slider__rail" aria-hidden="true">
        <div className="oui-slider__fill" />
        {showTicks ? (
          <div className="oui-slider__ticks">
            {Array.from({ length: stepCount + 1 }, (_, i) => (
              <span
                key={i}
                className="oui-slider__tick"
                style={{ left: `${(i / stepCount) * 100}%` }}
              />
            ))}
          </div>
        ) : null}
      </div>
      {thumb(0)}
      {isRange ? thumb(1) : null}
      {/* hidden real inputs for forms */}
      <input
        className="oui-slider__hidden-input"
        type="hidden"
        name={label}
        value={singleValue}
        readOnly
      />
    </div>
  );

  const readout = showValue ? (
    <div className="oui-slider__value">{format(singleValue)}</div>
  ) : null;

  if (!stepper) {
    return (
      <div className={cx('oui-slider-wrap', className)} style={style}>
        {control}
        {readout}
      </div>
    );
  }

  return (
    <div className={cx('oui-slider-wrap', 'oui-slider-wrap--stepper', className)} style={style}>
      <button
        type="button"
        className="oui-slider__stepper oui-slider__stepper--minus oui-press"
        aria-label="Decrease"
        disabled={disabled || singleValue <= min}
        onClick={() => {
          emit(clamp(singleValue - step, min, max), isRange ? 1 : 0);
          onCommit?.(value);
        }}
      >
        <IconRemove />
      </button>
      <div className="oui-slider-wrap__track">{control}</div>
      <button
        type="button"
        className="oui-slider__stepper oui-slider__stepper--plus oui-press"
        aria-label="Increase"
        disabled={disabled || singleValue >= max}
        onClick={() => {
          emit(clamp(singleValue + step, min, max), isRange ? 1 : 0);
          onCommit?.(value);
        }}
      >
        <IconAdd />
      </button>
      {readout ? <div className="oui-slider-wrap__readout">{readout}</div> : null}
    </div>
  );
}
