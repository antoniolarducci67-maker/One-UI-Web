import type { ReactNode } from 'react';
import './BottomNav.css';
export interface BottomNavItem {
    key: string;
    label: string;
    icon: ReactNode;
    /** Small count/"N" badge on the icon. */
    badge?: number | string;
    disabled?: boolean;
}
export interface BottomNavProps {
    items: BottomNavItem[];
    value: string;
    onChange?: (key: string) => void;
    /** `fixed` shows all labels, `shifting` only the active one (Material). */
    variant?: 'fixed' | 'shifting';
    className?: string;
    'aria-label'?: string;
}
/**
 * Footer bottom navigation (`BottomNavigationView` in
 * `oui_layout_toolbar_layout_footer.xml`).
 */
export declare function BottomNav({ items, value, onChange, variant, className, 'aria-label': ariaLabel, }: BottomNavProps): import("react").JSX.Element;
//# sourceMappingURL=BottomNav.d.ts.map