<template>
  <div class='chart location'>
    <header>
      <p>Location Tagged</p>
      <span>Location Breakdown</span>
    </header>
    <p class="l">{{userLocation}}</p>
    
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
      // console.log("TCL: userLocation -> k.location", k.location)
        if(k.location.name&&k.location.name.length){

          if(!data[k.location.name]){
            data[k.location.name]=1
          }else{
            data[k.location.name]++
          }
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
  
    return arr[0]?arr[0].location:''
  }
}
}
</script>
<style>
.location header{
  width: 100%;
  padding-top: 1%;
  text-align: center;
}
.location header p{
  color:#050505;
  font-size: 24px;
  font-family:PingFangSC-Medium;
  font-weight:600;
  color:#050505;
  line-height:33px;
                               
}
.location header span{
  font-size:16px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:#7F7F7F;
  line-height:22px;
}
.location .l{
  width: 100%;
  font-size: 80px;
  padding-top:30%;
  text-align: center;
  font-weight: 900;
}
</style>
