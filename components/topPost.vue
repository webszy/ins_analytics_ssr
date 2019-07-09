<template>
  <div class='post'>
    <section>
      <el-image src="src" fit='scale-down'>
        <div slot="placeholder" class="image-slot">
          <i class="el-icon-loading"></i>
        </div>
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </section>
  </div>
</template>


<script>

export default {
name:'TopPost',
data(){
return {
  userPost:[]
  }
 },
mounted(){

},
methods:{
  _initData(){
    return new Promise((resolve,reject)=>{
      let Post=[]
    })
  }
 },
computed:{}
}
</script>
<style>


</style>
