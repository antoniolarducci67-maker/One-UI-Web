/**
 * `@oneuiproject/react/icons` — the full One UI icon catalog.
 *
 * 883 vector icons ported from OneUIProject/oneui-icons (MIT).
 *
 * ```tsx
 * // named import (best tree-shaking)
 * import { IcOuiAlarm, IcOuiWifi } from '@oneuiproject/react/icons';
 *
 * // or by name
 * import { OneIcon, iconNames } from '@oneuiproject/react/icons';
 * <OneIcon name="alarm" />
 * ```
 */
export * from './generated';
export { OneIcon, type OneIconProps } from './OneIcon';

/* Companion icons from the oneui-design library + shared shell/type */
export {
  IconBase,
  IconMenu,
  IconAppInfo,
  IconClose,
  IconAdd,
  IconRemove,
  IconBack,
  IconSearch,
  IconCheck,
  IconMore,
  IconSettings,
  IconHome,
  IconFolder,
  IconPerson,
  type IconProps,
} from '../icons';
