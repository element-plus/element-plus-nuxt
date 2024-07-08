<script setup lang="ts">
const containerRef = ref<HTMLElement | null>(null)
const activeName = ref('first')
</script>

<template>
  <el-card class="mb-5">
    <el-affix :offset="120">
      <el-button type="primary">
        Offset top 120px
      </el-button>
    </el-affix>

    <el-backtop :right="100" :bottom="100" />

    <el-page-header>
      <template #content>
        <span class="text-large font-600 mr-3"> Title </span>
      </template>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          homepage
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          promotion management
        </el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
    </el-page-header>

    <el-steps :active="2" align-center finish-status="success">
      <el-step title="Step 1" />
      <el-step title="Step 2" />
      <el-step title="Step 3" />
    </el-steps>

    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="User" name="first">
        User
      </el-tab-pane>
      <el-tab-pane label="Config" name="second">
        Config
      </el-tab-pane>
      <el-tab-pane label="Role" name="third">
        Role
      </el-tab-pane>
      <el-tab-pane label="Task" name="fourth">
        Task
      </el-tab-pane>
    </el-tabs>

    <div>
      <el-row>
        <el-col :span="18">
          <div
            style="
            height: 30px;
            width: 70%;
            background: #000;
            position: absolute;
            top: 0;
            left: 0;
            color: #fff;
          "
          >
            Fixed Top Block
          </div>
          <div ref="containerRef" style="height: 300px; overflow-y: auto">
            <div
              id="part1"
              style="
              height: 300px;
              background: rgba(255, 0, 0, 0.02);
              margin-top: 30px;
            "
            >
              part1
            </div>
            <div
              id="part2"
              style="
              height: 300px;
              background: rgba(0, 255, 0, 0.02);
              margin-top: 30px;
            "
            >
              part2
            </div>
            <div
              id="part3"
              style="
              height: 300px;
              background: rgba(0, 0, 255, 0.02);
              margin-top: 30px;
            "
            >
              part3
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <el-anchor
            :container="containerRef"
            direction="vertical"
            type="default"
            :offset="30"
          >
            <el-anchor-link href="#part1" title="part1" />
            <el-anchor-link href="#part2" title="part2" />
            <el-anchor-link href="#part3" title="part3" />
          </el-anchor>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
