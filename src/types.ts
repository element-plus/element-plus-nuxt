import type { ElIdInjectionContext, ElZIndexInjectionContext, ConfigProviderContext } from 'element-plus'

export type Themes = 'dark'

/** name: export name from the library, as: the name you want to use in your project, from: the name of library */
export type PresetComponent = string | [name: string, as?: string, from?: string]

/** name: export name from the library, path: the file path in the component directory */
export type PresetImport = [name: string | string[], path: string]

/** directive: export name from the library, name: export name with style */
export type PresetDirectives = Record<string, string | [directive: string, name?: string]>

/** Used to filter files that need to automatically import styles and other functions */
export interface TransformOptions {
  include: RegExp[]
  exclude: RegExp[]
}

export type ScssVariables<Key extends string, Value = string> = {
  [k in Key]?: Value
} & {
  [k: string]: Value
}

export interface ScssChalk {
  '$colors'?: Partial<Record<'success' | 'warning' | 'danger' | 'error' | 'info', { base?: string }>> & ScssVariables<'white' | 'black', string | { base?: string }>
  '$text-color'?: ScssVariables<'primary' | 'regular' | 'secondary' | 'placeholder' | 'disabled'>
  '$bg-color'?: ScssVariables<'' | 'page' | 'overlay'>
  '$border-color'?: ScssVariables<'' | 'light' | 'lighter' | 'extra-light' | 'dark' | 'darker'>
  '$fill-color'?: ScssVariables<'' | 'light' | 'lighter' | 'extra-light' | 'dark' | 'darker' | 'blank'>
  '$border-radius'?: ScssVariables<'base' | 'small' | 'round' | 'circle'>
  '$box-shadow'?: ScssVariables<'' | 'light' | 'lighter' | 'dark', string | string[]>
  '$font-family'?: ScssVariables<''>
  '$font-size'?: ScssVariables<'extra-large' | 'large' | 'medium' | 'base' | 'small' | 'extra-small'>
  '$z-index'?: ScssVariables<'normal' | 'top' | 'popper'>
  '$common-component-size'?: ScssVariables<'large' | 'default' | 'small'>
  '$overlay-color'?: ScssVariables<'' | 'light' | 'lighter'>
  '$mask-color'?: ScssVariables<'' | 'extra-light'>
  [key: `$${string}`]: string | undefined | ScssVariables<string, string | string[] | ScssVariables<string>>
}

export type ThemeChalk = ScssChalk & Partial<Record<Themes, ScssChalk>>

export interface ModuleOptions extends TransformOptions {
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
  components: PresetComponent[]
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
   * When you need to add automatically import content from Element Plus, you can add it here.
   *
   * @example
   * ```ts
   *  [
   *    ['useLocale', 'es/hooks/use-locale/index.mjs'],
   *    [['castArray', 'unique'], 'es/utils/arrays.mjs']
   *  ]
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
   *
   * List of imports that will be imported whether if autoImports is disabled.
   *
   * @default
   * ```ts
   * [
   *   ["ID_INJECTION_KEY", "es/hooks/use-id/index.mjs"],
   *   ["ZINDEX_INJECTION_KEY", "es/hooks/use-z-index/index.mjs"],
   *   ["provideGlobalConfig", "es/components/config-provider/src/hooks/use-global-config.mjs"],
   * ]
   * ```
   */
  baseImports: PresetImport[]
  /**
   * import style css or scss with components
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
  themes: Themes[]
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
  /**
   * Replace default locale, you can find locale list [here](https://github.com/element-plus/element-plus/tree/dev/packages/locale/lang).
   *
   * @default 'en'
   * @example 'zh-cn'
   */
  defaultLocale?: string
  /**
   * Set global configuration, such as modifying the default size and z-index of the component.
   *
   * @example
   * ```ts
   * { size: 'small', zIndex: 3000 }
   * ```
   */
  globalConfig?: ConfigProviderContext
  /**
   * List of methods that need to be installed.
   *
   * @example
   * ```ts
   * ['ElLoading', 'ElMessage', 'ElMessageBox', 'ElNotification']
   * ```
   */
  installMethods: Array<'ElLoading' | 'ElMessage' | 'ElMessageBox' | 'ElNotification'>
  /**
   * Whether to cache the element-plus components and directives. **Only effective in development mode**.
   *
   * If you enable this feature, you will get faster loading speed in development mode.
   *
   * @default 'false'
   */
  cache?: boolean
  /**
   * Configure SCSS variables for generating custom themes. **Only effective when `importStyle` is `scss`**.
   */
  themeChalk?: ThemeChalk
}
