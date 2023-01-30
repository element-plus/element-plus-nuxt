# Element Plus Nuxt

> [Element Plus](https://element-plus.org) module for [Nuxt](https://nuxt.com)

## Features

- Automatically import components and styles on demand.
- Automatically import directives and styles on demand.
- Automatically import icons from [@element-plus/icons-vue](https://github.com/element-plus/element-plus-icons).
- Automatically import of ElMessage, ElNotification and other methods.
- Automatically inject the ID_INJECTION_KEY into Vue.
- Automatically inject the teleport markup into the correct location in the final page HTML.

## Installation

```bash
npm i @element-plus/nuxt -D
```

## Usage

```ts
export default defineNuxtConfig({
  modules: [
    '@element-plus/nuxt'
  ],
  elementPlus: { /** Options */ }
})
```

## Options

### importStyle

- Type: `'css' | 'scss'`
- Default: `css`

import style css or sass(scss) with components.

### themes

- Type: `array`

A list of themes that require import styles automatically.

e.g. `['dark']`

### icon

- Type: `string | false`
- Default: `ElIcon`

Icon prefix name, disable automatically import icon with `false`.

### namespace

- Type: `string`
- Default: `el`

When you change the global namespace, you must change it here as well.

### injectionID

- Type: `object`

Automatically inject the ID_INJECTION_KEY into Vue.

### appendTo

- Type: `array`

When you modify the `append-to` props in all based on ElTooltip components, you need to add the value here.

### components

- Type: `array`

If there are components that are not imported automatically from Element Plus, you need to add the component name here.

e.g. `['ElSubMenu']`

### subComponents

- Type: `object`

A map of components that the definition file of subComponent is in its parent component.

### directives

- Type: `object`

If there are directives that are not imported automatically from Element Plus, you need to add the directive name here.

### imports

- Type: `array`

If you wish to add automatically import content from Element Plus, you can add it here.

### noStylesComponents

- Type: `array`

When a component incorrectly loads styles, you need to add the component name here.

### include

- Type: `array`

Include files that need to automatically import styles.

### exclude

- Type: `array`

Exclude files that do not require the automatic import of styles.

## Template

[element-plus-nuxt-starter](https://github.com/element-plus/element-plus-nuxt-starter)

## Development

- Run `pnpm i` to install the dependencies.
- Run `pnpm dev:prepare` to generate type stubs.
- Run `pnpm dev` to start playground in development mode.
- Run `pnpm dev:build` to build playground.
- Run `pnpm dev:start` to locally preview playground.
- Run `pnpm build` to build this project.
