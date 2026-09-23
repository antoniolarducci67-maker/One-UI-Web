import './RoundBox.css';
/** Corner bit flags, matching `roundedCorners` in attrs.xml. */
export declare const ROUND_NONE = 0;
export declare const ROUND_TOP_LEFT = 1;
export declare const ROUND_TOP_RIGHT = 2;
export declare const ROUND_BOTTOM_LEFT = 4;
export declare const ROUND_BOTTOM_RIGHT = 8;
export declare const ROUND_ALL = 15;
export declare const ROUND_TOP: number;
export declare const ROUND_BOTTOM: number;
export type CornerFlags = 'all' | 'none' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export interface RoundBoxProps extends React.HTMLAttributes<HTMLDivElement> {
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
/**
 * Container with selective rounded corners — the web equivalent of
 * `RoundFrameLayout` / `RoundLinearLayout`.
 */
export declare function RoundBox({ roundedCorners, radius, color, as: Tag, className, style, children, ...props }: RoundBoxProps): import("react").JSX.Element;
//# sourceMappingURL=RoundBox.d.ts.map