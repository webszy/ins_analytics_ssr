<template>
  <div class='chart' ref="MonthlyWeight">
  </div>
</template>


<script>
import {weekName,monthName} from '@/utils/variables'
export default {
name:'MonthlyWeightChart',
data(){
return {
  myChart:null,
 
  option :{
    backgroundColor: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#c86589'
        },
        {
            offset: 1,
            color: '#06a7ff'
        }
    ], false),
    title: {
        text: "",
        right: "4%",
        bottom: "2%",
        textStyle: {
            color: "#fff",
            fontSize: 13,
            fontWeight:100,
        }
    },
    // 鼠标选中时弹框
    tooltip:{
        show:true,
        trigger:'axis',
        axisPointer: {
            type: 'line',
            lineStyle: {
                opacity: 0
            }
        },
        formatter: "{b}: {c}"
    },
    grid: {
        top: '10%',
        left: '5%',
        right: '5%',
        bottom: '10%',
        containLabel: true,
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLabel: {
            margin: 30,
            color: '#ffffff63'
        },
        axisLine: {
            lineStyle: {
                color: '#fff',
                width: 2
            }
        },
        axisTick: {
            show: true,
            length: 25,
            lineStyle: {
                color: "#ffffff1f"
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#ffffff1f'
            }
        }
    },
    yAxis: [{
        type: 'value',
        position: 'left',
        axisLabel: {
            margin: 20,
            color: '#ffffff63'
        },
        axisTick: {
            show: true,
            length: 15,
            lineStyle: {
                color: "#ffffff1f",
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#ffffff1f'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#fff',
                width: 2
            }
        }
    }],
    series: [{
        name: 'Post Weight',
        type: 'line',
        smooth: true, //是否平滑曲线显示
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
            normal: {
                color: "#fff", // 线条颜色
            },
        },
        label: {
            show: true,
            position: 'top',
            textStyle: {
                color: '#fff',
            }
        },
        itemStyle: {
            color: "red",
            borderColor: "#fff",
            borderWidth: 3
        },
        tooltip: {
            show: false
        },
        areaStyle: {
            normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#eb64fb'
                    },
                    {
                        offset: 1,
                        color: '#3fbbff0d'
                    }
                ], false),
            }
        },
        data: []
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
  }
},
mounted(){
  this._initData().then(({xData,yData})=>{
      this.option.xAxis.data=xData
      this.option.series[0].data=yData
      this.option.title.text=this.getTitle()
      this._initChart()
  })
  .catch(err=>{
  console.log("TCL: err", err)
      
  })
  
},
methods:{
  _initData(){
    return new Promise((resolve,reject)=>{

        let Data={},len=0,xData=[],yData=[]
        for(let k of this.chartData){
            let d=new Date(k.taken_at_timestamp*1000),
            month=d.getMonth(),
            year=(d.getFullYear()+'').substr(-2),
            monthStr=monthName[month]+"'"+year,
            
            likeCount=k.edge_media_preview_like.count||0,
            commentCount=k.edge_media_to_comment.count||0
            if(!Data[monthStr]){
                Data[monthStr]=likeCount+commentCount
                len++
            }else{
                Data[monthStr]+=likeCount+commentCount
            }
        }
        for(let k in Data){
            xData.push(k)
            let avg=Math.floor(Data[k]/len)
            yData.push(avg)
        }
         resolve({xData,yData})
    })
   
  },
  _initChart(){
    this.myChart=null
    this.myChart=this.$echarts.init(this.$el)
    this.myChart.setOption(this.option)
    // window.addEventListener("resize",()=>{this.myChart.resize()})
  },
  getTitle(){
    let first=new Date(this.firstTime*1000),
    last =new Date(this.lastTime*1000),
    firstTimeString=`${weekName[first.getDay()]} ${first.getDate()} ${monthName[first.getMonth()]} ${first.getFullYear()} - `,
    lastTimeString=`${weekName[last.getDay()]} ${last.getDate()} ${monthName[last.getMonth()]} ${last.getFullYear()}`
    return firstTimeString+lastTimeString
  }
},
computed:{}
}
</script>
<style>
.chart{
  width: 100%;
  height: 100%;
}

</style>
