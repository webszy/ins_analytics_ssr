<template>
  <section class='hashTagPage profilePage'>
    <common-head></common-head>
     <section class="wrap" :style="styleWhenShowOverview">
        <section class="userInfo">
            <div class="info"> 
              <img :src="userPic">
              <div>
                <p>#{{hashtag}}</p>
                <p>{{totalCount}} Posts</p>
              </div>
            </div>
            <div class="tab">
              <button :class="showOverview?'selected':''" @click="showOverview=true">Overview</button>
              <button :class="!showOverview?'selected':''" @click="showOverview=false">Top Posts</button>
            </div>
        </section>
        <div style="height:60px;"></div>
        <section class="overView"  v-if="showOverview">
             <section class="charts">
              <div class="card">
                <div class="card-head"></div>
                  <monthly-weight-average
                  ref='chart'
                  :chartData=tagMediaFirstPage 
                  :firstTime=0
                  :lastTime=0
                  :commonTitle="''"
                  v-if=showChart />
                </div>
                <div class="card">
                  <div class="card-head"></div>
                  <posting-activity
                    ref='chart'
                    :chartData=tagMediaFirstPage 
                    :firstTime=0
                    :lastTime=0
                    commonTitle='First Page Post BreakDown'
                    v-if=showChart />
                </div>
                <div class="card">
                  <div class="card-head"></div>
                  <post-like-and-comment-by-type
                  ref='chart'
                  :chartData=tagMediaFirstPage 
                  :firstTime=0
                  :lastTime=0
                  commonTitle='First Page Post BreakDown'
                  v-if=showChart />
                </div>
                <div class="card">
                  <div class="card-head"></div>
                    <location-cloud
                    ref='chart'
                    :chartData=tagMediaFirstPage 
                    :firstTime=0
                    :lastTime=0
                    commonTitle='First Page Post BreakDown'
                    v-if=showChart />
                </div>

            </section>
        </section>
        <section class="topPost" v-if="!showOverview">
         <top-post
            :chartData=tagMediaTopList
            title="Highest Engagement（ likes + Comments )"
            sortType="weight"
            />
            <top-post
            :chartData=tagMediaTopList
            title="Highest Likes"
            sortType="like"
            />
            <top-post
            :chartData=tagMediaTopList
            title="Highest Comment"
            sortType="comment"
            />
        </section>


     </section>

   <transition     
      enter-active-class="animated faster fadeIn"
      leave-active-class="animated faster fadeOut"
    >
      <loading :name="'#'+hashtag" v-if="showLoading"/>
    </transition>
  
  </section>
</template>


<script>
import {
  getHashTagData,
  getNextPageData,
  getQueryHash,
  getSingleMediaInfo
} from '@/utils/request'
import loading from '@/components/loading'
import commonHead from '@/components/commonHead'
// import topPost from '@/components/topPost'
// import MonthlyWeightAverage from '@/components/tagCharts/MonthlyWeightAverage.vue'
// import PostingActivity from '@/components/charts/PostingActivity.vue'
// import postLikeAndCommentByType from '@/components/charts/postLikeAndCommentBytype.vue'
// import locationCloud from '@/components/tagCharts/locationCloud.vue'
const MonthlyWeightAverage=()=>import('../../../components/tagCharts/MonthlyWeightAverage')
const topPost=()=>import('../../../components/topPost')
const locationCloud=()=>import('../../../components/tagCharts/locationCloud')
const postLikeAndCommentByType=()=>import('../../../components/charts/postLikeAndCommentByType')
const PostingActivity=()=>import('../../../components/charts/PostingActivity')

export default {
name:'HashTagAnalytics',
components:{
  loading,
  commonHead,
  topPost,
  MonthlyWeightAverage,
  PostingActivity,
  postLikeAndCommentByType,
  locationCloud
},
head(){
     return {
      title: 'Instagram Hashtag Analytics For #Hashtag - InsAnalysis.vip',
    }
  },
data(){
  return {
    hashtag:this.$route.params.hashtag||'',
    queryIdList:[],
    tagBaseData:{},
    hasNextPage:false,
    end_cursor:'',
    tagMediaTopList:[],
    tagMediaFirstPage:[],
    showLoading:false,
    TopCount:0,
    totalCount:0,
    userPic:require('@/assets/images/userPic.png'),
    showOverview:true,
    showChart:false
  }
 },
mounted(){
  if(this.hashtag!==''){
    this.showLoading=true
    this.getHashTagBaseData()
  }else{
    this.$router.push('/')
  }
},
methods:{
  getHashTagBaseData(){
    getHashTagData(this.hashtag)
    .then(res=>{
      this.tagBaseData=res.data
      // this.hasNextPage=res.data.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.page_info.has_next_page
      // this.end_cursor=res.data.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.page_info.end_cursor
      this.userPic=res.data.entry_data.TagPage[0].graphql.hashtag.profile_pic_url
      this.totalCount=res.data.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.count
      let list=res.data.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_top_posts.edges
      this.TopCount=list.length
      for(let k of list){
        this.tagMediaTopList.push(k.node)
      }
      list=res.data.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges
      for(let k of list){
        this.tagMediaFirstPage.push(k.node)
      }
      
      this.getMediaDetail()
    })
    .catch(error=>{
      if(error.response.data.length > 0 && error.response.status == 404){
        this.$message({
          type:'warning',
          message:'Oops, this hashtag doesn’t exist.we will back to Home after 3s',
          duration:3000,
          onClose:()=>{this.$router.push('/')}
        })

      }
    
    })
  },
  async getMediaDetail(){
    for(let k of this.tagMediaFirstPage){
      let res=await getSingleMediaInfo(k.shortcode)
      k.loction=res.data.entry_data.PostPage[0].graphql.shortcode_media.location
    }
    this.$nextTick(()=>{
        this.showLoading=false
        this.showChart=true
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
      }else{

      }
    })
    .catch(err=>{
      console.log("TCL: getNextHashTagPageData -> err", err)
    })
  },
},
computed:{
  styleWhenShowOverview(){
    if(this.showOverview){
      return 'padding-left: 13.49%;padding-right: 22.92%;'
    }else{
      return 'padding-left: 13.49%;padding-right: 13.49%;'
    }
  }
}
}
</script>
<style>


</style>
