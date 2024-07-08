<script setup lang="ts">
const calendar = ref(new Date(2024, 1, 1))
const open = ref(false)
const ref1 = ref()
const ref2 = ref()
const ref3 = ref()

const srcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
]
const activities = [
  {
    content: 'Event start',
    timestamp: '2018-04-15'
  },
  {
    content: 'Approved',
    timestamp: '2018-04-13'
  },
  {
    content: 'Success',
    timestamp: '2018-04-11'
  }
]
</script>

<template>
  <el-card class="mb-5">
    <el-space wrap size="large">
      <el-badge ref="ref1" :value="12">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </el-badge>

      <el-image
        ref="ref2"
        style="width: 100px; height: 100px"
        :src="srcList[0]"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
        :preview-src-list="srcList"
        :initial-index="4"
        fit="cover"
      />

      <el-tag ref="ref3" type="success">
        Tag 2
      </el-tag>

      <el-check-tag checked>
        Checked
      </el-check-tag>

      <el-button type="primary" @click="open = true">
        Begin Tour
      </el-button>

      <el-tour v-model="open">
        <el-tour-step :target="ref1?.$el" title="Upload File">
          <img
            style="width: 240px"
            src="https://element-plus.org/images/element-plus-logo.svg"
            alt="tour.png"
          >
          <div>Put you files here.</div>
        </el-tour-step>
        <el-tour-step
          :target="ref2?.$el"
          title="Save"
          description="Save your changes"
        />
        <el-tour-step
          :target="ref3?.$el"
          title="Other Actions"
          description="Click to see other"
        />
      </el-tour>

      <el-statistic title="Daily active users" :value="268500" />
    </el-space>

    <el-progress :percentage="50" />

    <el-collapse>
      <el-collapse-item title="Consistency" name="1">
        <div>
          Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such
          as: design style, icons and texts, position of elements, etc.
        </div>
      </el-collapse-item>
      <el-collapse-item title="Feedback" name="2">
        <div>
          Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;
        </div>
        <div>
          Visual feedback: reflect current state by updating or rearranging
          elements of the page.
        </div>
      </el-collapse-item>
    </el-collapse>

    <el-timeline style="max-width: 600px">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp"
      >
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>

    <el-descriptions title="User Info">
      <el-descriptions-item label="Username">
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item label="Telephone">
        18100000000
      </el-descriptions-item>
      <el-descriptions-item label="Place">
        Suzhou
      </el-descriptions-item>
      <el-descriptions-item label="Remarks">
        <el-tag size="small">
          School
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Address">
        No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
    </el-descriptions>

    <el-empty description="description" />

    <el-result
      icon="success"
      title="Success Tip"
      sub-title="Please follow the instructions"
    >
      <template #extra>
        <el-button type="primary">
          Back
        </el-button>
      </template>
    </el-result>

    <el-skeleton :rows="3" animated />

    <el-carousel height="150px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">
          {{ item }}
        </h3>
      </el-carousel-item>
    </el-carousel>

    <el-calendar v-model="calendar" />
  </el-card>
</template>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
