import type { ElIdInjectionContext } from 'element-plus'

/** name: export name from library, as: name you want to use in your project, from: name of library */
export type PresetImport = string | [name: string, as?: string, from?: string]

/** directive: export name from library, name: export name with style */
export type PresetDirectives = Record<string, string | [directive: string, name?: string]>

/** Used to filter files that need to automatically import styles and other functions */
export interface TransformOptions {
  include: RegExp[]
  exclude: RegExp[]
}

export interface Options extends TransformOptions {
  /**
   * A list of components that need to be automatically imported externally.
   *
   * @default 'from element-plus/es/component'
   *
   * When some components are not automatically imported from Element Plus, you need to add the component name to here.
   *
   * @example
   * ```ts
   *  ['ElSubMenu']
   * ```
   */
  components: PresetImport[]
  /**
   * A list of directives that need to be automatically imported externally.
   *
   * @default
   * ```ts
   *  {
   *    Loading: ['ElLoadingDirective', 'ElLoading'],
   *    Popover: ['ElPopoverDirective', 'ElPopover'],
   *    InfiniteScroll: 'ElInfiniteScroll'
   *  }
   * ```
   */
  directives: PresetDirectives
  /**
   * A list of imports that need to be automatically imported externally.
   *
   * @default
   * ```ts
   *  ['ElLoading', 'ElMessage', 'ElMessageBox', 'ElNotification']
   * ```
   *
   * When you need to add automatic import content from Element Plus, you can add it to here.
   *
   * @example
   * ```ts
   *  ['useLocale']
   * ```
   *
   * @before
   * ```ts
   * import { useLocale } from 'element-plus'
   * const { t } = useLocale()
   * ```
   *
   * @after
   * ```ts
   * const { t } = useLocale()
   * ```
   */
  imports: PresetImport[]
  /**
   * import style css or sass(scss) with components
   *
   * @default 'css'
   */
  importStyle: 'css' | 'scss'
  /**
   * Themes that need to be automatically imported from Element Plus.
   *
   * Currently, only [dark](https://element-plus.org/en-US/guide/dark-mode.html) are supported .
   *
   * @example
   * ```ts
   *  ['dark']
   * ```
   */
  themes: Array<'dark'>
  /**
   * a list of component names that have no styles, so resolving their styles file should be prevented
   *
   * @default
   * ```ts
   * ['ElAutoResizer', 'ElTooltipV2']
   * ```
   */
  noStylesComponents: string[]
  /**
   * We need to inject the same ID value into the server side and client side to ensure that the code generated on the server is the same as that on the client, so as to avoid hydrate errors.
   *
   * @default
   * ```ts
   * { prefix: 1024, current: 0 }
   * ```
   */
  injectionID: ElIdInjectionContext
  /**
   * Global component className prefix.
   *
   * When you modify the global namespace, you need to modify it here at the same time.
   *
   * @default 'el'
   */
  namespace: string
  /**
   * Which element the tooltip CONTENT appends to.
   *
   * When you modify the `append-to` props in all based on Tooltip components, you need to add the relevant values here, so as to avoid hydrate errors.
   *
   * If you used `Teleport` to teleport a part of a component's template into a DOM node that near the `<body>` tag, you can also add this ID here. The internal plug-in will automatically handle hydrate errors.
   */
  appendTo: string[]
  /**
   * Prefix name of the icon.
   *
   * To avoid the duplication of icon names with native DOM or other components, we recommend adding a prefix to the icon.
   *
   * @default 'ElIcon'
   *
   * Disable automatic imports of icons by configuring `false`.
   */
  icon: false | string
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    elementPlus?: Partial<Options>
  }
  interface NuxtOptions {
    elementPlus?: Partial<Options>
  }
}
