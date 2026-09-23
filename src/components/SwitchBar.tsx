import type { ReactNode } from 'react';
import { cx } from '../utils';
import { RoundBox, ROUND_TOP } from './RoundBox';
import { Switch } from './Switch';
import { IconClose } from '../icons';
import './SwitchBar.css';

export interface SwitchBarProps {
  /** Whether the switch is on. */
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  /** Bar label. */
  label?: string;
  /** Show a small spinner next to the label while an operation is running. */
  loading?: boolean;
  /**
   * Render the page content under the bar inside a top-rounded container
   * (the `SwitchBarLayout` behaviour). Set `false` when embedding
   * the bar standalone.
   * @default true
   */
  wrapContent?: boolean;
  className?: string;
  contentClassName?: string;
  children?: ReactNode;
}

/**
 * Switch bar + rounded content area — port of `SwitchBarLayout`
 * (sesl_switchbar_height = 64dp, 20dp margin, top-rounded container).
 */
export function SwitchBar({
  checked,
  defaultChecked,
  onChange,
  label,
  loading = false,
  wrapContent = true,
  className,
  contentClassName,
  children,
}: SwitchBarProps) {
  const body = (
    <>
      <div className={cx('oui-switchbar', className)} data-on={checked}>
        <span className="oui-switchbar__label">{label}</span>
        {loading ? (
          <span className="oui-switchbar__spinner" aria-hidden="true" />
        ) : null}
        <Switch
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          label={label}
        />
      </div>
      {wrapContent ? (
        <RoundBox
          roundedCorners={ROUND_TOP}
          className={cx('oui-switchbar__content', contentClassName)}
        >
          {children}
        </RoundBox>
      ) : (
        children
      )}
    </>
  );

  return <div className="oui-switchbar-layout">{body}</div>;
}

export interface SwitchBarActionProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

/** Convenience right-aligned text action shown inside the switch bar. */
export function SwitchBarAction({
  label,
  onClick,
  className,
}: SwitchBarActionProps) {
  return (
    <button
      type="button"
      className={cx('oui-switchbar__action', 'oui-press', className)}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

/** Close icon re-export for switch-bar toolbars. */
export const SwitchBarCloseIcon = IconClose;
