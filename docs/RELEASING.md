# Mula local package papuntang npm

Kasalukuyang local-only ang Hulmio UI. Hindi nagpapatakbo ng `npm publish` ang
build, pack, o test commands. `private: true` ang parehong gallery at library.

## 1. Tapusin ang local validation

Sa `hulmio` folder:

```powershell
npm.cmd run build
npm.cmd test
npm.cmd run check:package
npm.cmd audit
```

Ang independent package check ay gumagawa ng `.tgz`, sinusuri ang file list,
ini-install iyon sa `.package-check`, bine-build ang documented example gamit ang
public types, at sinusubukan sa Chrome nang walang gallery CSS o Tailwind plugin.
Kasama sa consumer checks ang advertised exports, magkakaibang button designs,
nested field descriptions, upload reset validity, mixed checkbox activation,
range step output, multi-select, tags, keyboard tabs, stable table selection at
scoped dialog themes. I-review ang [coverage at API limits](COMPONENT-COVERAGE.md)
bago mangako ng support sa users. Kailangan ng registry access sa unang consumer
dependency install. Ang audit ay
registry advisory check; hindi ito kapalit ng code review at behavior tests.

## 2. I-review ang piniling pangalan, visibility, at license

Pinili na ng owner ang **Hulmio** at package name na **`hulmio-ui`**. Unscoped
package ang kasalukuyang setup, para sa planong public release. I-check muli ang
npm availability bago ang publication; hindi reservation ang local package name.
Kung private registry distribution ang pipiliin, kailangan ng scoped name gaya ng
`@your-username/hulmio-ui`. Sa ganitong pagbabago, sabay i-update ang workspace,
imports, aliases, scripts, at examples, saka ulitin ang validation.

Public package: mada-download ang package files ng kahit sino. Private registry
package: may access control at registry account requirements. Ang npm private
packages ay may subscription requirements; i-check ang kasalukuyang terms bago
pumili. [npm private package guide](https://docs.npmjs.com/creating-and-publishing-private-packages/)

`private: true` sa package.json ay **publish guard**, hindi registry access control
at hindi encryption. Maaaring i-install ng ibang tao ang `.tgz` kapag naibigay ang
file sa kanila. `UNLICENSED` muna ang metadata; pumili ng license bago ipamahagi
bilang public library.

## 3. Protektahan ang publishing account

Gumawa o gumamit ng sariling npm account, i-verify ang email, at enable ang 2FA.
Ikaw ang gagawa ng personal na verification; huwag ilagay ang password, recovery
codes, o npm credentials sa chat, source code, o package.

Para sa unang release, gamitin ang interactive login at publishing flow na may
2FA. Kapag kailangan na ng automated releases, saka mag-set up ng supported
trusted publishing workflow. Huwag gumawa ng permanenteng publishing credential
para lang sa local packing.
[npm publishing authentication](https://docs.npmjs.com/requiring-2fa-for-package-publishing-and-settings-modification/)

## 4. I-review ang mismong ipapamahagi

Pagkatapos ng build, tingnan ang package file list:

```powershell
npm.cmd pack --workspace hulmio-ui --dry-run --json --ignore-scripts
```

Allowlist ang `files` field: `dist` at package README lang ang intended payload,
kasama ang npm-required metadata. Walang `.env`, `.npmrc`, API keys, gallery app,
test output, o personal files. I-review pa rin ang compiled contents bago release.
[npm pack](https://docs.npmjs.com/cli/v11/commands/npm-pack/)

## 5. Ihanda ang release

Pagkatapos ma-review ang piniling name at license at matapos ang checks, saka aalisin
ang `private: true` **sa library lang**. Mananatiling private ang gallery app.
Isulat ang changelog at piliin ang version. Local preview ang `0.1.0`; huwag munang
ipangako ang stable API. Pagkatapos ng unang stable `1.0.0`, gamitin ang patch para
sa compatible fixes, minor para sa compatible additions, at major para sa breaking
changes. [npm semantic versioning](https://docs.npmjs.com/about-semantic-versioning/)

Saka lang magpatakbo ng actual publish command gamit ang piniling visibility.
Walang actual publishing command na kailangan sa kasalukuyang local workflow.

## 6. I-verify ang registry release at isabay ang website

Pagkatapos ng future publication, mag-install mula sa registry sa isang malinis
na consumer project at ulitin ang sample. Saka baguhin ang website mula “Local
preview” patungong published status at palitan ang `.tgz` instructions ng verified
registry install command. Mag-deploy ng website kapag kasama na iyon sa release.

Hiwalay ang website hosting at npm package publishing. Ang pag-build ng website
ay hindi awtomatikong nagpa-publish ng npm package.
