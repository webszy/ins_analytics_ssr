<template>
   <a class="header" href="/">
      <img src="../assets/images/logo_ic.png" alt="logo">
      <div>
        <p>{{info.name}}</p>
        <p>{{info.subName}}</p>
      </div>
    </a>
</template>


<script>
 import info from '../assets/content/seo'
export default {
  name:'commonHead',
  data(){
    return{
      info:info
    }
    
  }
}
</script>
<style>
 .header{
    width: 100%;
    height:80px;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    padding-left: 273px;
}
.header img{
  width: 40px;
  height: 40px;
}
 .header div{
   padding-left: 16px;
}
 .header p:first-of-type{ 
  font-size: 26px;
  line-height: 32px;
  font-family: 'Gill Sans Bold';
  font-weight: 600;
  color:#000;
}
 .header p:last-of-type{
  font-size: 10px;
  line-height: 14px;
  font-family: 'PingFangSC-Medium';
  font-weight:500;
  color:#050505;
}

</style>
