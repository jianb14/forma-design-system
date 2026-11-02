import { useState } from "react";
import { ArrowRight, Check, CheckCircle2, Lock, Mail } from "lucide-react";
import {
  Avatar,
  Brand,
  Button,
  Checkbox,
  Flower,
  Input,
  Switch,
  Tabs,
} from "../components/ui";
import { ComponentDemo } from "../components/demos";
import { PageIntro } from "./Foundations";
export function PatternsPage({ notify }: { notify: (t: string) => void }) {
  const [active, setActive] = useState("Authentication");
  const [success, setSuccess] = useState(false);
  return (
    <>
      <PageIntro
        eyebrow="PUTTING IT TOGETHER"
        title="Familiar patterns. Fresh possibilities."
        description="Useful starting points for the moments your product needs most."
      />
      <Tabs
        items={["Authentication", "Dashboard", "Settings", "System pages"]}
        value={active}
        onChange={(v) => {
          setActive(v);
          setSuccess(false);
        }}
        label="Pattern examples"
        panelId="patterns-panel"
      />
      <div
        className="pattern-preview mt-8"
        role="tabpanel"
        id="patterns-panel"
        aria-label={active}
        tabIndex={0}
      >
        {active === "Authentication" ? (
          <div className="auth-pattern">
            <Brand />
            <h2>
              {success ? "You are right at home." : "A good place to begin."}
            </h2>
            <p>
              {success
                ? "Everything is ready for your next good idea."
                : "Welcome back. Make yourself at home."}
            </p>
            {success ? (
              <>
                <CheckCircle2 size={48} />
                <Button variant="outline" onClick={() => setSuccess(false)}>
                  Back to sign in
                </Button>
              </>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSuccess(true);
                  notify("Welcome back. This is a visual sign-in preview.");
                }}
              >
                <Input
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
                  required
                  leading={<Mail size={15} />}
                />
                <Input
                  label="Password"
                  type="password"
                  required
                  minLength={8}
                  placeholder="At least 8 characters"
                  leading={<Lock size={15} />}
                />
                <Checkbox label="Remember this workspace" />
                <Button fullWidth type="submit">
                  Sign in <ArrowRight size={14} />
                </Button>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => notify("Password recovery preview selected.")}
                >
                  Forgot your password?
                </button>
              </form>
            )}
          </div>
        ) : active === "Dashboard" ? (
          <div className="dashboard-pattern">
            <div className="flex justify-between items-center">
              <div>
                <span className="overline">YOUR WORKSPACE</span>
                <h2>Good morning, Alex.</h2>
              </div>
              <Avatar status />
            </div>
            <div className="dashboard-stats">
              {[
                ["Active projects", "12", "+3 this month"],
                ["Components used", "38", "83% adoption"],
                ["Your team", "8", "Good people."],
              ].map(([a, b, c]) => (
                <article key={a}>
                  <span>{a}</span>
                  <strong>{b}</strong>
                  <small>{c}</small>
                </article>
              ))}
            </div>
            <ComponentDemo id="chart" />
            <p className="text-xs muted mt-4">Sample workspace data</p>
          </div>
        ) : active === "Settings" ? (
          <SettingsPattern notify={notify} />
        ) : (
          <div className="system-page">
            <span className="error-number">404</span>
            <Flower size={55} />
            <h2>A little off the beaten path.</h2>
            <p>The page you are looking for seems to have wandered.</p>
            <a
              className="f-button button-primary button-md rounded-lg"
              href="#/overview"
            >
              Back to familiar ground <ArrowRight size={14} />
            </a>
          </div>
        )}
      </div>
    </>
  );
}
function SettingsPattern({ notify }: { notify: (t: string) => void }) {
  const [email, setEmail] = useState(
    () => localStorage.getItem("forma-notifications") !== "false",
  );
  const [name, setName] = useState(
    () => localStorage.getItem("forma-workspace") || "My good workspace",
  );
  return (
    <form
      className="settings-pattern"
      onSubmit={(e) => {
        e.preventDefault();
        localStorage.setItem("forma-notifications", String(email));
        localStorage.setItem("forma-workspace", name);
        notify("Workspace settings saved on this device.");
      }}
    >
      <h2>A space that feels like you.</h2>
      <p className="muted">A few small details, all your own.</p>
      <Input
        label="Workspace name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        label="Workspace URL"
        leading="forma.design/"
        placeholder="my-workspace"
      />
      <hr />
      <Switch label="Email notifications" checked={email} onChange={setEmail} />
      <p className="field-helper">
        Get a little nudge when something good happens.
      </p>
      <Button type="submit">
        Save changes <Check size={14} />
      </Button>
    </form>
  );
}
