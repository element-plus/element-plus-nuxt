<p align="center">
  <img width="300px" src="https://user-images.githubusercontent.com/10731096/95823103-9ce15780-0d5f-11eb-8010-1bd1b5910d4f.png">
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@element-plus/nuxt">
    <img src="https://img.shields.io/npm/v/@element-plus/nuxt.svg">
  </a>
  <a href="https://npmcharts.com/compare/@element-plus/nuxt?minimal=true">
    <img src="https://img.shields.io/npm/dm/@element-plus/nuxt.svg">
  </a>
</p>

# Element Plus Nuxt

> [Element Plus](https://element-plus.org) module for [Nuxt](https://nuxt.com)

## Features

- Automatically import components and styles on demand.
- Automatically import directives and styles on demand.
- Automatically import icons from [@element-plus/icons-vue](https://github.com/element-plus/element-plus-icons).
- Automatically import of ElMessage, ElNotification and other methods.
- Automatically inject the ID_INJECTION_KEY and ZINDEX_INJECTION_KEY into Vue.
- Automatically inject the teleport markup into the correct location in the final page HTML.

## Installation

```bash
npx nuxi@latest module add element-plus
# or
npm i element-plus @element-plus/nuxt -D
```

```ts
export default defineNuxtConfig({
  modules: [
    '@element-plus/nuxt'
  ],
  elementPlus: { /** Options */ }
})
```

## Usage

```vue
<template>
  <el-button @click="ElMessage('hello')">button</el-button>
  <ElButton :icon="ElIconEditPen" type="success">button</ElButton>
  <LazyElButton type="warning">lazy button</LazyElButton>
</template>
```

Reference [Nuxt documentation](https://nuxt.com/docs/guide/directory-structure/components) and [playground](./playground/app.vue) use.

## Options

### importStyle

- Type: `'css' | 'scss' | boolean`
- Default: `css`

import style css or sass(scss) with components, disable automatically import styles with `false`.

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
- Default: `{ prefix: 1024, current: 0 }`

Automatically inject the ID_INJECTION_KEY into Vue.

### injectionZIndex

- Type: `object`
- Default: `{ current: 0 }`

Automatically inject the Z_INDEX_INJECTION_KEY into Vue.

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
- Default: `[ /\.vue$/, /\.vue\?vue/, /\.vue\?v=/, /\.((c|m)?j|t)sx?$/]`

Include files that need to automatically import styles.

### exclude

- Type: `array`
- Default: `[/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/]`

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
