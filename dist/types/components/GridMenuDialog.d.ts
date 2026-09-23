import type { ReactNode } from 'react';
import { type DialogProps } from './Dialog';
import './GridMenuDialog.css';
export interface GridMenuItem {
    key: string;
    label: string;
    icon: ReactNode;
    onClick?: () => void;
    /** "N" new badge (or any short text) on the icon. */
    badge?: string | number;
    disabled?: boolean;
}
export interface GridMenuDialogProps extends Omit<DialogProps, 'title' | 'actions' | 'children'> {
    items: GridMenuItem[];
    /**
     * Preferred number of columns (the RecyclerView auto-fits based on width).
     * @default 4
     */
    columns?: number;
    title?: ReactNode;
}
/**
 * GridMenuDialog — icon grid inside a One UI dialog
 * (padding 16/20dp, 8dp gap, 12dp item ripples, `N` badges).
 */
export declare function GridMenuDialog({ open, onClose, items, columns, title, disableDismiss, maxWidth, className, 'aria-label': ariaLabel, }: GridMenuDialogProps): import("react").JSX.Element;
//# sourceMappingURL=GridMenuDialog.d.ts.map