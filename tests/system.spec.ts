import { expect, test } from "@playwright/test";
import { components } from "../src/lib/catalog";

test("catalog search, categories, and clear control stay in sync", async ({
  page,
}) => {
  await page.goto("/#/components");
  await expect(page.locator(".component-catalog-card")).toHaveCount(
    components.length,
  );
  const search = page.getByRole("searchbox", { name: "Search components" });
  await search.fill("slider");
  await expect(page.locator(".component-catalog-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Clear input", exact: true }).click();
  await expect(search).toHaveValue("");
  await expect(page.locator(".component-catalog-card")).toHaveCount(
    components.length,
  );
  await page
    .locator(".category-filters")
    .getByRole("link", { name: /^Forms/ })
    .click();
  await expect(page.locator(".component-catalog-card")).toHaveCount(
    components.filter((c) => c.category === "Forms").length,
  );
  await search.fill("nothingmatches123");
  await expect(page.getByText("No components found.")).toBeVisible();
});

test("component variants and states are visible together", async ({ page }) => {
  await page.goto("/#/components/button");
  await expect(page.locator(".specimen-card")).toHaveCount(12);
  await expect(page.locator('[data-variant="Destructive"] button')).toHaveClass(
    /button-destructive/,
  );
  await expect(page.locator('[data-variant="Loading"] button')).toHaveAttribute(
    "aria-busy",
    "true",
  );
  await expect(page.locator('[data-variant="Disabled"] button')).toBeDisabled();
  await expect(page.locator(".interaction-states > div")).toHaveCount(6);
  await page
    .locator(".size-comparison:not(.shape-comparison)")
    .getByRole("button")
    .last()
    .click();
  await expect(page.locator('[data-variant="Primary"] button')).toHaveClass(
    /button-xl/,
  );
  await page.goto("/#/components/form");
  const demo = page.locator('[data-variant="Validated"]');
  await demo.getByRole("button", { name: "Keep me posted" }).click();
  await expect(demo.getByRole("alert")).toContainText(
    "A little more detail is needed.",
  );
  await demo.getByLabel("Your name").fill("Alex Morgan");
  await demo.getByLabel("Email address").fill("alex@example.com");
  await demo.getByRole("button", { name: "Keep me posted" }).click();
  await expect(demo.getByText("You are on the list.")).toBeVisible();
});

test("overlay designs are visible without opening a trigger", async ({
  page,
}) => {
  await page.goto("/#/components/dialog");
  await expect(page.locator(".inline-dialog")).toHaveCount(4);
  await expect(page.locator('[data-variant="Destructive"]')).toContainText(
    "Delete this project?",
  );
  await expect(page.locator('[data-variant="Confirmation"]')).toContainText(
    "Ready to make it happen?",
  );
  await page
    .locator('[data-variant="Destructive"]')
    .getByRole("button", { name: "Delete project" })
    .click();
  await expect(page.locator(".toast-region")).toContainText("Project removed");
  await page.goto("/#/components/dropdown");
  await expect(page.locator(".inline-dropdown")).toHaveCount(4);
  await expect(page.locator('[data-variant="Shortcut"] kbd')).toHaveCount(3);
});

test("tables support filter, sort, pagination, selection, and editing", async ({
  page,
}) => {
  await page.goto("/#/components/table");
  const demo = page.locator('[data-variant="Sortable"]');
  await demo.getByRole("button", { name: "Next", exact: true }).click();
  await expect(demo.getByText("Page 2 of 2")).toBeVisible();
  await demo.getByLabel("Filter members").fill("Alex");
  await expect(demo.locator("tbody tr")).toHaveCount(1);
  await expect(demo.locator("tbody")).toContainText("Alex Morgan");
  await demo.getByLabel("Select Alex Morgan").check();
  await expect(demo.getByText("1 selected")).toBeVisible();
  await demo.getByLabel("Filter members").fill("");
  await demo.getByRole("button", { name: "Name", exact: true }).click();
  await expect(demo.locator("th[aria-sort]")).toHaveAttribute(
    "aria-sort",
    "descending",
  );
  const edit = page
    .locator('[data-variant="Editable"]')
    .getByLabel("Edit Alex Morgan");
  await edit.fill("Alex Santos");
  await edit.blur();
  await expect(edit).toHaveValue("Alex Santos");
});

