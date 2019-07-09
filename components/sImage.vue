<template>
      <el-image :src="src" :style="getStyle">
        <div slot="placeholder" class="image-slot" >
          <i class="el-icon-loading"></i>
        </div>
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
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
  }
},
mounted(){

},
computed: {
  getStyle(){
    return 'width:'+this.width+'px;'+'height:'+this.height+'px;'
  }
},
}
</script>
<style lang="scss">


</style>
