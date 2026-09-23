import { type CSSProperties, type ReactNode } from 'react';
import './Page.css';
export interface PageActionMode {
    /** Number of selected items. */
    count: number;
    /** Close (cancel) the action mode. */
    onClose: () => void;
    /** Show the "All" checkbox. @default true */
    showAll?: boolean;
    allChecked?: boolean;
    onToggleAll?: (checked: boolean) => void;
    /** Extra toolbar items rendered on the right. */
    actions?: ReactNode;
}
export interface PageProps {
    /** Toolbar (collapsed) title. */
    title: string;
    /** Large header title. Defaults to `title`. */
    expandedTitle?: string;
    subtitle?: string;
    expandedSubtitle?: string;
    /**
     * Navigation icon behaviour (left side of the toolbar).
     * Provide `onNavClick` alone for the default hamburger icon,
     * or pass a custom `navIcon`.
     */
    onNavClick?: () => void;
    navIcon?: ReactNode;
    navLabel?: string;
    /** "N" badge over the navigation icon (`setNavigationButtonBadge`). */
    navBadge?: number | string;
    /** Render the nav icon as a back arrow. */
    navAsBack?: boolean;
    /** Right-hand toolbar actions (48×48 icon buttons). */
    actions?: ReactNode;
    /** Collapse the big header on scroll. @default true */
    expandable?: boolean;
    /** Initial (uncontrolled) expansion state. @default true */
    expanded?: boolean;
    /** Called whenever the expansion state changes. */
    onExpandedChange?: (expanded: boolean) => void;
    /** Search mode replaces the toolbar content (`showSearchMode`). */
    searchMode?: boolean;
    searchQuery?: string;
    searchPlaceholder?: string;
    onSearchQueryChange?: (query: string) => void;
    onSearchClose?: () => void;
    /** Extra node rendered inside the search bar (e.g. a voice button). */
    searchTrailing?: ReactNode;
    /** Selection toolbar (`showActionMode`). */
    actionMode?: PageActionMode | null;
    /** Background of the header/toolbar area. Defaults to `--oui-bg`. */
    headerBackground?: string;
    /** Sticky footer, e.g. `<BottomNav …/>` (`toolbarlayout_footer`). */
    footer?: ReactNode;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}
/**
 * `ToolbarLayout` port — One UI collapsing header with a pinned toolbar,
 * big expanding title, search mode, action (selection) mode, rounded content
 * surface and footer slot.
 */
export declare function Page({ title, expandedTitle, subtitle, expandedSubtitle, onNavClick, navIcon, navLabel, navBadge, navAsBack, actions, expandable, expanded, onExpandedChange, searchMode, searchQuery, searchPlaceholder, onSearchQueryChange, onSearchClose, searchTrailing, actionMode, headerBackground, footer, className, style, children, }: PageProps): import("react").JSX.Element;
//# sourceMappingURL=Page.d.ts.map