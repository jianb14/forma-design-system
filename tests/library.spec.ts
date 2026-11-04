import { expect, test } from "@playwright/test";
import { components } from "../src/lib/catalog";
import { chooseOption } from "./helpers";

test("homepage is a readable product website and the library has its own sidebar", async ({ page }) => {
  const failed: string[] = [];
  page.on("pageerror", error => failed.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await expect(page.locator(".sidebar")).toHaveCount(0);
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.fonts.check('16px "Google Sans Flex"'))).toBe(true);
  expect(await page.evaluate(() => document.fonts.check('italic 48px "Instrument Serif"'))).toBe(true);
  expect(await page.locator("body").evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(16);
  await expect(page.locator(".home-hero")).toContainText(`${components.length} component families`);
  await chooseOption(page, page.getByRole("combobox", { name: "Button design", exact: true }), "BrutalistButton");
  await chooseOption(page, page.getByRole("combobox", { name: "Button variant", exact: true }), "Destructive");
  await expect(page.locator(".home-code")).toContainText('import { BrutalistButton } from "hulmio-ui"');
  await expect(page.locator(".home-workbench-stage button")).toHaveAttribute("data-design", "brutalist");
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Components", exact: true }).click();
  await expect(page.locator(".sidebar")).toBeVisible();
  await expect(page.locator(".sidebar .component-nav-link")).toHaveCount(components.length);
  await page.locator('.sidebar a[href="#/components/button"]').click();
  await expect(page.locator("main h1")).toHaveText("Button");
  await expect(page.locator('.sidebar a[href="#/components/button"]')).toHaveAttribute("aria-current", "page");
  await page.getByRole("link", { name: "Hulmio home", exact: true }).click();
  await expect(page.locator(".sidebar")).toHaveCount(0);
  await page.evaluate(() => { (document.activeElement as HTMLElement)?.blur(); window.scrollTo({ top: 0, behavior: "instant" }); });
  await page.screenshot({ path: "artifacts/hulmio-home-desktop.png", fullPage: true, animations: "disabled" });
  expect(failed).toEqual([]);
});

test("named designs have independent variants, states and copyable imports", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/#/components/button");
  await expect(page.locator(".library-button-design")).toHaveCount(8);
  const pill = page.locator('[data-library-design="pill"]');
  const brutalist = page.locator('[data-library-design="brutalist"]');
  await chooseOption(page, pill.getByRole("combobox", { name: "Pill button variant" }), "destructive");
  await chooseOption(page, pill.getByRole("combobox", { name: "Pill button size" }), "LG");
  await chooseOption(page, pill.getByRole("combobox", { name: "Pill button state" }), "Loading");
  const button = pill.getByRole("button", { name: /Get started/ });
  await expect(button).toBeDisabled();
  await expect(button).toHaveAttribute("aria-busy", "true");
  await expect(brutalist.getByRole("combobox", { name: "Brutalist button variant" })).toContainText("primary");
  await pill.getByRole("button", { name: "Copy import example", exact: true }).click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain('import { PillButton } from "hulmio-ui"');
  expect(copied).toContain('variant="destructive"');
  expect(copied).toContain("loading");
  await page.evaluate(() => { (document.activeElement as HTMLElement)?.blur(); window.scrollTo({ top: 0, behavior: "instant" }); });
  await page.screenshot({ path: "artifacts/hulmio-button-designs-desktop.png", fullPage: true, animations: "disabled" });
});

test("mobile homepage and library navigation retain focus and fit the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".sidebar")).not.toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.screenshot({ path: "artifacts/hulmio-home-mobile.png", fullPage: true, animations: "disabled" });
  const trigger = page.getByRole("button", { name: "Open navigation", exact: true });
  await trigger.click();
  const navigation = page.getByRole("dialog", { name: "Main navigation" });
  await expect(navigation).toBeVisible();
  await navigation.getByRole("link", { name: "Button", exact: true }).click();
  await expect(page).toHaveURL(/components\/button/);
  await expect(page.locator(".sidebar")).toHaveAttribute("inert");
  await expect(page.locator(".library-button-design")).toHaveCount(8);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: "artifacts/hulmio-button-designs-mobile.png", fullPage: true, animations: "disabled" });
  await trigger.click();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("library overlays cover the navbar and retain readable mobile text", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#/components/drawer");
  const trigger = page.locator(".library-design").getByRole("button", { name: "Open drawer", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Project details", exact: true });
  await expect(dialog).toBeVisible();
  expect(await dialog.evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(15);
  expect(await dialog.locator(".dialog-description").evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(14);
  expect(await page.evaluate(() => {
    const header = document.querySelector(".site-navbar")!;
    const target = document.elementFromPoint(20, 20);
    return target != null && !header.contains(target);
  })).toBe(true);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});
