import type { ElIdInjectionContext } from 'element-plus'

export type PresetImport = string | [name: string, as?: string, from?: string]

export type PresetDirectives = Record<string, string | [directive: string, name?: string]> // directive: export name from Element Plus, name: export name with style

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
   * import style css or sass with components
   *
   * @default 'css'
   */
  importStyle: 'css' | 'sass'
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
}

declare module '@nuxt/schema' {
  interface NuxtConfig {
    elementPlus?: Partial<Options>
  }
  interface NuxtOptions {
    elementPlus?: Partial<Options>
  }
}
