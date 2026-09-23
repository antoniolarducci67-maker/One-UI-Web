import type { ReactNode } from 'react';
import { IconClose } from '../icons';
import './SwitchBar.css';
export interface SwitchBarProps {
    /** Whether the switch is on. */
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    /** Bar label. */
    label?: string;
    /** Show a small spinner next to the label while an operation is running. */
    loading?: boolean;
    /**
     * Render the page content under the bar inside a top-rounded container
     * (the `SwitchBarLayout` behaviour). Set `false` when embedding
     * the bar standalone.
     * @default true
     */
    wrapContent?: boolean;
    className?: string;
    contentClassName?: string;
    children?: ReactNode;
}
/**
 * Switch bar + rounded content area — port of `SwitchBarLayout`
 * (sesl_switchbar_height = 64dp, 20dp margin, top-rounded container).
 */
export declare function SwitchBar({ checked, defaultChecked, onChange, label, loading, wrapContent, className, contentClassName, children, }: SwitchBarProps): import("react").JSX.Element;
export interface SwitchBarActionProps {
    label?: string;
    onClick?: () => void;
    className?: string;
}
/** Convenience right-aligned text action shown inside the switch bar. */
export declare function SwitchBarAction({ label, onClick, className, }: SwitchBarActionProps): import("react").JSX.Element;
/** Close icon re-export for switch-bar toolbars. */
export declare const SwitchBarCloseIcon: typeof IconClose;
//# sourceMappingURL=SwitchBar.d.ts.map