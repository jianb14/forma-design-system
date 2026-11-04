# Hulmio naming research

**Owner decision, 2026-11-04:** Hulmio ang piniling brand; `hulmio-ui` ang local
package name. In-update ang website, H mark/favicon, package identity, imports,
styles, at current guides. Historical findings below retain the names searched.
The name is not yet reserved or published on npm.

Search date: 2026-11-04, Asia/Manila.

## Finding

May existing design systems at UI libraries nang gumagamit ng **Forma** o
**Forma UI**. May isang particularly relevant na npm package dahil React
component library rin ang distribution model nito.

| Existing project | Ano ito | Primary source |
| --- | --- | --- |
| `@aryan_sehgal/forma-ui` | Published React 19 component library with TypeScript, CSS tokens, and Radix interaction primitives | [npm package](https://www.npmjs.com/package/@aryan_sehgal/forma-ui) |
| Forma 36, Contentful | Design system with React components, tokens, and Figma libraries | [Official website](https://f36.contentful.com/) |
| Forma UI, julianaramirezc | React + TypeScript + pure CSS design-system portfolio project with component showcase | [GitHub repository](https://github.com/julianaramirezc/forma-ui) |
| Forma, Visiona Silva | CSS design system and site-building system with themes, semantic tokens, and blocks | [GitHub repository](https://github.com/VisionaSilva/forma) |
| FORMA | Brand identity and design-system website with component documentation | [Project website](https://forma-ds.vercel.app/) |

The npm package description was available through the search index. Direct opening
of its npm page returned HTTP 403 in the research tool. The Contentful website,
Visiona repository, and FORMA brand website were directly readable. The Juliana
repository README was available in search results.

## Ano ang ibig sabihin para sa project natin?

- Confirmed ang overlap sa pangalan at product category.
- Pinakamalapit sa plano natin ang React library sa npm. Similar ang general
  architecture: React components, TypeScript types, CSS tokens, at Radix.
- Common patterns ang mga iyon. Hindi nito pinapatunayang identical o copied ang
  implementation, visual design, o branding. Walang full visual/code comparison
  na ginawa sa research na ito.
- Hindi pa na-verify ang availability o ownership ng exact npm scope na `@forma`,
  at hindi ibig sabihin ng missing package na pag-aari na natin ang pangalan.

## Recommendation

Pumili ng mas distinctive na public name bago npm publication para mas madaling
hanapin at makilala ang sariling library. Research recommendation ito para sa
branding at discoverability; hindi ito trademark clearance.

Forma ang working name noong unang search. Pinili na ngayon ang Hulmio; sundin ang
[release guide](RELEASING.md) para sa susunod na registry-publication steps.

## Replacement shortlist · 2026-11-04

Recommendation: **Hulmio UI**, a coined name inspired by “hulma.” Bagay sa library
ng reusable building blocks, maikli, at puwedeng bumagay sa existing visual style.
Backup: **Tugmio UI**, inspired by “tugma,” para sa consistent components at themes.

| Candidate | Direct npm registry checks | Direct GitHub repository-name search |
| --- | --- | --- |
| Hulmio UI | `hulmio` and `hulmio-ui`: HTTP 404 | `hulmio in:name`: 0 repositories; search complete |
| Tugmio UI | `tugmio` and `tugmio-ui`: HTTP 404 | `tugmio in:name`: 0 repositories; search complete |

Checks used public unauthenticated GET requests:

- [Hulmio UI registry endpoint](https://registry.npmjs.org/hulmio-ui)
- [Tugmio UI registry endpoint](https://registry.npmjs.org/tugmio-ui)
- [Hulmio repository-name query](https://api.github.com/search/repositories?q=hulmio%20in%3Aname)
- [Tugmio repository-name query](https://api.github.com/search/repositories?q=tugmio%20in%3Aname)

Targeted web and indexed GitHub/npm searches did not surface an existing UI library
under either name. A third candidate, Hiblay, was set aside because a GitHub name
search returned `herart36-dot/Hiblaya` as a near match. Common-word candidates and
names with existing brand matches were not selected for this shortlist.

These results establish only what the queries returned on the check date. HTTP
404 is not a reservation or guarantee npm will accept a future publication. Domain
registration, social handles, trademarks, private repositories, and unindexed
projects were not checked. The owner subsequently selected Hulmio; see the decision
at the top of this document for the current project status.
