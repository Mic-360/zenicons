/* hallmark: full-bleed specimen wall. product-first hierarchy, sparse copy, tactile archive. */
import Fuse from 'fuse.js';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid, type GridChildComponentProps } from 'react-window';
import * as Icons from '@bhaumic/zenicons';
import { iconCount, type IconProps } from '@bhaumic/zenicons';

type IconEntry = {
  name: string;
  display: string;
  words: string;
  Component: ComponentType<IconProps>;
};

type HeroSymbol = {
  name: string;
  label: string;
  size: number;
  tone: 'ink' | 'copper' | 'paper';
};

const REPO_URL = 'https://github.com/mic-360/zenicons';
const README_URL = `${REPO_URL}#readme`;
const SECURITY_URL = `${REPO_URL}/blob/main/SECURITY.md`;
const GUIDE_URL = `${REPO_URL}/blob/main/PUBLISH_GUIDE.md`;

const HERO_SYMBOLS: HeroSymbol[] = [
  { name: 'IconSigma', label: 'math', size: 72, tone: 'copper' },
  { name: 'IconShieldSecurity', label: 'trust', size: 58, tone: 'paper' },
  { name: 'IconArrowEnter', label: 'flow', size: 68, tone: 'paper' },
  { name: 'IconCalendar', label: 'product', size: 54, tone: 'ink' },
  { name: 'IconAddressBookEmail', label: 'people', size: 62, tone: 'paper' },
  { name: 'IconArrowCircleUp', label: 'motion', size: 76, tone: 'copper' },
];

function toWords(value: string) {
  return value
    .replace(/_/g, ' ')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .toLowerCase();
}

