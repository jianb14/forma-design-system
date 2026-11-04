# Hulmio skills and workflow plan

Updated: 2026-11-04 (Asia/Manila). The owner approved the original three skills
and an additional seven collections/tools. The new set contains 26 installed
skill folders; the original Hulmio workflows and security skill are preserved.
See [source versions and verification](SKILLS-SOURCES.json) for the exact inventory.

## Ano ang skill?

Ang Codex skill ay reusable instructions at resources para sa isang workflow.
Ang actual tools ang nagbu-build, nagte-test, at nagsusuri ng package. Makakatulong
ang skill para consistent ang proseso, pero actual command results pa rin ang
evidence na gumagana ang project.
[Official OpenAI skills documentation](https://developers.openai.com/plugins/concepts/skills)

## Core coverage para sa kasalukuyang Hulmio

| Area | Skill or workflow | Current status | Gamit |
| --- | --- | --- | --- |
| UI design and theme consistency | `frontend-design`; added Taste and UI UX Pro Max | Original skill available; additions installed | Component appearance, responsive layout, visual states, typography, and token usage |
| UI and accessibility review | `web-design-guidelines` | Available in this session | Review semantics, keyboard interaction, focus, labels, responsive behavior, and usability; dedicated accessibility validation is still needed |
| Browser QA | Existing Playwright tests; optional curated `playwright` skill | Test tool and 9 website tests already exist; CLI skill is not installed | Exercise interactions, themes, mobile layouts, screenshots, and fresh consumer behavior |
| Security review | Curated `security-best-practices`; Cloudflare `security-audit` | Both installed; full audit has a Windows limitation described below | Explicit security guidance and source review; continue dependency and release-file checks separately |
| Component engineering and documentation | Custom `hulmio-components` | Created, validated, and installed | Typed React APIs, refs, controlled/uncontrolled state, shared CSS, gallery/package parity, runnable examples, and documentation updates |
| Package and release readiness | Custom `hulmio-release` | Created, validated, and installed | Exports/types/peer dependencies, package contents, build and consumer verification, version/changelog review, and publishing prerequisites |

The last two are project-specific skills authored for Hulmio. Their maintained
sources are `skills/hulmio-components/` and `skills/hulmio-release/` in this repo.
Installed copies are in the user's Codex skills directory alongside the official
security skill. Normal automatic skill selection is enabled for the Hulmio skills.

## Additional set approved by the owner

Ang mga ito ay **user-scoped Codex skills**: magagamit din sa ibang projects ng
parehong user. Ang app at npm package ay hindi nangangailangan ng mga skill files
para tumakbo. Magiging available ang bagong skills sa susunod na conversation turn.

| Collection/source | Installed skills | Gamit sa Hulmio |
| --- | --- | --- |
| [Superpowers](https://github.com/obra/superpowers) | 15: `brainstorming`, `diagnosing-superpowers`, `dispatching-parallel-agents`, `executing-plans`, `finishing-a-development-branch`, `receiving-code-review`, `requesting-code-review`, `subagent-driven-development`, `systematic-debugging`, `test-driven-development`, `using-git-worktrees`, `using-superpowers`, `verification-before-completion`, `writing-plans`, `writing-skills` | Structured planning, debugging, implementation, and review workflows |
| [Ponytail](https://github.com/DietrichGebert/ponytail) | `ponytail` (core skill) | Small, complete changes that reuse existing code |
| [Cloudflare Security Audit](https://github.com/cloudflare/security-audit-skill) | `security-audit`, including its references, schemas, and validators | Security guidance; a full audit requires compatible execution controls |
| [Taste Skill](https://github.com/Leonxlnx/taste-skill) | `design-taste-frontend`, including scripts, reference library, and assets | Visual direction, page/app review, and browser-based polish |
| [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | `ui-ux-pro-max`, including the local search scripts and data | Targeted UX, accessibility, style, and React guidance |
| [Vercel Agent Skills](https://github.com/vercel-labs/agent-skills) | `vercel-react-best-practices`, `vercel-composition-patterns` | React performance and reusable component interfaces |
| [Matt Pocock Skills](https://github.com/mattpocock/skills) | Selected: `diagnosing-bugs`, `tdd`, `code-review`. Supporting: `codebase-design`, `setup-matt-pocock-skills` | Debugging, behavior tests, code review, and their required vocabulary/setup references |

Vercel's `web-design-guidelines` was already available, so no duplicate was added.
The Vercel installation folder names are `react-best-practices` and
`composition-patterns`; their frontmatter/invocation names have the `vercel-` prefix.
Ponytail's extra audit/review/debt commands and the rest of Matt Pocock's collection
were not part of this selected installation. Caveman, Graphify, and Mem0 were not
in the owner's final requested set.

### Paano natin pipiliin ang gagamitin

- Shared component work: start with `hulmio-components`; consult Vercel composition
  or performance guidance for the relevant concern.
- A larger planned feature: use Superpowers for the process. Its workflow overlaps
  Matt Pocock's testing/debugging/review skills; pick the appropriate process for
  the task instead of running every collection as a checklist.
- A hard bug or requested test-first change: use the relevant Matt Pocock skill.
- Visual work: use Taste for composition and critique, or UI UX Pro Max for a
  targeted reference search. Existing Hulmio tokens, branding, and requested scope
  remain the project constraints.
- Security questions: use guidance mode. A full audit is a separate requested task
  with the execution requirements below.

This installed skill folders, not CLI packages or lifecycle hooks. No Codex global
configuration was rewritten. Matt Pocock's setup helper is installed but its
per-repository issue-tracker/domain setup has not been run. When that configuration
is needed, use the actual existing project workflow and the owner's preferences.

### Compatibility adjustments and verification

The official `skill-installer` downloaded the selected folders at pinned commit
SHAs into an ignored staging directory. Every downloaded file was checked against
the corresponding GitHub git-blob hash before preparing the installed copies.
All 26 installed folders pass `quick_validate.py` and match their prepared copies
by file/tree hashes. The previous three user skills retain their original hashes.

Three small Codex compatibility adjustments are recorded in `SKILLS-SOURCES.json`:

- Ponytail's unsupported `argument-hint` frontmatter moved to metadata; its
  workflow instructions were preserved.
- Matt Pocock's setup helper keeps its upstream manual-only invocation policy
  through `agents/openai.yaml`; the unsupported source field moved to metadata.
- UI UX Pro Max's 11 Claude-plugin-specific command paths now use the absolute
  directory of its installed skill. Search scripts and data were preserved.

Local checks: Python syntax passed for 19 files; Node syntax passed for 15 files.
UI UX Pro Max returned results for a focused keyboard/focus query and a React
controlled-input query. Taste generated a direction sheet using its bundled
library in an ignored smoke-test directory. These checks do not change Hulmio's
actual design. The Taste browser inspector and complete AI workflows were not
exercised by this installation.

**Windows limitation: Cloudflare's validator suite did not pass here.** It reported
65 tests: 46 passed, 7 failed, and 12 skipped. The failing CLI checks encounter
`OS no-follow and nonblocking input protection is unavailable` on this Windows
environment. The validators were preserved rather than weakening their safeguards.
Security guidance is available, but full audit execution is not verified on this
machine. A full audit needs a compatible, appropriately sandboxed environment;
the skill requires network isolation, restricted filesystem/environment access,
and resource limits. Merely having the skill installed does not provide those
controls or mean that Hulmio has passed an audit.

The source manifest records versions, paths, local adaptations, hashes, and check
results. For updates, review the new upstream revision and reapply only necessary
compatibility adjustments before replacing the installed copy; this installation
does not automatically update with the repositories.

## Paano gamitin

Sa **chat**, puwedeng gamitin ang mga halimbawa sa ibaba. Hindi ito terminal commands.

```text
$hulmio-components Ihanda ang Badge bilang reusable package component, kasama ang gallery example, docs, at checks.

$hulmio-release I-check ang local package release readiness at ilista ang verified artifact at kulang pa bago publication.

$security-best-practices I-review ang security ng Hulmio React/TypeScript package at ipaliwanag ang findings.

$vercel-composition-patterns I-review ang component interfaces ayon sa existing Hulmio conventions.

$ui-ux-pro-max Suriin ang keyboard focus at form feedback habang pinapanatili ang Hulmio tokens.

$design-taste-frontend I-review ang visual composition ng Hulmio website at panatilihin ang existing brand.
```

Ang component workflow ay para sa shared component/theme changes at docs. Ang
release workflow ay para sa reviewable artifact at validation; ang actual npm
publication at website deployment ay hiwalay na requested actions. Ang pag-install
ng security skill ay hindi nangangahulugang may naganap nang full security audit.

Dedicated automated accessibility checks and CI remain future engineering work
for public-release preparation. This installation did not add a pipeline or
change the current component API.

Hulmio already has build, pack, website tests, an independent package check,
documentation, and a publish guard. These remain useful without installing a
browser-automation skill. The curated `playwright` skill is oriented to terminal
CLI browser automation, rather than authoring regression test files; its bundled
wrapper is a shell script, so Windows invocation needs to be checked before use.
[Official curated Playwright skill](https://github.com/openai/skills/blob/main/skills/.curated/playwright/SKILL.md)

The security skill supports JavaScript/TypeScript and is designed for explicit
security guidance or reviews. It does not replace npm account protection,
dependency advisory checks, or inspecting the distributed archive.
[Official curated security skill](https://github.com/openai/skills/blob/main/skills/.curated/security-best-practices/SKILL.md)

## Later, when relevant

- Figma skills: useful if a Figma library becomes part of the source of truth.
- `gh-fix-ci`: useful for debugging failing GitHub Actions PR checks once CI exists;
  it is not a tool that creates the initial release pipeline automatically.
- Image generation: useful for raster illustrations or marketing imagery. The
  existing Hulmio mark and favicon are native SVG assets.
- Backend skills: relevant if a later product adds accounts or stored server data.

The relevant npm package remains a UI library. Keep the first workflow set focused
on producing, validating, documenting, and distributing components.

## Source and status notes

The original three installed skills passed `quick_validate.py`. Both custom skills also
have UI metadata in `agents/openai.yaml`; their installed files were checked
against the repository sources by hash. Validation checks skill structure and
metadata, not a guarantee of future model behavior.

When editing a custom skill, update its repository source, validate it again, and
sync the changed files into its installed Codex skill folder. The installed copies
are not symlinks and do not update automatically when repo files change. Do not
overwrite unrelated user modifications during a later sync.

The official curated catalog was fetched with the skill-installer's read-only
`list-skills.py --format json` helper. It includes `playwright`,
`security-best-practices`, Figma skills, and `gh-fix-ci`. Its user-install
annotations are not a complete inventory of system, plugin, or `.agents` skills;
the session catalog and local files confirm which skills are already available.

No GitHub workflow or Changesets directory was found in the checked project.
Current tests cover several accessibility behaviors; a complete accessibility
audit and comprehensive security review have not been performed by this inventory.
