import type { ReactNode } from 'react';
import { cx } from '../utils';
import './Preference.css';

export interface RadioOption {
  value: string;
  label: string;
  subtitle?: string;
  /** Image shown above the label (viewType=image). */
  image?: ReactNode;
  disabled?: boolean;
}

export interface HorizontalRadioPreferenceProps {
  options: RadioOption[];
  value: string;
  onChange?: (value: string) => void;
  /** Render the image layout (`viewType=image`). */
  withImages?: boolean;
  /** Accessible name. */
  label?: string;
  className?: string;
}

/**
 * `HorizontalRadioPreference` — 2–3 equal columns with title (20sp),
 * subtitle (15sp) and a radio underneath; selected uses colorPrimaryDark.
 */
export function HorizontalRadioPreference({
  options,
  value,
  onChange,
  withImages = false,
  label,
  className,
}: HorizontalRadioPreferenceProps) {
  return (
    <div
      className={cx(
        'oui-hradio',
        withImages && 'oui-hradio--image',
        className
      )}
      role="radiogroup"
      aria-label={label}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={option.disabled}
            className={cx('oui-hradio__item', selected && 'is-selected')}
            onClick={() => onChange?.(option.value)}
          >
            {option.image ? (
              <span className="oui-hradio__image" aria-hidden="true">
                {option.image}
              </span>
            ) : null}
            <span className="oui-hradio__title">{option.label}</span>
            {option.subtitle ? (
              <span className="oui-hradio__subtitle">{option.subtitle}</span>
            ) : null}
            <span className="oui-hradio__radio" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
