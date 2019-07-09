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
  myChart:null,
  option : {
    tooltip: {
        position: 'top',
        formatter:function(param){
            if(param.data[2]==0){
              return '0'
            }
        }
    },
    animation: false,
    title:{
      text:'Posting Activity',
      subtext:'Posting times on Profile',
      left:'5%',  
    },
    grid: {
       left: '3%',
          top: '10%',
          right: '8%',
          bottom: '8%',
          containLabel: true
    },
    xAxis: {
        type: 'category',
        data: weekName,
        splitArea: {
            show: true
        }
    },
    yAxis: {
        type: 'category',
        data: hours,
        splitArea: {
            show: true
        }
     },
    
    visualMap: [{
        show:true,
        min: 0,
        max: 10,
        range:[1,10],
        calculable: true,
        orient: 'vertical',
        right: '2%',
        bottom: '8%'
    }],
    series: [{
        name: 'Post Count',
        type: 'heatmap',
        data: [],
        label: {
            normal: {
                show: true,
                formatter:function(param){
                    if(param.data[2]==0){
                        return '0'
                    }
                }
            }
        },
        itemStyle: {
            opacity:function(){
            if(param.data[2]==0){
                return 0
            }
            },
            emphasis: {
                shadowBlur:10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
}
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
 this._initData().then(yData=>{
      this.option.series[0].data=yData
      this._initChart()
  })
},
methods:{
  _initData(){
    return new Promise((resolve,reject)=>{
      // [[hours,weekname,data]],
      let baseData={}
      for(let k of this.chartData){
        let d=new Date(k.taken_at_timestamp*1000),
        week=weekName[d.getDay()],
        hour=d.getHours()===0?22:d.getHours()-1,
        hourName=hours[hour]
        if(hour===-1){console.log(k.taken_at_timestamp*1000)}
        if(!baseData[week]){baseData[week]={}}
        if(baseData[week][hourName]){
          baseData[week][hourName]++
        }else{
           baseData[week][hourName]=1
        }
      }
      // 不存在的数据补0
      for(let k in baseData){
        for(let i of hours){
          if(!baseData[k][i]){baseData[k][i]='0'}
        }
      }
      let yData=[]
      for(let k in baseData){
        for(let n in baseData[k]){
          let weekIndex=weekName.indexOf(k),
          hourIndex=hours.indexOf(n)
          let one=[weekIndex,hourIndex,baseData[k][n]]
          yData.push(one)
        }
      }

      resolve(yData)
    })
  },
_initChart(){
    this.myChart=null
    this.myChart=this.$echarts.init(this.$el)
    this.myChart.setOption(this.option)
    window.addEventListener("resize",()=>{this.myChart.resize()})
  },
 },
computed:{}
}
</script>
<style>


</style>
