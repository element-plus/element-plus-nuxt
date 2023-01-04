import AllComponents from 'element-plus/es/component'
import type { Component } from 'vue'
import type { PresetComponent, PresetDirectives, PresetImport } from './types'

export const libraryName = 'element-plus'

export const allComponents = (AllComponents as unknown as Component[])
  .map(item => item.name!)

export const allImports: PresetImport[] = [
  'ElLoading',
  'ElMessage',
  'ElMessageBox',
  'ElNotification'
]

export const allNoStylesComponents: PresetComponent[] = [
  'ElAutoResizer',
  'ElTooltipV2'
]

export const allDirectives: PresetDirectives = {
  Loading: ['ElLoadingDirective', 'ElLoading'],
  Popover: ['ElPopoverDirective', 'ElPopover'],
  InfiniteScroll: 'ElInfiniteScroll'
}
