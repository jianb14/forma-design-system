# Simulan dito: Hulmio sa ibang project

Ito ang gabay mo bilang owner. Hindi kailangan kabisado mo na ang npm packaging.
Basahin muna ang kasalukuyang status, saka sundan ang local installation.

## Nasaan na tayo?

May dalawang gamit na ngayon ang repo:

| Bahagi | Gamit |
| --- | --- |
| Website / gallery | Makita at subukan ang designs, themes, at component variations |
| `packages/ui` | Component code na puwedeng i-install sa ibang React app |

May **64 core component families**, **89 live package examples**, at **8 named
button designs** na ngayon. Lahat ng families ay may totoong export sa `hulmio-ui`.
Piliin ang design, kopyahin ang import, saka piliin ang variant, size at state.
Halimbawa, magkaibang design ang `PillButton` at `BrutalistButton`, pero parehong
puwedeng gumamit ng `variant="primary"`, `size="lg"`, `loading` at `disabled`.

Ang mas lumang app arrangements ay nasa hiwalay na **Reference compositions**.
Hindi lahat ng buong arrangement ay isang component import. Nasa
[component coverage](COMPONENT-COVERAGE.md) ang lahat ng exports at limits.

**Status: local preview, version 0.1.0.** Hulmio na ang piniling pangalan, at
`hulmio-ui` ang package name. Wala pang npm publication o website deployment sa
yugtong ito; hindi pa reserved ang pangalan sa npm.

`hulmio` na ang pangalan ng checkout folder sa computer mo. Ang website,
imports, package, theme attributes, at downloads ay Hulmio rin. Magkaiba ang
local folder name, GitHub repository name, at npm package name; hindi awtomatikong
nagbabago ang isa kapag pinalitan ang iba.

