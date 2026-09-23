import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * `colored`  — filled accent button (`OneUI.ButtonStyleColored`)
     * `outline`  — hairline outline button (`OneUI.ButtonStyleOutline`)
     * `transparent` — borderless text button (`OneUI.ButtonStyleTransparent`)
     * @default 'colored'
     */
    variant?: 'colored' | 'outline' | 'transparent';
    /** Stretch to the container width. */
    fullWidth?: boolean;
    children?: ReactNode;
}
export declare function Button({ variant, fullWidth, className, children, type, ...props }: ButtonProps): import("react").JSX.Element;
//# sourceMappingURL=Button.d.ts.map