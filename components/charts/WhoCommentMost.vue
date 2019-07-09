<template>
  <div class='chart'>
    <p>@someOne</p>
  </div>
</template>


<script>

export default {
name:'WhoCommentMost',
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
  
},
methods:{
    _initData(){
    return new Promise((resolve,reject)=>{
        let Person={},xData=[],yData=[]
        for(let k of this.chartData){
          if(k.edge_media_to_comment&&k.edge_media_to_comment.count>0){
            let comments=k.edge_media_to_comment.edges
          }
        }  
      
    })
  }
},
computed:{
 
}
}
</script>
<style>


</style>
