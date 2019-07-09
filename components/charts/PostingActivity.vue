<template>
  <div class='chart'>

  </div>
</template>


<script>
// https://gallery.echartsjs.com/editor.html?c=xCGw1sDm7i
import {weekName,hours} from '../../utils/variables'
export default {
name:'PostingActivity',
data(){
return {
  myChart:null
  }
 },
props:{
  chartData:{
    type:[Object,Array],
    required:true
  },
  firstTime:{
    type:Number,
    required:true
  },
  lastTime:{
    type:Number,
    required:true
  },
  commonTitle:{
    type:String,
    required:true
  }
},
mounted(){
 this._initData().then(datas=>{
      // this.option.series[0].data=typeImg
      // this.option.series[1].data=typeVideo
      // this._initChart()
  })
},
methods:{
  _initData(){
    return new Promise((resolve,reject)=>{
      // [[weekname,hours,data]],
      let baseData={}
      for(let k of this.chartData){
        let d=new Date(k.taken_at_timestamp*1000),
        week=weekname[d.getDay()],
        hour=d.getHours()==0?d.getHours()+1:d.getHours()
        if(!baseData[week]){baseData[week]={}}
        if(baseData[week][hour]){
          baseData[week][hour]++
        }else{
           baseData[week][hour]=1
        }
      }

      resolve(datas)
    })
  },
_initChart(){
    this.myChart=null
    this.myChart=this.$echarts.init(this.$el)
    this.myChart.setOption(this.option)
    // window.addEventListener("resize",()=>{this.myChart.resize()})
  },
 },
computed:{}
}
</script>
<style>


</style>
