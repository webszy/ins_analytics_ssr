<template>
  <section class='profilePage'>
   <section class="info">
     <div>
       <header> <img :src="userPic" > {{this.userName}}</header>
       <p>{{userBio}}</p>
     </div>
     <div>
       <p>posts:{{postList.length}}</p>
       <p>Followers:{{followers}}</p>
       <p>Following:{{following}}</p>
     </div>
     <div></div>
   </section>
   
  </section>
</template>


<script>
import loading from '@/components/loading'
import {Loading} from 'element-ui'
import {
  getUserBaseInfo,
  getQueryHash,
  getNextPageData,
  getSingleMediaInfo
} from '@/utils/request'
export default {
name:'ProfileAnalytics',
components:{loading},
data(){
return {
   loadingInstance1:null,
   userName:this.$route.params.userName||'',
   profile:null,
   hasNextPage:false,
   end_cursor:'',
   queryIdList:[],
   postList:[],
   userPic:'',
   userBio:'',
   followers:0,
   following:0
  }
 },
mounted(){
  if(this.userName!=''){
   this.loadingInstance1=Loading.service({ fullscreen: true,lock: true,text:'拉取 '+this.userName+' 的数据' });
   this.getProfileData(this.userName)
  }
},
methods:{
  getProfileData(usernmae){
    getUserBaseInfo(usernmae)
    .then(res=>{
      this.profile=res.data
      this.userPic=res.data.entry_data.ProfilePage[0].graphql.user.profile_pic_url
      this.userBio=res.data.entry_data.ProfilePage[0].graphql.user.biography
      if(this.userBio.length===0){
        this.userBio='No Instagram BIO'
      }
      this.followers=res.data.entry_data.ProfilePage[0].graphql.user.edge_followed_by.count
      this.following=res.data.entry_data.ProfilePage[0].graphql.user.edge_follow.count
      this.hasNextPage=res.data.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.page_info.has_next_page
      this.end_cursor=res.data.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.page_info.end_cursor
      this.handlePostEdges(res.data.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges)
      return getQueryHash(res.jsFileURL)
    })
    .then(res=>{
      this.queryIdList=res
      if(this.hasNextPage){
        this.getUserAllPost()
      }else{
        this.getCommentDetails()
      }
      
    })
  },
  getUserAllPost(){
    let userId=this.profile.entry_data.ProfilePage[0].graphql.user.id
    getNextPageData(userId,this.end_cursor,this.queryIdList[2])
    .then(res=>{
      console.log("TCL: getUserAllPost -> res", res)
      if(res.status=='ok'){
        let item=res.data.user.edge_owner_to_timeline_media
        this.hasNextPage=item.page_info.has_next_page
        this.end_cursor=item.page_info.end_cursor
        this.handlePostEdges(item.edges)
      }
      if(this.hasNextPage){
          setTimeout(()=>{
            return this.getUserAllPost()
          },Math.random()*500+500)
        }else{
          this.getCommentDetails()
        }
    }) 
  },
  handlePostEdges(edges){
    for(let k of edges){
      this.postList.push(k.node)
      /*
      let obj={}
      obj.commentCount=k.node.edge_media_to_comment.count
      obj.likeCount=k.node.edge_media_preview_like.count
      obj.createAt=k.node.taken_at_timestamp*1000
      obj.shortcode=k.node.shortcode
      obj.id=k.node.id
      obj.location=k.location||''
      if(k.node.thumbnail_resources&&k.node.thumbnail_resources[0]){
        obj.src=k.node.thumbnail_resources[0].src
      }else{
         obj.src=k.node.display_url
      }
      this.postList.push(obj)
      */
    }
  },
  // 发现拉取首页时，没有评论的详细信息，需要通过shortcode获取一遍，query接口的时候是有详细信息的
  getCommentDetails(){
    let promises=[]
    for(let k of this.postList){
      let comment=k.edge_media_to_comment
      if(comment.count>0&&!comment.edges){
        let request=getSingleMediaInfo(k.shortcode,k.owner.usernmae)
        promises.push(request)
      }
    }
    if(promises.length){
      Promise.all(promises)
      .then(res=>{
        console.log("TCL: getCommentDetails -> res", res)
        // this.loadingInstance1.close()
        for(let k of res){
          let data=k.data.entry_data.PostPage[0].graphql.shortcode_media.edge_media_to_parent_comment,
          shortcode=k.data.entry_data.PostPage[0].graphql.shortcode_media.shortcode,
          len=this.postList.length
          for(let i=0;i<len;i++){
            let item = this.postList[i]
            if(item.shortcode===shortcode){
              item.edge_media_to_comment=data
              break
            }
          }        
        }
      })
      .finally(()=>{
        console.log('promise all down')
        window.posts=this.postList
        this.loadingInstance1.close()
      })
    }
  }
},
computed:{
 
}
}
</script>
<style lang='scss'>
.profilePage{
  width: 57.8125%;
  height: 100%;
  margin: 0 auto;
  .info{
    width: 100%;
    display:flex;
    justify-content: space-between;
    div{
      width: 32%;
      height: 235px;
      border:1px solid salmon;
    }
  }
}

</style>
