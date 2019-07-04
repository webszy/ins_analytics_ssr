<template>
  <div class='chart'></div>
</template>


<script>
import {weekName,monthName} from '@/utils/variables'
export default {
name:'MonthlyWeightAverageChart',
data(){
return {
    myChart:null,
    option : {
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
    "tooltip": {
        "trigger": "axis",
        "axisPointer": {
            "type": "shadow",
            textStyle: {
                color: "#fff"
            }

        },
    },
    grid: {
        top: '10%',
        left: '5%',
        right: '5%',
        bottom: '10%',
        containLabel: true,
    },
    "legend": {
        right: '5%',
        top: '10%',
        textStyle: {
            color: '#90979c',
        },
        "data": ['女', '男', '平均']
    },
     
    "calculable": true,
    "xAxis": [{
        "type": "category",
        "axisLine": {
            lineStyle: {
                color: '#90979c'
            }
        },
        "splitLine": {
            "show": false
        },
        "axisTick": {
            "show": false
        },
        "splitArea": {
            "show": false
        },
        "axisLabel": {
            "interval": 0,
        },
        "data": [],
    }],
    "yAxis": [{
        "type": "value",
        "splitLine": {
            "show": false
        },
        "axisLine": {
            lineStyle: {
                color: '#90979c'
            }
        },
        "axisTick": {
            "show": false
        },
        "axisLabel": {
            "interval": 0,

        },
        "splitArea": {
            "show": false
        },

    }],
    "dataZoom": [{
        "show": true,
        "height": 30,
        "xAxisIndex": [
            0
        ],
        bottom: 30,
        "start": 10,
        "end": 80,
        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
        handleSize: '110%',
        handleStyle:{
            color:"#d3dee5",
            
        },
           textStyle:{
            color:"#fff"},
           borderColor:"#90979c"
        
        
    }, {
        "type": "inside",
        "show": true,
        "height": 15,
        "start": 1,
        "end": 35
    }],
    "series": [{
            "name": "Likes",
            "type": "bar",
            "stack": "",
            "barMaxWidth": 35,
            "barGap": "10%",
            "itemStyle": {
                "normal": {
                    "color": "rgba(255,144,128,1)",
                    "label": {
                        "show": true,
                        "textStyle": {
                            "color": "#333"
                        },
                        "position": "insideTop",
                        formatter: function(p) {
                            return p.value > 0 ? (p.value) : '';
                        }
                    }
                }
            },
            "data": [],
        },

        {
            "name": "Comments",
            "type": "bar",
            "stack": "",
            "itemStyle": {
                "normal": {
                    "color": "rgba(0,191,183,1)",
                    "barBorderRadius": 0,
                    "label": {
                        "show": true,
                        "position": "top",
                        formatter: function(p) {
                            return p.value > 0 ? (p.value) : '';
                        }
                    }
                }
            },
            "data": []
        }, {
            "name": "Total",
            "type": "line",
            "stack": "",
            symbolSize:10,
            symbol:'circle',
            "itemStyle": {
                "normal": {
                    "color": "rgba(252,230,48,1)",
                    "barBorderRadius": 0,
                    "label": {
                        "show": true,
                        "position": "top",
                        formatter: function(p) {
                            return p.value > 0 ? (p.value) : '';
                        }
                    }
                }
            },
            "data": []
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
  this._initData().then(({xData,yData})=>{
      this.option.xAxis.data=xData
      this.option.series[0].data=yData.likes
      this.option.series[1].data=yData.comments
      this.option.series[2].data=yData.Total
      this.option.title.text=this.getTitle()
      this._initChart()
  })
  
},
methods:{
  _initData(){
    return new Promise((resolve,reject)=>{
        let xData=[],yData={},
        likes=[],comments=[],
        Total=[]
        // 3、分拆sum为xData，yData
        for(let k of this.chartData){
            console.log("TCL: _initData -> k", k)
            let d=new Date(k.taken_at_timestamp*1000),
            month=d.getMonth(),
            monthStr=monthName[month],
            year=(d.getFullYear()+'').substr(-2),
            likeCount=k.edge_media_preview_like.count||0,
            commentCount=k.edge_media_to_comment.count||0 
            xData.push(monthStr+"'"+year)
            likes.push(likeCount)
            comments.push(commentCount)
            Total.push(likeCount+commentCount)
        }
        yData={likes,comments,Total}
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
