---
name: hulmio-release
description: "Prepare and verify Hulmio UI package releases, including artifact contents, consumer checks, versioning, and release documentation. Use for Hulmio release-readiness, packaging, or npm-publication requests."
---

# Hulmio Release

Produce a reviewable Hulmio release candidate and a clear record of the evidence.
Perform publication or deployment only when the user's request authorizes that
external action; release preparation by itself authorizes local preparation.

## Establish current state

Locate the repository with root package `hulmio-design-system`; the checkout may
be named `forma`. Read the current root and `packages/ui/package.json` manifests,
`docs/RELEASING.md`, the package README, and the relevant work-log entry. Determine
the requested target: local tarball, registry publication, or website deployment.
Use the current package name/version and existing user decisions rather than
reopening decisions already made or assuming an older milestone is current.

The initial package name is `hulmio-ui`. Its local preview has a `private: true`
publish guard and an `UNLICENSED` marker. Read the actual manifests before acting:
the guard does not implement registry access control, and the marker does not
select a public redistribution license.

## Prepare the candidate

Keep the release within the requested scope. If a version changes, update the
workspace dependency/lockfile and affected installation examples together. Check
the actual tarball filename against the website guide and package README.
Document compatibility and breaking changes without claiming untested frameworks
or React versions. Review `exports`, TypeScript declarations, CSS entry points,
`sideEffects`, and React peer dependencies when they changed.

Keep the gallery app private. Change a library publication guard, distribution
visibility, or license only as part of the user's authorized release choices.
Complete the local artifact and checks before requesting any genuinely missing
account setup or publication decision.

## Collect release evidence

Run missing or relevant checks from the repository root, using `npm.cmd` on
Windows PowerShell when required. Reuse recorded successful checks only while
their source, dependency inputs, and artifact still match the candidate.

- `npm run build`: library JS/CSS/types and the production gallery.
- `npm test`: website interactions, responsive routes, branding, and usage guide.
- `npm run check:package`: builds/packs the library, installs the actual archive in
  a fresh consumer, checks public types and standalone CSS, and runs browser checks.
- `npm audit`: review reported dependency advisories and their relevance. Assess
  findings without silently applying broad or breaking dependency upgrades.

The consumer check needs registry access for installation and installed Google
Chrome. If a check cannot run, record the precise limitation instead of reporting
success. Avoid repeating unchanged suites solely to generate more evidence.

Inspect `npm pack --workspace hulmio-ui --dry-run --json --ignore-scripts`, adjusting
the workspace name if the manifest changed. Review the package's `files` allowlist
and compiled contents. The current intended payload is metadata, package README,
and `dist` output, including JSON required by the public theme types. Credentials,
local configuration, gallery source, test results, and consumer fixtures must not
enter the release archive.

Record the actual artifact path, version, file count, size, checksum, completed
checks, and material limits in `docs/WORK-LOG.md`. Use the user's local date.

## Registry publication, when requested

Verify the requested name is usable by the publishing account and confirm the
chosen visibility/license from the session and repository. A prior registry 404
does not reserve a name. Use the supported npm authentication flow; account
verification and 2FA are personal setup. Do not put credentials in project files,
command arguments, or output.

After an authorized publish, verify the registry version and install that version
in a consumer before changing the website's local-preview instructions to registry
instructions. If publication fails or times out, inspect the result and registry
state before retrying; do not blindly repeat a possibly completed publication.
Report the exact remaining issue if account setup or another required decision is
missing, while retaining the prepared local artifact.

Website hosting is a separate release action. Keep existing hosting identity and
audience, and use the available hosting workflow only when deployment is requested.
Report local preparation, npm publication, and website deployment as distinct
verified results.
