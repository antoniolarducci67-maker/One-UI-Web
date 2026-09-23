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

export const defaultStrings: OneUIStrings = {
  relatedDescription: 'Looking for something else?',
  newBadge: 'N',
  navigationDrawer: 'Navigation drawer',
  actionModeAll: 'All',
  actionModeSelected: (count: number) => `${count} selected`,
  actionModeSelectItems: 'Select items',
  appInfo: 'App info',
  versionInfo: (version: string) => `Version ${version}`,
  update: 'Update',
  retry: 'Retry',
  newVersionIsAvailable: 'A new version is available.',
  latestVersion: 'The latest version is already installed.',
  timeStart: 'Start',
  timeEnd: 'End',
  add: 'Add',
  apply: 'Apply',
  yes: 'Yes',
  cancel: 'Cancel',
  continue: 'Continue',
  disable: 'Disable',
  done: 'Done',
  edit: 'Edit',
  close: 'Close',
  tipHint: 'Double tap this button to learn more.',
};

export type PartialStrings = Partial<OneUIStrings>;

export function mergeStrings(
  partial: PartialStrings | undefined
): OneUIStrings {
  return partial ? { ...defaultStrings, ...partial } : defaultStrings;
}
