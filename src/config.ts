import AllComponents from 'element-plus/es/component'
import type { Component } from 'vue'
import type { ElIdInjectionContext } from 'element-plus'
import type { Options, PresetDirectives, PresetImport } from './types'

export const libraryName = 'element-plus'

const allComponents = (AllComponents as unknown as Component[])
  .map(item => item.name!)

export const allImportsWithStyle: string[] = [
  'ElLoading',
  'ElMessage',
  'ElMessageBox',
  'ElNotification'
]

const allImports: PresetImport[] = allImportsWithStyle

const allNoStylesComponents: string[] = [
  'ElAutoResizer',
  'ElTooltipV2'
]

const allDirectives: PresetDirectives = {
  Loading: ['ElLoadingDirective', 'ElLoading'],
  Popover: ['ElPopoverDirective', 'ElPopover'],
  InfiniteScroll: 'ElInfiniteScroll'
}

const defaultInjectionID: ElIdInjectionContext = {
  prefix: 1024,
  current: 0
}

const defaultInclude = [/\.vue$/, /\.vue\?vue/, /\.vue\?v=/, /\.((c|m)?j|t)sx?$/]

const defaultExclude = [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/]

export const defaults: Options = {
  components: allComponents,
  directives: allDirectives,
  imports: allImports,
  importStyle: 'css',
  noStylesComponents: allNoStylesComponents,
  injectionID: defaultInjectionID,
  include: defaultInclude,
  exclude: defaultExclude
}
