import { iconNames } from './generated';
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
export declare function OneIcon({ name, fallback, ...props }: OneIconProps): import("react").JSX.Element;
export { iconNames };
//# sourceMappingURL=OneIcon.d.ts.map