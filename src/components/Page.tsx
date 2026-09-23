import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { clamp, cx } from '../utils';
import { useStrings } from '../theme';
import { IconBack, IconClose, IconMenu, IconSearch } from '../icons';
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
export function Page({
  title,
  expandedTitle,
  subtitle,
  expandedSubtitle,
  onNavClick,
  navIcon,
  navLabel,
  navBadge,
  navAsBack = false,
  actions,
  expandable = true,
  expanded = true,
  onExpandedChange,
  searchMode = false,
  searchQuery = '',
  searchPlaceholder = 'Search',
  onSearchQueryChange,
  onSearchClose,
  searchTrailing,
  actionMode = null,
  headerBackground,
  footer,
  className,
  style,
  children,
}: PageProps) {
  const strings = useStrings();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(expanded ? 0 : 1);

  const collapseRange = useCallback(() => {
    const el = titleBlockRef.current;
    return Math.max(el?.offsetHeight ?? 0, 1);
  }, []);

  const handleScroll = useCallback(() => {
    if (!expandable) return;
    const el = scrollerRef.current;
    if (!el) return;
    const p = clamp(el.scrollTop / collapseRange(), 0, 1);
    setProgress(p);
    onExpandedChange?.(p < 0.5);
  }, [expandable, collapseRange, onExpandedChange]);

  // Apply the initial `expanded` state (without animation).
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const target = expanded || !expandable ? 0 : collapseRange();
    if (Math.abs(el.scrollTop - target) > 1) {
      el.scrollTop = target;
      setProgress(expanded || !expandable ? 0 : 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Imperatively expand/collapse when `expanded` changes.
  const prevExpanded = useRef(expanded);
  useEffect(() => {
    if (prevExpanded.current === expanded) return;
    prevExpanded.current = expanded;
    const el = scrollerRef.current;
    if (!el || !expandable) return;
    const target = expanded ? 0 : collapseRange();
    el.scrollTo({ top: target, behavior: 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, expandable]);

  // Autofocus the search field when entering search mode.
  useEffect(() => {
    if (searchMode) inputRef.current?.focus();
  }, [searchMode]);

  const collapsedOpacity = clamp((progress - 0.55) / 0.35, 0, 1);
  const isCollapsed = progress > 0.6 || !expandable || searchMode || !!actionMode;

  const bigTitle = expandedTitle ?? title;
  const bigSubtitle = expandedSubtitle ?? subtitle;
  const showTitleBlock = expandable && !searchMode && !actionMode;

  const navButton =
    onNavClick || navIcon ? (
      <button
        type="button"
        className="oui-page__nav oui-press"
        aria-label={navLabel ?? strings.navigationDrawer}
        onClick={onNavClick}
      >
        {navIcon ?? (navAsBack ? <IconBack /> : <IconMenu />)}
        {navBadge != null && navBadge !== 0 && navBadge !== '' ? (
          <span className="oui-page__nav-badge">
            {typeof navBadge === 'number' && navBadge > 99
              ? '99+'
              : navBadge}
          </span>
        ) : null}
      </button>
    ) : (
      <span className="oui-page__nav-spacer" aria-hidden="true" />
    );

  let toolbarContent: ReactNode;

  if (actionMode) {
    toolbarContent = (
      <div className="oui-page__action-mode" role="toolbar">
        <button
          type="button"
          className="oui-page__nav oui-press"
          aria-label={strings.close}
          onClick={actionMode.onClose}
        >
          <IconClose />
        </button>
        <span className="oui-page__action-count">
          {actionMode.count > 0
            ? strings.actionModeSelected(actionMode.count)
            : strings.actionModeSelectItems}
        </span>
        <span className="oui-page__toolbar-spacer" />
        {actionMode.showAll !== false && actionMode.onToggleAll ? (
          <label className="oui-page__action-all">
            <input
              type="checkbox"
              checked={!!actionMode.allChecked}
              onChange={(e) => actionMode.onToggleAll?.(e.target.checked)}
            />
            {strings.actionModeAll}
          </label>
        ) : null}
        {actionMode.actions}
      </div>
    );
  } else if (searchMode) {
    toolbarContent = (
      <div className="oui-page__search" role="search">
        <button
          type="button"
          className="oui-page__nav oui-press"
          aria-label={strings.close}
          onClick={onSearchClose}
        >
          <IconBack />
        </button>
        <input
          ref={inputRef}
          className="oui-page__search-input"
          type="search"
          value={searchQuery}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          onChange={(e) => onSearchQueryChange?.(e.target.value)}
        />
        {searchTrailing ?? (
          <span className="oui-page__search-icon" aria-hidden="true">
            <IconSearch size={20} />
          </span>
        )}
      </div>
    );
  } else {
    toolbarContent = (
      <>
        {navButton}
        <span
          className="oui-page__collapsed-title"
          style={{ opacity: expandable ? collapsedOpacity : 1 }}
          aria-hidden={expandable ? collapsedOpacity < 0.5 : false}
        >
          {title}
        </span>
        <span className="oui-page__toolbar-spacer" />
        {actions ? (
          <div className="oui-page__actions">{actions}</div>
        ) : null}
      </>
    );
  }

  return (
    <div
      className={cx('oui-page', className)}
      data-collapsed={isCollapsed || undefined}
      style={
        headerBackground
          ? ({ '--oui-header-bg': headerBackground } as CSSProperties)
          : undefined
      }
    >
      <div
        ref={scrollerRef}
        className="oui-page__scroll"
        onScroll={handleScroll}
      >
        <div className="oui-page__toolbar" role="toolbar" aria-label={title}>
          {toolbarContent}
        </div>

        {showTitleBlock ? (
          <div ref={titleBlockRef} className="oui-page__title-block">
            <h1 className="oui-page__expanded-title">{bigTitle}</h1>
            {bigSubtitle ? (
              <p className="oui-page__expanded-subtitle">{bigSubtitle}</p>
            ) : null}
          </div>
        ) : null}

        <main className="oui-page__surface" style={style}>
          {children}
        </main>
      </div>

      {footer ? <div className="oui-page__footer">{footer}</div> : null}
    </div>
  );
}
