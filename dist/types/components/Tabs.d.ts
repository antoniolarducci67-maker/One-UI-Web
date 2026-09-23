import { type ReactNode } from 'react';
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
export declare function Tabs({ items, value, onChange, variant, inset, className, 'aria-label': ariaLabel, }: TabsProps): import("react").JSX.Element;
//# sourceMappingURL=Tabs.d.ts.map