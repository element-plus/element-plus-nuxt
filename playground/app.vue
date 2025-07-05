<script setup lang="ts">
import { $message } from './utils'

const { t } = useLocale()

const drawer = ref(false)
const dialogVisible = ref(false)
const loading = ref(true)

onMounted(() => {
  ElNotification({
    title: 'Success',
    message: 'This is a success message',
    type: 'success'
  })
  setTimeout(() => {
    loading.value = false
  }, 10000)
})

function hello () {
  ElMessageBox.confirm(
    'proxy will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  )
    .then(() => {
      $message('Delete completed')
    })
    .catch(() => {
      $message('Delete canceled')
    })
}

function changeTheme () {
  const html = document.querySelector('html')!
  html.classList.toggle('dark')
}
</script>

<template>
  <el-config-provider namespace="ep">
    <el-container>
      <el-header>
        <header-menu />
      </el-header>
      <el-main>
        <el-card class="mb-5">
          <el-space wrap size="large">
            <el-dropdown type="primary">
              <el-button type="primary">
                Dropdown List
                <el-icon class="el-icon--right">
                  <el-icon-arrow-down />
                </el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Action 1</el-dropdown-item>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                  <el-dropdown-item>Action 3</el-dropdown-item>
                  <el-dropdown-item>Action 4</el-dropdown-item>
                  <el-dropdown-item>Action 5</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-popover
              :teleported="true"
              placement="bottom"
              title="Title"
              trigger="hover"
            >
              <template #reference>
                <el-button type="primary" class="el-dropdown-link">
                  Popover
                </el-button>
              </template>
              <div>test1</div>
            </el-popover>
            <el-button :icon="ElIconEditPen" type="success" @click="hello">
              {{ t('el.colorpicker.confirm') }}
            </el-button>
            <ElButton @click="hello">
              Open Dialog
            </ElButton>
            <el-button type="primary" @click="drawer = true">
              Open Drawer
            </el-button>
            <el-button type="danger" @click="changeTheme">
              Change Theme
            </el-button>
            <LazyElButton type="warning" @click="$message('come from Lazy Button')">
              Lazy Button
            </LazyElButton>
            <el-text class="mx-1" size="large">
              el-text
            </el-text>
            <el-link href="https://element-plus.org" type="primary" target="_blank">
              element-plus
            </el-link>
          </el-space>
        </el-card>
        <form-card />
        <table-card v-loading="loading" />
        <tree-card />
        <data-card />
        <navigation-card />
        <other-card />
      </el-main>
      <el-footer>
        <icon-card />
      </el-footer>
    </el-container>

    <el-drawer v-model="drawer" title="I am the title" append-to-body>
      <span>Hi there!</span>
    </el-drawer>
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      append-to-body
    >
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </el-config-provider>
</template>

<style>
.mb-5 {
  margin-bottom: 20px;
}
.mr-4 {
  margin-right: 16px;
}
</style>
