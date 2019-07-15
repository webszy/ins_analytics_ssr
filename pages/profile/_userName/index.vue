<template>
  <section class='profilePage'>
    <common-head></common-head>
    <section class="wrap" :style="styleWhenShowOverview">
       <section class="userInfo">
            <div class="info"> 
              <img :src="userPic">
              <div>
                <p>@{{userName}}</p>
                <p>{{userBio}}</p>
              </div>
            </div>
            <div class="tab">
              <button :class="showOverview?'selected':''" @click="showOverview=true">Overview</button>
              <button :class="!showOverview?'selected':''" @click="showOverview=false">Top Posts</button>
            </div>
          </section>

      <section class="overView"  v-if="showOverview">
         
          <section class="audience">
            <h4>Audience</h4>
            <div class="nums">
              <div class="num">
                <img src="../../../assets/images/post_ic.png">
                <p>{{postCount}}</p>
                <span>Posts</span>
              </div>
              <div class="num">
                <img src="../../../assets/images/follower_ic.png">
                <p>{{followers}}</p>
                <span>Followers</span>
              </div>
              <div class="num">
                <img src="../../../assets/images/following_ic.png">
                <p>{{following}}</p>
                <span>Following</span>
              </div>
            </div>
          
          </section>

          <section class="charts">
              <div class="card">
                <div class="card-head"></div>
                  <monthly-weight-average
                  ref='chart'
                  :chartData=postList 
                  :firstTime=firstPostTime
                  :lastTime=lastPostTime
                  :commonTitle=commonTitle
                  v-if=showChart />
            </div>
            <div class="card">
              <div class="card-head"></div>
                <monthly-post
                ref='chart'
                :chartData=postList 
                :firstTime=firstPostTime
                :lastTime=lastPostTime
                :commonTitle=commonTitle
                v-if=showChart />
            </div>
            <div class="clearfix">
                <div class="card half"  :style="showLocation?'margin-right:2%;':'width:100%;'">
                  <div class="card-head"></div>
                    <most-tags
                    ref='chart'
                    :chartData=postList 
                    :firstTime=firstPostTime
                    :lastTime=lastPostTime
                    :commonTitle=commonTitle
                    v-if=showChart />
                </div>
                <div class="card half" v-if="showLocation">
                  <div class="card-head"></div>
                    <location
                    :chartData=postList 
                    :firstTime=firstPostTime
                    :lastTime=lastPostTime
                    :commonTitle=commonTitle
                     />
                </div>
            </div>
            <div class="card">
              <div class="card-head"></div>
                <post-like-and-comment-by-type
                ref='chart'
                :chartData=postList 
                :firstTime=firstPostTime
                :lastTime=lastPostTime
                :commonTitle=commonTitle
                v-if=showChart />
            </div>
            <div class="card">
              <div class="card-head"></div>
              <posting-activity
                ref='chart'
                :chartData=postList 
                :firstTime=firstPostTime
                :lastTime=lastPostTime
                :commonTitle=commonTitle
                v-if=showChart />
            </div>
              <div class="card">
              <div class="card-head"></div>
              <total-post-weekly
                ref='chart'
                :chartData=postList 
                :firstTime=firstPostTime
                :lastTime=lastPostTime
                :commonTitle=commonTitle
                v-if=showChart />
            </div>
            <div class="card">
              <div class="card-head"></div>
              <tag-cloud
                ref='chart'
                :chartData=postList 
                :firstTime=firstPostTime
                :lastTime=lastPostTime
                :commonTitle=commonTitle
                v-if=showChart />
            </div>
            <!-- <button class="toTop" @click="showOverview=false">View Top Posts</button> -->
          </section>
      </section>
      <section class="topPost" v-if="!showOverview">
            <top-post
            :chartData=postList
            :timeTitle=commonTitle
            title="Highest Engagement（likes+Comments)"
            sortType="weight"
            />
            <top-post
            :chartData=postList
            :timeTitle=commonTitle
            title="Highest Likes"
            sortType="like"
            />
            <top-post
            :chartData=postList
            :timeTitle=commonTitle
            title="Highest Comment"
            sortType="comment"
            />
      </section>
    </section>
    <!-- loading -->
     <transition     
      enter-active-class="animated faster fadeIn"
      leave-active-class="animated faster fadeOut"
    >
      <loading v-if="showLoading" :name="'@'+userName" />
    </transition>
    
  </section>
  
</template>


