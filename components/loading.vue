<template>
  <div class='myLoadingLayer'>
    <div class="myLoading">
      <div ref="element" class="loadAni"></div>
      <h2>{{word}}</h2>
      <p>Our artificial intelligence is Processing your analytics for 
        <span>{{'@'+$route.params.userName||''}}</span>
      </p>
    </div>
  </div>
</template>


<script>
import lottie from 'lottie-web'
import loadingData from '../assets/loading'
export default {
name:'myLoading',
data(){
return {
  word:'Loading...'
  }
 },
mounted(){
  let anim=lottie.loadAnimation({
  container: this.$refs.element, // the dom element that will contain the animation
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: loadingData, // the path to the animation json
  });
 
  
},
methods:{

 },
computed:{}
}
</script>
<style>
.myLoadingLayer{
  width: 100%;
  height: 100%;
  background:rgba(0,0,0,0.4);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}
.myLoading{
  width:30.252%;
  height: 447px;
  max-width: 580px;
  max-height: 447px;
  background:#3D4FD5;
  border-radius:20px;
  box-sizing: border-box;
  padding-top: 70px;
  padding-bottom: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color:#fff;
}
.loadAni{
  width: 130px;
  height: 130px;
}
.myLoading h2{
font-size:40px;
font-family:'PingFangSC-Medium';
font-weight:500;
line-height:84px;
}
.myLoading p{
  width: 80%;
  text-align: center;
  font-size:22px;
  font-family:'PingFangSC-Medium';
  font-weight:500;
  line-height:34px;
}
.myLoading span{
  color:salmon;
}
</style>
