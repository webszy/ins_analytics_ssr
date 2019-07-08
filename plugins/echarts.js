
import Vue from 'vue'
// const echarts = require('echarts');
import echarts from 'echarts'
// import'echarts-wordcloud'
if (process.client) {
  window.echarts=echarts
  require('echarts-wordcloud')
}
 Vue.prototype.$echarts= echarts
