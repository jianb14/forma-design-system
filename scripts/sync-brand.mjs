import { readFile, writeFile } from "node:fs/promises";

const brand = JSON.parse(await readFile(new URL("../src/lib/brand.json", import.meta.url), "utf8"));
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><title>${brand.name}</title><rect width="64" height="64" rx="16" fill="${brand.faviconBackground}"/><path d="${brand.markPath}" fill="${brand.faviconForeground}"/></svg>\n`;
await writeFile(new URL("../public/hulmio-icon.svg", import.meta.url), icon);
