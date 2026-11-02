import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Sun,
  Moon,
  Monitor,
  Contrast,
  Menu,
  X,
  Home,
  Palette,
  Type,
  Grid2X2,
  Sparkles,
  Blocks,
  MousePointer2,
  TextCursorInput,
  Compass,
  MessageSquare,
  Table2,
  LayoutTemplate,
  Check,
  SlidersHorizontal,
  Copy,
  Flower2,
  Layers,
  Component,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Brand, Flower, Modal, Tooltip, cn } from "./components/ui";
import { components, navGroups } from "./lib/catalog";
import {
  BrandingPage,
  ColorPage,
  EffectsPage,
  SpacingPage,
  TypographyPage,
} from "./pages/Foundations";
import { PatternsPage } from "./pages/Patterns";
import { Overview } from "./pages/Overview";
import { ComponentCatalog, ComponentPage } from "./pages/ComponentGallery";
const icons: Record<string, LucideIcon> = {
  home: Home,
  flower: Flower2,
  palette: Palette,
  type: Type,
  grid: Grid2X2,
  sparkles: Sparkles,
  blocks: Blocks,
  pointer: MousePointer2,
  input: TextCursorInput,
  compass: Compass,
  message: MessageSquare,
  table: Table2,
  layout: LayoutTemplate,
  selection: SlidersHorizontal,
  overlays: Copy,
  layers: Layers,
};
type Theme = "light" | "dark" | "system" | "contrast";
function useRoute() {
  const [route, setRoute] = useState(
    window.location.hash.slice(2) || "overview",
  );
  useEffect(() => {
    const handler = () => setRoute(window.location.hash.slice(2) || "overview");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return route;
}
export default function App() {
  const route = useRoute();
  const base = route.split("?")[0];
  const [mobile, setMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 900px)").matches,
  );
  const sidebarRef = useRef<HTMLElement>(null);
  const [command, setCommand] = useState(false);
  const [toast, setToast] = useState("");
  const [themeOpen, setThemeOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("forma-theme");
    return ["light", "dark", "system", "contrast"].includes(stored || "")
      ? (stored as Theme)
      : "light";
  });
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const themeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const update = () => {
      setIsMobile(media.matches);
      if (!media.matches) setMobile(false);
    };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!mobile || !isMobile) return;
    const previousFocus = document.activeElement as HTMLElement;
    const sidebar = sidebarRef.current;
    const focusable = () =>
      Array.from(
        sidebar?.querySelectorAll<HTMLElement>(
          "a[href], button:not(:disabled), input:not(:disabled)",
        ) || [],
      ).filter((el) => el.getClientRects().length > 0);
    focusable()[0]?.focus();
    const trap = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const elements = focusable();
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    sidebar?.addEventListener("keydown", trap);
    return () => {
      sidebar?.removeEventListener("keydown", trap);
      previousFocus?.focus();
    };
  }, [mobile, isMobile]);
  const notify = useCallback((text: string) => {
    setToast(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 4200);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () =>
      document.documentElement.setAttribute(
        "data-theme",
        theme === "system" ? (media.matches ? "dark" : "light") : theme,
      );
    apply();
    localStorage.setItem("forma-theme", theme);
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommand((v) => !v);
      }
      if (e.key === "Escape") {
        setThemeOpen(false);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!themeRef.current?.contains(e.target as Node)) setThemeOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  useEffect(() => {
    setMobile(false);
    document.getElementById("main")?.scrollTo(0, 0);
    window.scrollTo(0, 0);
    const title =
      components.find((c) => base === `components/${c.id}`)?.name ||
      navGroups.flatMap((g) => g.links).find((link) => link.id === route)
        ?.label ||
      navGroups.flatMap((g) => g.links).find((link) => link.id === base)
        ?.label ||
      "Forma";
    document.title = `${title} — Forma Design Gallery`;
  }, [route, base]);
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);
  const pageName =
    components.find((c) => base === `components/${c.id}`)?.name ||
    navGroups.flatMap((g) => g.links).find((l) => l.id === route)?.label ||
    navGroups.flatMap((g) => g.links).find((l) => l.id === base)?.label ||
    "Overview";
  const ThemeIcon =
    theme === "dark"
      ? Moon
      : theme === "contrast"
        ? Contrast
        : theme === "system"
          ? Monitor
          : Sun;
  let page;
  if (base === "overview") page = <Overview notify={notify} />;
  else if (base === "branding") page = <BrandingPage notify={notify} />;
  else if (base === "colors") page = <ColorPage notify={notify} />;
  else if (base === "typography") page = <TypographyPage />;
  else if (base === "spacing") page = <SpacingPage />;
  else if (base === "effects") page = <EffectsPage />;
  else if (base === "components") page = <ComponentCatalog route={route} />;
  else if (base.startsWith("components/")) {
    const entry = components.find((c) => c.id === base.split("/")[1]);
    page = entry ? (
      <ComponentPage
        key={entry.id}
        entry={entry}
        notify={notify}
        onCommand={() => setCommand(true)}
      />
    ) : (
      <NotFound />
    );
  } else if (base === "patterns") page = <PatternsPage notify={notify} />;
  else page = <NotFound />;
  return (
    <div className="app-shell">
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        Skip to content
      </a>
      {mobile && (
        <button
          className="mobile-backdrop"
          onClick={() => setMobile(false)}
          aria-label="Close navigation"
        />
      )}
      <aside
        ref={sidebarRef}
        inert={isMobile && !mobile}
        role={isMobile ? "dialog" : undefined}
        aria-modal={isMobile && mobile ? true : undefined}
        className={cn("sidebar", mobile && "sidebar-open")}
        aria-label="Main navigation"
      >
        <div className="sidebar-brand">
          <a href="#/overview" aria-label="Forma home">
            <Brand />
          </a>
          <span className="version-badge">Gallery</span>
          <button
            className="mobile-close"
            onClick={() => setMobile(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>
        <button
          className="sidebar-search"
          onClick={() => {
            setMobile(false);
            setCommand(true);
          }}
        >
          <Search size={15} />
          <span>Find something…</span>
          <kbd>⌘ K</kbd>
        </button>
        <nav className="sidebar-nav">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <p>{group.label}</p>
              {group.links.map((link) => {
                const Icon = icons[link.icon];
                const active =
                  link.id === route ||
                  (link.id === "components" && base.startsWith("components/"));
                return (
                  <a
                    key={link.id}
                    href={`#/${link.id}`}
                    className={cn("nav-link", active && "nav-link-active")}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon size={16} strokeWidth={1.6} />
                    <span>{link.label}</span>
                    {link.id === "components" ? (
                      <span className="nav-count">{components.length}</span>
                    ) : (
                      active && <span className="nav-active-dot" />
                    )}
                  </a>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div>
            <Flower size={24} />
            <span>
              Made to be
              <br />
              <strong>made yours.</strong>
            </span>
            <a href="#/components" aria-label="Explore the design collection">
              <ArrowUpRight size={19} />
            </a>
          </div>
          <p>A little structure. A lot of possibility.</p>
        </div>
      </aside>
      <div className="app-body" inert={isMobile && mobile}>
        <header className="topbar">
          <div className="flex items-center gap-3">
            <button
              className="mobile-menu"
              aria-label="Open navigation"
              onClick={() => setMobile(true)}
            >
              <Menu size={20} />
            </button>
            <span className="topbar-system">Design gallery</span>
            <span className="topbar-divider">/</span>
            <span className="topbar-page">{pageName}</span>
          </div>
          <div className="topbar-actions">
            <span className="gallery-mode">
              <span className="live-dot" />
              Visual gallery
            </span>{" "}
            <div className="theme-control" ref={themeRef}>
              <Tooltip content="Choose your theme">
                <button
                  className="icon-control"
                  aria-label="Choose theme"
                  aria-haspopup="menu"
                  aria-expanded={themeOpen}
                  onClick={() => setThemeOpen(!themeOpen)}
                >
                  <ThemeIcon size={18} strokeWidth={1.6} />
                </button>
              </Tooltip>
              {themeOpen && (
                <div
                  className="theme-menu"
                  role="menu"
                  aria-label="Choose theme"
                  onKeyDown={(e) => {
                    const items = Array.from(
                      e.currentTarget.querySelectorAll("button"),
                    );
                    const index = items.indexOf(
                      document.activeElement as HTMLButtonElement,
                    );
                    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                      e.preventDefault();
                      items[
                        (index +
                          (e.key === "ArrowDown" ? 1 : -1) +
                          items.length) %
                          items.length
                      ]?.focus();
                    }
                  }}
                >
                  {(
                    [
                      { value: "light", label: "Light", icon: Sun },
                      { value: "dark", label: "Dark", icon: Moon },
                      { value: "system", label: "System", icon: Monitor },
                      {
                        value: "contrast",
                        label: "High contrast",
                        icon: Contrast,
                      },
                    ] as const
                  ).map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      role="menuitemradio"
                      aria-checked={theme === value}
                      onClick={() => {
                        setTheme(value);
                        setThemeOpen(false);
                      }}
                    >
                      <Icon size={15} />
                      {label}
                      {theme === value && (
                        <Check size={14} className="ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>
        <main id="main" tabIndex={-1}>
          <div className="page-content" key={base}>
            {page}
            <footer className="page-footer">
              <a href="#/overview">
                <Flower size={18} />
                Thoughtfully connected.
              </a>
              <span>
                Forma <span className="mx-2">·</span> Design collection
              </span>
            </footer>
          </div>
        </main>
      </div>
      <Modal
        title="Find your next building block."
        description="Find a component, a color palette, or a little inspiration."
        open={command}
        onOpenChange={setCommand}
      >
        <CommandSearch onSelect={() => setCommand(false)} />
      </Modal>
      <div
        className="toast-region"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {toast && (
          <div className="toast">
            <span>
              <Check size={15} />
            </span>
            <p>{toast}</p>
            <button
              aria-label="Dismiss notification"
              onClick={() => setToast("")}
            >
              <X size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
function CommandSearch({ onSelect }: { onSelect: () => void }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const all = useMemo(
    () => [
      ...navGroups
        .flatMap((g) => g.links)
        .filter((l) => !l.id.includes("?"))
        .map((l) => ({ name: l.label, href: l.id, category: "Page" })),
      ...components.map((c) => ({
        name: c.name,
        href: `components/${c.id}`,
        category: c.category,
      })),
    ],
    [],
  );
  const results = all
    .filter((i) =>
      `${i.name} ${i.category}`.toLowerCase().includes(query.toLowerCase()),
    )
    .slice(0, 8);
  const searchId = useRef(
    `search-${Math.random().toString(36).slice(2)}`,
  ).current;
  return (
    <div className="command-search">
      <div className="command-input">
        <Search size={19} />
        <input
          role="combobox"
          aria-label="Search the design gallery"
          aria-expanded="true"
          aria-controls={`${searchId}-results`}
          aria-activedescendant={
            results.length
              ? `${searchId}-${Math.min(index, results.length - 1)}`
              : undefined
          }
          placeholder="Components, foundations, a little inspiration…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIndex(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setIndex(results.length ? (index + 1) % results.length : 0);
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setIndex(
                results.length
                  ? (index - 1 + results.length) % results.length
                  : 0,
              );
            }
            if (e.key === "Enter" && results[index]) {
              window.location.hash = `/${results[index].href}`;
              onSelect();
            }
          }}
          autoFocus
        />
      </div>
      <div
        className="command-results"
        role="listbox"
        id={`${searchId}-results`}
      >
        {results.map((r, i) => (
          <a
            role="option"
            aria-selected={i === index}
            id={`${searchId}-${i}`}
            className={i === index ? "selected" : ""}
            href={`#/${r.href}`}
            key={r.href}
            onMouseEnter={() => setIndex(i)}
            onClick={onSelect}
          >
            <span className="command-result-icon">
              {r.category === "Page" ? (
                <Grid2X2 size={16} />
              ) : (
                <Component size={16} />
              )}
            </span>
            <span>
              {r.name}
              <small>{r.category}</small>
            </span>
            <ArrowUpRight size={14} />
          </a>
        ))}
        {!results.length && (
          <div className="command-empty">
            <Search size={26} />
            <p>No matches just yet.</p>
            <span>Try “button”, “colors”, or “forms”.</span>
          </div>
        )}
      </div>
      <div className="command-footer">
        <span>
          <kbd>↑</kbd>
          <kbd>↓</kbd> to navigate
        </span>
        <span>
          <kbd>↵</kbd> to open
        </span>
        <span>
          <kbd>esc</kbd> to close
        </span>
      </div>
    </div>
  );
}
function NotFound() {
  return (
    <div className="empty-state py-24">
      <Flower size={70} />
      <h1>A little off the beaten path.</h1>
      <p>Let’s find you a familiar place.</p>
      <a
        href="#/overview"
        className="f-button button-primary button-md rounded-lg"
      >
        Back to overview <ArrowRight size={15} />
      </a>
    </div>
  );
}
