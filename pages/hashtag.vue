<template>
  <div class='app-container'>

  </div>
</template>


<script>
import {Loading} from 'element-ui'
getHashTagData
import {
  getHashTagData,
  getNextPageData,
  getQueryHash
} from '@/utils/request'
export default {
name:'HashTagAnalytics',
components:{},
data(){
  return {
    loadingInstance1:null,
    hashtag:this.$route.params.hashtag||'',
    queryIdList:[],
    tagBaseData:{},
    hasNextPage:false,
    end_cursor:'',
    tagMediaList:[],
    request
  }
 },
mounted(){
  if(this.hashtag!==''){
     this.loadingInstance1=Loading.service({ fullscreen: true,lock: true,text:'拉取 '+this.hashtag+' 的Tag数据' });
     this.getHashTagBaseData()
  }
},
methods:{
  getHashTagBaseData(){
    getHashTagData(this.hashtag)
    .then(res=>{
      console.log("TCL: getHashTagBaseData -> res", res)
      this.tagBaseData=res.data
      this.hasNextPage=res.data.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.page_info.has_next_page
      this.end_cursor=res.data.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.page_info.end_cursor
      let list=res.data.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges
      for(let k of list){
        this.tagMediaList.push(k.node)
      }
      return getQueryHash(res.jsFileURL)
    })
    .then(res=>{
      this.queryIdList=res
      if(this.hasNextPage){
        this.getNextHashTagPageData()
      }
    })
  },
  getNextHashTagPageData(){
    getNextPageData('',this.end_cursor,this.queryIdList[2],this.hashtag)
    .then(res=>{
      console.log("TCL: getNextHashTagPageData -> res", res)
      if(res.status==='ok'){
        this.hasNextPage=res.data.hashtag.edge_hashtag_to_media.page_info.has_next_page
        this.end_cursor=res.data.hashtag.edge_hashtag_to_media.page_info.end_cursor
        let list=res.data.hashtag.edge_hashtag_to_media.edges
        for(let k of list){
          this.tagMediaList.push(k.node)
        }
      }
      if(this.hasNextPage&&this.tagMediaList.length<=114){
        setTimeout(()=>{
          return this.getNextHashTagPageData()
        },Math.random()*800+500)
      }
    })
    .catch(err=>{
      console.log("TCL: getNextHashTagPageData -> err", err)
    })
  }
},
computed:{}
}
</script>
<style>


</style>
