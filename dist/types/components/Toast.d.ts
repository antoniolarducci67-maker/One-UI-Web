import { type ReactNode } from 'react';
import './Toast.css';
export interface ToastOptions {
    /** Milliseconds before auto-dismiss. `0` keeps it until `dismissToast`. @default 2200 */
    duration?: number;
    /** @default 'bottom' */
    position?: 'bottom' | 'top' | 'center';
}
/**
 * Show a One UI toast (`Toast.makeText` analogue — translucent dark pill,
 * 22dp radius, 16sp text).
 *
 * ```ts
 * toast('Saved');
 * toast('Copied to clipboard', { duration: 1000 });
 * ```
 */
export declare function toast(message: ReactNode, options?: ToastOptions): number;
export declare function dismissToast(id: number): void;
export declare function clearToasts(): void;
export interface ToastProps extends ToastOptions {
    open: boolean;
    onClose?: () => void;
    children?: ReactNode;
}
/** Declarative alternative to `toast()`. */
export declare function Toast({ open, onClose, duration, position, children, }: ToastProps): import("react").ReactPortal | null;
//# sourceMappingURL=Toast.d.ts.map