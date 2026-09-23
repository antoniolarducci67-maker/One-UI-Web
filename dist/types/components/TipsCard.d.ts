import type { ReactNode } from 'react';
import './Preference.css';
export interface TipsCardAction {
    label: string;
    onClick?: () => void;
}
export interface TipsCardProps {
    /** 19sp bold title. */
    title?: ReactNode;
    /** 15sp summary (+4sp line spacing). */
    summary?: ReactNode;
    /** Extra content between summary and actions. */
    children?: ReactNode;
    /** Bottom text buttons (17sp bold pills). */
    actions?: TipsCardAction[];
    /** Show the 22dp close button; called when pressed. */
    onClose?: () => void;
    className?: string;
}
/**
 * `TipsCardPreference` — highlight card (bg #fcfcfc/#252525) with a title,
 * close button and bold pill text actions.
 */
export declare function TipsCard({ title, summary, children, actions, onClose, className, }: TipsCardProps): import("react").JSX.Element;
//# sourceMappingURL=TipsCard.d.ts.map