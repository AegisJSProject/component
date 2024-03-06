# `@aegisjsproject/component`

Base component using [`@aegisjsproject/core`](https://github.com/AegisJSProject/core)
& [`@aegisjsproject/styles`](https://github.com/AegisJSProject/styles).

[![CodeQL](https://github.com/AegisJSProject/component/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/AegisJSProject/component/actions/workflows/codeql-analysis.yml)
![Node CI](https://github.com/AegisJSProject/component/workflows/Node%20CI/badge.svg)
![Lint Code Base](https://github.com/AegisJSProject/component/workflows/Lint%20Code%20Base/badge.svg)

[![GitHub license](https://img.shields.io/github/license/AegisJSProject/component.svg)](https://github.com/AegisJSProject/component/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/AegisJSProject/component.svg)](https://github.com/AegisJSProject/component/commits/master)
[![GitHub release](https://img.shields.io/github/release/AegisJSProject/component?logo=github)](https://github.com/AegisJSProject/component/releases)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/shgysk8zer0?logo=github)](https://github.com/sponsors/shgysk8zer0)

[![npm](https://img.shields.io/npm/v/@aegisjsproject/component)](https://www.npmjs.com/package/@aegisjsproject/component)
![node-current](https://img.shields.io/node/v/@aegisjsproject/component)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/%40aegisjsproject%2Fcomponent)
[![npm](https://img.shields.io/npm/dw/@aegisjsproject/component?logo=npm)](https://www.npmjs.com/package/@aegisjsproject/component)

[![GitHub followers](https://img.shields.io/github/followers/AegisJSProject.svg?style=social)](https://github.com/AegisJSProject)
![GitHub forks](https://img.shields.io/github/forks/AegisJSProject/component.svg?style=social)
![GitHub stars](https://img.shields.io/github/stars/AegisJSProject/component.svg?style=social)
[![Twitter Follow](https://img.shields.io/twitter/follow/shgysk8zer0.svg?style=social)](https://twitter.com/shgysk8zer0)

[![Donate using Liberapay](https://img.shields.io/liberapay/receives/shgysk8zer0.svg?logo=liberapay)](https://liberapay.com/shgysk8zer0/donate "Donate using Liberapay")
- - -

- [Code of Conduct](./.github/CODE_OF_CONDUCT.md)
- [Contributing](./.github/CONTRIBUTING.md)
<!-- - [Security Policy](./.github/SECURITY.md) -->

## Example Component

```js
import { AegisComponent, TRIGGERS, SYMBOLS } from '@aegisjsproject/component';
import { html, css, appendTo, addStyles } from '@aegisjsproject/core';

const template = html`<h1>Hello, World!</h1>`;

const stlyes = css`
.foo {
  color: red;
}
`

export class HTMLHelloWorldElement extends AegisComponent {
  constructor() {
    super({ template, styles });
  }
}

HTMLHelloWorldElement.register('hello-world');
```
