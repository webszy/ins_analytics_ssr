<template>
  <div class=''>
    <p>{{$route.params.userName}}</p>
    <loading/>
  </div>
</template>


<script>
import loading from '@/components/loading'
export default {
name:'ProfileAnalytics',
components:{loading},
data(){
return {
  }
 },
mounted(){
  if(this.$route.params.userName!=''){
   
  }
},
methods:{

 },
computed:{}
}
</script>
<style>


</style>
