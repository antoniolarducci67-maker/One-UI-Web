import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { canUseDOM, cx } from '../utils';
import './Toast.css';

export interface ToastOptions {
  /** Milliseconds before auto-dismiss. `0` keeps it until `dismissToast`. @default 2200 */
  duration?: number;
  /** @default 'bottom' */
  position?: 'bottom' | 'top' | 'center';
}

interface ToastItem {
  id: number;
  message: ReactNode;
  position: NonNullable<ToastOptions['position']>;
}

/* ------------------------------------------------------------------ */
/* Tiny module-level store + imperative API                            */
/* ------------------------------------------------------------------ */

let seq = 0;
let toasts: ToastItem[] = [];
const listeners = new Set<() => void>();
let root: Root | null = null;
let host: HTMLElement | null = null;

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return toasts;
}

function mountHost() {
  if (!canUseDOM) return;
  if (!host || !document.body.contains(host)) {
    host = document.createElement('div');
    host.className = 'oui-toast-host';
    document.body.appendChild(host);
    root = createRoot(host);
    root.render(<ToastViewport />);
  }
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
export function toast(message: ReactNode, options: ToastOptions = {}): number {
  if (!canUseDOM) return -1;
  const id = ++seq;
  const position = options.position ?? 'bottom';
  mountHost();
  toasts = [...toasts, { id, message, position }];
  emit();

  const duration = options.duration ?? 2200;
  if (duration > 0) {
    window.setTimeout(() => dismissToast(id), duration);
  }
  return id;
}

export function dismissToast(id: number): void {
  toasts = toasts.filter((item) => item.id !== id);
  emit();
}

export function clearToasts(): void {
  toasts = [];
  emit();
}

/* ------------------------------------------------------------------ */
/* Viewport (mounted automatically by `toast()`)                       */
/* ------------------------------------------------------------------ */

function ToastViewport() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const positions = ['bottom', 'top', 'center'] as const;

  return (
    <>
      {positions.map((position) => {
        const bucket = items.filter((item) => item.position === position);
        if (bucket.length === 0) return null;
        return (
          <div
            key={position}
            className={cx('oui-toast-viewport', `oui-toast-viewport--${position}`)}
            aria-live="polite"
          >
            {bucket.map((item) => (
              <div key={item.id} className="oui-toast" role="status">
                <span className="oui-toast__text">{item.message}</span>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Declarative toast                                                   */
/* ------------------------------------------------------------------ */

export interface ToastProps extends ToastOptions {
  open: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

/** Declarative alternative to `toast()`. */
export function Toast({
  open,
  onClose,
  duration = 2200,
  position = 'bottom',
  children,
}: ToastProps) {
  const [visible, setVisible] = useState(open);

  useEffect(() => setVisible(open), [open]);

  useEffect(() => {
    if (!open || duration <= 0) return;
    const timer = window.setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);
    return () => window.clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!visible || !canUseDOM) return null;

  return createPortal(
    <div
      className={cx('oui-toast-viewport', `oui-toast-viewport--${position}`)}
      aria-live="polite"
    >
      <div className="oui-toast" role="status">
        <span className="oui-toast__text">{children}</span>
      </div>
    </div>,
    document.body
  );
}
