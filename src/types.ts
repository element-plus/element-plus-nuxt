import type { ElIdInjectionContext, ElZIndexInjectionContext } from 'element-plus'

/** name: export name from the library, as: the name you want to use in your project, from: the name of library */
export type PresetImport = string | [name: string, as?: string, from?: string]

/** directive: export name from the library, name: export name with style */
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
   * If there are components that are not imported automatically from Element Plus, you need to add the component name here.
   *
   * @example
   * ```ts
   *  ['ElSubMenu']
   * ```
   */
  components: PresetImport[]
  /**
   * A map of components that the definition file of subComponent is in its parent component.
   */
  subComponents: Record<string, string[]>
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
   * When you need to add automatically import content from Element Plus, you can add it here.
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
   *
   * Disable automatically import styles with `false`
   */
  importStyle: 'css' | 'scss' | boolean
  /**
   * A list of themes that require importing styles automatically.
   *
   * Currently, only [dark](https://element-plus.org/en-US/guide/dark-mode.html) is supported.
   *
   * @example
   * ```ts
   *  ['dark']
   * ```
   */
  themes: Array<'dark'>
  /**
   * A list of component names that have no styles, so resolving their styles file should be prevented
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
   * We need to inject an initial z-index value to ensure that the server side and client side generate the same z-index value, so as to avoid hydration errors.
   *
   * @default
   * ```ts
   * { current: 0 }
   * ```
   */
  injectionZIndex: ElZIndexInjectionContext
  /**
   * Global component className prefix.
   *
   * When you change the global namespace, you must change it here as well.
   *
   * @default 'el'
   */
  namespace: string
  /**
   * Which element the tooltip CONTENT appends to.
   *
   * When you modify the `append-to` props in all based on ElTooltip components, you need to add the value here, to avoid hydrate errors.
   *
   * If you used `Teleport` to teleport a part of a component's template into a DOM node near the `<body>` tag, you can also add this ID here. The internal plug-in will automatically handle hydrate errors.
   */
  appendTo: string[]
  /**
   * Icon prefix name.
   *
   * To avoid the duplication of icon names with native DOM or other components, we recommend adding a prefix to the icon.
   *
   * @default 'ElIcon'
   *
   * Disable automatically import icon with `false`
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
