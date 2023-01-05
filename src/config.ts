import AllComponents from 'element-plus/es/component'
import type { Component } from 'vue'
import type {
  PresetComponent,
  PresetDirectives,
  PresetImport,
  TransformOptions
} from './types'

export const libraryName = 'element-plus'

export const allComponents = (AllComponents as unknown as Component[])
  .map(item => item.name!)

export const allImportsWithStyle: string[] = [
  'ElLoading',
  'ElMessage',
  'ElMessageBox',
  'ElNotification'
]

export const allImports: PresetImport[] = allImportsWithStyle

export const allNoStylesComponents: PresetComponent[] = [
  'ElAutoResizer',
  'ElTooltipV2'
]

export const allDirectives: PresetDirectives = {
  Loading: ['ElLoadingDirective', 'ElLoading'],
  Popover: ['ElPopoverDirective', 'ElPopover'],
  InfiniteScroll: 'ElInfiniteScroll'
}

export const transform: TransformOptions = {
  include: [/\.vue$/, /\.vue\?vue/, /\.vue\?v=/, /\.((c|m)?j|t)sx?$/],
  exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/]
}
