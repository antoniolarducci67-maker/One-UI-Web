import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MutableRefObject,
  type Ref,
  type RefObject,
} from 'react';

/** Join class names, skipping falsy values. */
export function cx(
  ...names: Array<string | false | null | undefined>
): string {
  return names.filter(Boolean).join(' ');
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/** Controlled / uncontrolled state helper. */
export function useControllableState<T>(
  controlled: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
): [T, (value: T) => void] {
  const isControlled = controlled !== undefined;
  const [internal, setInternal] = useState<T>(defaultValue);
  const value = isControlled ? controlled : internal;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
      onChangeRef.current?.(next);
    },
    [isControlled]
  );

  return [value, setValue];
}

/** Call `handler` while `active` is true whenever Escape is pressed. */
export function useEscapeKey(active: boolean, handler: () => void): void {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!active || typeof window === 'undefined') return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handlerRef.current();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);
}

/** Assign multiple refs to the same node. */
export function mergeRefs<T>(
  ...refs: Array<Ref<T> | undefined>
): (node: T | null) => void {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === 'function') ref(node);
      else (ref as MutableRefObject<T | null>).current = node;
    }
  };
}

export type AnchorLike =
  | HTMLElement
  | RefObject<HTMLElement | null>
  | { current: HTMLElement | null }
  | (() => DOMRect | null)
  | DOMRect
  | null
  | undefined;

/** Resolve an anchor reference into a viewport rect. */
export function getAnchorRect(anchor: AnchorLike): DOMRect | null {
  if (!anchor) return null;
  if (typeof anchor === 'function') return anchor();
  if (typeof HTMLElement !== 'undefined' && anchor instanceof HTMLElement)
    return anchor.getBoundingClientRect();
  if (typeof DOMRect !== 'undefined' && anchor instanceof DOMRect) return anchor;
  const el = (anchor as RefObject<HTMLElement | null>).current;
  return el ? el.getBoundingClientRect() : null;
}

/** True when the DOM is available (guards portals during SSR). */
export const canUseDOM =
  typeof window !== 'undefined' && typeof document !== 'undefined';
