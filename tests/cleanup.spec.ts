import { expect, test } from "@playwright/test";

test("component examples stay quiet and show code on demand", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/#/components/button");
  await expect(page.locator(".library-breadcrumb")).toHaveCount(0);
  await expect(page.locator(".page-intro .overline")).toHaveCount(0);
  const classic = page.locator('[data-library-design="classic"]');
  await classic.getByRole("button", { name: /Get started/ }).click();
  await expect(page.locator(".toast")).toHaveCount(0);
  await expect(classic.getByRole("tab", { name: "Preview", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(classic.locator("pre")).not.toBeVisible();
  await classic.getByRole("tab", { name: "Code", exact: true }).click();
  await expect(classic.locator("pre")).toBeVisible();
  await classic.getByRole("button", { name: "Copy import example", exact: true }).click();
  await expect(classic.getByRole("button", { name: "Copy import example", exact: true })).toContainText("Copied");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("ClassicButton");
  await expect(page.locator(".toast")).toHaveCount(0);
  await classic.getByRole("tab", { name: "Code", exact: true }).focus();
  await page.keyboard.press("ArrowLeft");
  await expect(classic.getByRole("tab", { name: "Preview", exact: true })).toBeFocused();
  await expect(classic.getByRole("button", { name: /Get started/ })).toBeVisible();
});

test("stepper preview starts on the first screen and reset restores its state", async ({ page }) => {
  await page.goto("/#/components/stepper");
  const preview = page.locator(".library-live-stepper");
  await expect(preview).toBeInViewport();
  await preview.getByRole("button", { name: /Review/ }).click();
  await expect(preview.locator('button[aria-current="step"]')).toContainText("Review");
  await page.getByRole("button", { name: "Reset examples", exact: true }).click();
  await expect(preview.locator('button[aria-current="step"]')).toContainText("Details");
  await expect(page.locator(".toast")).toHaveCount(0);
});

test("alert dialog requires an explicit choice and returns focus", async ({ page }) => {
  await page.goto("/#/components/alert-dialog");
  const trigger = page.getByRole("button", { name: "Delete project", exact: true });
  await trigger.click();
  const dialog = page.getByRole("alertdialog", { name: "Delete this project?" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Cancel", exact: true })).toBeFocused();
  await page.mouse.click(8, 8);
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page.getByText("Project deleted.", { exact: true })).toHaveCount(0);
  await trigger.click();
  await dialog.getByRole("button", { name: "Delete", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page.getByText("Project deleted.", { exact: true })).toBeVisible();
  await expect(page.locator(".toast")).toHaveCount(0);
});

test("new input, item and table primitives expose useful native semantics", async ({ page }) => {
  await page.goto("/#/components/input-group");
  const input = page.getByRole("searchbox", { name: "Search projects", exact: true });
  await input.fill("Design");
  await input.press("Enter");
  await expect(page.getByRole("status").filter({ hasText: "Results for Design" })).toBeVisible();
  await page.goto("/#/components/item");
  await expect(page.getByRole("list", { name: "Project files" }).getByRole("listitem")).toHaveCount(2);
  await expect(page.getByRole("link", { name: "Open installation guide" })).toHaveAttribute("href", "#/using-hulmio");
  await page.goto("/#/components/simple-table");
  const table = page.getByRole("table", { name: "Recent invoices" });
  await expect(table.getByRole("columnheader")).toHaveCount(3);
  await expect(table.getByRole("rowheader")).toHaveCount(3);
  await expect(table.getByRole("cell", { name: "$250.00", exact: true })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});
