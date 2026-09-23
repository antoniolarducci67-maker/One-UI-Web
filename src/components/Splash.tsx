import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../utils';
import './Splash.css';

export interface SplashProps {
  /** Logo / illustration rendered at 80×80dp. */
  image?: ReactNode;
  /** App title under the logo (30dp, expanded-collapsing appearance). */
  title?: string;
  /**
   * Play the wiggle intro from `anim/oui_splash_animation.xml`
   * (rotate 0→25→−45→35→−25→10 ≈ 560ms).
   * @default false
   */
  animated?: boolean;
  /** Repeat the animation while the splash is visible. @default false */
  loop?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** `SplashLayout` — centered logo + title splash screen. */
export function Splash({
  image,
  title,
  animated = false,
  loop = false,
  className,
  style,
}: SplashProps) {
  return (
    <div className={cx('oui-splash', className)} style={style} role="presentation">
      {image ? (
        <div
          className={cx(
            'oui-splash__image',
            animated && 'oui-splash__image--animated',
            animated && loop && 'is-looping'
          )}
        >
          {image}
        </div>
      ) : null}
      {title ? <p className="oui-splash__title">{title}</p> : null}
    </div>
  );
}
