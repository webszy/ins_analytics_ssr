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
      textStyle: {
            color: "#050505",
            fontSize: 24,
            fontWeight:600,
            fontFamily:'PingFangSC-Medium'
        },
        subtextStyle:{
            color:'#7F7F7F',
            fontSize: 16,
        }  
    },
    grid: {
       left: '3%',
          top: '13%',
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
     dataZoom: [{
        type: 'inside',
        start: 0,
        end: 10
    }, {
        start: 0,
        end: 10,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
        },
      
    }],
    visualMap: [{
        show:true,
        min: 0,
        max: 10,
        range:[1,10],
        calculable: true,
        // controller:true,
        orient: 'vertical',
        right: '2%',
        bottom: '8%',
        inRange:{
          color:['#F0F0F0','#3D4FD5','#26328F']
        },
        controller:{
          // inRange:{
          //   symbolSize:[30,500]
          // }
        }
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
