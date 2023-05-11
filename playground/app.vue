<script setup lang="ts">
import { $message } from './utils'

const { t } = useLocale()
const value = ref('Nuxt module playground!')
const timeValue = ref('')
const selectValue = ref('')
const activeIndex = ref('1')
const drawer = ref(false)
const dialogVisible = ref(false)
const loading = true

const tableData = [
  {
    date: '2016-05-02',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  }
]
const options = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
]

onMounted(() => {
  ElNotification({
    title: 'Success',
    message: 'This is a success message',
    type: 'success'
  })
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
</script>

<template>
  <section>
    <section class="mb-5">
      <el-dropdown type="primary" class="mr-4">
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
            Popover 1
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
      <LazyElButton type="warning" @click="$message('come from Lazy Button')">
        Lazy Button
      </LazyElButton>
    </section>
    <section class="mb-5">
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </section>
    <section class="mb-5">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
      >
        <el-menu-item index="0">
          LOGO
        </el-menu-item>
        <el-menu-item index="1">
          Processing Center
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            Workspace
          </template>
          <el-menu-item index="2-1">
            item one
          </el-menu-item>
          <el-menu-item index="2-2">
            item two
          </el-menu-item>
          <el-menu-item index="2-3">
            item three
          </el-menu-item>
          <!-- When the menu has multiple pop-up windows, need `teleported` flag -->
          <el-sub-menu index="2-4" teleported>
            <template #title>
              item four
            </template>
            <el-menu-item index="2-4-1">
              item one
            </el-menu-item>
            <el-menu-item index="2-4-2">
              item two
            </el-menu-item>
            <el-menu-item index="2-4-3">
              item three
            </el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </section>
    <section class="mb-5">
      <el-input v-model="value" class="w-60 mr-4" />
      <el-date-picker
        v-model="timeValue"
        type="date"
        placeholder="请选择日期"
        class="w-60"
      />
      <ElSelect v-model="selectValue" class="w-60">
        <ElOption
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
    </section>

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
  </section>
</template>

<style>
.mb-5 {
  margin-bottom: 20px;
}
.mr-4 {
  margin-right: 16px;
}
.w-60 {
  width: 240px;
}
</style>
