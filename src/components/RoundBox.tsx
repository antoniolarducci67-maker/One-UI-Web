import { cx } from '../utils';
import './RoundBox.css';

/** Corner bit flags, matching `roundedCorners` in attrs.xml. */
export const ROUND_NONE = 0x00;
export const ROUND_TOP_LEFT = 0x01;
export const ROUND_TOP_RIGHT = 0x02;
export const ROUND_BOTTOM_LEFT = 0x04;
export const ROUND_BOTTOM_RIGHT = 0x08;
export const ROUND_ALL = 0x0f;
export const ROUND_TOP = ROUND_TOP_LEFT | ROUND_TOP_RIGHT;
export const ROUND_BOTTOM = ROUND_BOTTOM_LEFT | ROUND_BOTTOM_RIGHT;

export type CornerFlags =
  | 'all'
  | 'none'
  | 'top'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

export interface RoundBoxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Rounded corners as an Android-style bit mask
   * (`ROUND_ALL`, `ROUND_TOP`, …) or a friendly alias.
   * @default ROUND_ALL
   */
  roundedCorners?: number | CornerFlags;
  /** Corner radius in px (defaults to `--oui-radius-xl` = 26px). */
  radius?: number;
  /** Fill color; defaults to `--oui-bg` (the `roundedCornerColor` analogue). */
  color?: string;
  as?: 'div' | 'section' | 'aside' | 'main' | 'header' | 'footer' | 'article';
  children?: React.ReactNode;
}

function flagsOf(value: number | CornerFlags): number {
  if (typeof value === 'number') return value;
  switch (value) {
    case 'all':
      return ROUND_ALL;
    case 'none':
      return ROUND_NONE;
    case 'top':
      return ROUND_TOP;
    case 'bottom':
      return ROUND_BOTTOM;
    case 'topLeft':
      return ROUND_TOP_LEFT;
    case 'topRight':
      return ROUND_TOP_RIGHT;
    case 'bottomLeft':
      return ROUND_BOTTOM_LEFT;
    case 'bottomRight':
      return ROUND_BOTTOM_RIGHT;
  }
}

/**
 * Container with selective rounded corners — the web equivalent of
 * `RoundFrameLayout` / `RoundLinearLayout`.
 */
export function RoundBox({
  roundedCorners = ROUND_ALL,
  radius,
  color,
  as: Tag = 'div',
  className,
  style,
  children,
  ...props
}: RoundBoxProps) {
  const flags = flagsOf(roundedCorners);
  const r = radius != null ? `${radius}px` : 'var(--oui-radius-xl)';
  const tl = flags & ROUND_TOP_LEFT ? r : '0';
  const tr = flags & ROUND_TOP_RIGHT ? r : '0';
  const bl = flags & ROUND_BOTTOM_LEFT ? r : '0';
  const br = flags & ROUND_BOTTOM_RIGHT ? r : '0';

  return (
    <Tag
      className={cx('oui-round', className)}
      style={{
        borderRadius: `${tl} ${tr} ${br} ${bl}`,
        ...(color != null ? { background: color } : null),
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
