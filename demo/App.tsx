import { useState } from 'react';
import { IconsSection } from './IconsSection';
import {
  AppInfo,
  BottomNav,
  Button,
  ColorPickerPreference,
  DescriptionPreference,
  Dialog,
  DialogButton,
  Drawer,
  GridMenuDialog,
  HorizontalRadioPreference,
  IconAppInfo,
  IconFolder,
  IconHome,
  IconMenu,
  IconMore,
  IconPerson,
  IconSearch,
  IconSettings,
  LinearProgress,
  Page,
  Preference,
  PreferenceGroup,
  ProgressDialog,
  ProgressBar,
  RoundBox,
  ROUND_TOP,
  Separator,
  RelatedCard,
  Slider,
  SliderPreference,
  Splash,
  Switch,
  SwitchBar,
  SwitchPreference,
  Tabs,
  TipPopup,
  TipsCard,
  toast,
  OneUIProvider,
  CircularProgress,
  type SliderValue,
  type Theme,
} from 'oneui-react';

const SECTIONS = [
  ['page', 'Page & toolbar'],
  ['buttons', 'Buttons & inputs'],
  ['preferences', 'Preferences'],
  ['dialogs', 'Dialogs & toasts'],
  ['feedback', 'Feedback'],
  ['icons', 'Icons (883)'],
  ['misc', 'Splash & app info'],
];

export function App() {
  const [theme, setTheme] = useState<Theme>('light');
  return (
    <OneUIProvider theme={theme} onThemeChange={setTheme}>
      <div className="demo-shell">
        <nav className="demo-rail">
          <div className="demo-rail__logo">One UI React</div>
          <p className="demo-rail__tag">
            React port of OneUIProject/oneui-design
          </p>
          {SECTIONS.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>

        <div className="demo-main">
          <header className="demo-header">
            <h1>Component showcase</h1>
            <Button
              variant="outline"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? 'Dark mode' : 'Light mode'}
            </Button>
            <Button
              variant="transparent"
              onClick={() => toast('Hello from One UI! 👋')}
            >
              Toast
            </Button>
          </header>

          <div className="demo-content">
            <PageSection />
            <ButtonsSection />
            <PreferencesSection />
            <DialogsSection />
            <FeedbackSection />
            <IconsSection />
            <MiscSection />
          </div>
        </div>
      </div>
    </OneUIProvider>
  );
}