| Pangalan | Kasalukuyang gamit |
| --- | --- |
| Local folder | `Design System/hulmio` |
| GitHub repository | [`jianb14/hulmio-design-system`](https://github.com/jianb14/hulmio-design-system) |
| Installable npm package | `hulmio-ui` (local preview) |

Kapag may lumang `forma/...` na tab o terminal sa VS Code pagkatapos ng rename,
buksan muli ang file sa bagong folder at gumamit ng bagong terminal. Ang Git
history ay kasama sa checkout; hindi kailangan gumawa ng bagong repository.

## Unang gawin: tingnan ang website

Sa terminal, pumunta sa `hulmio` folder. Kung nasa `Design System` ka:

```powershell
cd hulmio
npm.cmd install
npm.cmd run dev
```

Buksan ang Local URL na ipapakita ng terminal. Homepage muna na may navbar.
Piliin ang **Components** para lumabas ang sidebar na may listahan ng 64 families.
Buksan ang Button para subukan ang walong designs; may sarili silang controls at
**Copy import example**. Piliin ang **Documentation** para sa installation steps.
Google Sans Flex ang primary font, Instrument Serif ang display accent, at mas
malaki na ang base text. Sa ibang
terminal puwede mong patakbuhin ang commands sa ibaba habang bukas ang website.

Ang Node.js at npm ang tools na kailangan sa computer. Ang kasalukuyang local
environment ay Node 24.21.0 at npm 11.19.0. Gumamit ng modern Node version na
compatible sa Vite 7; huwag basta mag-upgrade ng dependencies habang sinusubukan
ang unang install.

## Gawin ang installable file

Sa terminal ng `hulmio`:

```powershell
npm.cmd run pack:ui
```

Magkakaroon ng `artifacts/hulmio-ui-0.1.0.tgz`. Parang naka-zip na installable npm
package ang file na ito. Kasama ang compiled JavaScript, CSS, TypeScript types,
package metadata, at installation guide. Hindi kasama ang buong website.

## Gamitin sa ibang React project

Kopyahin ang `.tgz` sa folder ng ibang project. Dapat may React at React DOM na
compatible sa `^19.1.1`. Sa terminal ng **ibang project**, patakbuhin:

```powershell
npm.cmd install ./hulmio-ui-0.1.0.tgz
```

Sa app code:

```tsx
import { PillButton, BrutalistButton, Input } from "hulmio-ui";
import "hulmio-ui/styles.css";

export default function App() {
  return (
    <div>
      <Input label="Email" type="email" />
      <PillButton type="button">Save</PillButton>
      <BrutalistButton variant="outline">See details</BrutalistButton>
    </div>
  );
}
```

Isang beses lang i-import ang CSS sa app entry. Hindi kailangan ng Tailwind setup
para sa package components. Makikita ang complete Modal example at props sa
[package guide](../packages/ui/README.md).

Pang-React web app ang preview na ito. Hindi pa nabe-verify ang React 18, React
Native, Vue, o framework-specific SSR integration.

## Paano tutugma ang themes?

Parehong `packages/ui/src/themes.json` ang pinanggagalingan ng package colors at
semantic color swatches sa website. Ang build command ang gumagawa ng theme CSS;
huwag mano-manong i-edit ang generated `tokens.css`.

Sa ibang app, ilagay ang theme sa `html`:

```html
<html data-hulmio-theme="dark">
```

Puwede ang `light`, `dark`, at `contrast`. Kapag nasa `html` ang theme, kasama ang
Modal na inilalagay ng Radix sa `body`. Ang fonts ay manggagaling sa app mo. Para
kapareho ng gallery, i-load ang Google Sans Flex at itakda ang
`--hulmio-font-family: "Google Sans Flex", sans-serif` sa `:root`.
Instrument Serif ang secondary display accent. Nasa `public/fonts/` ang
self-hosted website font files, sources, at OFL notices; hindi kasama ang fonts
sa UI package. Puwede ring gamitin ang sariling font ng ibang app.

## Kapag may binago tayo sa component

### Mula sa dating local Forma package

Kung na-install mo na ang lumang `@forma/ui` archive sa ibang project, alisin muna
ang dependency na iyon sa **consumer project**, saka i-install ang bagong
`hulmio-ui-0.1.0.tgz`. Palitan ang imports ng `hulmio-ui` at
`hulmio-ui/styles.css`. Ang custom overrides ay `--hulmio-*` na; ang theme
attribute ay `data-hulmio-theme`. Ang lumang archive ay historical artifact lang.

Ang saved theme at local workspace settings sa gallery ay awtomatikong binabasa
mula sa dating keys kapag wala pang bagong Hulmio preference. Iba ito sa consumer
package migration, na kailangan mong gawin sa app na nag-install ng lumang file.

### Pag-edit at pag-verify ng shared components

1. I-edit ang shared source sa `packages/ui/src`, saka tingnan ang gallery.
2. Patakbuhin ang `npm.cmd run build`, `npm.cmd test`, at `npm.cmd run check:package`.
3. I-update ang version at work log kapag gagawa ng bagong release.
4. Gumawa ng bagong `.tgz` at i-install iyon sa consumer project.

Ang na-install na package sa ibang project ay snapshot ng release. Hindi kusang
magbabago ang ibang app dahil lang nag-edit tayo ng source sa Hulmio.

Kapag binago ang `themes.json`, patakbuhin ang `npm.cmd run build:ui` o i-restart
ang dev command para ma-regenerate ang theme CSS. Ang component source edits ay
nakikita ng gallery sa Vite source alias.

### Logo at favicon

Modular H na ang mark ng Hulmio: dalawang rounded pillars at isang connecting
block. Nasa `src/lib/brand.json` ang geometry, wordmark, at favicon colors. Parehong
source ang ginagamit ng website logo, downloaded SVG, at browser icon. Kapag may
binago sa brand source, patakbuhin ang `npm.cmd run brand:sync`; kasama rin ito sa
normal library/site build. `public/hulmio-icon.svg` ang generated favicon.

## Paano mo malalaman ang nagawa?

- [Work log](WORK-LOG.md): ano ang binago, bakit, at anong checks ang pumasa.
- [Package guide](../packages/ui/README.md): ano ang puwedeng i-import at options nito.
- [Release guide](RELEASING.md): account, security, visibility, at publishing steps.
- Website **Using Hulmio**: maikling visual guide at working example.
- [Skills guide](SKILLS-PLAN.md): installed Codex workflows at mga halimbawa ng paggamit sa chat.

Ang susunod mong personal na gawain ay subukan ang local `.tgz` sa isa sa tunay
mong React projects. Para sa npm release sa ibang araw, ikaw ang gagawa ng account,
verification, at security setup. Ihahanda muna natin ang package at dokumentadong
validation bago ka magdesisyon tungkol sa public publishing.
