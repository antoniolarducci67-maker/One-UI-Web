import type { MouseEvent, ReactNode } from 'react';
import './Preference.css';
export interface PreferenceProps {
    /** 24dp leading icon. */
    icon?: ReactNode;
    title: ReactNode;
    summary?: ReactNode;
    /** Trailing widget (value text, switch, radio…). */
    end?: ReactNode;
    /** Makes the row interactive. */
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
    disabled?: boolean;
    /** Visually emphasise as the selected option. */
    selected?: boolean;
    className?: string;
    children?: ReactNode;
}
/**
 * Single preference row — title 16sp + summary 14sp, 24dp horizontal
 * padding, inset dividers (`?attr/listPreferredItemHeight` family).
 */
export declare function Preference({ icon, title, summary, end, onClick, disabled, selected, className, children, }: PreferenceProps): import("react").JSX.Element;
//# sourceMappingURL=Preference.d.ts.map