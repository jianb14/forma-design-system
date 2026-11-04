import assert from "node:assert/strict";
import { expect } from "@playwright/test";

export const expandedConsumerSource = `import { useState } from "react";
import * as UI from "hulmio-ui";
import { PillButton, BrutalistButton, GradientButton, Field, FilledInput, Select, FileUpload, Checkbox, Slider, Switch, MultiSelect, TagInput, PillTabs, DataTable, Modal, CommandPalette, Popover, Toolbar } from "hulmio-ui";
import type { DataTableRow, SelectProps, NativeSelectProps } from "hulmio-ui";
import { NativeSelect } from "hulmio-ui";
import { AlertDialog, InputGroup, InputGroupInput, InputGroupAddon, ItemGroup, Item, ItemContent, ItemTitle, ItemDescription, ItemActions, Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from "hulmio-ui";
import type { AlertDialogProps, InputGroupInputProps, ItemProps, TableProps } from "hulmio-ui";

export default function ExpandedConsumer() {
  const [tags, setTags] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [rows, setRows] = useState<DataTableRow[]>([{ id: "a", title: "Zebra", status: "Ready" }, { id: "b", title: "Alpha", status: "Draft" }, { id: "c", title: "Maple", status: "Ready" }]);
  const [rowIds, setRowIds] = useState<(string | number)[]>([]);
  const [portal, setPortal] = useState<HTMLDivElement | null>(null);
  const [commandsOpen, setCommandsOpen] = useState(false);
  const [commandAction, setCommandAction] = useState("");
  const [submissions, setSubmissions] = useState(0);
  const [popoverRoot, setPopoverRoot] = useState<HTMLDivElement | null>(null);
  const [deleted, setDeleted] = useState(false);
  const [search, setSearch] = useState("");
  const [workspace, setWorkspace] = useState("studio");
  const [submittedWorkspace, setSubmittedWorkspace] = useState("");
  const confirmProps: Pick<AlertDialogProps, "title" | "description"> = { title: "Delete consumer file?", description: "A confirmation in the installed package." };
  const searchProps: InputGroupInputProps = { name: "query", type: "search", "aria-label": "Consumer search" };
  const itemProps: ItemProps = { variant: "outline" };
  const tableProps: TableProps = { "aria-label": "Consumer invoices" };
  const selectProps: SelectProps = { label: "Controlled consumer workspace", value: workspace, onValueChange: setWorkspace, options: [{ value: "studio", label: "Studio" }, { value: "personal", label: "Personal" }, { value: "archive", label: "Archived", disabled: true }] };
  const nativeProps: NativeSelectProps = { label: "Native consumer workspace", defaultValue: "studio", options: selectProps.options };
  return <section aria-label="Expanded library" style={{ display: "grid", gap: 24, maxWidth: 650, marginBlock: 32 }}>
    <output hidden data-testid="public-exports">{Object.keys(UI).join(",")}</output>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}><PillButton data-testid="pill-design">Pill design</PillButton><BrutalistButton data-testid="brutalist-design">Brutalist design</BrutalistButton><GradientButton data-testid="gradient-design">Gradient design</GradientButton></div>
    <Field label="Consumer field" hint="A connected description"><input name="consumer-name" defaultValue="Good ideas" /></Field>
    <FilledInput label="Filled consumer input" defaultValue="Inherited font" />
    <Field label="Outer consumer label" hint="Outer consumer hint"><Select hint="Inner consumer hint" options={[{ value: "alpha", label: "Alpha" }]} /></Field>
    <Select {...selectProps} />
    <output aria-label="Consumer workspace value">{workspace}</output>
    <form onSubmit={event => { event.preventDefault(); setSubmittedWorkspace(String(new FormData(event.currentTarget).get("workspace"))); }}><Select label="Required consumer workspace" name="workspace" required placeholder="Choose a workspace" options={selectProps.options} /><button type="submit">Submit consumer workspace</button><button type="reset">Reset consumer workspace</button></form>
    <output aria-label="Submitted consumer workspace">{submittedWorkspace}</output>
    <NativeSelect {...nativeProps} />
    <form onReset={event => event.preventDefault()}><Select label="Canceled reset workspace" defaultValue="studio" options={selectProps.options} /><Select {...selectProps} label="Canceled controlled workspace" /><button type="reset">Prevent workspace reset</button></form>
    <form id="external-workspace-form"><button type="reset">Reset external workspace</button></form><Select label="External consumer workspace" name="externalWorkspace" form="external-workspace-form" defaultValue="studio" options={selectProps.options} />
    <form onSubmit={event => event.preventDefault()}><Select label="First required workspace" required placeholder="Choose first" options={selectProps.options} /><Select label="Second required workspace" required placeholder="Choose second" options={selectProps.options} /><button type="submit">Validate both workspaces</button></form>
    <form><FileUpload label="Resettable upload" maxSize={2} /><button type="reset">Reset consumer upload</button></form>
    <Checkbox label="Mixed consumer checkbox" indeterminate />
    <Slider label="Stepped consumer slider" min={0} max={5} step={2} />
    <Switch label="Consumer notifications" defaultChecked />
    <MultiSelect label="Consumer interests" value={selected} onValueChange={setSelected} options={[{ value: "design", label: "Design" }, { value: "code", label: "Code" }]} />
    <output aria-label="Selected interests">{selected.join(",")}</output>
    <TagInput label="Consumer tags" value={tags} onValueChange={setTags} />
    <output aria-label="Consumer tag values">{tags.join(",")}</output>
    <PillTabs label="Consumer perspectives" items={[{ value: "one", label: "First", content: "First perspective" }, { value: "two", label: "Unavailable", disabled: true }, { value: "three", label: "Third", content: "Third perspective" }]} />
    <DataTable caption="Consumer tasks" rows={rows} columns={[{ key: "title", label: "Title", sortable: true }, { key: "status", label: "State" }]} pageSize={2} selectable editable onRowsChange={setRows} onSelectionChange={setRowIds} />
    <output aria-label="Selected row identities">{rowIds.join(",")}</output>
    <form onSubmit={event => { event.preventDefault(); setSubmissions(count => count + 1); }}><div data-hulmio-theme="dark" ref={setPortal} style={{ padding: 18 }}><Modal title="Scoped consumer dialog" description="A dark subtree in a light document" portalContainer={portal} trigger={<PillButton>Open scoped dialog</PillButton>}><p>Theme travels with its portal container.</p></Modal><PillButton onClick={() => setCommandsOpen(true)}>Open consumer commands</PillButton><CommandPalette open={commandsOpen} onOpenChange={setCommandsOpen} portalContainer={portal} items={[{ id: "run", label: "Run consumer task", onSelect: () => setCommandAction("ran") }]} /></div></form>
    <output aria-label="Consumer command action">{commandAction}</output><output aria-label="Consumer submissions">{submissions}</output>
    <div ref={setPopoverRoot} style={{ transform: "translateZ(0)", padding: 16 }}><Popover title="Transformed consumer popover" portalContainer={popoverRoot} trigger={<PillButton>Open transformed consumer popover</PillButton>}><p>Content stays beside its trigger.</p></Popover></div>
    <Toolbar label="Consumer tools"><button type="button">First consumer tool</button><button type="button" disabled tabIndex={0}>Unavailable consumer tool</button><button type="button">Last consumer tool</button></Toolbar>
    <AlertDialog {...confirmProps} trigger={<PillButton>Delete consumer file</PillButton>} confirmLabel="Delete file" destructive onConfirm={() => setDeleted(true)} />
    <output aria-label="Consumer deleted">{String(deleted)}</output>
    <form onSubmit={event => { event.preventDefault(); setSearch(String(new FormData(event.currentTarget).get("query"))); }}><InputGroup><InputGroupAddon>Find</InputGroupAddon><InputGroupInput {...searchProps} /><InputGroupAddon><PillButton type="submit" size="sm">Search consumer</PillButton></InputGroupAddon></InputGroup></form>
    <output aria-label="Consumer query">{search}</output>
    <ItemGroup aria-label="Consumer files"><Item {...itemProps}><ItemContent><ItemTitle>Readme</ItemTitle><ItemDescription>Installation notes</ItemDescription></ItemContent><ItemActions><a href="#readme">Read</a></ItemActions></Item></ItemGroup>
    <Table {...tableProps}><TableCaption>Invoice list</TableCaption><TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Amount</TableHead></TableRow></TableHeader><TableBody><TableRow><TableHead scope="row">INV-001</TableHead><TableCell>$250.00</TableCell></TableRow></TableBody><TableFooter><TableRow><TableHead scope="row">Total</TableHead><TableCell>$250.00</TableCell></TableRow></TableFooter></Table>
  </section>;
}`;

