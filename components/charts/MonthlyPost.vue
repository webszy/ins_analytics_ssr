<template>
  <div class='chart'>
  </div>
</template>


<script>
import {monthName} from '@/utils/variables'

export default {
name:'PostAverageChart',
data(){
  return {
    myChart:null,
    option:{
      backgroundColor: "#fff",
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
      title: {
        text: "Post Count",
        subtext:'',
        left: "4%",
        top: "1%",
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
          left: '4%',
          right: '5%',
          bottom: '5%',
          top: '15%',
          height: '85%',
          containLabel: true,
          z: 22
      },
      xAxis: {
          type: 'category',
          gridIndex: 0,
          data: [],
          axisTick: {
              alignWithLabel: true
          },
          axisLine: {
              lineStyle: {
                  color: '#E4E8EB'
              }
          },
          axisLabel: {
            show: true,
            formatter: '{value}',
            color: '#E4E8EB',
            textStyle:{
                color:'#6A6262'
            }
          }
          
      },
      yAxis: [{
              type: 'value',
              gridIndex: 0,
              splitLine: {
                  show: true,
                  lineStyle: {
                        color: '#E4E8EB'
                    }
              },
              axisTick: {
                  show: false
              },
              axisLine: {
                  lineStyle: {
                      color: '#E4E8EB',
                      width: 2
                  }
              },
              axisLabel: {
                  color: '#E4E8EB',
                  formatter: '{value}',
                    color: '#E4E8EB',
                    textStyle:{
                        color:'#6A6262'
                    }
              },
          },
          {
              type: 'value',
              gridIndex: 0,
              splitNumber: 12,
              splitLine: {
                  show: false,
                  lineStyle: {
                        color: '#E4E8EB'
                    }
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
                                  color: '#6B82EA'
                              },
                              
                              {
                                  offset: 1,
                                  color: '#3E50D5'
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
                      color: 'rgba(255,255,255,0)'
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
  },
  commonTitle:{
    type:String,
    required:true
  }
},
mounted(){
  this._initData().then(({xData,yData})=>{
      this.option.xAxis.data=xData
      this.option.series[0].data=yData
      for(let k of yData){
          this.option.series[1].data.push(yData[yData.length-1])
      }
      this.option.title.subtext=this.commonTitle
      this._initChart()
  })
  .catch(err=>{
  console.log("TCL: err", err)
      
  })
},
methods:{
  _initData(){
     return new Promise((resolve,reject)=>{
        let baseData={},xData=[],yData=[]
        for(let k of this.chartData){
            let d=new Date(k.taken_at_timestamp*1000),
            month=d.getMonth(),
            year=(d.getFullYear()+'').substr(-2),
            monthStr=monthName[month]+"'"+year
            if(!baseData[monthStr]){
                baseData[monthStr]=1
            }else{
              baseData[monthStr]++
            }
        }
        for(let k in baseData){
            xData.push(k)
            yData.push(baseData[k])
        }
        resolve({xData,yData})
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
