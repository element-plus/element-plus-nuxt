import AllComponents from 'element-plus/es/component'
import type { Component } from 'vue'
import type { PresetImport } from './types'

export const allComponents = (AllComponents as unknown as Component[])
  .map(item => item.name!)

export const allImports: PresetImport[] = [
  'ElLoading',
  'ElMessage',
  'ElMessageBox',
  'ElNotification'
]

export const allNoStylesComponents = [
  'ElAutoResizer',
  'ElTooltipV2'
]
