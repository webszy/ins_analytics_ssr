<template>
  <div class='chart'>
  </div>
</template>


<script>

export default {
name:'TagCloud',
data(){
  return {
    myChart:null,
    option : {
    title:{
        text:'Tag Cloud',
        subtext:this.commonTitle,
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
        name: 'HashTags',
        type: 'wordCloud',
        gridSize: 2,
        sizeRange: [20, 60],
        rotationRange: [-90, 90],
        // circle cardioid diamond  triangle-forward triangle pentagon square
        shape: 'square',
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
  .catch(err=>{
  console.log("TCL: err", err)
      
  })
},
methods:{
  _initData(){
    return new Promise((resolve,reject)=>{
        let xData=[],tags={}
        // 遍历caption，由于caption字符串可能有多个例如'#a #b #c'，此时应分割字符串再做处理
        for(let k of this.chartData){
          let captions=k.edge_media_to_caption
          if(captions&&captions.edges&&captions.edges.length){
            for(let n of captions.edges){
              let strArr=n.node.text.split(' ')              
              if(strArr.length>1){
                for(let o of strArr){
                  if(o.indexOf('#')===0){
                    let tagStrArr=o.split('#')
                   tagStrArr.forEach(tag=>{
                       tag='#'+tag
                       if(tag.length>0&&tag!=='#'){
                           if(tags[tag]){
                               tags[tag]++
                           }else{
                               tags[tag]=1
                           }
                       }
                   })
                    
                  }
                }
              }else{
                
                if(n.node.text.indexOf('#')==0&&n.node.text!=='#'){
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
          let obj={name:k,value:tags[k]}
          arr.push(obj)
        }
        // console.log("tagcloud",arr)
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
