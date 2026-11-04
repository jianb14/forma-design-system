import { useState } from "react";
import { ArrowRight, ArrowUpRight, RotateCcw, Search } from "lucide-react";
import { Button, Input } from "hulmio-ui";
import { ComponentCover, VisualPreview } from "../components/VisualPreview";
import { ButtonDesignExample, ExamplePreview, LibraryExample } from "../components/LibraryExamples";
import { categories, components, newComponentIds } from "../lib/catalog";
import type { ComponentEntry } from "../lib/catalog";
import { buttonDesigns, libraryFamilies } from "../lib/distribution";
import { PageIntro, SectionTitle } from "./Foundations";

export function ComponentCatalog({ route }: { route: string }) {
  const category = new URLSearchParams(route.split("?")[1]).get("category") || "All";
  const [query, setQuery] = useState("");
  const filtered = components.filter(component => {
    const family = libraryFamilies[component.id];
    return (category === "All" || component.category === category) &&
      `${component.name} ${component.description} ${component.variants.join(" ")} ${family?.exports.join(" ")} ${family?.designs.map(d => d.name).join(" ")}`.toLowerCase().includes(query.toLowerCase());
  });
  return <div className="library-page">
    <PageIntro title={category === "All" ? "Components" : category} description="Ready-to-use React components. Preview, copy, and make them yours." />
    <div className="catalog-search">
      <Input type="search" aria-label="Search components" placeholder="Search components or named imports…" value={query} onChange={event => setQuery(event.target.value)} leading={<Search size={18} />} clearable />
      <span role="status" aria-live="polite">{filtered.length} component{filtered.length === 1 ? "" : "s"}</span>
    </div>
    <nav className="category-filters" aria-label="Component categories">{["All", ...categories].map(value => <a key={value} href={`#/components${value === "All" ? "" : `?category=${encodeURIComponent(value)}`}`} className={category === value ? "active" : ""} aria-current={category === value ? "page" : undefined}>{value}<span>{value === "All" ? components.length : components.filter(component => component.category === value).length}</span></a>)}</nav>
    {filtered.length ? <div className="component-grid">{filtered.map(component => {
      const family = libraryFamilies[component.id];
      return <article className="component-catalog-card library-catalog-card" key={component.id}>
        {newComponentIds.has(component.id) || ["button", "select"].includes(component.id) ? <div className="library-catalog-live" inert aria-hidden="true"><LibraryExample id={component.id} design={family?.designs[0]} /></div> : <ComponentCover id={component.id} category={component.category} />}
        <a className="catalog-card-info library-catalog-link" href={`#/components/${component.id}`}>
          <div><h3>{component.name}</h3><ArrowUpRight size={17} aria-hidden="true" /></div>
          <p>{component.description}</p>
        </a>
      </article>;
    })}</div> : <div className="empty-state catalog-empty"><Search size={32} /><h2>No components found.</h2><p>Try a component name, category or named export.</p><Button variant="outline" onClick={() => setQuery("")}>Clear search</Button></div>}
  </div>;
}

const wideComponents = new Set(["table", "simple-table", "kanban", "form", "layout", "chart", "navbar", "toolbar"]);
const mediumComponents = new Set(["input", "input-group", "item", "textarea", "card", "upload", "calendar", "accordion", "dialog", "drawer", "popover", "command", "timeline", "carousel", "empty-state", "multi-select", "tag-input", "color-picker"]);

function ComponentDetail({ entry, onCommand }: { entry: ComponentEntry; onCommand: () => void }) {
  const [reset, setReset] = useState(0);
  const [referencesOpen, setReferencesOpen] = useState(false);
  const family = libraryFamilies[entry.id];
  const width = wideComponents.has(entry.id) ? "wide" : mediumComponents.has(entry.id) ? "medium" : "compact";
  return <div className={`library-page library-component-${entry.id}`}>
    <PageIntro title={entry.name} description={entry.description} />
    <div className="library-page-tools"><a href="#/using-hulmio">Installation <ArrowUpRight size={14} /></a><button className="library-reset" type="button" onClick={() => setReset(value => value + 1)} aria-label="Reset examples"><RotateCcw size={14} />Reset</button></div>
    <div key={reset} className={`library-design-grid ${entry.id === "button" ? "library-button-grid" : ""} ${wideComponents.has(entry.id) ? "library-design-grid-wide" : ""}`}>
      {entry.id === "button" ? buttonDesigns.map(design => <ButtonDesignExample key={design.exportName} design={design} />) : family.designs.map(design => <article className="library-design" key={`${design.exportName}-${design.name}`} data-library-design={design.exportName}>
        {family.designs.length > 1 && <header><h2>{design.name}</h2></header>}
        <ExamplePreview code={design.code} label={design.name}>
          <div className={`library-live-example library-live-${entry.id}`}><LibraryExample id={entry.id} design={design} /></div>
        </ExamplePreview>
      </article>)}
    </div>
    <details className="library-api"><summary>Usage & API</summary>
    <div className="library-export-list"><span>Imports</span><div>{family.exports.map(name => <code key={name}>{name}</code>)}</div></div>
    <p className="library-usage-note">{entry.notes}</p>
    {family.limit && <p className="library-usage-note">{family.limit}</p>}
    </details>
    {!newComponentIds.has(entry.id) && <details className="library-references" onToggle={event => setReferencesOpen(event.currentTarget.open)}>
      <summary><span>Reference compositions</span><span>{entry.variants.length} examples</span></summary>
      <p>Additional compositions for inspiration. Use the code above for the reusable component API.</p>
      {referencesOpen && <div className={`variant-gallery variant-gallery-${width}`} key={`references-${reset}`}>{entry.variants.map((variant, index) => <article className={`specimen-card specimen-${entry.id}`} key={variant} data-variant={variant} data-component={entry.id} aria-labelledby={`reference-${entry.id}-${index}`}><div className="specimen-preview"><VisualPreview id={entry.id} variant={variant} size="md" shape="rounded" onCommand={onCommand} /></div><div className="specimen-caption"><h3 id={`reference-${entry.id}-${index}`}>{variant}</h3></div></article>)}</div>}
    </details>}
    <SectionTitle label="Related components" />
    <div className="related-components">{components.filter(component => component.category === entry.category && component.id !== entry.id).slice(0, 3).map(component => <a href={`#/components/${component.id}`} key={component.id}><span>{component.name}</span><ArrowRight size={16} /></a>)}</div>
  </div>;
}

export function ComponentPage(props: { entry: ComponentEntry; onCommand: () => void }) {
  return <ComponentDetail key={props.entry.id} {...props} />;
}
