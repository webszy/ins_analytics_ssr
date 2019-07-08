<template>
  <div class='chart'>
    {{userLocation}}
  </div>
</template>


<script>

export default {
name:'UserLocation',
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

 },
computed:{
  userLocation(){
    // 遍历
    let data={}
    for(let k of this.chartData){
      if(k.location&&k.location!==null){
        if(data[k.location]){
          data[k.location]++
        }else{
          data[k.location]=0
        }
      }
    }
    let arr=[]
    for(let k in data){
      let obj={
        location:k,
        count:data[k]
      }
      arr.push(obj)
    }
    arr.sort((a,b)=>a.count-b.count)

    return arr[0]?arr[0]:'unknown'
  }
}
}
</script>
<style>


</style>
