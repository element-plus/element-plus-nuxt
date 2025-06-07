<script setup lang="ts">
const count = ref(0)
const load = () => {
  count.value += 2
}
</script>

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

      <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <li v-for="i in count" :key="i" class="infinite-list-item">
          {{ i }}
        </li>
      </ul>

      <div class="splitter">
        <el-splitter>
          <el-splitter-panel size="30%">
            <div class="splitter-panel">
              1
            </div>
          </el-splitter-panel>
          <el-splitter-panel :min="200">
            <div class="splitter-panel">
              2
            </div>
          </el-splitter-panel>
        </el-splitter>
      </div>
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

.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}

.splitter {
  margin: 10px;
  height: 250px;
  border: 1px solid var(--el-border-color-light);
}
.splitter .splitter-panel {
  padding: 10px;
}
</style>