export async function verifyExpandedConsumer(page, guideSource) {
  const expected = [...guideSource.matchAll(/family\(\[([^\]]*)\]/g)].flatMap(match => [...match[1].matchAll(/"([^"]+)"/g)].map(item => item[1]));
  assert(expected.length >= 60, "Expected a comprehensive family export map.");
  const actual = (await page.getByTestId("public-exports").textContent()).split(",");
  for (const name of new Set(expected)) assert(actual.includes(name), `Advertised export is missing from installed package: ${name}`);
  const customSelect = page.getByRole("combobox", { name: "Controlled consumer workspace", exact: true });
  await customSelect.click();
  await expect(page.getByRole("option", { name: "Studio", exact: true }).locator(".h-select-check")).toBeVisible();
  await page.getByRole("option", { name: "Personal", exact: true }).click();
  await expect(page.getByLabel("Consumer workspace value", { exact: true })).toHaveText("personal");
  await expect(customSelect).toBeFocused();
  assert.equal(await customSelect.evaluate(element => getComputedStyle(element).outlineStyle), "none");
  const requiredSelect = page.getByRole("combobox", { name: "Required consumer workspace", exact: true });
  await page.getByRole("button", { name: "Submit consumer workspace", exact: true }).click();
  await expect(page.getByLabel("Submitted consumer workspace", { exact: true })).toHaveText("");
  await expect(requiredSelect).toBeFocused();
  await requiredSelect.click();
  await page.getByRole("option", { name: "Studio", exact: true }).click();
  await page.getByRole("button", { name: "Submit consumer workspace", exact: true }).click();
  await expect(page.getByLabel("Submitted consumer workspace", { exact: true })).toHaveText("studio");
  await page.getByRole("button", { name: "Reset consumer workspace", exact: true }).click();
  await expect(requiredSelect).toContainText("Choose a workspace");
  await expect(page.getByRole("combobox", { name: "Native consumer workspace", exact: true })).toHaveJSProperty("tagName", "SELECT");
  const canceledSelect = page.getByRole("combobox", { name: "Canceled reset workspace", exact: true });
  await canceledSelect.click();
  await page.getByRole("option", { name: "Personal", exact: true }).click();
  await page.getByRole("button", { name: "Prevent workspace reset", exact: true }).click();
  await expect(canceledSelect).toContainText("Personal");
  await expect(page.getByRole("combobox", { name: "Canceled controlled workspace", exact: true })).toContainText("Personal");
  const externalSelect = page.getByRole("combobox", { name: "External consumer workspace", exact: true });
  await externalSelect.click();
  await page.getByRole("option", { name: "Personal", exact: true }).click();
  await page.getByRole("button", { name: "Reset external workspace", exact: true }).click();
  await expect(externalSelect).toContainText("Studio");
  const validateBoth = page.getByRole("button", { name: "Validate both workspaces", exact: true });
  const firstRequired = page.getByRole("combobox", { name: "First required workspace", exact: true });
  const secondRequired = page.getByRole("combobox", { name: "Second required workspace", exact: true });
  await validateBoth.click();
  await expect(firstRequired).toBeFocused();
  await firstRequired.click();
  await page.getByRole("option", { name: "Studio", exact: true }).click();
  await validateBoth.click();
  await expect(secondRequired).toBeFocused();
  const invalidInput = page.getByLabel("Invalid email", { exact: true });
  await invalidInput.focus();
  const invalidStyles = await invalidInput.evaluate(element => {
    const shell = getComputedStyle(element.parentElement);
    const error = getComputedStyle(element.closest('[data-hulmio-ui="input"]').querySelector(".field-error"));
    return { border: shell.borderTopColor, ring: shell.outlineColor, error: error.color, shadow: shell.boxShadow };
  });
  assert.equal(invalidStyles.border, invalidStyles.error);
  assert.equal(invalidStyles.ring, invalidStyles.error);
  assert.equal(invalidStyles.shadow, "none");
  const alertTrigger = page.getByRole("button", { name: "Delete consumer file", exact: true });
  await alertTrigger.click();
  const alertDialog = page.getByRole("alertdialog", { name: "Delete consumer file?" });
  await expect(alertDialog.getByRole("button", { name: "Cancel", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(alertTrigger).toBeFocused();
  await expect(page.getByLabel("Consumer deleted", { exact: true })).toHaveText("false");
  await alertTrigger.click();
  await alertDialog.getByRole("button", { name: "Delete file", exact: true }).click();
  await expect(page.getByLabel("Consumer deleted", { exact: true })).toHaveText("true");
  const searchInput = page.getByRole("searchbox", { name: "Consumer search" });
  await searchInput.fill("design");
  await searchInput.press("Enter");
  await expect(page.getByLabel("Consumer query", { exact: true })).toHaveText("design");
  assert.equal(await searchInput.evaluate(element => getComputedStyle(element.parentElement).display), "flex");
  await expect(page.getByRole("list", { name: "Consumer files" }).getByRole("listitem")).toHaveCount(1);
  const simpleTable = page.getByRole("table", { name: "Consumer invoices" });
  await expect(simpleTable.getByRole("columnheader")).toHaveCount(2);
  await expect(simpleTable.getByRole("rowheader")).toHaveCount(2);
  assert.equal(await simpleTable.evaluate(element => getComputedStyle(element).borderCollapse), "collapse");
  const pill = await page.getByTestId("pill-design").evaluate(element => getComputedStyle(element).borderRadius);
  const brutalist = await page.getByTestId("brutalist-design").evaluate(element => getComputedStyle(element).borderRadius);
  const gradient = await page.getByTestId("gradient-design").evaluate(element => getComputedStyle(element).backgroundImage);
  assert(parseFloat(pill) > parseFloat(brutalist), "Named button designs should retain different shapes.");
  assert(gradient.includes("gradient"), "GradientButton should carry its actual visual design.");
  const field = page.getByLabel("Consumer field", { exact: true });
  const hint = await field.getAttribute("aria-describedby");
  assert(hint && await page.locator(`[id="${hint}"]`).textContent() === "A connected description");
  assert.equal(await page.getByLabel("Filled consumer input").evaluate(element => getComputedStyle(element).fontFamily), await page.locator("body").evaluate(element => getComputedStyle(element).fontFamily));
  const nestedDescriptions = await page.getByLabel("Outer consumer label", { exact: true }).evaluate(element => {
    const ids = element.getAttribute("aria-describedby").split(/\s+/);
    return ids.map(id => ({ count: document.querySelectorAll(`[id="${id}"]`).length, text: document.getElementById(id)?.textContent }));
  });
  assert.deepEqual(nestedDescriptions.map(item => item.text).sort(), ["Inner consumer hint", "Outer consumer hint"]);
  assert(nestedDescriptions.every(item => item.count === 1), "Nested Field descriptions must have unique IDs.");
  const upload = page.getByLabel("Resettable upload", { exact: true });
  await upload.setInputFiles({ name: "large.txt", mimeType: "text/plain", buffer: Buffer.from("123") });
  assert.equal(await upload.evaluate(element => element.checkValidity()), false);
  await page.getByRole("button", { name: "Reset consumer upload", exact: true }).click();
  assert.deepEqual(await upload.evaluate(element => ({ valid: element.checkValidity(), files: element.files.length })), { valid: true, files: 0 });
  const mixed = page.getByLabel("Mixed consumer checkbox", { exact: true });
  assert.equal(await mixed.evaluate(element => element.indeterminate), true);
  await mixed.click();
  assert.deepEqual(await mixed.evaluate(element => ({ mixed: element.indeterminate, checked: element.checked, aria: element.getAttribute("aria-checked") })), { mixed: false, checked: true, aria: null });
  assert.equal(await page.getByLabel("Stepped consumer slider").evaluate(element => element.value === element.parentElement.querySelector("output").value), true);
  const notifications = page.getByRole("switch", { name: "Consumer notifications" });
  await notifications.uncheck();
  assert.equal(await notifications.isChecked(), false);
  await page.getByLabel("Consumer interests", { exact: true }).selectOption(["design", "code"]);
  assert.equal(await page.getByLabel("Selected interests").textContent(), "design,code");
  const tags = page.getByLabel("Consumer tags", { exact: true });
  await tags.fill("release"); await tags.press("Enter");
  assert.equal(await page.getByLabel("Consumer tag values").textContent(), "release");
  const tablist = page.getByRole("tablist", { name: "Consumer perspectives" });
  await tablist.getByRole("tab", { name: "First", exact: true }).focus(); await page.keyboard.press("ArrowRight");
  assert.equal(await tablist.getByRole("tab", { name: "Third", exact: true }).getAttribute("aria-selected"), "true");
  const table = page.getByRole("table", { name: "Consumer tasks" });
  await table.getByRole("checkbox", { name: "Select row a", exact: true }).check();
  await table.getByRole("button", { name: /Title/ }).click();
  assert.equal(await page.getByLabel("Selected row identities").textContent(), "a");
  await page.getByRole("button", { name: "Next table page" }).click();
  assert.equal(await table.getByRole("checkbox", { name: "Select row a", exact: true }).isChecked(), true);
  await page.evaluate(() => { delete document.documentElement.dataset.hulmioTheme; });
  const trigger = page.getByRole("button", { name: "Open scoped dialog", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Scoped consumer dialog", exact: true });
  await dialog.waitFor();
  assert.equal(await dialog.evaluate(element => getComputedStyle(element).backgroundColor), "rgb(30, 40, 33)");
  assert.equal(await dialog.evaluate(element => parseFloat(getComputedStyle(element).fontSize)), 15);
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await dialog.locator(".dialog-description").evaluate(element => parseFloat(getComputedStyle(element).fontSize)), 14);
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.keyboard.press("Escape"); await dialog.waitFor({ state: "hidden" });
  await expect(trigger).toBeFocused();
  await page.getByRole("button", { name: "Open consumer commands", exact: true }).click();
  await page.getByRole("searchbox", { name: "Search commands", exact: true }).fill("Run");
  await page.keyboard.press("Enter");
  await page.getByRole("dialog", { name: "Commands", exact: true }).waitFor({ state: "hidden" });
  assert.equal(await page.getByLabel("Consumer command action").textContent(), "ran");
  assert.equal(await page.getByLabel("Consumer submissions").textContent(), "0");
  assert.equal(await page.getByRole("dialog", { name: "Commands", exact: true }).count(), 0);
  const popoverTrigger = page.getByRole("button", { name: "Open transformed consumer popover", exact: true });
  await popoverTrigger.click();
  const popover = page.getByRole("dialog", { name: "Transformed consumer popover", exact: true });
  await expect(popover).toBeVisible();
  await expect.poll(() => popover.evaluate(element => {
    const bounds = element.getBoundingClientRect();
    return bounds.top >= 0 && bounds.bottom <= innerHeight + 1 && bounds.left >= 0 && bounds.right <= innerWidth + 1;
  })).toBe(true);
  await page.keyboard.press("Escape");
  await expect(popoverTrigger).toBeFocused();
  await page.getByRole("button", { name: "First consumer tool", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("button", { name: "Last consumer tool", exact: true })).toBeFocused();
}
