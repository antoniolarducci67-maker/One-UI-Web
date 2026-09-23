import { useLayoutEffect, type Ref, type RefObject } from 'react';
/** Join class names, skipping falsy values. */
export declare function cx(...names: Array<string | false | null | undefined>): string;
export declare function clamp(value: number, min: number, max: number): number;
export declare const useIsomorphicLayoutEffect: typeof useLayoutEffect;
/** Controlled / uncontrolled state helper. */
export declare function useControllableState<T>(controlled: T | undefined, defaultValue: T, onChange?: (value: T) => void): [T, (value: T) => void];
/** Call `handler` while `active` is true whenever Escape is pressed. */
export declare function useEscapeKey(active: boolean, handler: () => void): void;
/** Assign multiple refs to the same node. */
export declare function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): (node: T | null) => void;
export type AnchorLike = HTMLElement | RefObject<HTMLElement | null> | {
    current: HTMLElement | null;
} | (() => DOMRect | null) | DOMRect | null | undefined;
/** Resolve an anchor reference into a viewport rect. */
export declare function getAnchorRect(anchor: AnchorLike): DOMRect | null;
/** True when the DOM is available (guards portals during SSR). */
export declare const canUseDOM: boolean;
//# sourceMappingURL=utils.d.ts.map