import type { CSSProperties, ReactNode } from 'react';
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
export declare function Splash({ image, title, animated, loop, className, style, }: SplashProps): import("react").JSX.Element;
//# sourceMappingURL=Splash.d.ts.map