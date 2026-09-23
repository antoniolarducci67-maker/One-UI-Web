import type { ReactNode } from 'react';
import './RelatedCard.css';
export interface RelatedLink {
    key?: string;
    label: string;
    onClick?: () => void;
    href?: string;
}
export interface RelatedCardProps {
    /** Defaults to "Looking for something else?" (`oui_relative_description`). */
    title?: ReactNode;
    links: RelatedLink[];
    onLinkClick?: (link: RelatedLink, index: number) => void;
    className?: string;
}
/**
 * RelatedCard / "Related links" — `oui_view_relative_link.xml`:
 * tinted 26dp-radius card, 18sp bold title, stacked bold accent links
 * (16sp, padding 16/6, pressed ripple).
 */
export declare function RelatedCard({ title, links, onLinkClick, className, }: RelatedCardProps): import("react").JSX.Element;
//# sourceMappingURL=RelatedCard.d.ts.map