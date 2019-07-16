<template>
  <div class='chart' ref="MonthlyWeight">
  </div>
</template>


<script>
import {monthName} from '@/utils/variables'

export default {
name:'MonthlyWeightChart',
data(){
return {
  myChart:null,
  option :{
    backgroundColor: '#fff',
    title: {
        text: "Average Engagement ( Likes + Comments )",
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
    // 鼠标选中时弹框
    tooltip:{
        show:true,
        trigger:'axis',
        axisPointer: {
            type: 'line',
        },
        formatter: "{a} on {b}: {c}"
    },
    legend: {
        left:'center',
        bottom:'0',
        data:['Likes','Comments']
    },
    grid: {
        top: '15%',
        left: '5%',
        right: '5%',
        bottom: '7%',
        containLabel: true,
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLabel: {
            rotate:'-20',
            margin: 30,
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
        },
        axisTick: {
            show: true,
            length: 25,
            lineStyle: {
                color: "#E4E8EB"
            }
        }
    },
    yAxis: [{
        type: 'value',
        position: 'left',
        axisLabel: {
            margin: 20,
            color: '#E4E8EB',
            textStyle:{
                color:'#6A6262'
            }
        },
        axisTick: {
            show: true,
            length: 15,
            lineStyle: {
                color: "#E4E8EB",
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#E4E8EB'
            }
        },
        axisLine: {
            lineStyle: {
                color: '#E4E8EB',
                width: 2
            }
        }
    }],
    series: [{
        name: 'Likes',
        type: 'line',
        smooth: true, //是否平滑曲线显示
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
            normal: {
                color: "#4D5CD9", // 线条颜色
            },
        },
        label: {
            show: true,
            position: 'top',
            textStyle: {
                color: '#6A6262',
            }
        },
        itemStyle: {
            color: "#EBEEFF",
            borderColor: "#3D4FD5",
            borderWidth: 3
        },
        tooltip: {
            show: true
        },
         markLine: {
            data: [{
                type: 'average',
                name: 'average'
            }]
        },
        areaStyle: {
            normal: {
                color: '#D9DDFF'
            }
        },
        data: []
    },
    {
        name: 'Comments',
        type: 'line',
        smooth: true, //是否平滑曲线显示
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
            normal: {
                color: "#4D5CD9", // 线条颜色
            },
        },
        label: {
            show: true,
            position: 'top',
            textStyle: {
                color: '#6A6262',
            }
        },
        itemStyle: {
            color: "#3D4FD5",
            borderColor: "#3D4FD5",
            borderWidth: 3
        },
        tooltip: {
            show: true
        },         
        markLine: {
            data: [{
                type: 'average',
                name: 'average'
            }]
        },
        areaStyle: {
            normal: {
                color:'#D9DDFF'
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
  },
  commonTitle:{
    type:String,
    required:true
  }
},
mounted(){
  this._initData().then(({xData,likeArr,commentArr})=>{
      this.option.xAxis.data=xData
      this.option.series[0].data=likeArr
      this.option.series[1].data=commentArr
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

        let likeData={},commentData={},len=0,likeArr=[],commentArr=[],xData=[]
        for(let k of this.chartData){
            let d=new Date(k.taken_at_timestamp*1000),
            month=d.getMonth()==0?1:d.getMonth(),
            year=d.getFullYear(),
            monthStr=year+'/'+month,
            likeCount=k.edge_media_preview_like.count||0,
            commentCount=k.edge_media_to_comment.count||0
            
            if(!likeData[monthStr]){
                likeData[monthStr]=0
                len++
            }
            likeData[monthStr]+=likeCount
            
            if(!commentData[monthStr]){
                commentData[monthStr]=0
            }
            commentData[monthStr]+=commentCount
        }

        for(let k in likeData){
            xData.push(k)
            likeArr.push(likeData[k])
            commentArr.push(commentData[k])
        }
         resolve({xData,likeArr,commentArr})
    })
   
  },
  _initChart(){
    this.myChart=null
    this.myChart=this.$echarts.init(this.$el)
    this.myChart.setOption(this.option)
    window.addEventListener("resize",()=>{this.myChart.resize()})
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
