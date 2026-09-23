/**
 * Icons ported from the vector drawables of OneUIProject/oneui-design:
 *   drawable/oui_ic_ab_drawer.xml
 *   drawable/oui_ic_ab_app_info.xml
 *   drawable/oui_preference_tipscard_close.xml
 *   drawable/oui_preference_seekbar_pro_plus.xml / _minus.xml
 * plus a few small companion glyphs drawn to match.
 */
import type { ReactNode, SVGProps } from 'react';
export type IconProps = SVGProps<SVGSVGElement> & {
    size?: number;
};
/**
 * Shared SVG shell used by the hand-written companion icons and by the
 * generated 883-icon catalog (`@oneuiproject/react/icons`).
 */
export declare function IconBase({ size, children, ...props }: IconProps & {
    children: ReactNode;
    viewBox?: string;
}): import("react").JSX.Element;
/** Hamburger icon (`oui_ic_ab_drawer`, original viewport 72). */
export declare function IconMenu(props: IconProps): import("react").JSX.Element;
/** App info icon (`oui_ic_ab_app_info`). */
export declare function IconAppInfo(props: IconProps): import("react").JSX.Element;
/** Close / dismiss (`oui_preference_tipscard_close`). */
export declare function IconClose(props: IconProps): import("react").JSX.Element;
/** Plus (`oui_preference_seekbar_pro_plus`). */
export declare function IconAdd(props: IconProps): import("react").JSX.Element;
/** Minus (`oui_preference_seekbar_pro_minus`). */
export declare function IconRemove(props: IconProps): import("react").JSX.Element;
/** Back chevron. */
export declare function IconBack(props: IconProps): import("react").JSX.Element;
/** Magnifier. */
export declare function IconSearch(props: IconProps): import("react").JSX.Element;
/** Checkmark. */
export declare function IconCheck(props: IconProps): import("react").JSX.Element;
/** Vertical ellipsis (overflow menu). */
export declare function IconMore(props: IconProps): import("react").JSX.Element;
/** Settings gear. */
export declare function IconSettings(props: IconProps): import("react").JSX.Element;
/** Home glyph for bottom navigation. */
export declare function IconHome(props: IconProps): import("react").JSX.Element;
/** Folder glyph for bottom navigation. */
export declare function IconFolder(props: IconProps): import("react").JSX.Element;
/** Person glyph for bottom navigation. */
export declare function IconPerson(props: IconProps): import("react").JSX.Element;
//# sourceMappingURL=icons.d.ts.map