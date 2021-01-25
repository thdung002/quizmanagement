<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5','Level 6','Level 7','Level 8','Level 9','Level 10']
        },
        series: [
          {
            name: 'Number of questions',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: 14, name: 'Level 1' },
              { value: 14, name: 'Level 2' },
              { value: 12, name:  'Level 3' },
              { value: 6, name: 'Level 4' },
              { value: 7, name: 'Level 5' },
              { value: 10, name: 'Level 6' },
              { value: 15, name: 'Level 7' },
              { value: 13, name: 'Level 8' },
              { value: 11, name: 'Level 9' },
              { value: 10, name: 'Level 10' },

            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
