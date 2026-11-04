import { expect, test } from "@playwright/test";

test("sidebar headings align and component links are indented", async ({ page }) => {
  await page.goto("/#/components");
  const positions = await page.locator(".sidebar-nav").evaluate(root => {
    const heading = root.querySelector<HTMLElement>(".nav-group > p")!;
    const category = root.querySelector<HTMLElement>(".nav-category")!;
    const child = root.querySelector<HTMLElement>(".component-nav-link")!;
    const contentLeft = (el: HTMLElement) => el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).paddingLeft);
    return { heading: contentLeft(heading), category: contentLeft(category), child: contentLeft(child) };
  });
  expect(Math.abs(positions.heading - positions.category)).toBeLessThan(1);
  expect(positions.child - positions.category).toBeGreaterThanOrEqual(12);
});

test("input group has one tight focus ring and search has no focus shadow", async ({ page }) => {
  await page.goto("/#/components/input-group");
  const input = page.getByRole("searchbox", { name: "Search projects", exact: true });
  await input.focus();
  const styles = await input.evaluate(el => {
    const inner = getComputedStyle(el);
    const outer = getComputedStyle(el.parentElement!);
    return { innerOutline: inner.outlineStyle, shadow: outer.boxShadow, offset: outer.outlineOffset, radius: outer.borderRadius };
  });
  expect(styles.innerOutline).toBe("none");
  expect(styles.shadow).toBe("none");
  expect(parseFloat(styles.offset)).toBe(0);
  expect(parseFloat(styles.radius)).toBeGreaterThanOrEqual(8);
  await page.goto("/#/components");
  const search = page.getByRole("searchbox", { name: "Search components", exact: true });
  await search.focus();
  const focus = await search.evaluate(el => {
    const inner = getComputedStyle(el);
    const shell = getComputedStyle(el.parentElement!);
    return { shadow: shell.boxShadow, ring: shell.outlineWidth, inner: inner.outlineStyle };
  });
  expect(focus.shadow).toBe("none");
  expect(parseFloat(focus.ring)).toBeGreaterThan(0);
  expect(focus.inner).toBe("none");
});

test("invalid input keeps its red border, ring and message on focus", async ({ page }) => {
  await page.goto("/#/components/input");
  const invalid = page.getByRole("textbox", { name: "Invalid email", exact: true });
  await invalid.focus();
  const colors = await invalid.evaluate(el => {
    const shell = getComputedStyle(el.parentElement!);
    const root = el.closest('[data-hulmio-ui="input"]')!;
    return { border: shell.borderTopColor, ring: shell.outlineColor, error: getComputedStyle(root.querySelector(".field-error")!).color };
  });
  expect(colors.border).toBe(colors.error);
  expect(colors.ring).toBe(colors.error);
  expect(colors.error).not.toBe("rgb(40, 76, 63)");
});

test("custom select supports keyboard selection and marks the selected option", async ({ page }) => {
  await page.goto("/#/components/select");
  const select = page.getByRole("combobox", { name: "Workspace", exact: true });
  await expect(select).toHaveJSProperty("tagName", "BUTTON");
  await select.focus();
  expect(await select.evaluate(el => getComputedStyle(el).outlineStyle)).toBe("none");
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("listbox")).toBeVisible();
  const studio = page.getByRole("option", { name: "Design studio", exact: true });
  await expect(studio).toHaveAttribute("aria-selected", "true");
  await expect(studio.locator(".h-select-check")).toBeVisible();
  expect(await studio.evaluate(el => getComputedStyle(el).outlineStyle)).toBe("none");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(select).toContainText("Personal");
  await expect(select).toBeFocused();
  await select.click();
  await expect(page.getByRole("option", { name: "Personal", exact: true }).locator(".h-select-check")).toBeVisible();
  await expect(page.getByRole("option", { name: "Archive", exact: true })).toHaveAttribute("aria-disabled", "true");
  await page.keyboard.press("Escape");
  await expect(select).toBeFocused();
});

test("buttons have a visible hover and scale on press without moving", async ({ page }) => {
  await page.goto("/#/components/button");
  const classic = page.locator('[data-library-design="classic"] .library-button-stage button');
  await expect(classic.locator("svg")).toHaveCount(0);
  const before = await classic.evaluate(el => getComputedStyle(el).backgroundColor);
  await classic.hover();
  await expect.poll(() => classic.evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe(before);
  await page.mouse.down();
  await expect.poll(() => classic.evaluate(el => getComputedStyle(el).transform)).not.toBe("none");
  const pressed = await classic.evaluate(el => {
    const matrix = new DOMMatrix(getComputedStyle(el).transform);
    return { scale: matrix.a, x: matrix.e, y: matrix.f };
  });
  expect(pressed.scale).toBeLessThan(1);
  expect(pressed.x).toBe(0);
  expect(pressed.y).toBe(0);
  await page.mouse.up();
});

test("dropdown trigger uses a border focus and selectable items show checks", async ({ page }) => {
  await page.goto("/#/components/dropdown");
  const trigger = page.getByRole("button", { name: "Project actions", exact: true });
  await trigger.focus();
  expect(await trigger.evaluate(el => getComputedStyle(el).outlineStyle)).toBe("none");
  await trigger.click();
  await page.getByRole("menuitemcheckbox", { name: "Show completed", exact: true }).click();
  await trigger.click();
  const choice = page.getByRole("menuitemcheckbox", { name: "Show completed", exact: true });
  await expect(choice).toHaveAttribute("aria-checked", "true");
  await expect(choice.locator(".h-menu-check")).toBeVisible();
});
