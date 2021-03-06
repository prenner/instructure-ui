---
category: packages
---

## ui-docs-client

[![npm][npm]][npm-url]&nbsp;
[![build-status][build-status]][build-status-url]&nbsp;
[![MIT License][license-badge]][LICENSE]&nbsp;
[![Code of Conduct][coc-badge]][coc]

A client application to display documentation made by Instructure Inc.

### Installation

```sh
yarn add @instructure/ui-docs-client
```

### Usage

```js
import renderDocsClient from '@instructure/ui-docs-client'

const props = {
  docs: {},
  parents: {},
  sections: {},
  library: {}
}

renderDocsClient(props, document.getElementById('app'))
```

Note: The data for the props argument is generated by the [@instructure/ui-docs-plugin](#ui-docs-plugin).

### Development

From the root of the `instructure-ui` repo:

1. Run `yarn build:watch`
2. Run `yarn dev`
3. Open [http://localhost:8080/](http://localhost:8080/) in your browser

[npm]: https://img.shields.io/npm/v/@instructure/ui-docs-client.svg
[npm-url]: https://npmjs.com/package/@instructure/ui-docs-client

[build-status]: https://travis-ci.org/instructure/instructure-ui.svg?branch=master
[build-status-url]: https://travis-ci.org/instructure/instructure-ui "Travis CI"

[license-badge]: https://img.shields.io/npm/l/instructure-ui.svg?style=flat-square
[license]: https://github.com/instructure/instructure-ui/blob/master/LICENSE

[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/instructure/instructure-ui/blob/master/CODE_OF_CONDUCT.md
