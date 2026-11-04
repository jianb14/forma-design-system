import { mkdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
await mkdir(new URL("../artifacts/", import.meta.url), { recursive: true });
if (!process.env.npm_execpath) throw new Error("Use npm run pack:ui to run this script.");
const result = spawnSync(process.execPath, [process.env.npm_execpath, "pack", "--workspace", "hulmio-ui", "--pack-destination", "artifacts", "--ignore-scripts"], { cwd: root, stdio: "inherit" });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
