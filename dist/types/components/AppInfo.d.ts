import type { CSSProperties, ReactNode } from 'react';
import './AppInfo.css';
export interface AppInfoAction {
    label: string;
    onClick?: () => void;
    /** `primary` = accent filled; `default` = grey pill (`OneUI.AppInfoButton`). */
    variant?: 'primary' | 'default';
    disabled?: boolean;
}
export interface AppInfoProps {
    /** App name (38sp, centered). */
    name: string;
    /** Version text — shown as `Version x.y.z` by default. */
    version?: string;
    /** Custom version line (replaces `version`). */
    versionText?: string;
    /** Optional app logo above the name. */
    icon?: ReactNode;
    /** Update/progress notice (14sp muted). */
    notice?: string;
    /** Show the circular progress (while checking for updates). */
    loading?: boolean;
    /** Primary + secondary actions, e.g. Update / App info. */
    actions?: AppInfoAction[];
    /** Free-form content under the actions. */
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}
/**
 * `AppInfoLayout` — centered app name / version / update notice with
 * pill actions (radius 22dp, minHeight 44dp).
 */
export declare function AppInfo({ name, version, versionText, icon, notice, loading, actions, children, className, style, }: AppInfoProps): import("react").JSX.Element;
//# sourceMappingURL=AppInfo.d.ts.map