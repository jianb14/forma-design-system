import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Copy,
  Download,
  MoveUpRight,
  Sun,
  Moon,
  Contrast,
  CheckCircle2,
  XCircle,
  Maximize,
  MousePointer2,
  Sparkles,
} from "lucide-react";
import { Alert, Badge, Brand, Button, Flower, Tabs } from "../components/ui";
import { downloadFile, logoSvg, palettes, tokens } from "../lib/tokens";
export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="page-intro">
      <span className="overline">{eyebrow}</span>
      <div className="page-title-row">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
export function SectionTitle({
  label,
  note,
}: {
  label: string;
  note?: string;
}) {
  return (
    <div className="section-title">
      <h2>{label}</h2>
      {note && <span>{note}</span>}
    </div>
  );
}
export function ColorPage({ notify }: { notify: (t: string) => void }) {
  const [active, setActive] = useState("Brand");
  const copy = async (v: string) => {
    try {
      await navigator.clipboard.writeText(v);
      notify(`${v} copied to clipboard`);
    } catch {
      notify("Clipboard unavailable. Select the hex value to copy.");
    }
  };
  const groups =
    active === "Brand"
      ? [
          {
            name: "The green family",
            description: "Grounded, optimistic, and a little unexpected.",
            values: palettes,
          },
          {
            name: "A little warmth",
            description: "Our accent adds a human touch.",
            values: [
              ["Peach", "#e8ad8d"],
              ["Sand", "#e9dfca"],
              ["Lilac", "#d6cfe4"],
              ["Sky", "#cadde8"],
            ],
          },
        ]
      : active === "Neutrals"
        ? [
            {
              name: "Room to breathe",
              description: "Warm neutrals create a quiet, useful canvas.",
              values: Object.entries(tokens.color.neutral),
            },
          ]
        : active === "Semantic"
          ? [
              {
                name: "Color with meaning",
                description: "Always pair color with an icon or a text label.",
                values: [
                  ["Success", tokens.color.success],
                  ["Warning", tokens.color.warning],
                  ["Danger", tokens.color.danger],
                  ["Information", tokens.color.info],
                ],
              },
            ]
          : Object.entries(tokens.semantic).map(([name, values]) => ({
              name: `${name[0].toUpperCase() + name.slice(1)} theme`,
              description: "The same palette, with a different feeling.",
              values: Object.entries(values),
            }));
  return (
    <>
      <PageIntro
        eyebrow="FOUNDATIONS / 01"
        title="A considered palette."
        description="A grounded green. A little warmth. Plenty of room for your ideas."
      />
      <Tabs
        items={["Brand", "Neutrals", "Semantic", "Themes"]}
        value={active}
        onChange={setActive}
        label="Color categories"
        panelId="colors-panel"
      />
      <div
        className="space-y-10 mt-8"
        role="tabpanel"
        id="colors-panel"
        aria-label={active}
        tabIndex={0}
      >
        {groups.map((group) => (
          <section key={group.name}>
            <SectionTitle label={group.name} note={group.description} />
            <div
              className={`palette-grid ${group.values.length < 6 ? "palette-grid-short" : ""}`}
            >
              {group.values.map(([name, value]) => (
                <button
                  className="color-swatch"
                  key={name}
                  onClick={() => copy(value)}
                  aria-label={`Copy ${name}: ${value}`}
                >
                  <span style={{ background: value }}>
                    <Copy
                      size={15}
                      style={{
                        color: [
                          "#284c3f",
                          "#1e392f",
                          "#354e32",
                          "#347552",
                          "#916018",
                          "#b4473b",
                          "#436fa4",
                          "#000000",
                        ].includes(value)
                          ? "#fff"
                          : "#284c3f",
                      }}
                    />
                  </span>
                  <strong>{name}</strong>
                  <code>{value.toUpperCase()}</code>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="principle-note mt-10">
        <Flower size={28} />
        <p>
          <strong>Use color with intention.</strong> Brand green anchors the
          interface. Lime highlights moments of possibility. Semantic colors
          communicate a state, never decoration alone.
        </p>
      </div>
    </>
  );
}
export function TypographyPage() {
  const [sample, setSample] = useState("Make room for good things.");
  const scale = Object.entries(tokens.font.sizes).reverse();
  return (
    <>
      <PageIntro
        eyebrow="FOUNDATIONS / 02"
        title="Words, with a little character."
        description="An expressive voice. An easy read. Typography that feels like a person."
      />
      <div className="font-pair">
        <article>
          <span className="overline">OUR EVERYDAY VOICE</span>
          <span className="font-specimen">Aa</span>
          <h2>DM Sans</h2>
          <p>
            Clear, warm, and quietly confident. Our workhorse for interfaces,
            headings, and everyday reading.
          </p>
          <div className="font-weights">
            Regular <b>Medium</b> <strong>Semibold</strong>
          </div>
        </article>
        <article className="editorial-font">
          <span className="overline">A LITTLE EXPRESSION</span>
          <span className="font-specimen">Aa</span>
          <h2>Instrument Serif</h2>
          <p>
            A thoughtful accent for the moments that deserve a little more
            personality.
          </p>
          <div className="font-weights">
            <em>Regular Italic</em>
          </div>
        </article>
      </div>
      <SectionTitle
        label="The type scale"
        note="A fluid scale, designed to find its rhythm."
      />
      <label className="sample-input">
        <span>TRY IT OUT</span>
        <input
          value={sample}
          aria-label="Typography sample text"
          onChange={(e) => setSample(e.target.value)}
          placeholder="Your words go here…"
        />
      </label>
      <div className="type-scale">
        {scale.map(([name, px]) => (
          <div key={name}>
            <div>
              <strong>{name}</strong>
              <code>
                {px}px / {name === "body" ? "1.6" : "1.2"}
              </code>
            </div>
            <span
              style={{
                fontSize: `clamp(${Math.min(px, 26)}px, ${px / 12}vw, ${px}px)`,
                fontWeight: px >= 24 ? 550 : 400,
              }}
            >
              {sample || "Make room for good things."}
            </span>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-5 mt-8">
        {[
          [
            "Line height",
            "1.1 → 1.6",
            "Tight for headings. Roomy for reading.",
          ],
          [
            "Letter spacing",
            "−0.04em → 0.12em",
            "Tight displays. Open overlines.",
          ],
          [
            "Reading width",
            "65 characters",
            "Keep long-form content comfortable.",
          ],
        ].map(([a, b, c]) => (
          <div className="token-card" key={a}>
            <span className="overline">{a}</span>
            <h3>{b}</h3>
            <p>{c}</p>
          </div>
        ))}
      </div>
    </>
  );
}
export function SpacingPage() {
  return (
    <>
      <PageIntro
        eyebrow="FOUNDATIONS / 03"
        title="A little room makes a difference."
        description="Consistent rhythm, flexible structure. A 4px base that keeps everything connected."
      />
      <SectionTitle
        label="The spacing scale"
        note="One scale for padding, margin, and gap."
      />
      <div className="spacing-table">
        {Object.entries(tokens.space).map(([key, value]) => (
          <div key={key}>
            <code>space-{key}</code>
            <span
              className="spacing-bar"
              style={{ width: Math.max(2, value * 3) }}
            />
            <code>{value}px</code>
          </div>
        ))}
      </div>
      <SectionTitle
        label="Layouts that find their place"
        note="Mobile first, always."
      />
      <div className="responsive-grid-example">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i}>{i + 1}</span>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-5 mt-6">
        {[
          [
            "12 columns",
            "Flexible desktop grids. Stack naturally on smaller screens.",
          ],
          ["1,200px", "A generous content container. 24–48px of page padding."],
          [
            "44 × 44px",
            "The minimum target for comfortable touch interaction.",
          ],
        ].map(([a, b]) => (
          <div className="token-card" key={a}>
            <h3>{a}</h3>
            <p>{b}</p>
          </div>
        ))}
      </div>
      <SectionTitle label="Responsive breakpoints" />
      <div className="data-list">
        {Object.entries(tokens.breakpoint).map(([key, value]) => (
          <div key={key}>
            <code>{key}</code>
            <strong>{value}px</strong>
            <span>
              {key === "sm"
                ? "Large phones"
                : key === "md"
                  ? "Tablets"
                  : key === "lg"
                    ? "Small desktops"
                    : "Wide screens"}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
export function EffectsPage() {
  const [motion, setMotion] = useState(false);
  return (
    <>
      <PageIntro
        eyebrow="FOUNDATIONS / 04"
        title="Details that make it feel right."
        description="Soft edges, quiet depth, and motion with a purpose."
      />
      <SectionTitle label="The shape of things" note="A family of soft edges" />
      <div className="effect-grid">
        {Object.entries(tokens.radius).map(([key, value]) => (
          <div className="effect-item" key={key}>
            <div style={{ borderRadius: value }} />
            <strong>{key}</strong>
          </div>
        ))}
      </div>
      <SectionTitle label="A little perspective" note="Quiet depth" />
      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(tokens.shadow).map(([key, value]) => (
          <div
            className="shadow-example"
            style={{ boxShadow: value }}
            key={key}
          >
            <span className="overline">ELEVATION {key.toUpperCase()}</span>
            <h3>
              {key === "sm"
                ? "Just above the surface."
                : key === "md"
                  ? "A little more presence."
                  : "The center of attention."}
            </h3>
            <span className="elevation-label">
              {key === "sm"
                ? "A soft lift"
                : key === "md"
                  ? "A little depth"
                  : "A clear focal point"}
            </span>
          </div>
        ))}
      </div>
      <SectionTitle
        label="Move with intention"
        note="A quick start. A gentle landing."
      />
      <div className="motion-demo">
        <div className={`motion-track ${motion ? "motion-active" : ""}`}>
          <Flower size={44} />
        </div>
        <Button variant="outline" onClick={() => setMotion(!motion)}>
          Try the transition <ArrowRight size={14} />
        </Button>
      </div>
      <div className="data-list mt-6">
        {[
          ["Fast", "120ms", "Hover, press, focus"],
          ["Normal", "200ms", "Menus, tabs, tooltips"],
          ["Slow", "350ms", "Dialogs, drawers, page entries"],
          ["Easing", "Ease out", "A quick start, a gentle landing"],
        ].map(([a, b, c]) => (
          <div key={a}>
            <strong>{a}</strong>
            <code>{b}</code>
            <span>{c}</span>
          </div>
        ))}
      </div>
      <SectionTitle label="Layers & surfaces" />
      <div className="surface-studies">
        {[
          { name: "Soft border", opacity: 1, blur: 0 },
          { name: "Subtle surface", opacity: 0.6, blur: 0 },
          { name: "Frosted glass", opacity: 0.8, blur: 3 },
        ].map(({ name, opacity, blur }) => (
          <div className="surface-study" key={name}>
            <div className="surface-study-art">
              <Flower size={60} />
              <span style={{ opacity, backdropFilter: `blur(${blur}px)` }} />
            </div>
            <h3>{name}</h3>
          </div>
        ))}
      </div>
      <SectionTitle label="Proportions" />
      <div className="ratio-studies">
        {Object.entries(tokens.aspectRatio).map(([name, ratio]) => (
          <div key={name}>
            <div style={{ aspectRatio: ratio }}>
              <Flower size={24} />
            </div>
            <span>{name}</span>
            <small>{ratio}</small>
          </div>
        ))}
      </div>
    </>
  );
}
export function BrandingPage({ notify }: { notify: (t: string) => void }) {
  const [tab, setTab] = useState("Logo system");
  return (
    <>
      <PageIntro
        eyebrow="THE BRAND"
        title="Good design has a human side."
        description="Meet Forma. A little structure for a world of possibility."
      >
        <Button
          variant="outline"
          onClick={() => {
            downloadFile("forma-brand-mark.svg", logoSvg(), "image/svg+xml");
            notify("SVG brand mark downloaded");
          }}
        >
          <Download size={15} />
          Download mark
        </Button>
      </PageIntro>
      <div className="brand-hero">
        <Brand />
        <p>
          A shared language.
          <br />
          <em>A distinctly human feeling.</em>
        </p>
        <Flower size={200} className="brand-hero-flower" />
        <span className="overline">CONSIDERED BY NATURE. OPEN BY DESIGN.</span>
      </div>
      <Tabs
        items={[
          "Logo system",
          "Personality & voice",
          "Art direction",
          "Guidelines",
        ]}
        value={tab}
        onChange={setTab}
        label="Brand guidelines"
        panelId="brand-panel"
      />
      <div
        className="mt-8"
        role="tabpanel"
        id="brand-panel"
        aria-label={tab}
        tabIndex={0}
      >
        {tab === "Logo system" ? (
          <>
            <SectionTitle label="One identity. A few ways to say it." />
            <div className="logo-grid">
              <div className="logo-box">
                <Brand />
                <span>PRIMARY / HORIZONTAL</span>
              </div>
              <div className="logo-box logo-box-green">
                <Brand />
                <span>REVERSED / LIGHT</span>
              </div>
              <div className="logo-box logo-box-lime">
                <Brand vertical />
                <span>SECONDARY / VERTICAL</span>
              </div>
              <div className="logo-box">
                <Flower size={80} />
                <span>ICON ONLY / MONOCHROME</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <article className="token-card">
                <span className="overline">THE MARK</span>
                <h3>A little shape with a lot to say.</h3>
                <p>
                  Four soft leaves meet in the middle. Structure and growth.
                  Individual parts, a shared whole. It is a small reminder of
                  what a system can make possible.
                </p>
              </article>
              <article className="token-card">
                <span className="overline">SMALL BUT RECOGNIZABLE</span>
                <div className="flex gap-6 items-end mt-5 mb-4">
                  <div className="app-icon">
                    <Flower size={36} />
                  </div>
                  <div className="app-icon app-icon-small">
                    <Flower size={20} />
                  </div>
                  <Flower size={16} />
                </div>
                <p>
                  Application icon · favicon · compact mark. Keep the icon above
                  16px, and the full wordmark above 96px.
                </p>
              </article>
            </div>
          </>
        ) : tab === "Personality & voice" ? (
          <>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                [
                  "Considered",
                  "Every detail earns its place. Be precise, thoughtful, and generous with space.",
                ],
                [
                  "Human",
                  "Speak like a helpful person. Warm and direct, with a little personality.",
                ],
                [
                  "Open",
                  "Invite people in. Make complex things approachable. Leave room for their ideas.",
                ],
              ].map(([a, b]) => (
                <article className="token-card" key={a}>
                  <Flower size={25} />
                  <h3>{a}</h3>
                  <p>{b}</p>
                </article>
              ))}
            </div>
            <SectionTitle label="Sound like a person" />
            <div className="do-dont">
              <div>
                <CheckCircle2 />
                <h3>“Your changes are saved. You are all set.”</h3>
                <p>Clear, reassuring, and useful.</p>
              </div>
              <div>
                <XCircle />
                <h3>“Operation completed successfully.”</h3>
                <p>Cold, vague, and disconnected from the person.</p>
              </div>
            </div>
          </>
        ) : tab === "Art direction" ? (
          <>
            <div className="art-direction">
              <div className="art-graphic">
                <Flower size={140} />
                <span className="art-circle" />
              </div>
              <div>
                <span className="overline">NATURALLY, A LITTLE DIFFERENT.</span>
                <h2>
                  Simple forms.
                  <br />
                  <em>Thoughtful details.</em>
                </h2>
                <p>
                  Use soft geometry, warm materials, natural light, and real
                  human moments. Keep photography quiet and observational. Crop
                  with intention and give the subject space.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-5 mt-6">
              {[
                [
                  "Iconography",
                  "Use Lucide icons at 16, 20, or 24px, with a consistent 1.5–2px stroke. Label icon-only actions.",
                ],
                [
                  "Illustration",
                  "Build from the same soft, rounded geometry as the mark. Flat colors, deliberate compositions.",
                ],
                [
                  "Photography",
                  "Natural textures, subtle grain, and candid moments. Keep text off busy images.",
                ],
              ].map(([a, b]) => (
                <article className="token-card" key={a}>
                  <h3>{a}</h3>
                  <p>{b}</p>
                </article>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="clearspace-box">
              <div>
                <Brand />
                <span className="clearspace-label">1×</span>
              </div>
            </div>
            <SectionTitle label="Give the logo a little room" />
            <p className="body-copy">
              Keep a clear space equal to one leaf of the mark on all sides. Use
              the dark mark on light surfaces and the light mark on dark
              surfaces. Preserve its original proportions.
            </p>
            <div className="do-dont mt-6">
              <div>
                <CheckCircle2 />
                <h3>Let the mark be itself.</h3>
                <p>
                  Use approved colors, enough contrast, and generous clear
                  space.
                </p>
              </div>
              <div>
                <XCircle />
                <h3>Keep it considered.</h3>
                <p>
                  Avoid stretching, rotating, outlines, shadows, busy backdrops,
                  or unapproved color combinations.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="principle-note mt-10">
        <Flower size={28} />
        <p>
          <strong>Make it yours, thoughtfully.</strong> Forma is an example
          identity. The soft mark, grounded palette, and warm typography give
          every design a familiar feeling.
        </p>
      </div>
    </>
  );
}
