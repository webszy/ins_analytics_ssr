<template>
  <div class='chart'>
  </div>
</template>


<script>
import {weekName} from '@/utils/variables'

export default {
name:'TotalPostWeekly',
data(){
  return {
    myChart:null,
    option:{
      backgroundColor: "#111c4e",
      color: ['#3398DB'],
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'line',
              lineStyle: {
                  opacity: 0
              }
          },
          formatter: function(prams) {
              return "PostCount: " + prams[0].value
          }
      },
      title:{
        text:'Total Posts',
        subtext:'Weekday Breakdown',
        left: "4%",
        top: "2%",
        textStyle: {
            color: "#fff",
            fontSize: 20,
            fontWeight:100,
        }
      },
      grid: {
          left: '5%',
          right: '5%',
          bottom: '5%',
          top: '15%',
        //   height: '85%',
          containLabel: true,
          z: 22
      },
      xAxis: {
          type: 'category',
          gridIndex: 0,
          data: weekName,
          axisTick: {
              alignWithLabel: true
          },
          axisLine: {
              lineStyle: {
                  color: '#0c3b71'
              }
          },
          axisLabel: {
              show: true,
              color: 'rgb(170,170,170)',
              fontSize: 16
          }
      },
      yAxis: [{
              type: 'value',
              gridIndex: 0,
              splitLine: {
                  show: false
              },
              axisTick: {
                  show: false
              },
              axisLine: {
                //   lineStyle: {
                //       color: '#0c3b71'
                //   }
              },
              axisLabel: {
                  color: 'rgb(170,170,170)',
                  formatter: '{value}'
              }
          },
          {
              type: 'value',
              gridIndex: 0,
              splitNumber: 12,
              splitLine: {
                  show: false
              },
              axisLine: {
                  show: false
              },
              axisTick: {
                  show: false
              },
              axisLabel: {
                  show: false
              },
              splitArea: {
                  show: true,
                  areaStyle: {
                      color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
                  }
              }
          }
      ],
      series: [{
              name: 'Posts',
              type: 'bar',
              barWidth: '30%',
              xAxisIndex: 0,
              yAxisIndex: 0,
              label: {
                  normal: {
                      show: true,
                      position: "top",
                      textStyle: {
                          color: "#ffc72b",
                          fontSize: 20
                      }
                  }
              },
              itemStyle: {
                  normal: {
                      color: new this.$echarts.graphic.LinearGradient(
                          0, 0, 0, 1, [{
                                  offset: 0,
                                  color: '#00feff'
                              },
                              {
                                  offset: 0.5,
                                  color: '#027eff'
                              },
                              {
                                  offset: 1,
                                  color: '#0286ff'
                              }
                          ]
                      )
                  }
              },
              data: [],
              zlevel: 11,
               markLine: {
            data: [{
                type: 'average',
                name: 'average'
            }]
        },

          },
          {
              name: 'bg',
              type: 'bar',
              barWidth: '50%',
              xAxisIndex: 0,
              yAxisIndex: 1,
              barGap: '-135%',
              data: [],
              itemStyle: {
                  normal: {
                      color: 'rgba(255,255,255,0.1)'
                  }
              },
              zlevel: 9
          },

      ]
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
  }
},
mounted(){
  this._initData().then(yData=>{
      this.option.series[0].data=yData
      for(let k of yData){
          this.option.series[1].data.push(yData[yData.length-1])
      }
      this._initChart()
  })
  .catch(err=>{
  console.log("TCL: err", err)
      
  })
},
methods:{
  _initData(){
     return new Promise((resolve,reject)=>{
        let baseData={},yData=[]
        for(let k of this.chartData){
            let d=new Date(k.taken_at_timestamp*1000),
            week=weekName[d.getDay()]
            if(baseData[week]){
                baseData[week]++
            }else{
                baseData[week]=1
            }
        }
        for(let k of weekName){
            let num=baseData[k]||0
          yData.push(num)
        }
        resolve(yData)
    })
  },
  _initChart(){
    this.myChart=this.$echarts.init(this.$el)
    this.myChart.setOption(this.option)
    window.addEventListener("resize",()=>{this.myChart.resize()})
  }
 },

}
</script>
<style>


</style>
