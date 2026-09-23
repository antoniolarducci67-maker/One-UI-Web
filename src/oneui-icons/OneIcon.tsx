import { icons, iconNames } from './generated';
import type { IconProps } from '../icons';

export interface OneIconProps extends IconProps {
  /**
   * Icon name — either the short name (`"alarm"`, from the Android resource
   * `ic_oui_alarm` without the prefix) or the full resource name
   * (`"ic_oui_alarm"`).
   */
  name: string;
  /** Rendered when the name is unknown. */
  fallback?: React.ReactNode;
}

/**
 * Render any of the 883 One UI icons by name:
 *
 * ```tsx
 * <OneIcon name="alarm" size={32} />
 * <OneIcon name="ic_oui_wifi" style={{ color: '#0381fe' }} />
 * ```
 *
 * For best tree-shaking prefer the named components
 * (`import { IcOuiAlarm } from '@oneuiproject/react/icons'`).
 */
export function OneIcon({ name, fallback = null, ...props }: OneIconProps) {
  const key = name.startsWith('ic_oui_') ? name.slice('ic_oui_'.length) : name;
  const Icon =
    icons[key as keyof typeof icons] ??
    icons[name as keyof typeof icons] ??
    null;
  if (!Icon) {
    if (typeof console !== 'undefined') {
      console.warn(`[oneui-react] Unknown icon name: "${name}"`);
    }
    return <>{fallback}</>;
  }
  return <Icon {...props} />;
}

export { iconNames };
