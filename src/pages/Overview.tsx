import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Check,
  CheckCircle2,
  Flower2,
  Mail,
  Plus,
  Search,
  Sun,
} from "lucide-react";
import {
  Alert,
  AvatarGroup,
  Badge,
  Brand,
  Button,
  Checkbox,
  Flower,
  Input,
  Switch,
  Tabs,
} from "../components/ui";
import { components, variantCount } from "../lib/catalog";
export function Overview({ notify }: { notify: (text: string) => void }) {
  const [tab, setTab] = useState("Buttons");
  const [checked, setChecked] = useState(true);
  return (
    <>
      <div className="overview-heading">
        <div className="flex items-center gap-2">
          <span className="live-dot" />
          <span className="overline">A COLLECTION OF GOOD DESIGN</span>
        </div>
        <span className="gallery-edition">
          The visual collection <Flower size={13} />
        </span>
      </div>
      <section className="overview-hero">
        <div className="hero-copy">
          <h1>
            A little structure.
            <br />A lot of <em>possibility.</em>
          </h1>
          <p>
            A considered collection of foundations, components, and patterns.
            Everything you need to make something good.
          </p>
          <div className="hero-actions">
            <a
              href="#/components"
              className="f-button button-primary button-md rounded-lg"
            >
              Explore components <ArrowRight size={15} />
            </a>
            <a href="#/branding" className="hero-guide-link">
              Explore the brand <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="hero-meta">
            <span>
              <Blocks size={13} /> {components.length} components
            </span>
            <span>
              <Sun size={14} /> Light & dark
            </span>
            <span>
              <CheckCircle2 size={13} /> Variants & states
            </span>
          </div>
        </div>
        <div className="hero-art" aria-label="A preview of Forma components">
          <span className="art-small-cross cross-one">+</span>
          <span className="art-small-cross cross-two">+</span>
          <span className="hero-orbit" />
          <div className="hero-color-card">
            <span className="overline">NATURALLY CONNECTED</span>
            <div>
              <i />
              <i />
              <i />
              <i />
            </div>
            <span className="mono">A little color goes a long way.</span>
          </div>
          <div className="hero-preview-card">
            <div className="flex items-center justify-between">
              <span className="hero-mini-icon">
                <Flower size={25} />
              </span>
              <Badge tone="success" dot>
                Looking good
              </Badge>
            </div>
            <h3>Make room for good ideas.</h3>
            <p>Your next great thing starts here.</p>
            <div className="flex items-center justify-between mt-5">
              <AvatarGroup />
              <Button
                size="sm"
                onClick={() =>
                  notify("A little possibility, added to your day.")
                }
              >
                <Plus size={14} /> Create
              </Button>
            </div>
          </div>
          <div className="hero-floating-tag">
            <Check size={13} />
            <span>Thoughtfully connected.</span>
          </div>
          <Flower size={80} className="hero-flower" />
        </div>
      </section>
      <div className="system-stats">
        <div>
          <strong>{components.length}</strong>
          <span>Building blocks</span>
        </div>
        <div>
          <strong>
            {variantCount}
            <span>+</span>
          </strong>
          <span>Ways to make it yours</span>
        </div>
        <div>
          <strong>3</strong>
          <span>Considered themes</span>
        </div>
        <div>
          <span className="stats-infinity">∞</span>
          <span>Good possibilities</span>
        </div>
        <a href="#/patterns">
          See the full picture.
          <ArrowUpRight size={15} />
        </a>
      </div>
      <section className="start-section">
        <div className="section-heading-row">
          <div>
            <span className="overline">A GOOD PLACE TO BEGIN</span>
            <h2>Find your foundation.</h2>
          </div>
          <span className="section-aside">
            From the big picture to the smallest detail.
          </span>
        </div>
        <div className="foundation-cards">
          <a className="foundation-card" href="#/branding">
            <div className="foundation-visual branding-visual">
              <div className="brand-ring" />
              <Brand />
              <span className="tiny-star star-one">✳</span>
              <span className="tiny-star star-two">✳</span>
              <span className="visual-caption">CONSIDERED BY NATURE.</span>
            </div>
            <div className="foundation-card-copy">
              <span className="card-index">01</span>
              <div>
                <h3>Meet the brand</h3>
                <p>The feeling behind the system.</p>
              </div>
              <ArrowUpRight size={18} />
            </div>
          </a>
          <a className="foundation-card" href="#/colors">
            <div className="foundation-visual tokens-visual">
              <div className="mini-palette">
                {["#284c3f", "#d9ed92", "#e8ad8d", "#ece8df", "#b8c7b2"].map(
                  (c) => (
                    <span key={c} style={{ background: c }} />
                  ),
                )}
              </div>
              <div className="token-type-row">
                <span>Aa</span>
                <div>
                  <i />
                  <i />
                </div>
                <span className="mono">4 · 8 · 16 · 24</span>
              </div>
            </div>
            <div className="foundation-card-copy">
              <span className="card-index">02</span>
              <div>
                <h3>Explore foundations</h3>
                <p>Small details. A shared rhythm.</p>
              </div>
              <ArrowUpRight size={18} />
            </div>
          </a>
          <a className="foundation-card" href="#/components">
            <div className="foundation-visual components-visual">
              <span className="mini-primary">
                Let’s make it <ArrowRight size={13} />
              </span>
              <span className="mini-switch">
                <i />
              </span>
              <div className="mini-input">
                <Mail size={14} />
                <span>you@something.good</span>
              </div>
              <span className="mini-badge">
                <Check size={11} />
                All set
              </span>
              <span className="mini-checkbox">
                <Check size={12} />
              </span>
              <div className="mini-avatar">A</div>
            </div>
            <div className="foundation-card-copy">
              <span className="card-index">03</span>
              <div>
                <h3>Pick your building blocks</h3>
                <p>Good parts. Better together.</p>
              </div>
              <ArrowUpRight size={18} />
            </div>
          </a>
        </div>
      </section>
      <section className="essentials-section">
        <div className="section-heading-row">
          <div>
            <span className="overline">LITTLE THINGS. BIG DIFFERENCE.</span>
            <h2>A few of the essentials.</h2>
          </div>
          <a className="text-link" href="#/components">
            View all components <ArrowRight size={14} />
          </a>
        </div>
        <div className="overview-playground">
          <div className="playground-toolbar">
            <Tabs
              items={["Buttons", "Inputs", "Selection", "Feedback"]}
              value={tab}
              onChange={setTab}
              label="Essential component previews"
              panelId="essentials-panel"
            />
          </div>
          <div
            className={`overview-demo demo-${tab.toLowerCase()}`}
            role="tabpanel"
            id="essentials-panel"
            aria-label={tab}
            tabIndex={0}
          >
            {tab === "Buttons" ? (
              <>
                {[
                  {
                    name: "Primary",
                    variant: "primary",
                    label: (
                      <>
                        Get started <ArrowRight size={14} />
                      </>
                    ),
                  },
                  {
                    name: "Secondary",
                    variant: "secondary",
                    label: "A little softer",
                  },
                  {
                    name: "Outline",
                    variant: "outline",
                    label: "Keep it simple",
                  },
                  {
                    name: "Ghost",
                    variant: "ghost",
                    label: "Quietly useful",
                  },
                ].map((v) => (
                  <div key={v.name}>
                    <Button
                      variant={v.variant as "primary"}
                      onClick={() =>
                        notify(
                          `${v.name} button. A small step toward something good.`,
                        )
                      }
                    >
                      {v.label}
                    </Button>
                    <span>{v.name}</span>
                  </div>
                ))}
              </>
            ) : tab === "Inputs" ? (
              <>
                <Input
                  label="Email address"
                  type="email"
                  leading={<Mail size={15} />}
                  placeholder="you@example.com"
                />
                <Input
                  label="Find something good"
                  type="search"
                  leading={<Search size={15} />}
                  placeholder="Search the possibilities…"
                  clearable
                />
              </>
            ) : tab === "Selection" ? (
              <>
                <Checkbox label="Count me in" defaultChecked />
                <Switch
                  label="A little more possibility"
                  checked={checked}
                  onChange={setChecked}
                />
                <Badge tone="success" dot>
                  All set
                </Badge>
              </>
            ) : (
              <>
                <Alert title="Looking good." tone="success">
                  Your changes are saved.
                </Alert>
                <Badge tone="success" dot>
                  Published
                </Badge>
              </>
            )}
          </div>
          <div className="playground-caption">
            <span>
              <span className="live-dot" />
              Explore the details. Try the interactions.
            </span>
            <a
              href={`#/components/${tab === "Inputs" ? "input" : tab === "Selection" ? "switch" : tab === "Feedback" ? "alert" : "button"}`}
            >
              See all variants <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>
      <section className="bottom-callout">
        <span className="callout-flower">
          <Flower size={36} />
        </span>
        <div>
          <h3>The little details, all together.</h3>
          <p>
            Explore colors, shapes, and states. Find a design that feels right.
          </p>
        </div>
        <a className="text-link" href="#/components">
          Browse the collection <ArrowRight size={15} />
        </a>
      </section>
    </>
  );
}
