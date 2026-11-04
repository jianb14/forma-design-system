import { ArrowRight, ArrowUpRight, Check, Package, ShieldCheck } from "lucide-react";
import { Button, Input, Modal, DialogClose, CodeBlock } from "../components/ui";
import { PageIntro } from "./Foundations";
import { firstExample, localPackage, packageComponents } from "../lib/distribution";
import { PillButton } from "hulmio-ui";

export function UsingHulmio({ notify }: { notify: (text: string) => void }) {
  return (
    <>
      <PageIntro
        title="Take the good parts with you."
        description="Choose a named design, import it into your React app, and make it yours. A guided path from the collection to your project."
      />
      <div className="package-status" role="note">
        <span className="package-mark"><Package size={23} /></span>
        <div>
          <strong>{localPackage.name} <span className="mono">v{localPackage.version}</span></strong>
          <p>Local preview. Not published to npm. Start with the package file below.</p>
        </div>
        <span className="package-stage">{localPackage.stage}</span>
      </div>
      <div className="usage-layout">
        <div className="usage-main">
          <section className="usage-step" aria-labelledby="pack-title">
            <span className="usage-number">01</span>
            <div>
              <span className="overline">IN THE HULMIO REPOSITORY</span>
              <h2 id="pack-title">Make your package file.</h2>
              <p>Open a terminal inside the <code>hulmio</code> folder. Install the project dependencies, then build and pack the library.</p>
              <CodeBlock language="terminal" code={"npm install\nnpm run pack:ui"} onCopy={notify} />
              <p className="usage-caption">Creates <code>artifacts/{localPackage.filename}</code>. On Windows, use <code>npm.cmd</code> if PowerShell blocks <code>npm</code>.</p>
            </div>
          </section>
          <section className="usage-step" aria-labelledby="install-title">
            <span className="usage-number">02</span>
            <div>
              <span className="overline">IN YOUR OTHER REACT PROJECT</span>
              <h2 id="install-title">Bring Hulmio into your app.</h2>
              <p>Copy the generated file into your other project's folder. Run this command from that project. This preview supports React 19.1.1 or newer within React 19.</p>
              <CodeBlock language="terminal" code={`npm install ./${localPackage.filename}`} onCopy={notify} />
              <p className="usage-caption">The <code>.tgz</code> is the installable package. Tailwind setup and an npm account are unnecessary for this local step.</p>
            </div>
          </section>
          <section className="usage-step" aria-labelledby="use-title">
            <span className="usage-number">03</span>
            <div>
              <span className="overline">IN YOUR APP CODE</span>
              <h2 id="use-title">Import. Make it yours.</h2>
              <p>Import the stylesheet once in your app entry. The example below uses the same Button, Input, and Modal implementation as this website.</p>
              <CodeBlock language="tsx" code={firstExample} onCopy={notify} />
              <div className="usage-live" aria-label="Shared package example">
                <span className="overline">TRY THE SHARED COMPONENTS</span>
                <Input label="Email" type="email" placeholder="you@example.com" clearable />
                <Modal
                  title="Your first Hulmio modal"
                  description="The same components you see in the gallery."
                  trigger={<PillButton>Open example <ArrowRight size={14} /></PillButton>}
                >
                  <DialogClose asChild><PillButton variant="outline">Got it</PillButton></DialogClose>
                </Modal>
              </div>
            </div>
          </section>
          <section className="usage-step" aria-labelledby="theme-title">
            <span className="usage-number">04</span>
            <div>
              <span className="overline">A FAMILIAR FEEL</span>
              <h2 id="theme-title">Keep the theme together.</h2>
              <p>Set the theme on <code>html</code> so portaled modals receive it too. Choose <code>light</code>, <code>dark</code>, or <code>contrast</code>. Colors use the same theme values as the gallery; fonts inherit from your app.</p>
              <CodeBlock language="html" code={'<html data-hulmio-theme="dark">'} onCopy={notify} />
              <p className="usage-caption">For the website's primary typography, load Google Sans Flex in your app and set <code>--hulmio-font-family: "Google Sans Flex", sans-serif</code>. Components inherit your font; the package does not fetch fonts.</p>
            </div>
          </section>
        </div>
        <aside className="usage-aside" aria-label="Package contents and release status">
          <section>
            <span className="overline">IN THIS PREVIEW</span>
            <h2>{Object.keys(packageComponents).length} families. Your own way.</h2>
            {Object.entries(packageComponents).slice(0, 8).map(([id, name]) => (
              <a className="usage-component" href={`#/components/${id}`} key={id}>
                <Check size={14} /><span>{name}</span><ArrowUpRight size={14} />
              </a>
            ))}
            <a className="usage-component" href="#/components"><span>Explore every component family</span><ArrowUpRight size={14} /></a>
            <p>Named designs, TypeScript types, and theme tokens are included. Every component page shows a working import example and supported behavior. Reference compositions are labeled separately.</p>
          </section>
          <section>
            <span className="overline">WHAT IS ALREADY CONNECTED</span>
            <ul className="usage-checks">
              <li><Check size={13} /> Gallery and package share components</li>
              <li><Check size={13} /> Shared light, dark, and contrast colors</li>
              <li><Check size={13} /> CSS included; no Tailwind setup</li>
              <li><Check size={13} /> Local installation instructions</li>
            </ul>
          </section>
          <section className="usage-security">
            <ShieldCheck size={21} />
            <h2>Before an npm release.</h2>
            <p>Choose your package name and visibility, enable npm 2FA, select a license, and review the package files and dependency report. Publishing is disabled in this local preview.</p>
            <p>Login checks, permissions, and data protection belong in the app that uses these components.</p>
          </section>
        </aside>
      </div>
    </>
  );
}
