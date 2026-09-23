import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { canUseDOM, clamp, cx, getAnchorRect, useEscapeKey, type AnchorLike } from '../utils';
import './TipPopup.css';

export interface TipPopupProps {
  open: boolean;
  /** Anchor element / ref / rect the balloon points at. */
  anchor: AnchorLike;
  onClose?: () => void;
  /** Balloon message (defaults to the `sem_tip_popup_hint_string`). */
  children?: ReactNode;
  /** Optional action button rendered under the message. */
  action?: { label: string; onClick?: () => void };
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
export function TipPopup({
  open,
  anchor,
  onClose,
  children,
  action,
  placement = 'top',
  disableDismiss = false,
  className,
}: TipPopupProps) {
  const balloonRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number; arrowX: number; place: 'top' | 'bottom' } | null>(null);

  useEscapeKey(open && !disableDismiss, () => onClose?.());

  const reposition = useCallback(() => {
    const rect = getAnchorRect(anchor);
    const balloon = balloonRef.current;
    if (!rect || !balloon) return;

    const b = balloon.getBoundingClientRect();
    const gap = 14;
    const margin = 10; /* sem_tip_popup_side_margin */

    let place = placement;
    let top =
      place === 'top'
        ? rect.top - b.height - gap
        : rect.bottom + gap;

    // Flip if there is not enough room.
    if (place === 'top' && rect.top < b.height + gap * 2) {
      place = 'bottom';
      top = rect.bottom + gap;
    } else if (place === 'bottom' && rect.bottom + b.height + gap * 2 > window.innerHeight) {
      place = 'top';
      top = rect.top - b.height - gap;
    }

    const center = rect.left + rect.width / 2;
    const left = clamp(center - b.width / 2, margin, window.innerWidth - b.width - margin);
    const arrowX = clamp(center - left, 14, b.width - 14);

    setPos({ top, left, arrowX, place });
  }, [anchor, placement]);

  useLayoutEffect(() => {
    if (!open) {
      setPos(null);
      return;
    }
    reposition();
  }, [open, reposition]);

  useEffect(() => {
    if (!open) return;
    const handler = () => reposition();
    window.addEventListener('scroll', handler, true);
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler, true);
      window.removeEventListener('resize', handler);
    };
  }, [open, reposition]);

  // Close on outside pointerdown.
  useEffect(() => {
    if (!open || disableDismiss || !canUseDOM) return;
    const onPointerDown = (event: PointerEvent) => {
      const balloon = balloonRef.current;
      if (balloon && !balloon.contains(event.target as Node)) onClose?.();
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open, disableDismiss, onClose]);

  if (!open || !canUseDOM) return null;

  return createPortal(
    <div
      ref={balloonRef}
      className={cx(
        'oui-tip',
        className,
        pos ? `oui-tip--${pos.place}` : undefined
      )}
      role="tooltip"
      style={
        pos
          ? { top: pos.top, left: pos.left, ['--oui-tip-arrow-x' as string]: `${pos.arrowX}px` }
          : { top: -9999, left: -9999, visibility: 'hidden' }
      }
    >
      <div className="oui-tip__message">{children}</div>
      {action ? (
        <button
          type="button"
          className="oui-tip__action oui-press"
          onClick={() => {
            action.onClick?.();
            onClose?.();
          }}
        >
          {action.label}
        </button>
      ) : null}
      <span className="oui-tip__arrow" aria-hidden="true" />
    </div>,
    document.body
  );
}
