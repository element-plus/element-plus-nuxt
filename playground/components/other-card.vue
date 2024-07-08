<template>
  <el-card class="mb-5">
    <el-watermark
      :width="130"
      :height="30"
      image="https://element-plus.org/images/element-plus-logo.svg"
    >
      <el-alert title="Success alert" type="success" />

      <el-divider />

      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content ep-bg-purple" />
        </el-col>
        <el-col :span="8">
          <div class="grid-content ep-bg-purple" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="grid-content ep-bg-purple" />
        </el-col>
        <el-col :span="8">
          <div class="grid-content ep-bg-purple" />
        </el-col>
        <el-col :span="4">
          <div class="grid-content ep-bg-purple" />
        </el-col>
        <el-col :span="4">
          <div class="grid-content ep-bg-purple" />
        </el-col>
      </el-row>

      <el-divider />

      <el-scrollbar>
        <div class="scrollbar-flex-content">
          <p v-for="item in 50" :key="item" class="scrollbar-demo-item">
            {{ item }}
          </p>
        </div>
      </el-scrollbar>
    </el-watermark>
  </el-card>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.ep-bg-purple {
  background: var(--el-text-color-placeholder);
}
.scrollbar-flex-content {
  display: flex;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 20px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}
</style>
