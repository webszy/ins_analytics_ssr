<template>
  <div class='chart'>

  </div>
</template>


<script>
import {weekName,monthName} from '@/utils/variables'

export default {
name:'MostTagsChart',
data(){
  const colorArray = [
    {
        top: '#4D5CD9', //蓝
        bottom: '#CCD3FA'
    }, {
        top: '#336CD6', 
        bottom: '#D4DAFF'
    },
    {
        top: '#35ABDF', 
        bottom: '#C4E2FE'
    }, {
        top: '#36D0E3', 
        bottom: '#B9EAFD'
    },
    {
        top: '#7235DF', 
        bottom: '#F4DCFA'
    },
    {
        top: '#3649EC', 
        bottom: '#CCD3FA'
    }
]
  return {
    myChart:null,option : {
    backgroundColor: '#fff',
     tooltip: {
          show: true,
          formatter: "{b}:{c}"
        },
      title:{
        text:'Favorite Hashtags',
        left: "4%",
        top: "1%",
        textStyle: {
            color: "#050505",
            fontSize: 24,
            fontWeight:600,
            fontFamily:'PingFangSC-Medium'
        },
        subtext:this.commonTitle,
        subtextStyle :{
          color: "#7F7F7F",
            fontSize: 16,
            fontWeight:100,
        }
      },
      grid: {
          left: '5%',
          top: '10%',
          right: '8%',
          bottom: '8%',
          containLabel: true
        },
    xAxis: {
        type: 'value',
        show:false,
        position: 'top',
        axisTick: {
            show: false
        },
        axisLine: {
            show: false,
            lineStyle: {
                color: '#fff',
            }
        },
        splitLine: {
            show: false
        },
        axisLabel: {
            show: true,
            color: '#E4E8EB',
            textStyle:{
                color:'#6A6262'
            }
        }
    },
    yAxis: {
        type: 'category',
        axisTick: {
            show: false,
            alignWithLabel: false,
            length: 5
        },
        "splitLine": { //网格线
            "show": false
        },
        inverse: 'true', //排序
        axisLine: {
            show: false,
            lineStyle: {
                color: '#fff',
            }
        },
        data: [],
        axisLabel: {
          show: true,
          color: '#E4E8EB',
          textStyle:{
              color:'#6A6262'
            }
          }
        }
    ,
    series: [{
            name: 'Tag Count',
            type: 'bar',
                label: {
                normal: {
                  show: true,
                  position: 'right',
                  formatter: '{c}',
                  textStyle: {
                    color: '#6A6262' //color of value
                  }
                }
              },
            itemStyle: {
                normal: {
                    show: true,
                    color: function(params) {
                        let num = colorArray.length;
                        return {
                            type: 'linear',
                            colorStops: [{
                                offset: 0,
                                color: colorArray[params.dataIndex % num].bottom
                            }, {
                                offset: 1,
                                color: colorArray[params.dataIndex % num].top
                            }, {
                                offset: 0,
                                color: colorArray[params.dataIndex % num].bottom
                            }, {
                                offset: 1,
                                color: colorArray[params.dataIndex % num].top
                            }, {
                                offset: 0,
                                color: colorArray[params.dataIndex % num].bottom
                            }, {
                                offset: 1,
                                color: colorArray[params.dataIndex % num].top
                            }, {
                                offset: 0,
                                color: colorArray[params.dataIndex % num].bottom
                            }, {
                                offset: 1,
                                color: colorArray[params.dataIndex % num].top
                            }, {
                                offset: 0,
                                color: colorArray[params.dataIndex % num].bottom
                            }, {
                                offset: 1,
                                color: colorArray[params.dataIndex % num].top
                            }, {
                                offset: 0,
                                color: colorArray[params.dataIndex % num].bottom
                            }, {
                                offset: 1,
                                color: colorArray[params.dataIndex % num].top
                            }],
                            //globalCoord: false
                        }
                    },
                    borderWidth: 0,
                    borderColor: '#333',
                }
            },
            barGap: '0%',
            barCategoryGap: '50%',
            data: []
        }

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
      this.option.yAxis.data=xData
      this.option.series[0].data=yData
      this._initChart()
  })
  
},
methods:{
  _initData(){
    // xData为tag,yData为数量
    return new Promise((resolve,reject)=>{
        let xData=[],yData=[],tags={}
        // 遍历caption，由于caption字符串可能有多个例如'#a #b #c'，此时应分割字符串再做处理
        for(let k of this.chartData){
          let captions=k.edge_media_to_caption
          if(captions&&captions.edges&&captions.edges.length){
            for(let n of captions.edges){
              let strArr=n.node.text.split(' ')              
              if(strArr.length>1){
                for(let o of strArr){

                  if(o.indexOf('#')===0){
                    if(tags[o]){
                      tags[o]++
                    }else{
                      tags[o]=1
                    }
                  }
                }
              }else{
                if(n.node.text.indexOf('#')==0){
                  if(tags[n.node.text]){
                    tags[n.node.text]++
                  }else{
                    tags[n.node.text]=1
                  }
                }
                
              }
            }
          }
        }
        let arr=[]
        for(let k in tags){
          let obj={tag:k,count:tags[k]}
          arr.push(obj)
        }
        arr.sort((a,b)=>{return b.count-a.count})
        for(let i=0;i<9;i++){
          let item=arr[i]
          if(!item){
            break
          }else{
            xData.push(item.tag)
            yData.push(item.count)
          }
        }
        
        resolve({xData,yData})
    })
   
  },
  _initChart(){
    this.myChart=null
    this.myChart=this.$echarts.init(this.$el)
    this.myChart.setOption(this.option)
    window.addEventListener("resize",()=>{this.myChart.resize()})
  },
}
}
</script>
<style>


</style>
