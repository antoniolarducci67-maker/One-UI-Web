import { CSSProperties } from 'react';
import { cx } from '../utils';
import { Preference, type PreferenceProps } from './Preference';
import './Preference.css';

export interface ColorPickerPreferenceProps
  extends Omit<PreferenceProps, 'end' | 'onClick' | 'children'> {
  /** Selected color (any CSS color string). */
  value: string;
  onChange?: (value: string) => void;
  /** Swatch palette. Defaults to a Samsung-flavoured preset set. */
  swatches?: string[];
  /** Show the alpha slider (`showAlphaSlider` in attrs.xml). */
  showAlpha?: boolean;
  /** Alpha 0–1 (used with `showAlpha`). */
  alpha?: number;
  onAlphaChange?: (alpha: number) => void;
}

const DEFAULT_SWATCHES = [
  '#000000',
  '#3a3a3a',
  '#666666',
  '#9e9e9e',
  '#cfcfcf',
  '#ffffff',
  '#db332a',
  '#ef5e16',
  '#f4b400',
  '#14a866',
  '#0381fe',
  '#3e91ff',
  '#7e57c2',
  '#d81b60',
  '#8d6e63',
  '#607d8b',
];

/**
 * `ColorPickerPreference` — swatch grid with optional alpha slider.
 */
export function ColorPickerPreference({
  value,
  onChange,
  swatches = DEFAULT_SWATCHES,
  showAlpha = false,
  alpha = 1,
  onAlphaChange,
  title,
  summary,
  disabled,
  className,
  ...rest
}: ColorPickerPreferenceProps) {
  const isLight = (color: string) =>
    ['#ffffff', '#cfcfcf', '#f4b400'].includes(color.toLowerCase());

  return (
    <Preference
      {...rest}
      className={cx('oui-color-picker-pref', className)}
      title={title}
      summary={summary}
      disabled={disabled}
    >
      <div className="oui-color-picker">
        <div className="oui-color-picker__grid" role="radiogroup">
          {swatches.map((swatch) => (
            <button
              key={swatch}
              type="button"
              role="radio"
              aria-checked={swatch === value}
              aria-label={swatch}
              disabled={disabled}
              className={cx(
                'oui-color-picker__swatch',
                swatch === value && 'is-selected',
                isLight(swatch) && 'is-light'
              )}
              style={{ ['--swatch' as string]: swatch } as CSSProperties}
              onClick={() => onChange?.(swatch)}
            />
          ))}
        </div>
        {showAlpha ? (
          <div className="oui-color-picker__alpha">
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(alpha * 100)}
              disabled={disabled}
              aria-label="Alpha"
              onChange={(event) => onAlphaChange?.(Number(event.target.value) / 100)}
            />
            <span className="oui-color-picker__alpha-value">
              {Math.round(alpha * 100)}%
            </span>
          </div>
        ) : null}
      </div>
    </Preference>
  );
}
