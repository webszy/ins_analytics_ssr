<template>
  <section >
   <el-card  class="box-card">
      <header slot="header" class="clearfix">输入用户名查询</header>
      <div style="display:flex;justify-content:space-between;">
        <el-input placeholder="请输入instagram用户名" v-model.trim="username"></el-input>
        <el-button @click="goto">查询</el-button>
      </div>
   </el-card>
  </section>
</template>

<script>

export default {
  name:'HomePage',
  components: {
  },
  data(){
    return {
      username:''
    }
  },
  methods: {
    goto(){
      if(this.username!=''){
        this.$router.push({name:'profile',params:{userName:this.username}})
      }else{
        alert('请输入用户名')
      }
      
    }
  },
}
</script>

<style>
  .box-card {
    width: 400px;
    margin: 0 auto;
    margin-top :50px;
  }
  .box-card .el-input{
    width: 80%;
  }
</style>
