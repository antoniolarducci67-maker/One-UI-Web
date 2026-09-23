import type { ReactNode } from 'react';
import './Preference.css';
export interface PreferenceGroupProps {
    /** Subheader above the group (13sp bold sesl subheader). */
    title?: ReactNode;
    /**
     * Render the group as an inset rounded card (One UI 4 `InsetPreferenceCategory`
     * look, radius 26). Default is the classic flat section.
     */
    variant?: 'flat' | 'card';
    className?: string;
    children?: ReactNode;
}
/**
 * Preference section — `InsetPreferenceCategory` / category subheader.
 * First/last children automatically receive the rounded corners
 * (`positionMode` first_item behaviour).
 */
export declare function PreferenceGroup({ title, variant, className, children, }: PreferenceGroupProps): import("react").JSX.Element;
//# sourceMappingURL=PreferenceGroup.d.ts.map