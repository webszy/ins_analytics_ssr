<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
export default {
  name:'layouts',
  mounted(){
    this.shareButton()
  },
  methods:{
    shareButton(){
      if(document.getElementById('shareButton')){return}
      let script=document.createElement('script')
      script.src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d269635527c49da"
      script.defer=''
      script.id="shareButton"
      let root=document.getElementById('__nuxt')
      if(root){
        root.appendChild(script)
        script=null
      }else{
        setTimeout(()=>{
          document.getElementById('__nuxt').appendChild(script)
          script=null
        },1000)
      }
    }
  }
}
</script>
<style>
html {
 width: 100%;
 height: 100%;
}

</style>
