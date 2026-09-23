import { useMemo, useState } from 'react';
import { OneIcon, iconNames } from 'oneui-react/icons';
import { Button, DescriptionPreference, IconSearch, toast } from 'oneui-react';
import {
  IcOuiAlarm,
  IcOuiWifi,
  IcOuiBluetooth,
  IcOuiBattery,
  IcOuiPalette,
} from 'oneui-react/icons';

export function IconsSection() {
  const [query, setQuery] = useState('');

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^ic_oui_/, '');
    if (!q) return iconNames;
    return iconNames.filter((name) => name.includes(q));
  }, [query]);

  const shown = matches.slice(0, 400);

  const copy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(`<OneIcon name="${name}" />`);
      toast(`Copied  <OneIcon name="${name}" />`);
    } catch {
      toast(`ic_oui_${name}`);
    }
  };

  return (
    <section className="demo-section" id="icons">
      <h2>Icons</h2>
      <p className="demo-desc">
        883 icons from <code>OneUIProject/oneui-icons</code>. The Android
        resource color <code>@color/oui_primary_icon_color</code> maps to{' '}
        <code>currentColor</code>, so every icon follows the CSS{' '}
        <code>color</code> (and therefore light/dark themes automatically).
        Click a tile to copy its usage.
      </p>

      <div className="demo-stack">
        <div className="demo-card demo-row">
          <IcOuiAlarm size={32} />
          <IcOuiWifi size={32} />
          <IcOuiBluetooth size={32} />
          <IcOuiBattery size={32} />
          <IcOuiPalette size={32} style={{ color: 'var(--oui-primary)' }} />
          <span style={{ color: 'var(--oui-green)' }}>
            <OneIcon name="call" size={32} />
          </span>
          <span style={{ color: 'var(--oui-orange)' }}>
            <OneIcon name="ic_oui_notifications" size={32} />
          </span>
          <Button variant="outline" onClick={() => setQuery('')}>
            Reset filter
          </Button>
        </div>

        <div className="demo-card">
          <div className="demo-row" style={{ marginBottom: 16 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: 'var(--oui-text-secondary)',
                fontSize: 15,
              }}
            >
              <IconSearch size={20} />
            </span>
            <input
              className="oui-page__search-input"
              style={{ maxWidth: 320 }}
              type="search"
              value={query}
              placeholder={`Search ${iconNames.length} icons… (e.g. wifi, battery, folder)`}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search icons"
            />
            <span style={{ fontSize: 13, color: 'var(--oui-text-muted)' }}>
              {matches.length} match{matches.length === 1 ? '' : 'es'}
              {matches.length > shown.length ? ` · showing ${shown.length}` : ''}
            </span>
          </div>

          <div className="demo-icon-grid">
            {shown.map((name) => (
              <button
                key={name}
                type="button"
                className="demo-icon-tile oui-press"
                onClick={() => copy(name)}
                title={`<OneIcon name="${name}" />`}
              >
                <OneIcon name={name} size={28} />
                <span className="demo-icon-tile__name">{name}</span>
              </button>
            ))}
          </div>

          {matches.length === 0 ? (
            <DescriptionPreference>
              No icons match “{query}”.
            </DescriptionPreference>
          ) : null}
        </div>

        <div className="demo-card demo-row">
          <Button variant="outline" onClick={() => toast('IcOuiAlarm')}>
            Named import works
          </Button>
        </div>
      </div>
    </section>
  );
}
