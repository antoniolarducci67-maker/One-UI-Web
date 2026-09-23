import type { ReactNode } from 'react';
import './Preference.css';
export interface DescriptionPreferenceProps {
    /** Body copy (unclickable preference text, 14sp, +4sp line spacing). */
    children?: ReactNode;
    /**
     * `subheader` renders the text as a category label instead of body copy.
     * @default 'body'
     */
    variant?: 'body' | 'subheader';
    className?: string;
}
/**
 * `DescriptionPreference` — non-interactive explanatory text
 * (`OneUI.UnclickablePreferenceTextStyle`).
 */
export declare function DescriptionPreference({ children, variant, className, }: DescriptionPreferenceProps): import("react").JSX.Element;
//# sourceMappingURL=DescriptionPreference.d.ts.map