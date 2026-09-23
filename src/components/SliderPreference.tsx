import { Preference, type PreferenceProps } from './Preference';
import { Slider, type SliderValue } from './Slider';

export interface SliderPreferenceProps
  extends Omit<PreferenceProps, 'end' | 'onClick' | 'children'> {
  value: SliderValue;
  onChange?: (value: SliderValue) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Show the centered value readout (colorPrimaryDark). @default true */
  showValue?: boolean;
  units?: string;
  formatValue?: (value: number) => string;
  /** Show the −/+ stepper buttons. */
  stepper?: boolean;
  ticks?: boolean;
}

/**
 * `SeekBarPreferencePro` — preference header with an inline slider,
 * optional value readout, units and steppers.
 */
export function SliderPreference({
  value,
  onChange,
  min,
  max,
  step,
  showValue = true,
  units,
  formatValue,
  stepper = false,
  ticks = false,
  title,
  summary,
  disabled,
  className,
  ...rest
}: SliderPreferenceProps) {
  return (
    <Preference
      {...rest}
      className={['oui-pref-slider', className].filter(Boolean).join(' ')}
      title={title}
      summary={summary}
      disabled={disabled}
    >
      <div className="oui-pref-slider__controls">
        <Slider
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          ticks={ticks}
          stepper={stepper}
          showValue={showValue}
          units={units}
          formatValue={formatValue}
          label={typeof title === 'string' ? title : undefined}
        />
      </div>
    </Preference>
  );
}
