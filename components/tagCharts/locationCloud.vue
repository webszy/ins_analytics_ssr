<template>
  <div class='chart'>
  </div>
</template>


<script>

export default {
name:'LocationCloud',
data(){
  return {
    myChart:null,
    option : {
    title:{
        text:'Location Cloud',
        subtext:'First Page Post BreakDown',
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
    tooltip: {
        trigger: 'item',
        shadowStyle:{
          color:'rgba(255, 255, 255, 0.5)'
        }
    },
    series: [{
        name: 'Location',
        type: 'wordCloud',
        gridSize: 2,
        sizeRange: [20, 60],
        rotationRange: [-90, 90],
        // circle cardioid diamond  triangle-forward triangle pentagon square
        shape: 'circle',
        left: '5%',
        top: '5%',
        width: '90%',
        height: '90%',
        right: '5%',
        bottom: '5%',
        gridSize:6,
        drawOutOfBound: true,
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
        textStyle:{
             normal: {
                color: function () {
                    return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')';
                }
            },
            emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(0,0,0,.3)'
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
  }
},
mounted(){
  this._initData().then(yData=>{
      this.option.series[0].data=yData
      this._initChart()
  })
  .catch(err=>{
  console.log("TCL: err", err)
      
  })
},
methods:{
  _initData(){
    return new Promise((resolve,reject)=>{
        let xData=[],baseData={}
        // 遍历caption，由于caption字符串可能有多个例如'#a #b #c'，此时应分割字符串再做处理
        for(let k of this.chartData){
          if(k.location&&k.location.length){
            
            if(baseData[k.location]){
              baseData[k.location]++
            }else{
              baseData[k.location]=1
            }
          }
        }
        let arr=[]
        for(let k in baseData){
          let obj={name:k,value:baseData[k]}
          arr.push(obj)
        }
        // console.log("tagcloud",arr)
        if(arr.length===0){
          arr.push({name:'Not Find',value:1})
        }
        resolve(arr)
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
