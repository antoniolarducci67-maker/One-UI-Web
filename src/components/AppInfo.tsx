import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../utils';
import { useStrings } from '../theme';
import { Button } from './Button';
import { CircularProgress } from './ProgressBar';
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
export function AppInfo({
  name,
  version,
  versionText,
  icon,
  notice,
  loading = false,
  actions,
  children,
  className,
  style,
}: AppInfoProps) {
  const strings = useStrings();
  const versionLine = versionText ?? (version ? strings.versionInfo(version) : null);

  return (
    <div className={cx('oui-app-info', className)} style={style}>
      <div className="oui-app-info__upper">
        {icon ? <div className="oui-app-info__icon">{icon}</div> : null}
        <h1 className="oui-app-info__name">{name}</h1>
        {versionLine ? <p className="oui-app-info__version">{versionLine}</p> : null}
        {loading ? (
          <div className="oui-app-info__progress">
            <CircularProgress size={40} />
          </div>
        ) : null}
        {notice ? <p className="oui-app-info__notice">{notice}</p> : null}
        {actions && actions.length > 0 ? (
          <div className="oui-app-info__actions">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant === 'primary' ? 'colored' : 'outline'}
                className={cx(
                  'oui-app-info__button',
                  action.variant !== 'primary' && 'oui-app-info__button--default'
                )}
                onClick={action.onClick}
                disabled={action.disabled}
              >
                {action.label}
              </Button>
            ))}
          </div>
        ) : null}
        {children ? <div className="oui-app-info__children">{children}</div> : null}
      </div>
    </div>
  );
}
