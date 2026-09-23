import type { ReactNode } from 'react';
import { cx } from '../utils';
import { IconClose } from '../icons';
import './Preference.css';

export interface TipsCardAction {
  label: string;
  onClick?: () => void;
}

export interface TipsCardProps {
  /** 19sp bold title. */
  title?: ReactNode;
  /** 15sp summary (+4sp line spacing). */
  summary?: ReactNode;
  /** Extra content between summary and actions. */
  children?: ReactNode;
  /** Bottom text buttons (17sp bold pills). */
  actions?: TipsCardAction[];
  /** Show the 22dp close button; called when pressed. */
  onClose?: () => void;
  className?: string;
}

/**
 * `TipsCardPreference` — highlight card (bg #fcfcfc/#252525) with a title,
 * close button and bold pill text actions.
 */
export function TipsCard({
  title,
  summary,
  children,
  actions,
  onClose,
  className,
}: TipsCardProps) {
  return (
    <div className={cx('oui-tips', className)}>
      {title != null ? (
        <div className="oui-tips__header">
          <h3 className="oui-tips__title">{title}</h3>
          {onClose ? (
            <button
              type="button"
              className="oui-tips__close"
              aria-label="Close"
              onClick={onClose}
            >
              <IconClose />
            </button>
          ) : null}
        </div>
      ) : null}
      {summary != null ? (
        <p className="oui-tips__summary">{summary}</p>
      ) : null}
      {children ? <div className="oui-tips__children">{children}</div> : null}
      {actions && actions.length > 0 ? (
        <>
          <div className="oui-tips__spacer" />
          <div className="oui-tips__actions">
            {actions.map((action) => (
              <button
                key={action.label}
                type="button"
                className="oui-tips__button"
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="oui-tips__spacer" />
      )}
    </div>
  );
}
