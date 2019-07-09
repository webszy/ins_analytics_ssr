<template>
  <div class='chart' >

  </div>
</template>


<script>
import {weekName} from '../../utils/variables' 
export default {
name:'mostCommentByUser',
data(){
return {
  myChart:null,
  
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
      // this.option.series[0].data=typeImg
      // this.option.series[1].data=typeVideo
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
