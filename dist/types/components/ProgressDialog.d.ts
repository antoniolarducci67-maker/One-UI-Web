import type { ReactNode } from 'react';
import { type DialogProps } from './Dialog';
import './ProgressDialog.css';
export interface ProgressDialogProps extends Omit<DialogProps, 'title' | 'actions' | 'children'> {
    /**
     * - `circle` — 55–60dp spinner with optional centered % (`oui_dialog_progress_dialog_circle`)
     * - `spinner` — horizontal spinner + message row (`oui_dialog_progress_dialog_spinner`)
     * - `horizontal` — message + determinate bar with number/percent
     *   (`oui_dialog_progress_dialog_horizontal`)
     * @default 'circle'
     */
    variant?: 'circle' | 'spinner' | 'horizontal';
    message?: ReactNode;
    /** `horizontal` variant: determinate value 0–100. */
    value?: number;
    /** `horizontal` variant: left-side counter, e.g. "34/100". */
    numberText?: string;
    /** `circle` variant: show the value as a % inside the spinner. */
    percentText?: string;
}
/** ProgressDialog port (circle / spinner / horizontal layouts). */
export declare function ProgressDialog({ open, onClose, variant, message, value, numberText, percentText, disableDismiss, className, maxWidth, 'aria-label': ariaLabel, }: ProgressDialogProps): import("react").JSX.Element;
//# sourceMappingURL=ProgressDialog.d.ts.map