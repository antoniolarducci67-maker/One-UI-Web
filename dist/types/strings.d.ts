/**
 * English strings, ported from
 * `lib/src/main/res/values/strings.xml` of OneUIProject/oneui-design.
 * Override any subset of them through `<OneUIProvider strings={…}>`.
 */
export type NumberFormat = (count: number) => string;
export interface OneUIStrings {
    /** RelatedCard default title — `oui_relative_description` */
    relatedDescription: string;
    /** "N" badge text — `oui_new_badge_text` */
    newBadge: string;
    /** Drawer content description — `oui_navigation_drawer` */
    navigationDrawer: string;
    /** Action mode */
    actionModeAll: string;
    actionModeSelected: NumberFormat;
    actionModeSelectItems: string;
    /** App info */
    appInfo: string;
    versionInfo: (version: string) => string;
    update: string;
    retry: string;
    newVersionIsAvailable: string;
    latestVersion: string;
    /** Start/End time picker */
    timeStart: string;
    timeEnd: string;
    /** Common dialog buttons */
    add: string;
    apply: string;
    yes: string;
    cancel: string;
    continue: string;
    disable: string;
    done: string;
    edit: string;
    close: string;
    /** TipPopup default hint — `sem_tip_popup_hint_string` */
    tipHint: string;
}
export declare const defaultStrings: OneUIStrings;
export type PartialStrings = Partial<OneUIStrings>;
export declare function mergeStrings(partial: PartialStrings | undefined): OneUIStrings;
//# sourceMappingURL=strings.d.ts.map