<script>
import loading from '@/components/loading'
import {
  getUserBaseInfo,
  getQueryHash,
  getNextPageData,
  getSingleMediaInfo
} from '@/utils/request'
import {parseNum} from '@/utils/tools'
import {weekName,monthName} from '@/utils/variables'
import MonthlyWeightAverage from '@/components/charts/MonthlyWeightAverage.vue'
import MonthlyPost from '@/components/charts/MonthlyPost.vue'
import mostTags from '@/components/charts/mostTags.vue'
import location from '@/components/charts/location.vue'
import postLikeAndCommentByType from '@/components/charts/postLikeAndCommentBytype.vue'
import PostingActivity from '@/components/charts/PostingActivity.vue'
import TotalPostWeekly from '@/components/charts/TotalPostWeekly.vue'
import TagCloud from '@/components/charts/TagCloud.vue'
import topPost from '@/components/topPost.vue'
import commonHead from '@/components/commonHead'
export default {
name:'ProfileAnalytics',
components:{
  loading,
  commonHead,
  MonthlyWeightAverage,
  MonthlyPost,
  mostTags,
  location,
  postLikeAndCommentByType,
  PostingActivity,
  TotalPostWeekly,
  topPost,
  TagCloud
},
data(){
return {
   userName:this.$route.params.userName||'',
   profile:null,
   hasNextPage:false,
   end_cursor:'',
   queryIdList:[],
   postList:[],
   userBio:'',
   followers:0,
   following:0,
   postCount:0,
   userPic:require('../../../assets/images/userPic.png'),
   showChart:false,
   firstPostTime:0,
   lastPostTime:0,
   commonTitle:'',
   showOverview:true,
   showLoading:false,
   showLocation:true,
   backTop:{
     bottom:200
   }
  }
 },
mounted(){
  this.shareButton()
  if(this.userName!=''){
    this.showLoading=true
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
      this.followers=parseNum(res.data.entry_data.ProfilePage[0].graphql.user.edge_followed_by.count)
      this.following=parseNum(res.data.entry_data.ProfilePage[0].graphql.user.edge_follow.count)
      this.postCount=parseNum(res.data.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.count)
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
      // console.log("TCL: getUserAllPost -> res", res)
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
          this.ckeckComment()
        }
    }) 
  },
  handlePostEdges(edges){
    for(let k of edges){
      this.postList.push(k.node)
    }

  },
  // 发现拉取首页时，没有评论的详细信息，需要通过shortcode获取一遍，query接口的时候是有详细信息的
  ckeckComment(){
    let promises=[]
    for(let k of this.postList){
      let comment=k.edge_media_to_comment   
      if((comment.count>0&&!comment.edges)||comment===undefined){
        let request=getSingleMediaInfo(k.shortcode,k.owner.usernmae)
        promises.push(request)
      }
    }

    if(promises.length){
      Promise.all(promises)
      .then(res=>{
        for(let k of res){
          let data=k.data.entry_data.PostPage[0].graphql.shortcode_media.edge_media_to_parent_comment
          ||k.data.entry_data.PostPage[0].graphql.shortcode_media.edge_media_preview_comment,
          shortcode=k.data.entry_data.PostPage[0].graphql.shortcode_media.shortcode,
          len=this.postList.length
          
          for(let i=0;i<len;i++){
            let item = this.postList[i]
            if(item.shortcode===shortcode&&data!==undefined){
              item.edge_media_to_comment=data              
              break
            }
          }        
        }
      })
      .finally(()=>{
        // console.log('promise all down')
        this.requestEnd()
      })
    }else{
      this.requestEnd()
    }
  },
  // 请求完数据进行的操作，关闭loading，排序postlist
  requestEnd(){
    // 按照升序排列数组
    this.postList.sort((a,b)=> a.taken_at_timestamp-b.taken_at_timestamp)
    window.postList=this.postList
    // 排序后获取第一个帖子的时间和最后一个帖子的时间
    this.firstPostTime=this.postList[0].taken_at_timestamp
    this.lastPostTime=this.postList.slice(-1)[0].taken_at_timestamp
    /*获取标题*/ 
    let first=new Date(this.firstPostTime*1000),
    last =new Date(this.lastPostTime*1000),
    firstTimeString=`${weekName[first.getDay()]} ${first.getDate()} ${monthName[first.getMonth()]} ${first.getFullYear()} - `,
    lastTimeString=`${weekName[last.getDay()]} ${last.getDate()} ${monthName[last.getMonth()]} ${last.getFullYear()}`
    this.commonTitle=firstTimeString+lastTimeString
    /*如果不存在地址，就隐藏*/
    let location=this.userLocation(this.postList)
    if(location===''){
      this.showLocation=false
    }
    this.showChart=true
    this.$nextTick(()=>{
       this.showLoading=false
    })
    
  },
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
  },
  userLocation(chartData){
    // 遍历
    let data={}
    for(let k of chartData){
     
      if(k.location&&k.location!==null){
      console.log("TCL: userLocation -> k.location", k.location)
        if(k.location.name&&k.location.name.length){

          if(!data[k.location.name]){
            data[k.location.name]=1
          }else{
            data[k.location.name]++
          }
        }
      }
    }
    
    let arr=[]
    for(let k in data){
      let obj={
        location:k,
        count:data[k]
      }
      arr.push(obj)
    }
    arr.sort((a,b)=>a.count-b.count)
  
    return arr[0]?arr[0].location:''
  }
},
computed:{
  styleWhenShowOverview(){
    if(this.showOverview){
      return '  padding-left: 13.49%;padding-right: 22.92%;'
    }else{
      return '  padding-left: 13.49%;padding-right: 13.49%;'
    }
  }
}
}
</script>
<style>

</style>
