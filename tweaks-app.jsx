/* PHA 검토 보고서 — Tweaks panel
 * Lets the user switch the brand-palette accent of the report.
 */

const THEMES = {
  forest: {
    label: 'Forest',
    sub: '\uc0dd\ubd84\ud574 \u00b7 \uae30\ubcf8',
    primary: '#47804f',
    accent:  '#b0db8c',
    surface: '#f0ebe8',
    onPrimary: '#fdfbf8',
  },
  editorial: {
    label: 'Editorial',
    sub: '\uc798\ub9b0 \uc5e0\ud1a0\ub9ac\uc5bc',
    primary: '#14110f',
    accent:  '#ff8052',
    surface: '#f0ebe8',
    onPrimary: '#fdfbf8',
  },
  marine: {
    label: 'Marine',
    sub: '\ud574\uc591 \ud1a4',
    primary: '#3a5fc7',
    accent:  '#c3b7f2',
    surface: '#eef1fb',
    onPrimary: '#fdfbf8',
  },
  sunrise: {
    label: 'Sunrise',
    sub: '\uc6dc\ubbf8\ud55c \ud130\ub77c\ucf54\ud0c0',
    primary: '#c95a32',
    accent:  '#fab04f',
    surface: '#fbf1e8',
    onPrimary: '#fdfbf8',
  },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme":  "forest",
  "accent": true,
}/*EDITMODE-END*/;

function applyTheme(key) {
  const t = THEMES[key] || THEMES.forest;
  const r = document.documentElement.style;
  r.setProperty('--theme-primary', t.primary);
  r.setProperty('--theme-accent',  t.accent);
  r.setProperty('--theme-surface', t.surface);
  r.setProperty('--theme-on-primary', t.onPrimary);
}

function ThemeSwatch({ themeKey, active, onClick }) {
  const t = THEMES[themeKey];
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: '1 1 0',
        minWidth: 0,
        background: 'transparent',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'inherit',
      }}
    >
      <div
        style={{
          height: 44,
          borderRadius: 4,
          overflow: 'hidden',
          display: 'flex',
          boxShadow: active
            ? `0 0 0 2px ${t.primary}, 0 0 0 4px #fff`
            : 'inset 0 0 0 1px rgba(20,17,15,.12)',
          transition: 'box-shadow .15s ease',
        }}
      >
        <div style={{ flex: 3, background: t.primary }}></div>
        <div style={{ flex: 2, background: t.accent }}></div>
        <div style={{ flex: 1.5, background: t.surface }}></div>
      </div>
      <div
        style={{
          marginTop: 6,
          fontFamily: '"Apercu Mono Pro", ui-monospace, monospace',
          fontSize: 9.5,
          letterSpacing: '.04em',
          textTransform: 'uppercase',
          color: active ? t.primary : '#2a2622',
          fontWeight: active ? 600 : 500,
        }}
      >
        {t.label}
      </div>
      <div
        style={{
          fontFamily: '"Apercu Pro", system-ui, sans-serif',
          fontSize: 9,
          color: '#6b6660',
          marginTop: 1,
        }}
      >
        {t.sub}
      </div>
    </button>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    applyTheme(t.theme);
  }, [t.theme]);

  return (
    <TweaksPanel title="Tweaks" subtitle="\ucef4\ub7ec \ud14c\ub9c8">
      <TweakSection label="\ube0c\ub79c\ub4dc \uceec\ub7ec \ud14c\ub9c8" />
      <div style={{ padding: '6px 4px 4px' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {Object.keys(THEMES).map((k) => (
            <ThemeSwatch
              key={k}
              themeKey={k}
              active={t.theme === k}
              onClick={() => setTweak('theme', k)}
            />
          ))}
        </div>
        <p
          style={{
            marginTop: 14,
            fontFamily: '"Apercu Pro", system-ui, sans-serif',
            fontSize: 10.5,
            lineHeight: 1.5,
            color: '#6b6660',
          }}
        >
          \ud45c\uc9c0 \u00b7 \uba54\uc778 \uc81c\ubaa9 \u00b7 \uac15\uc870 \uc11d\uc790 \u00b7 \ubc14\ub2e5 \uc2a4\uc6e8\uce58 \uc0c9\uc870\uac00 \uc77c\uacb0\ud558\uac8c \ubcc0\uacbd\ub429\ub2c8\ub2e4.
          \uc778\uc1c4 / PDF \ucd9c\ub825 \uc2dc Tweaks \ud328\ub110\uc740 \uc790\ub3d9 \uc228\uae40 \ucc98\ub9ac\ub429\ub2c8\ub2e4.
        </p>
      </div>

      <TweakSection label="\uc778\uc1c4 \ub3c4\uc6c0\ub9d0" />
      <div
        style={{
          padding: '4px 4px 0',
          fontFamily: '"Apercu Pro", system-ui, sans-serif',
          fontSize: 10.5,
          lineHeight: 1.55,
          color: '#2a2622',
        }}
      >
        Cmd / Ctrl + P \uc73c\ub85c PDF \uc800\uc7a5 \uc2dc <b>\u201c\ubc30\uacbd \uadf8\ub798\ud53d\u201d</b>\uc744 \uc138\uc774\uace0,
        \uc5ec\ubc31\uc744 <b>\u201c\uc5c6\uc74c\u201d</b>\uc73c\ub85c \uc124\uc815\ud558\uba74 \uc6d0\ubcf8 \ub808\uc774\uc544\uc6c3 \uadf8\ub300\ub85c \ucd9c\ub825\ub429\ub2c8\ub2e4.
      </div>
    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById('tweaks-root'));
root.render(<App />);
