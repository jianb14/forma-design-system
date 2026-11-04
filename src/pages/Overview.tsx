import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Copy, Layers, Plus, Sparkles } from "lucide-react";
import { PillButton, BrutalistButton, GlassButton, SoftButton, Input, Checkbox, Switch, SoftCard, Badge, Progress, PillTabs, Select } from "hulmio-ui";
import type { Variant } from "hulmio-ui";
import { BrandMark } from "../components/ui";
import { components } from "../lib/catalog";
import { localPackage } from "../lib/distribution";

const buttonDesigns = { PillButton, BrutalistButton, GlassButton };
type HeroDesign = keyof typeof buttonDesigns;

export function Overview() {
  const [design, setDesign] = useState<HeroDesign>("PillButton");
  const [variant, setVariant] = useState<Variant>("primary");
  const [enabled, setEnabled] = useState(true);
  const [checked, setChecked] = useState(true);
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("All");
  const [copiedExample, setCopiedExample] = useState("");
  const [copyFailed, setCopyFailed] = useState(false);
  const DesignButton = buttonDesigns[design];
  const example = `import { ${design} } from "hulmio-ui";\nimport "hulmio-ui/styles.css";\n\n<${design} variant="${variant}">\n  Make something good\n</${design}>`;
  const copy = async () => {
    try { await navigator.clipboard.writeText(example); setCopiedExample(example); setCopyFailed(false); }
    catch { setCopyFailed(true); }
  };
  const cards = [
    { category: "Actions", id: "button", name: "Buttons, with personality.", text: "One action. Eight different ways to say it.", content: <div className="home-button-cluster"><PillButton size="sm">Get started <ArrowUpRight size={15} /></PillButton><BrutalistButton size="sm" variant="secondary">Make it bold</BrutalistButton><SoftButton size="sm"><Plus size={16} /> Add new</SoftButton></div> },
    { category: "Forms", id: "input", name: "A good place to begin.", text: "Real labels, helpful states, considered details.", content: <div className="home-form-preview"><Input label="Your email" type="email" placeholder="you@something.good" value={email} onChange={event => setEmail(event.target.value)} clearable /></div> },
    { category: "Selection", id: "switch", name: "Small choices. Clear answers.", text: "Controls that work the way people expect.", content: <div className="home-selection-preview"><Switch label="A little possibility" checked={enabled} onCheckedChange={setEnabled} /><Checkbox label="Keep the good things" checked={checked} onChange={event => setChecked(event.target.checked)} /></div> },
    { category: "Display", id: "card", name: "Make room for your content.", text: "Different surfaces. A shared design language.", content: <div className="home-card-preview"><SoftCard title="Something good is taking shape." description="A reusable card, ready for your own story."><Badge tone="success" dot>In the making</Badge></SoftCard></div> },
    { category: "Navigation", id: "tabs", name: "A little change of perspective.", text: "Keyboard-friendly navigation, built right in.", content: <div className="home-tabs-preview"><PillTabs label="Preview perspective" defaultValue="design" items={[{ value: "design", label: "Design", content: <p>A good interface makes space for the work.</p> }, { value: "code", label: "Code", content: <code>import {"{ PillTabs }"} from "hulmio-ui";</code> }]} /></div> },
    { category: "Feedback", id: "progress", name: "Every step, thoughtfully shown.", text: "Keep people informed, from start to done.", content: <div className="home-progress-preview"><span><Badge tone="success">Looking good</Badge><Badge tone="info" outline>In progress</Badge></span><Progress value={72} label="Your next good thing" /></div> },
  ];
  const shown = cards.filter(card => category === "All" || card.category === category);

  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <h1 id="home-title">Good interfaces.<br /><em>Great little pieces.</em></h1>
          <p>A collection of considered React components. Pick a design, choose your variant, and make something that feels like you.</p>
          <div className="home-hero-actions"><a className="home-primary-link" href="#/components">Explore the components <ArrowRight size={18} /></a><a className="home-text-link" href="#/using-hulmio">Start building <ArrowUpRight size={16} /></a></div>
          <div className="home-facts"><span><Layers size={15} /> {components.length} component families</span><span><Check size={15} /> Named React imports</span><span>Light, dark & contrast</span></div>
        </div>
        <div className="home-workbench" data-ui="true" aria-label="Try a named button design">
          <div className="home-workbench-top"><span>Button preview</span><Sparkles size={17} /></div>
          <div className={`home-workbench-stage home-stage-${design}`}><DesignButton size="lg" variant={variant}>Make something good <ArrowUpRight size={19} /></DesignButton></div>
          <div className="home-workbench-controls"><Select label="Design" aria-label="Button design" value={design} onValueChange={value => setDesign(value as HeroDesign)} options={Object.keys(buttonDesigns).map(value => ({ value, label: value }))} /><Select label="Variant" aria-label="Button variant" value={variant} onValueChange={value => setVariant(value as Variant)} options={["primary", "secondary", "outline", "destructive"].map(value => ({ value, label: value[0].toUpperCase() + value.slice(1) }))} /></div>
          <div className="home-code-heading"><span>React / TypeScript</span><button onClick={() => void copy()} aria-label="Copy named component example">{copiedExample === example ? <Check size={14} /> : <Copy size={14} />}<span aria-live="polite">{copiedExample === example ? "Copied" : "Copy"}</span></button></div>
          {copyFailed && <p className="home-copy-help" role="status">Select the code below to copy it.</p>}
          <pre className="home-code"><code>{example}</code></pre>
          <a className="home-workbench-more" href="#/components/button">Meet all eight button designs <ArrowRight size={15} /></a>
        </div>
      </section>
      <div className="home-section-divider"><span>Build with Hulmio</span><a href="#home-collection" onClick={event => { event.preventDefault(); document.getElementById("home-collection")?.scrollIntoView({ behavior: "smooth" }); }}>Explore the collection <ArrowDown size={15} /></a></div>
      <section className="home-collection" id="home-collection" aria-labelledby="home-collection-title">
        <div className="home-section-heading"><h2 id="home-collection-title">A few good places to start.</h2><a className="home-text-link" href="#/components">Browse all {components.length} families <ArrowUpRight size={17} /></a></div>
        <div className="home-filter" role="group" aria-label="Preview categories">{["All", "Actions", "Forms", "Selection", "Display", "Navigation", "Feedback"].map(name => <button key={name} aria-pressed={category === name} onClick={() => setCategory(name)}>{name}</button>)}</div>
        <div className="home-component-grid">{shown.map(card => <article className="home-component-card" key={card.id}><div className={`home-component-preview home-preview-${card.id}`} data-ui="true">{card.content}</div><div className="home-component-info"><h3><a href={`#/components/${card.id}`}>{card.name}<ArrowUpRight size={17} /></a></h3><p>{card.text}</p></div></article>)}</div>
      </section>
      <section className="home-process" aria-labelledby="home-process-title"><div className="home-section-heading"><h2 id="home-process-title">Find it. Import it. Make it yours.</h2><p>A clear path from the first preview to your next React app.</p></div><div className="home-process-grid">{[
        ["01", "Pick your piece.", "Browse by component, then choose the design that fits. Every design has a name and a working preview."],
        ["02", "Bring it into your app.", `Build the local ${localPackage.filename} package. Import the named components and one stylesheet.`],
        ["03", "Put your ideas into it.", "Choose your variants, set your theme, add your content. The components take care of the little details."],
      ].map(([number, title, description]) => <article key={number}><h3>{title}</h3><p>{description}</p></article>)}</div></section>
      <section className="home-closing"><BrandMark size={66} /><h2>Your next good thing starts here.</h2><a className="home-primary-link" href="#/components">Find your building blocks <ArrowUpRight size={18} /></a></section>
    </div>
  );
}
