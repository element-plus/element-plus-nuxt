<script setup lang="ts">
interface RestaurantItem {
  value: string
  link: string
}

const value = ref('Nuxt module playground!')
const autocompleteValue = ref()
const cascaderValue = ref()
const dateValue = ref()
const timeValue = ref()
const timeValue1 = ref()
const selectValue = ref()
const treeValue = ref()
const checked1 = ref([])
const switchValue = ref(true)
const color1 = ref('#409EFF')
const num = ref(1)
const transferValue = ref([])

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
const tree = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency'
          },
          {
            value: 'feedback',
            label: 'Feedback'
          },
          {
            value: 'efficiency',
            label: 'Efficiency'
          },
          {
            value: 'controllability',
            label: 'Controllability'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation'
          },
          {
            value: 'top nav',
            label: 'Top Navigation'
          }
        ]
      }
    ]
  }
]
const transferData = options.map(item => ({
  key: item.value,
  label: item.label
}))
const restaurants = ref<RestaurantItem[]>([
  { value: 'vue', link: 'https://github.com/vuejs/vue' },
  { value: 'element', link: 'https://github.com/ElemeFE/element' }
])
const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  cb(results)
}
const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

</script>

<template>
  <el-card class="mb-5">
    <el-form label-width="150">
      <el-form-item label="input">
        <el-input v-model="value" clearable />
      </el-form-item>
      <el-form-item label="autocomplete">
        <el-autocomplete
          v-model="autocompleteValue"
          :fetch-suggestions="querySearch"
          clearable
        />
      </el-form-item>
      <el-form-item label="cascader">
        <el-cascader v-model="cascaderValue" :options="tree" />
      </el-form-item>
      <el-form-item label="date-picker">
        <el-date-picker v-model="dateValue" type="date" />
      </el-form-item>
      <el-form-item label="time-picker">
        <el-time-picker v-model="timeValue" />
      </el-form-item>
      <el-form-item label="time-select">
        <el-time-select
          v-model="timeValue1"
          start="08:30"
          step="00:15"
          end="18:30"
        />
      </el-form-item>
      <el-form-item label="select">
        <ElSelect v-model="selectValue">
          <ElOption
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </el-form-item>
      <el-form-item label="select-v2">
        <el-select-v2 v-model="selectValue" :options="options" />
      </el-form-item>
      <el-form-item label="tree-select">
        <!-- <el-tree-select
          v-model="treeValue"
          :data="tree"
          :render-after-expand="false"
        /> -->
      </el-form-item>
      <el-form-item label="segmented">
        <el-segmented v-model="selectValue" :options="options" size="large" />
      </el-form-item>
      <el-form-item label="radio">
        <el-radio-group v-model="selectValue">
          <el-radio v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="radio-button">
        <el-radio-group v-model="selectValue" size="large">
          <el-radio-button v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="checkbox">
        <el-checkbox-group v-model="checked1">
          <el-checkbox v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="checkbox-button">
        <el-checkbox-group v-model="checked1">
          <el-checkbox-button v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="switch">
        <el-switch v-model="switchValue" active-text="On" inactive-text="Off" />
      </el-form-item>
      <el-form-item label="rate">
        <el-rate v-model="num" :max="10" />
      </el-form-item>
      <el-form-item label="slider">
        <el-slider v-model="num" :min="1" :max="10" />
      </el-form-item>
      <el-form-item label="input-number">
        <el-input-number v-model="num" :min="1" :max="10" />
      </el-form-item>
      <el-form-item label="color-picker">
        <el-color-picker v-model="color1" />
      </el-form-item>
      <el-form-item label="upload">
        <el-upload action="https://jsonplaceholder.typicode.com/posts/">
          <el-button size="small" type="primary">
            Click to upload
          </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="transfer">
        <el-transfer v-model="transferValue" :data="transferData" />
      </el-form-item>
    </el-form>
  </el-card>
</template>
