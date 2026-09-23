import { type ReactNode } from 'react';
import './Drawer.css';
export interface DrawerProps {
    open: boolean;
    onClose?: () => void;
    /** Panel content. */
    children?: ReactNode;
    /** Optional header rendered above the drawer content. */
    header?: ReactNode;
    /** @default 320 */
    width?: number;
    /** Custom scrim color (defaults to `--oui-drawer-dim`). */
    dimColor?: string;
    /** Hide the scrim / disable outside-click closing. */
    disableScrim?: boolean;
    className?: string;
    'aria-label'?: string;
}
/**
 * Navigation drawer — port of `DrawerLayout`
 * (top margin 16dp, `oui_background_color` panel, dimmed scrim).
 */
export declare function Drawer({ open, onClose, children, header, width, dimColor, disableScrim, className, 'aria-label': ariaLabel, }: DrawerProps): import("react").ReactPortal | null;
//# sourceMappingURL=Drawer.d.ts.map