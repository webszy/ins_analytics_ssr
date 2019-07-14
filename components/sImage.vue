<template>
<div class="img">
   <el-image   :src="src" :style="getStyle">
        <div slot="placeholder" class="image-slot" >
          <i class="el-icon-loading"></i>
        </div>
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
        
      </el-image>
    <div class="index">{{index}}</div>
</div>
     
</template>


<script>

export default {
name:'SuperImageItem',
data(){
return {

  }
 },
props:{
  src:{
    type:String,
    required:true
  },
  width:{
    type:Number,
    required:true
  },
  height:{
    type:Number,
    required:true
  },
  index:{
    type:Number,
    required:true
  }
},
mounted(){
  
},
computed: {
  getStyle(){
    return 'width:100%;'+'height:'+this.height+'px;'
  }
},
}
</script>
<style>
.el-image .image-slot {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-image .image-slot .el-icon-loading{
  font-size: 80px;
  color:#3D4FD5;
}
.el-image .image-slot .el-icon-picture-outline{
   font-size: 80px;
}
.img{
  position: relative;
}
.img .index{
  width:78px;
  height:34px;
  background-color:#3D4FD5;
  position: absolute;
  top:0;
  right: 0;
  background-image: url('../assets/images/trophy_ic.png');
  background-repeat: no-repeat;
  background-size: 20px 18px;
  background-position: 19px 8px;
  color:#fff;
  font-size:18px;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  line-height:34px;
  text-indent: 42px;
}

</style>
