import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../utils';
import './Separator.css';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * With text: renders a bold list-separator label
   * (`Widget.AppCompat.Light.TextView.ListSeparator`, 13sp bold,
   * `sesl_list_subheader_text_color`).
   * Without text: renders a hairline divider.
   */
  children?: ReactNode;
}

export function Separator({
  children,
  className,
  ...props
}: SeparatorProps) {
  const hasText = children != null && children !== '';
  return (
    <div
      role={hasText ? undefined : 'separator'}
      className={cx(
        'oui-separator',
        hasText ? 'oui-separator--label' : 'oui-separator--line',
        className
      )}
      {...props}
    >
      {hasText ? <span className="oui-separator__text">{children}</span> : null}
    </div>
  );
}
