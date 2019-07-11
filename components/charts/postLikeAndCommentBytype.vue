<template>
  <div class='chart' >

  </div>
</template>


<script>
import {weekName} from '../../utils/variables' 
export default {
name:'PostLikeCommentByType',
data(){
return {
  myChart:null,
  option : {
    tooltip: {
        trigger: 'axis',
         axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
        shadowStyle:{
          color:'rgba(255, 255, 255, 0.5)'
        }
    },
    title:{
      text:'Likes and Comments by Media Type',
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
        top: '15%',
        left: '5%',
        right: '5%',
        bottom: '6%',
        containLabel: true,
    },
    /*toolbox: {
        show: true,
        feature: {
            dataView: {
                show: true,
                readOnly: true
            },
            magicType: {
                show: true,
                type: ['line', 'bar']
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },*/
    calculable: false,
    xAxis: [{
        type: 'category',
        data: weekName,
         axisLabel: {
            color: '#E4E8EB',
            textStyle:{
                color:'#6A6262'
            }
        },
          axisLine: {
            lineStyle: {
                color: '#E4E8EB',
                width: 2
            }
        }
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} ',
            color: '#E4E8EB',
            textStyle:{
                color:'#6A6262'
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
        },
        show: true,
          axisLine: {
            lineStyle: {
                color: '#E4E8EB',
                width: 2
            }
        }
    }],
     legend: {
        bottom: '1%',
        data: ['Picture', 'Video'],
    },
    series: [
      {name: 'Picture',
        type: 'bar',
        data:[],
        markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值'
                }, {
                    type: 'min',
                    name: '最小值'
                }]
        },
        markLine: {
                data: [{
                    type: 'average',
                    name: '平均值'
                }]
        },
        color:'#4052D6'
      },
      {name: 'Video',
        type: 'bar',
        data: [],
        markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值'
                }, {
                    type: 'min',
                    name: '最小值'
                }]
        },
        markLine: {
                data: [{
                    type: 'average',
                    name: '平均值'
                }]
        },
        color:'#3D83F6'
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
   this._initData().then(({typeImg,typeVideo})=>{
      this.option.series[0].data=typeImg
      this.option.series[1].data=typeVideo
      this.option.title.subtext=this.commonTitle
      this._initChart()
  })
},
methods:{
  _initData(){
    // xData为tag,yData为数量
    return new Promise((resolve,reject)=>{
        let typeImg=new Array(7).fill(0),typeVideo=new Array(7).fill(0)
        for(let k of this.chartData){
          let week=new Date(k.taken_at_timestamp*1000).getDay()-1,
          likeCount=k.edge_media_preview_like.count||0,
          commentCount=k.edge_media_to_comment.count||0
          if(k.__typename==="GraphImage"){
            typeImg[week]+=likeCount+commentCount
          }else{
            typeVideo[week]+=likeCount+commentCount
          }
        }
        
        resolve({typeImg,typeVideo})
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
