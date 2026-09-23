import { useRef, type ReactNode } from 'react';
import { cx } from '../utils';
import './Tabs.css';

export interface TabItem {
  key: string;
  label: string;
  icon?: ReactNode;
  badge?: number | string;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange?: (key: string) => void;
  /**
   * `underline` — Material/One UI scrolling tabs with an indicator
   * (MarginsTabLayout, 24dp side padding).
   * `pill` — segmented pill tabs (Start/End style).
   * @default 'underline'
   */
  variant?: 'underline' | 'pill';
  /** Horizontal padding around the tab strip. @default 24 */
  inset?: number;
  className?: string;
  'aria-label'?: string;
}

/**
 * Tab strip — port of `MarginsTabLayout`
 * (`oui_tab_layout_default_padding` = 24dp).
 */
export function Tabs({
  items,
  value,
  onChange,
  variant = 'underline',
  inset = 24,
  className,
  'aria-label': ariaLabel,
}: TabsProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    const enabled = items.filter((item) => !item.disabled);
    const index = enabled.findIndex((item) => item.key === value);
    if (index < 0) return;
    event.preventDefault();
    const next =
      event.key === 'ArrowRight'
        ? enabled[(index + 1) % enabled.length]
        : enabled[(index - 1 + enabled.length) % enabled.length];
    onChange?.(next.key);
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-key="${CSS.escape(next.key)}"]`
    );
    el?.focus();
    el?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      className={cx('oui-tabs', `oui-tabs--${variant}`, className)}
      style={{ paddingInline: inset }}
      onKeyDown={onKeyDown}
    >
      {items.map((item) => {
        const active = item.key === value;
        return (
          <button
            key={item.key}
            data-key={item.key}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={item.disabled}
            className={cx('oui-tabs__tab', active && 'is-active')}
            onClick={() => onChange?.(item.key)}
          >
            {item.icon ? <span className="oui-tabs__icon">{item.icon}</span> : null}
            <span className="oui-tabs__label">{item.label}</span>
            {item.badge != null && item.badge !== '' ? (
              <span className="oui-tabs__badge">{item.badge}</span>
            ) : null}
            {variant === 'underline' ? (
              <span className="oui-tabs__indicator" aria-hidden="true" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
