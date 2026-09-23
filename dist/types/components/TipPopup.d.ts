import { type ReactNode } from 'react';
import { type AnchorLike } from '../utils';
import './TipPopup.css';
export interface TipPopupProps {
    open: boolean;
    /** Anchor element / ref / rect the balloon points at. */
    anchor: AnchorLike;
    onClose?: () => void;
    /** Balloon message (defaults to the `sem_tip_popup_hint_string`). */
    children?: ReactNode;
    /** Optional action button rendered under the message. */
    action?: {
        label: string;
        onClick?: () => void;
    };
    /** @default 'top' */
    placement?: 'top' | 'bottom';
    /** Hide the default close-on-outside-click / Escape behaviour. */
    disableDismiss?: boolean;
    className?: string;
}
/**
 * TipPopup — dark balloon tooltip (`sem_tip_popup_*`: #474747 background,
 * 15sp message, optional 36dp-min action button, 16×12 arrow).
 */
export declare function TipPopup({ open, anchor, onClose, children, action, placement, disableDismiss, className, }: TipPopupProps): import("react").ReactPortal | null;
//# sourceMappingURL=TipPopup.d.ts.map