import type { HTMLAttributes, ReactNode } from 'react';
import './Separator.css';
export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * With text: renders a bold list-separator label
     * (`Widget.AppCompat.Light.TextView.ListSeparator`, 13sp bold,
     * `sesl_list_subheader_text_color`).
     * Without text: renders a hairline divider.
     */
    children?: ReactNode;
}
export declare function Separator({ children, className, ...props }: SeparatorProps): import("react").JSX.Element;
//# sourceMappingURL=Separator.d.ts.map