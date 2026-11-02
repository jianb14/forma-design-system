import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Circle,
  Search,
} from "lucide-react";
import { Button, Input } from "../components/ui";
import type { Size } from "../components/ui";
import { ComponentCover, VisualPreview } from "../components/VisualPreview";
import { categories, components } from "../lib/catalog";
import type { ComponentEntry } from "../lib/catalog";
import { PageIntro, SectionTitle } from "./Foundations";

export function ComponentCatalog({ route }: { route: string }) {
  const category =
    new URLSearchParams(route.split("?")[1]).get("category") || "All";
  const [query, setQuery] = useState("");
  const filtered = components.filter(
    (c) =>
      (category === "All" || c.category === category) &&
      `${c.name} ${c.description} ${c.variants.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <PageIntro
        eyebrow={
          category === "All"
            ? "THE COMPONENT COLLECTION"
            : `THE COMPONENT COLLECTION / ${category.toUpperCase()}`
        }
        title={
          category === "All" ? "Good parts. Better together." : `${category}.`
        }
        description={
          category === "All"
            ? "Explore the shapes, details, and little moments that bring a design together."
            : category === "Actions"
              ? "Every next step, in every shape. Browse buttons and the ways they work together."
              : `A closer look at ${category.toLowerCase()} components, with their visual variants and states.`
        }
      />
      <div className="catalog-search">
        <Input
          type="search"
          aria-label="Search components"
          placeholder="Find a component…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leading={<Search size={17} />}
          clearable
        />
        <span>
          {filtered.length} component{filtered.length === 1 ? "" : "s"}
        </span>
      </div>
      <nav className="category-filters" aria-label="Component categories">
        {["All", ...categories].map((c) => (
          <a
            key={c}
            href={`#/components${c === "All" ? "" : `?category=${c}`}`}
            className={category === c ? "active" : ""}
            aria-current={category === c ? "page" : undefined}
          >
            {c}
            <span>
              {c === "All"
                ? components.length
                : components.filter((i) => i.category === c).length}
            </span>
          </a>
        ))}
      </nav>
      {filtered.length ? (
        <div className="component-grid">
          {filtered.map((c) => (
            <a
              className="component-catalog-card"
              href={`#/components/${c.id}`}
              key={c.id}
            >
              <ComponentCover id={c.id} category={c.category} />
              <div className="catalog-card-info">
                <div>
                  <h3>{c.name}</h3>
                  <ArrowUpRight size={16} />
                </div>
                <p>{c.description}</p>
                <span>
                  {c.category}
                  <i />
                  {c.variants.length} variants
                </span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="empty-state catalog-empty">
          <Search size={32} />
          <h3>No components found.</h3>
          <p>Try another name or category.</p>
          <Button variant="outline" onClick={() => setQuery("")}>
            Clear search
          </Button>
        </div>
      )}
    </>
  );
}

const wideComponents = new Set(["table", "kanban", "form", "layout", "chart"]);
const mediumComponents = new Set([
  "input",
  "textarea",
  "card",
  "upload",
  "calendar",
  "accordion",
  "dialog",
  "drawer",
  "popover",
  "command",
  "timeline",
  "carousel",
  "empty-state",
  "multi-select",
  "tag-input",
  "color-picker",
]);

export function ComponentPage({
  entry,
  notify,
  onCommand,
}: {
  entry: ComponentEntry;
  notify: (text: string) => void;
  onCommand: () => void;
}) {
  const [size, setSize] = useState<Size>("md");
  const [shape, setShape] = useState<"rounded" | "pill" | "square">("rounded");
  const buttonLike = entry.id === "button" || entry.id === "icon-button";
  const width = wideComponents.has(entry.id)
    ? "wide"
    : mediumComponents.has(entry.id)
      ? "medium"
      : "compact";
  const [reset, setReset] = useState(0);
  return (
    <>
      <a href={`#/components?category=${entry.category}`} className="back-link">
        <ArrowLeft size={14} />
        {entry.category} components
      </a>
      <PageIntro
        eyebrow={`${entry.category.toUpperCase()} / VISUAL COLLECTION`}
        title={`${entry.name}.`}
        description={entry.description}
      >
        <span className="gallery-count">
          <span className="live-dot" />
          {entry.variants.length} variants
        </span>
      </PageIntro>
      <div className="specimen-toolbar">
        <span>Explore every variation</span>
        <button onClick={() => setReset((v) => v + 1)}>
          Reset previews <ArrowRight size={13} />
        </button>
      </div>
      <div className={`variant-gallery variant-gallery-${width}`} key={reset}>
        {entry.variants.map((variant, i) => (
          <article
            className={`specimen-card specimen-${entry.id}`}
            key={variant}
            data-variant={variant}
            data-component={entry.id}
            aria-labelledby={`variant-title-${i}`}
          >
            <div className="specimen-preview">
              <VisualPreview
                id={entry.id}
                variant={variant}
                size={size}
                shape={shape}
                notify={notify}
                onCommand={onCommand}
              />
            </div>
            <div className="specimen-caption">
              <h2 id={`variant-title-${i}`}>{variant}</h2>
              <span>{String(i + 1).padStart(2, "0")}</span>
            </div>
          </article>
        ))}
      </div>
      {buttonLike && (
        <>
          <SectionTitle label="Every little interaction" />
          <div className="interaction-states">
            {[
              "Default",
              "Hover",
              "Focus",
              "Pressed",
              "Disabled",
              "Loading",
            ].map((state) => (
              <div key={state}>
                <Button
                  className={`state-${state.toLowerCase()}`}
                  disabled={state === "Disabled"}
                  loading={state === "Loading"}
                  onClick={() => notify(`${state} button preview.`)}
                >
                  Get started <ArrowRight size={14} />
                </Button>
                <span>{state}</span>
              </div>
            ))}
          </div>
          <SectionTitle label="A size for every moment" />
          <div className="size-comparison">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
              <div key={s}>
                <Button size={s} onClick={() => setSize(s)}>
                  Get started
                  <ArrowRight size={14} />
                </Button>
                <span>{s.toUpperCase()}</span>
              </div>
            ))}
          </div>
          <SectionTitle label="A different shape. The same feeling." />
          <div className="size-comparison shape-comparison">
            {(["square", "rounded", "pill"] as const).map((s) => (
              <div key={s}>
                <Button shape={s} onClick={() => setShape(s)}>
                  Something good <ArrowRight size={14} />
                </Button>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </>
      )}
      <SectionTitle label="More in this collection" />
      <div className="related-components">
        {components
          .filter((c) => c.category === entry.category && c.id !== entry.id)
          .slice(0, 3)
          .map((c) => (
            <a href={`#/components/${c.id}`} key={c.id}>
              <span>{c.name}</span>
              <ArrowUpRight size={16} />
            </a>
          ))}
      </div>
    </>
  );
}