const ALL_ICONS: IconEntry[] = Object.entries(Icons)
  .filter(([name]) => name.startsWith('Icon') && name !== 'IconBase')
  .map(([name, Component]) => {
    const stripped = name.replace(/^Icon/, '');
    return {
      name,
      display: stripped,
      words: toWords(stripped),
      Component: Component as ComponentType<IconProps>,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const fuse = new Fuse(ALL_ICONS, {
  keys: [
    { name: 'words', weight: 2 },
    { name: 'name', weight: 1 },
  ],
  threshold: 0.34,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

const CELL_WIDTH = 214;
const CELL_HEIGHT = 178;

export function App() {
  const [query, setQuery] = useState('');
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const currentIssue = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
      }).format(new Date()),
    [],
  );

  const heroSymbols = useMemo(
    () =>
      HERO_SYMBOLS.map((symbol, index) => {
        const entry =
          ALL_ICONS.find((icon) => icon.name === symbol.name) ??
          ALL_ICONS[index % ALL_ICONS.length];
        return entry ? { ...symbol, entry } : null;
      }).filter(Boolean) as Array<HeroSymbol & { entry: IconEntry }>,
    [],
  );

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return ALL_ICONS;
    return fuse.search(q).map((r) => r.item);
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const active = document.activeElement;
      const editable =
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      } else if (e.key === '/' && !editable) {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (
        e.key === 'Escape' &&
        editable &&
        active === searchRef.current
      ) {
        setQuery('');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!copiedName) return;
    const id = setTimeout(() => setCopiedName(null), 1500);
    return () => clearTimeout(id);
  }, [copiedName]);

  const onCopy = async (entry: IconEntry) => {
    const snippet = `import { ${entry.name} } from "@bhaumic/zenicons";`;
    try {
      await navigator.clipboard.writeText(snippet);
      setCopiedName(entry.name);
    } catch {
      setCopiedName(null);
    }
  };

  const hasQuery = query.trim().length > 0;
  const liveSummary = copiedName
    ? `Copied ${copiedName}`
    : `${results.length.toLocaleString()} / ${iconCount.toLocaleString()} icons`;

  return (
    <div className='site-shell'>
      <a
        className='skip-link'
        href='#catalogue'
      >
        Skip to icon search
      </a>

      <header className='topbar'>
        <a
          className='brand-lockup'
          href='#top'
          aria-label='Zenicons home'
        >
          <span aria-hidden>Z</span>
          <strong>zenicons</strong>
        </a>
        <nav
          className='nav-links'
          aria-label='Primary'
        >
          <a href='#install'>Install</a>
          <a href='#system'>System</a>
          <a href='#catalogue'>Archive</a>
          <a
            href={REPO_URL}
            target='_blank'
            rel='noreferrer'
          >
            GitHub
          </a>
        </nav>
      </header>

      <main>
        <section
          className='hero-section'
          id='top'
          aria-labelledby='hero-title'
        >
          <div
            className='hero-grain'
            aria-hidden
          />
          <div className='hero-inner'>
            <div className='hero-copy'>
              <p className='eyebrow'>React SVG icon library</p>
              <h1 id='hero-title'>
                <span className='brand-word'>zenicons</span>
                <span className='hero-line'>
                  A calm icon archive for interfaces with taste.
                </span>
              </h1>
              <p className='hero-deck'>
                {iconCount.toLocaleString()} typed, tree-shakeable SVG marks
                that inherit <code>currentColor</code> and stay small at publish
                time.
              </p>
              <div className='hero-actions'>
                <a
                  className='primary-action'
                  href='#catalogue'
                >
                  Browse archive
                </a>
                <a
                  className='secondary-action'
                  href={README_URL}
                  target='_blank'
                  rel='noreferrer'
                >
                  Read docs
                </a>
              </div>
            </div>

            <div
              className='specimen-field'
              aria-label='Selected Zenicons specimen wall'
            >
              <div
                className='field-ruler'
                aria-hidden
              >
                <span>24px grid</span>
                <span>stroke 1.5</span>
              </div>
              {heroSymbols.map(({ entry, label, size, tone }, index) => {
                const Icon = entry.Component;
                return (
                  <span
                    className={`specimen-mark tone-${tone}`}
                    key={entry.name}
                    style={{ animationDelay: `${220 + index * 90}ms` }}
                  >
                    <Icon
                      size={size}
                      aria-hidden
                    />
                    <small>{label}</small>
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className='content-shell catalogue-section'
          id='catalogue'
          aria-labelledby='catalogue-title'
        >
          <div className='catalogue-heading'>
            <div>
              <p className='eyebrow'>Archive</p>
              <h2 id='catalogue-title'>Find the mark. Copy the import.</h2>
            </div>
            <p>
              Press <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd> or <kbd>/</kbd>{' '}
              to search by name, phrase, or fragment.
            </p>
          </div>

          <div className='archive-toolbar'>
            <label className='search-field'>
              <span
                className='search-label'
                aria-hidden
              >
                Search
              </span>
              <svg
                className='search-icon'
                viewBox='0 0 24 24'
                fill='none'
                aria-hidden
              >
                <circle
                  cx='11'
                  cy='11'
                  r='6.5'
                />
                <path d='M16 16L20 20' />
              </svg>
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search icons'
                spellCheck={false}
                autoComplete='off'
                aria-label='Search icons'
              />
            </label>
            <div
              className={`archive-status${copiedName ? ' is-live' : ''}`}
              aria-live='polite'
            >
              {liveSummary}
            </div>
          </div>

          <div className='catalogue-frame'>
            {results.length === 0 ? (
              <div className='empty-state'>
                <p>
                  Nothing matched <code>{query}</code>. Try a shorter word,
                  broader concept, or another fragment.
                </p>
              </div>
            ) : (
              <div className='catalogue-view'>
                <AutoSizer>
                  {({ width, height }) => {
                    const cols = Math.max(2, Math.floor(width / CELL_WIDTH));
                    const columnWidth = Math.floor(width / cols);
                    const rowCount = Math.ceil(results.length / cols);

                    return (
                      <FixedSizeGrid
                        className='catalogue-grid'
                        width={width}
                        height={height}
                        columnCount={cols}
                        columnWidth={columnWidth}
                        rowCount={rowCount}
                        rowHeight={CELL_HEIGHT}
                        itemData={{ items: results, cols, copiedName, onCopy }}
                        overscanRowCount={4}
                      >
                        {CatalogueCell}
                      </FixedSizeGrid>
                    );
                  }}
                </AutoSizer>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer
        className='footer-section'
        id='publish'
      >
        <div className='content-shell footer-layout'>
          <div>
            <strong>
              {hasQuery ? 'Filtered edition' : 'Complete edition'}
            </strong>
            <span>
              {hasQuery
                ? 'Search is narrowing the archive in real time.'
                : `${iconCount.toLocaleString()} icons in the ${currentIssue} demo build.`}
            </span>
          </div>
          <nav aria-label='Documentation'>
            <a
              href={README_URL}
              target='_blank'
              rel='noreferrer'
            >
              README
            </a>
            <a
              href={SECURITY_URL}
              target='_blank'
              rel='noreferrer'
            >
              Security
            </a>
            <a
              href={GUIDE_URL}
              target='_blank'
              rel='noreferrer'
            >
              Publish guide
            </a>
            <a
              href={REPO_URL}
              target='_blank'
              rel='noreferrer'
            >
              GitHub
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

type CellData = {
  items: IconEntry[];
  cols: number;
  copiedName: string | null;
  onCopy: (e: IconEntry) => void;
};

function CatalogueCell({
  columnIndex,
  rowIndex,
  style,
  data,
}: GridChildComponentProps<CellData>) {
  const { items, cols, copiedName, onCopy } = data;
  const idx = rowIndex * cols + columnIndex;
  if (idx >= items.length) return null;
  const entry = items[idx];
  const Icon = entry.Component;
  const isCopied = copiedName === entry.name;

  return (
    <div
      style={style}
      className='catalogue-cell'
    >
      <button
        className={`catalogue-card${isCopied ? ' is-copied' : ''}`}
        title={`Copy: import { ${entry.name} } from "@bhaumic/zenicons"`}
        onClick={() => onCopy(entry)}
        aria-label={`Copy import for ${entry.name}`}
        aria-pressed={isCopied}
      >
        <span className='catalogue-icon'>
          <Icon
            size={32}
            aria-hidden
          />
        </span>
        <span className='catalogue-card-title'>{entry.display}</span>
        <span className='catalogue-card-import'>
          {isCopied ? 'Copied import' : `import { ${entry.name} }`}
        </span>
      </button>
    </div>
  );
}
