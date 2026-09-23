import type { ReactNode } from 'react';
import { cx } from '../utils';
import { useStrings } from '../theme';
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
export function RelatedCard({
  title,
  links,
  onLinkClick,
  className,
}: RelatedCardProps) {
  const strings = useStrings();

  return (
    <section className={cx('oui-related-card', className)}>
      <h3 className="oui-related-card__title">
        {title ?? strings.relatedDescription}
      </h3>
      <div className="oui-related-card__links">
        {links.map((link, index) => {
          const content = <span className="oui-related-card__label">{link.label}</span>;
          const handleClick = () => {
            onLinkClick?.(link, index);
            link.onClick?.();
          };

          if (link.href) {
            return (
              <a
                key={link.key ?? `${link.label}-${index}`}
                className="oui-related-card__link oui-press"
                href={link.href}
                onClick={handleClick}
              >
                {content}
              </a>
            );
          }
          return (
            <button
              key={link.key ?? `${link.label}-${index}`}
              type="button"
              className="oui-related-card__link oui-press"
              onClick={handleClick}
            >
              {content}
            </button>
          );
        })}
      </div>
    </section>
  );
}