function Section({
  id,
  title,
  desc,
  children,
}: {
  id: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section className="demo-section" id={id}>
      <h2>{title}</h2>
      <p className="demo-desc">{desc}</p>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */

function PageSection() {
  const [drawer, setDrawer] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [query, setQuery] = useState('');
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [tab, setTab] = useState('all');
  const [nav, setNav] = useState('home');

  const rows = ['Photos of Milan', 'Boarding pass', 'Recipes', 'Work notes', 'Travel checklist'];

  return (
    <Section
      id="page"
      title="Page & toolbar"
      desc="ToolbarLayout: collapsing big title, search mode, action (selection) mode, drawer + footer bottom navigation."
    >
      <div className="demo-phone">
        <Page
          title="Showcase"
          subtitle="One UI for the web"
          onNavClick={() => setDrawer(true)}
          navBadge="N"
          actions={
            <button
              type="button"
              className="oui-page__nav oui-press"
              aria-label="Search"
              onClick={() => setSearchMode(true)}
            >
              <IconSearch />
            </button>
          }
          searchMode={searchMode}
          searchQuery={query}
          onSearchQueryChange={setQuery}
          onSearchClose={() => {
            setSearchMode(false);
            setQuery('');
          }}
          actionMode={
            selecting
              ? {
                  count: selected.length,
                  onClose: () => {
                    setSelecting(false);
                    setSelected([]);
                  },
                  allChecked: selected.length === rows.length,
                  onToggleAll: (checked) =>
                    setSelected(checked ? [...rows] : []),
                  actions: (
                    <button
                      type="button"
                      className="oui-page__nav oui-press"
                      aria-label="More"
                      onClick={() => toast('Overflow menu')}
                    >
                      <IconMore />
                    </button>
                  ),
                }
              : null
          }
          footer={
            <BottomNav
              value={nav}
              onChange={setNav}
              items={[
                { key: 'home', label: 'Home', icon: <IconHome /> },
                { key: 'files', label: 'Files', icon: <IconFolder />, badge: 3 },
                { key: 'profile', label: 'Profile', icon: <IconPerson /> },
              ]}
            />
          }
        >
          <div style={{ padding: '4px 0 16px' }}>
            <Tabs
              value={tab}
              onChange={setTab}
              items={[
                { key: 'all', label: 'All' },
                { key: 'pinned', label: 'Pinned' },
                { key: 'shared', label: 'Shared', badge: 2 },
              ]}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 16px 0' }}>
              <Button
                variant="transparent"
                onClick={() => setSelecting(true)}
                disabled={selecting}
              >
                Select
              </Button>
            </div>
            <PreferenceGroup>
              {rows.map((row) => (
                <Preference
                  key={row}
                  title={row}
                  summary="Edited yesterday"
                  selected={selected.includes(row)}
                  onClick={() => {
                    if (!selecting) return;
                    setSelected((prev) =>
                      prev.includes(row)
                        ? prev.filter((r) => r !== row)
                        : [...prev, row]
                    );
                  }}
                  end={selecting ? (selected.includes(row) ? '✓' : '') : <IconMore size={20} />}
                />
              ))}
            </PreferenceGroup>
            <Separator>List footer</Separator>
            <DescriptionPreference>
              Scroll the phone header to collapse the big title — the same
              behaviour as Samsung&apos;s <strong>ToolbarLayout</strong>.
            </DescriptionPreference>
          </div>
        </Page>
      </div>

      <Drawer open={drawer} onClose={() => setDrawer(false)} header={
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="oui-page__nav oui-press"
            aria-label="Close"
            onClick={() => setDrawer(false)}
            style={{ position: 'relative' }}
          >
            <IconMenu />
            <span className="oui-page__nav-badge">N</span>
          </button>
        </div>
      }>
        <PreferenceGroup title="Navigation">
          <Preference icon={<IconHome />} title="Home" selected onClick={() => setDrawer(false)} />
          <Preference icon={<IconFolder />} title="Files" onClick={() => setDrawer(false)} />
          <Preference icon={<IconSettings />} title="Settings" onClick={() => setDrawer(false)} />
        </PreferenceGroup>
      </Drawer>
      <p className="demo-hint">
        The hamburger in the phone header opens the DrawerLayout port.
      </p>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function ButtonsSection() {
  const [on, setOn] = useState(true);
  const [barOn, setBarOn] = useState(true);
  const [range, setRange] = useState<SliderValue>([25, 75]);
  const [volume, setVolume] = useState<SliderValue>(60);

  return (
    <Section
      id="buttons"
      title="Buttons & inputs"
      desc="OneUI.ButtonStyle* variants, SeslSwitch, SwitchBarLayout and HapticSeekBar/SeekBarPreferencePro."
    >
      <div className="demo-stack">
        <div className="demo-card demo-row">
          <Button onClick={() => toast('Colored button')}>Colored</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="transparent">Transparent</Button>
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>
            Disabled
          </Button>
          <Switch checked={on} onChange={setOn} label="Example switch" />
        </div>

        <div className="demo-card" style={{ padding: 0, overflow: 'hidden' }}>
          <SwitchBar
            checked={barOn}
            onChange={setBarOn}
            label="Dark mode schedules"
            wrapContent={false}
            contentClassName="demo-card"
          />
          <div style={{ padding: '0 16px 16px', marginTop: -8 }}>
            <DescriptionPreference>
              The switch bar sits above a top-rounded container
              (<code>SwitchBarLayout</code>).
            </DescriptionPreference>
          </div>
        </div>

        <div className="demo-card demo-stack">
          <Slider
            value={volume}
            onChange={setVolume}
            label="Volume"
            showValue
            units="%"
            ticks
            stepper
          />
          <Slider
            value={range}
            onChange={setRange}
            label="Overlap range"
            showValue
            ticks
          />
        </div>

        <div className="demo-card">
          <HorizontalRadioPreference
            label="Screen mode"
            value="standard"
            onChange={() => {}}
            options={[
              { value: 'standard', label: 'Standard' },
              { value: 'vivid', label: 'Vivid' },
              { value: 'auto', label: 'Adaptive' },
            ]}
          />
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function PreferencesSection() {
  const [wifi, setWifi] = useState(true);
  const [brightness, setBrightness] = useState<SliderValue>(40);
  const [themeName, setThemeName] = useState('blue');
  const [color, setColor] = useState('#0381fe');
  const [alpha, setAlpha] = useState(1);
  const [tipsVisible, setTipsVisible] = useState(true);

  return (
    <Section
      id="preferences"
      title="Preferences"
      desc="Preference categories, switch/seekbar/description rows, horizontal radio, TipsCardPreference and ColorPickerPreference."
    >
      <div className="demo-stack">
        <PreferenceGroup title="Network" variant="card">
          <SwitchPreferenceRow wifi={wifi} setWifi={setWifi} />
          <Preference
            icon={<IconSettings />}
            title="Connection preferences"
            summary="Data usage, VPN, private DNS"
            onClick={() => toast('Opening…')}
          />
        </PreferenceGroup>

        <PreferenceGroup title="Display" variant="card">
          <SliderPreferenceRow brightness={brightness} setBrightness={setBrightness} />
          <HorizontalRadioPreference
            label="Theme"
            value={themeName}
            onChange={setThemeName}
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
              { value: 'auto', label: 'Auto' },
            ]}
          />
        </PreferenceGroup>

        <div className="demo-card">
          <ColorPickerPreference
            title="Accent color"
            summary="Applied through the OneUIProvider accent prop"
            value={color}
            onChange={setColor}
            showAlpha
            alpha={alpha}
            onAlphaChange={setAlpha}
          />
        </div>

        {tipsVisible ? (
          <TipsCard
            title="Looking for a tip?"
            summary="Tips cards highlight helpful features — like this One UI settings card."
            onClose={() => setTipsVisible(false)}
            actions={[
              { label: 'Later', onClick: () => setTipsVisible(false) },
              { label: 'Show me', onClick: () => toast('Great choice!') },
            ]}
          />
        ) : (
          <Button variant="outline" onClick={() => setTipsVisible(true)}>
            Bring back tips card
          </Button>
        )}

        <DescriptionPreference>
          This is <code>DescriptionPreference</code> — the unclickable
          preference text style (14sp, +4sp line spacing). Learn more in the{' '}
          <a href="https://github.com/OneUIProject/oneui-design" target="_blank" rel="noreferrer">
            original Android library
          </a>
          .
        </DescriptionPreference>
      </div>
    </Section>
  );
}

/* small wrappers so the section keeps its own state shape */
function SwitchPreferenceRow({
  wifi,
  setWifi,
}: {
  wifi: boolean;
  setWifi: (v: boolean) => void;
}) {
  return (
    <SwitchPreference
      icon={<IconHome />}
      title="Wi-Fi"
      summary={wifi ? 'Galaxy-5G connected' : 'Off'}
      checked={wifi}
      onChange={setWifi}
    />
  );
}

function SliderPreferenceRow({
  brightness,
  setBrightness,
}: {
  brightness: SliderValue;
  setBrightness: (v: SliderValue) => void;
}) {
  return (
    <SliderPreference
      title="Brightness"
      value={brightness}
      onChange={setBrightness}
      min={10}
      max={100}
      units="%"
      stepper
      ticks
    />
  );
}

/* ------------------------------------------------------------------ */

function DialogsSection() {
  const [alert, setAlert] = useState(false);
  const [grid, setGrid] = useState(false);
  const [progress, setProgress] = useState<null | 'circle' | 'spinner' | 'horizontal'>(
    null
  );

  return (
    <Section
      id="dialogs"
      title="Dialogs & toasts"
      desc="Alert dialogs, ProgressDialog (circle/spinner/horizontal), GridMenuDialog with N badges, and the transient-notification Toast."
    >
      <div className="demo-card demo-row">
        <Button variant="outline" onClick={() => setAlert(true)}>
          Alert dialog
        </Button>
        <Button variant="outline" onClick={() => setProgress('circle')}>
          Progress · circle
        </Button>
        <Button variant="outline" onClick={() => setProgress('spinner')}>
          Progress · spinner
        </Button>
        <Button variant="outline" onClick={() => setProgress('horizontal')}>
          Progress · horizontal
        </Button>
        <Button variant="outline" onClick={() => setGrid(true)}>
          Grid menu
        </Button>
        <Button onClick={() => toast('Saved to your phone')}>toast()</Button>
        <Button
          variant="transparent"
          onClick={() => toast('Copied', { position: 'top', duration: 1200 })}
        >
          Toast (top)
        </Button>
      </div>

      <Dialog
        open={alert}
        onClose={() => setAlert(false)}
        title="Turn off Wi-Fi?"
        actions={
          <>
            <DialogButton onClick={() => setAlert(false)}>Cancel</DialogButton>
            <DialogButton
              emphasis
              autoFocus
              onClick={() => {
                setAlert(false);
                toast('Wi-Fi turned off');
              }}
            >
              Turn off
            </DialogButton>
          </>
        }
      >
        You&apos;ll stop connecting to open networks near you until you turn
        Wi-Fi back on.
      </Dialog>

      <ProgressDialog
        open={progress === 'circle'}
        onClose={() => setProgress(null)}
        variant="circle"
        percentText="45%"
      />
      <ProgressDialog
        open={progress === 'spinner'}
        onClose={() => setProgress(null)}
        variant="spinner"
        message="Searching for devices…"
      />
      <ProgressDialog
        open={progress === 'horizontal'}
        onClose={() => setProgress(null)}
        variant="horizontal"
        message="Downloading update"
        value={64}
        numberText="64/100"
      />

      <GridMenuDialog
        open={grid}
        onClose={() => setGrid(false)}
        title="Quick actions"
        items={[
          { key: 'edit', label: 'Edit', icon: <IconSettings />, onClick: () => toast('Edit') },
          { key: 'share', label: 'Share', icon: <IconHome />, onClick: () => toast('Share') },
          { key: 'info', label: 'App info', icon: <IconAppInfo />, onClick: () => toast('App info') },
          { key: 'new', label: 'New', icon: <IconFolder />, badge: 'N', onClick: () => toast('New') },
          { key: 'search', label: 'Search', icon: <IconSearch />, onClick: () => toast('Search') },
          { key: 'more', label: 'More', icon: <IconMore />, onClick: () => toast('More') },
        ]}
      />
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function FeedbackSection() {
  const [tip, setTip] = useState(false);
  const [tipAnchor, setTipAnchor] = useState<HTMLButtonElement | null>(null);
  const [determinate, setDeterminate] = useState(35);

  return (
    <Section
      id="feedback"
      title="Feedback"
      desc="Progress indicators, TipPopup balloon and the RelatedCard 'Looking for something else?' links."
    >
      <div className="demo-stack">
        <div className="demo-card demo-row">
          <CircularProgress />
          <CircularProgress value={62} message="62%" size={56} />
          <ProgressBar variant="linear" />
          <div style={{ flex: 1, minWidth: 200 }}>
            <LinearProgress value={determinate} showPercent numberText={`${determinate}/100`} />
            <input
              type="range"
              min={0}
              max={100}
              value={determinate}
              onChange={(e) => setDeterminate(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--oui-primary)' }}
            />
          </div>
        </div>

        <div className="demo-card demo-row">
          <Button
            variant="outline"
            onMouseEnter={() => setTip(true)}
            onClick={() => setTip(true)}
            id="tip-target"
          >
            Hover for a tip
          </Button>
          <Button variant="transparent" onClick={() => setTip((t) => !t)}>
            Toggle tip
          </Button>
        </div>
        <TipPopup
          open={tip}
          anchor={() => document.getElementById('tip-target')?.getBoundingClientRect() ?? null}
          onClose={() => setTip(false)}
          action={{ label: 'Got it', onClick: () => toast('Tip dismissed') }}
        >
          Double tap this button to learn more — sem_tip_popup from the design lib.
        </TipPopup>

        <div className="demo-card" style={{ background: 'var(--oui-surface)' }}>
          <RelatedCardExample />
        </div>
      </div>
    </Section>
  );
}

function RelatedCardExample() {
  return (
    <RelatedCard
      links={[
        { label: 'Galaxy Themes', onClick: () => toast('Galaxy Themes') },
        { label: 'Wallpaper and style', onClick: () => toast('Wallpaper') },
        { label: 'Display settings', onClick: () => toast('Display') },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ */

function MiscSection() {
  const [splashAnimated, setSplashAnimated] = useState(true);

  return (
    <Section
      id="misc"
      title="Splash & app info"
      desc="SplashLayout (with the wiggle animation) and AppInfoLayout with pill actions."
    >
      <div className="demo-stack">
        <div className="demo-card" style={{ height: 320, padding: 0 }}>
          <Splash
            animated={splashAnimated}
            loop={splashAnimated}
            title="One UI React"
            image={
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 24,
                  background: 'linear-gradient(135deg, #0381fe, #7e57c2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <IconAppInfo size={44} />
              </div>
            }
          />
        </div>
        <div className="demo-row">
          <Button variant="outline" onClick={() => setSplashAnimated((v) => !v)}>
            {splashAnimated ? 'Stop animation' : 'Replay animation'}
          </Button>
        </div>

        <div className="demo-card" style={{ background: 'var(--oui-surface)', minHeight: 420 }}>
          <AppInfo
            name="One UI Sample"
            version="1.2.6"
            notice="The latest version is already installed."
            icon={
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 20,
                  background: 'linear-gradient(135deg, #0381fe, #3e91ff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <IconAppInfo size={44} />
              </div>
            }
            actions={[
              { label: 'Update', variant: 'primary', onClick: () => toast('Checking…') },
              { label: 'App info', onClick: () => toast('App info') },
            ]}
          />
        </div>

        <div className="demo-card demo-row">
          <RoundBox
            roundedCorners={ROUND_TOP}
            style={{ width: 260, height: 100 }}
            className="demo-card"
          >
            <div style={{ padding: 16, fontSize: 14 }}>
              <strong>RoundBox</strong> — roundedCorners=&#123;ROUND_TOP&#125;
            </div>
          </RoundBox>
          <Separator>Section label</Separator>
        </div>
      </div>
    </Section>
  );
}
