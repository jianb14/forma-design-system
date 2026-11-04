import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { spawn, spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, expect } from "@playwright/test";
import { expandedConsumerSource, verifyExpandedConsumer } from "./verify-expanded-library.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const consumer = path.join(root, ".package-check", `run-${Date.now()}`);
const npmCli = process.env.npm_execpath;
assert(npmCli, "Run this check with npm run check:package.");
const run = (command, args, cwd = root, capture = false) => {
  const result = spawnSync(command, args, { cwd, encoding: "utf8", stdio: capture ? "pipe" : "inherit", env: process.env });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${path.basename(command)} ${args.join(" ")} failed.\n${result.stderr || ""}`);
  return result.stdout;
};
const npm = (args, cwd = root, capture = false) => run(process.execPath, [npmCli, ...args], cwd, capture);

// Build and pack the same artifact that the usage guide tells the owner to install.
npm(["run", "pack:ui"]);
const manifest = JSON.parse(await readFile(path.join(root, "packages/ui/package.json"), "utf8"));
assert.equal(manifest.private, true, "The preview must stay protected from npm publishing.");
const packageFiles = JSON.parse(npm(["pack", "--workspace", "hulmio-ui", "--dry-run", "--json", "--ignore-scripts"], root, true))[0].files;
for (const file of packageFiles) {
  assert(file.path === "package.json" || file.path === "README.md" || file.path.startsWith("dist/"), `Unexpected package file: ${file.path}`);
  assert(!/(^|\/)(\.env|\.npmrc|node_modules|test-results|src\/App)/.test(file.path), `Private or app-only file: ${file.path}`);
}
assert(packageFiles.some(file => file.path === "dist/styles.css"), "Missing public stylesheet.");
assert(packageFiles.some(file => file.path === "dist/types/src/index.d.ts"), "Missing public TypeScript types.");
assert(packageFiles.some(file => file.path === "dist/types/src/themes.json"), "Missing JSON required by public theme types.");
const builtCss = await readFile(path.join(root, "packages/ui/dist/styles.css"), "utf8");
assert(!builtCss.includes("tailwindcss"), "The consumer should not need Tailwind.");
assert(!builtCss.includes("fonts.googleapis.com"), "The package should not fetch fonts.");

await mkdir(consumer, { recursive: true });
const installedVersion = async name => JSON.parse(await readFile(path.join(root, "node_modules", name, "package.json"), "utf8")).version;
const fixtureManifest = {
  name: "hulmio-independent-consumer-check", version: "0.0.0", private: true, type: "module",
  dependencies: {
    "hulmio-ui": `file:${path.relative(consumer, path.join(root, "artifacts", `hulmio-ui-${manifest.version}.tgz`)).replaceAll("\\", "/")}`,
    react: await installedVersion("react"), "react-dom": await installedVersion("react-dom"),
  },
  devDependencies: {
    vite: await installedVersion("vite"), typescript: await installedVersion("typescript"),
    "@types/react": await installedVersion("@types/react"), "@types/react-dom": await installedVersion("@types/react-dom"),
  },
};
await writeFile(path.join(consumer, "package.json"), JSON.stringify(fixtureManifest, null, 2));
await writeFile(path.join(consumer, "tsconfig.json"), JSON.stringify({ compilerOptions: {
  target: "ES2022", lib: ["ES2022", "DOM", "DOM.Iterable"], module: "ESNext", moduleResolution: "Bundler", jsx: "react-jsx", strict: true, noEmit: true, skipLibCheck: false, types: ["react", "react-dom"],
}, include: ["*.tsx"] }, null, 2));
await writeFile(path.join(consumer, "vite.config.mjs"), 'export default { server: { host: "127.0.0.1" }, preview: { host: "127.0.0.1" } };\n');
await writeFile(path.join(consumer, "index.html"), '<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Independent Hulmio consumer</title><style>body{margin:17px;background:rgb(249,246,240);font-family:Arial,sans-serif}#host-button{background:rgb(201,220,255);border-radius:3px}</style></head><body><button id="host-button">Host button</button><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>');
const guideSource = await readFile(path.join(root, "src/lib/distribution.ts"), "utf8");
const documentedExample = guideSource.match(/export const firstExample = `([\s\S]*?)`;/)?.[1];
assert(documentedExample, "Could not find the documented quick start.");
const readmeExample = (await readFile(path.join(root, "packages/ui/README.md"), "utf8")).match(/```tsx\n([\s\S]*?)```/)?.[1];
assert.equal(readmeExample?.trim(), documentedExample.trim(), "The website and package README quick starts must match.");
await writeFile(path.join(consumer, "DocumentedExample.tsx"), documentedExample);
await writeFile(path.join(consumer, "ExpandedConsumer.tsx"), expandedConsumerSource);
await writeFile(path.join(consumer, "main.tsx"), `import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, Input, themeTokens } from "hulmio-ui";
import type { ButtonProps, InputProps, ModalProps } from "hulmio-ui";
import "hulmio-ui/styles.css";
import DocumentedExample from "./DocumentedExample";
import ExpandedConsumer from "./ExpandedConsumer";
function Consumer() {
  const themeColor: string = themeTokens.light.primary;
  const [value, setValue] = useState("hello");
  const buttonProps: ButtonProps = { loading: true };
  const inputProps: InputProps = { label: "Controlled input", value, onChange: event => setValue(event.target.value), clearable: true };
  const modalProps: Pick<ModalProps, "title"> = { title: "Typed modal" };
  return <><DocumentedExample /><Input {...inputProps} /><output aria-label="Controlled value">{value}</output><Input label="Password" type="password" defaultValue="secret" /><Input label="Invalid email" error="Enter a valid email" /><Button {...buttonProps}>Working</Button><span>{modalProps.title} {themeColor}</span><ExpandedConsumer /></>;
}
createRoot(document.getElementById("root")!).render(<Consumer />);`);

// This is an actual npm install of the tarball, outside the gallery's dependency graph.
npm(["install", "--ignore-scripts", "--no-audit", "--no-fund", "--prefer-offline", "--cache", path.join(root, ".npm-cache")], consumer);
assert.equal(JSON.parse(await readFile(path.join(consumer, "node_modules/hulmio-ui/package.json"), "utf8")).version, manifest.version);
run(process.execPath, [path.join(consumer, "node_modules/typescript/bin/tsc"), "-p", consumer], consumer);
run(process.execPath, [path.join(consumer, "node_modules/vite/bin/vite.js"), "build"], consumer);

const server = spawn(process.execPath, [path.join(consumer, "node_modules/vite/bin/vite.js"), "preview", "--host", "127.0.0.1", "--port", "5187", "--strictPort"], { cwd: consumer, stdio: "pipe" });
let serverOutput = "";
server.stdout.on("data", data => { serverOutput += data; });
server.stderr.on("data", data => { serverOutput += data; });
let browser;
try {
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error(`Consumer preview did not start. ${serverOutput}`)), 15000);
    const ready = data => { if (data.toString().includes("5187")) { clearTimeout(timeout); resolve(); } };
    server.stdout.on("data", ready);
    server.on("error", error => { clearTimeout(timeout); reject(error); });
    server.on("exit", code => { clearTimeout(timeout); reject(new Error(`Preview exited ${code}: ${serverOutput}`)); });
  });
  browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("http://127.0.0.1:5187");
  await page.getByRole("button", { name: "Open example", exact: true }).waitFor();
  const styles = await page.evaluate(() => ({
    margin: getComputedStyle(document.body).margin,
    background: getComputedStyle(document.body).backgroundColor,
    host: getComputedStyle(document.getElementById("host-button")).backgroundColor,
    button: getComputedStyle(document.querySelector('[data-hulmio-ui="button"]')).backgroundColor,
    inputHeight: getComputedStyle(document.querySelector('[data-hulmio-ui="input"] input')).height,
  }));
  const { inputHeight, ...hostStyles } = styles;
  assert.deepEqual(hostStyles, { margin: "17px", background: "rgb(249, 246, 240)", host: "rgb(201, 220, 255)", button: "rgb(40, 76, 63)" });
  assert(parseFloat(inputHeight) >= 40, "Inputs should retain a comfortable control height.");
  await page.getByLabel("Email", { exact: true }).fill("hello@example.com");
  await page.getByRole("button", { name: "Clear input", exact: true }).click();
  assert.equal(await page.getByLabel("Controlled input", { exact: true }).inputValue(), "");
  assert.equal(await page.getByRole("status", { name: "Controlled value" }).textContent(), "");
  await page.getByRole("button", { name: "Show password", exact: true }).click();
  assert.equal(await page.getByLabel("Password", { exact: true }).getAttribute("type"), "text");
  assert.equal(await page.getByRole("button", { name: "Working", exact: true }).isDisabled(), true);
  const invalid = page.getByLabel("Invalid email", { exact: true });
  assert.equal(await invalid.getAttribute("aria-invalid"), "true");
  assert.equal(await invalid.getAttribute("aria-describedby"), await page.getByText("Enter a valid email", { exact: true }).getAttribute("id"));
  await verifyExpandedConsumer(page, guideSource);
  for (const [theme, expected] of [["dark", "rgb(217, 237, 146)"], ["contrast", "rgb(229, 255, 120)"]]) {
    await page.evaluate(theme => { document.documentElement.dataset.hulmioTheme = theme; }, theme);
    await page.waitForFunction(expected => getComputedStyle(document.querySelector('[data-hulmio-ui="button"]')).backgroundColor === expected, expected);
    assert.equal(await page.locator('[data-hulmio-ui="button"]').first().evaluate(element => getComputedStyle(element).backgroundColor), expected);
  }
  const trigger = page.getByRole("button", { name: "Open example", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Your first Hulmio modal", exact: true });
  await dialog.waitFor();
  assert.equal(await dialog.evaluate(element => getComputedStyle(element).backgroundColor), "rgb(16, 16, 16)");
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]')), true);
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole("button", { name: "Got it", exact: true }).click();
  await dialog.waitFor({ state: "hidden" });
  await page.setViewportSize({ width: 390, height: 844 });
  await trigger.click();
  await dialog.waitFor();
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
  const bounds = await dialog.boundingBox();
  assert(bounds && bounds.x >= 0 && bounds.x + bounds.width <= 391, "Mobile modal extends beyond viewport.");
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(await page.locator('.animate-spin').evaluate(element => getComputedStyle(element).animationName), "none");
  assert.deepEqual(errors, []);
  await page.screenshot({ path: path.join(root, "artifacts/package-consumer-mobile.png"), fullPage: true });
  console.log("PASS: installed tarball, documented example, public types, standalone CSS, host styles, controlled input, password, loading, themes, modal focus/Escape/close, mobile layout, reduced motion, and browser errors.");
} finally {
  await browser?.close();
  server.kill();
}