test("keyboard search, tab navigation, themes, and local settings work", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Control+k");
  const search = page.getByRole("combobox", {
    name: "Search the design gallery",
  });
  await expect(search).toBeFocused();
  await search.fill("switch");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/components\/switch/);
  await expect(
    page.locator('[data-variant="Off"]').getByRole("switch"),
  ).not.toBeChecked();
  await expect(
    page.locator('[data-variant="On"]').getByRole("switch"),
  ).toBeChecked();
  await page.goto("/#/components/tabs");
  const preview = page.locator('[data-variant="Underline"]');
  await preview.getByRole("tab", { name: "Overview", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    preview.getByRole("tab", { name: "Activity", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await expect(preview.getByRole("tabpanel")).toContainText(
    "Your latest updates",
  );
  await page.getByRole("button", { name: "Choose theme", exact: true }).click();
  await page.getByRole("menuitemradio", { name: "Dark", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Choose theme", exact: true }).click();
  await page
    .getByRole("menuitemradio", { name: "System", exact: true })
    .click();
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.goto("/#/patterns");
  await page.getByRole("tab", { name: "Settings", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Workspace name", exact: true })
    .fill("My thoughtful team");
  await page.getByRole("button", { name: "Save changes" }).click();
  await page.reload();
  await page.getByRole("tab", { name: "Settings", exact: true }).click();
  await expect(
    page.getByRole("textbox", { name: "Workspace name", exact: true }),
  ).toHaveValue("My thoughtful team");
});

test("mobile navigation is focus-managed and closes on navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".sidebar")).toHaveAttribute("inert");
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.click();
  const drawer = page.getByRole("dialog", { name: "Main navigation" });
  await expect(drawer).toBeVisible();
  expect(
    await page.evaluate(() => !!document.activeElement?.closest(".sidebar")),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await drawer.getByRole("link", { name: "Colors", exact: true }).click();
  await expect(page).toHaveURL(/colors/);
  await expect(page.locator(".sidebar")).toHaveAttribute("inert");
});

test("the visual collection renders without code panels on desktop and mobile", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const routes = [
    "overview",
    "branding",
    "colors",
    "typography",
    "spacing",
    "effects",
    "components",
    "patterns",
    ...components.map((c) => `components/${c.id}`),
  ];
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) {
      await page.goto(`/#/${route}`);
      await expect(page.locator("main h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth + 1,
        ),
        `${route} at ${width}px overflows`,
      ).toBe(false);
      const brokenReferences = await page
        .locator("[aria-controls]")
        .evaluateAll((elements) =>
          elements.flatMap((el) =>
            (el.getAttribute("aria-controls") || "")
              .split(" ")
              .filter((id) => !document.getElementById(id)),
          ),
        );
      expect(brokenReferences, `${route} has broken aria-controls`).toEqual([]);
      await expect(page.locator("main pre, main .code-block")).toHaveCount(0);
      await expect(
        page.locator(
          'a[href="#/documentation"], a[href="#/changelog"], a[href="#/getting-started"]',
        ),
      ).toHaveCount(0);
      await expect(
        page.getByRole("button", { name: "View code", exact: true }),
      ).toHaveCount(0);
      if (route.startsWith("components/")) {
        const entry = components.find((c) => route === `components/${c.id}`)!;
        await expect(page.locator(".specimen-card")).toHaveCount(
          entry.variants.length,
        );
        for (const variant of entry.variants) {
          await expect(
            page
              .locator(`[data-variant="${variant}"] .specimen-preview > *`)
              .first(),
          ).toBeVisible();
        }
      }
    }
  }
  expect(errors).toEqual([]);
});
