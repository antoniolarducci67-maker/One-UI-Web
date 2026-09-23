import { type ReactNode } from 'react';
import './Dialog.css';
export interface DialogProps {
    open: boolean;
    onClose?: () => void;
    /** Dialog title (sesl dialog title, 20sp). */
    title?: ReactNode;
    /** Dialog body. */
    children?: ReactNode;
    /**
     * Action buttons. They are laid out in the classic One UI footer:
     * a hairline-separated row of equal-width text buttons.
     */
    actions?: ReactNode;
    /** Disable scrim click / Escape closing. @default false */
    disableDismiss?: boolean;
    /** Max window width in px. @default 360 */
    maxWidth?: number;
    className?: string;
    'aria-label'?: string;
}
/**
 * Base One UI alert dialog (rounded 28dp window, footer button bar).
 * Used directly, or as the shell for `ProgressDialog` / `GridMenuDialog`.
 */
export declare function Dialog({ open, onClose, title, children, actions, disableDismiss, maxWidth, className, 'aria-label': ariaLabel, }: DialogProps): import("react").ReactPortal | null;
export interface DialogButtonProps {
    children?: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    /** Draw stronger emphasis (still uses the action color). */
    emphasis?: boolean;
    className?: string;
    autoFocus?: boolean;
}
/** Footer button styled like a sesl dialog action. */
export declare function DialogButton({ children, onClick, disabled, emphasis, className, autoFocus, }: DialogButtonProps): import("react").JSX.Element;
//# sourceMappingURL=Dialog.d.ts.map