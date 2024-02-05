# `@shgysk8zer0/aegis-component

Base component using [`@shgysk8zer0/aegis`](https://github.com/shgysk8zer0/aegis)
& [`@shgysk8zer0/aegis-styles`](https://github.com/shgysk8zer0/aegis-styles).

[![CodeQL](https://github.com/shgysk8zer0/aegis-compopnent/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/shgysk8zer0/npm-template/actions/workflows/codeql-analysis.yml)
![Node CI](https://github.com/shgysk8zer0/aegis-compopnent/workflows/Node%20CI/badge.svg)
![Lint Code Base](https://github.com/shgysk8zer0/aegis-compopnent/workflows/Lint%20Code%20Base/badge.svg)

[![GitHub license](https://img.shields.io/github/license/shgysk8zer0/aegis-compopnent.svg)](https://github.com/shgysk8zer0/aegis-compopnent/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/shgysk8zer0/aegis-compopnent.svg)](https://github.com/shgysk8zer0/aegis-compopnent/commits/master)
[![GitHub release](https://img.shields.io/github/release/shgysk8zer0/aegis-compopnent?logo=github)](https://github.com/shgysk8zer0/aegis-compopnent/releases)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/shgysk8zer0?logo=github)](https://github.com/sponsors/shgysk8zer0)

[![npm](https://img.shields.io/npm/v/@shgysk8zer0/npm-template)](https://www.npmjs.com/package/@shgysk8zer0/npm-template)
![node-current](https://img.shields.io/node/v/@shgysk8zer0/npm-template)
![npm bundle size gzipped](https://img.shields.io/bundlephobia/minzip/@shgysk8zer0/npm-template)
[![npm](https://img.shields.io/npm/dw/@shgysk8zer0/npm-template?logo=npm)](https://www.npmjs.com/package/@shgysk8zer0/npm-template)

[![GitHub followers](https://img.shields.io/github/followers/shgysk8zer0.svg?style=social)](https://github.com/shgysk8zer0)
![GitHub forks](https://img.shields.io/github/forks/shgysk8zer0/aegis-compopnent.svg?style=social)
![GitHub stars](https://img.shields.io/github/stars/shgysk8zer0/aegis-compopnent.svg?style=social)
[![Twitter Follow](https://img.shields.io/twitter/follow/shgysk8zer0.svg?style=social)](https://twitter.com/shgysk8zer0)

[![Donate using Liberapay](https://img.shields.io/liberapay/receives/shgysk8zer0.svg?logo=liberapay)](https://liberapay.com/shgysk8zer0/donate "Donate using Liberapay")
- - -

- [Code of Conduct](./.github/CODE_OF_CONDUCT.md)
- [Contributing](./.github/CONTRIBUTING.md)
<!-- - [Security Policy](./.github/SECURITY.md) -->

## Example Component

```js
import { AegisComponent, registerComponent } from '@shgysk8zer0/aegis-component';
import { html, css, appendTo, addStyles } from '@shgysk8zer0/aegis';

registerComponent('hello-world', HTMLHelloWorldElement extends AegisComponent {
  constructor() {
    super(({ shadow }) => {
      addStyles(shadow, css`
        .foo {
          color: red;
        }
      `);

      appendTo(shadow, html`<h1 class="foo">Hello, World!</h1>`);
    });
  }
});
```
