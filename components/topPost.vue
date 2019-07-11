<template>
  <div class='post' v-if="userPost.length">
    <div class="titles">
      <h4>{{title}}</h4>
      <h5>{{timeTitle}}</h5>
    </div>
    
     <div class="post_swiper" v-if="userPost.length">
       <div v-swiper:mySwiper="swiperOptions" >
            <div class="swiper-wrapper">
               <div class="swiper-slide" v-for="(k,i) in userPost" :key=i>
                 <div class="top">
                    <s-image :src=k.src :width='420' :height='420' :index="i+1" />
                    <div class="nums">
                      <div class="num">
                        <p>{{k.likeCount}}</p>
                        <span>Likes</span>
                      </div>
                        <div class="num">
                        <p>{{k.commentCount}}</p>
                        <span>Comments</span>
                      </div>
                    </div>
                    <div class="content">
                      <p>{{k.title}}</p>
                      <span>{{k.caption}}</span>
                    </div>
                 </div>
                
                 <div class="bottom">
                   <p>by @{{k.userName}}</p>
                   <span>{{k.date}}</span>
                   <a :href="k.url" target="_blank">Show more</a>
                 </div>
               </div>  
            </div>
             <!-- Add Arrows -->
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
       </div>
       
     </div>
  </div>
</template>


<script>
import {hours,monthName,weekFullName} from '../utils/variables'
import sImage from './sImage'
import {parseNum} from '../utils/tools'
export default {
name:'TopPost',
components:{sImage},
data(){
return {
  userPost:[],
  mySwiper:null,
  swiperOptions:{
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    effect:'slide',
    observer:true,
    observeParents:true,
    observeSlideChildren:true,
    allowTouchMove: true,
    slidesPerView: 3,
    spaceBetween: 20,
    centeredSlides: true,
    centerInsufficientSlides: true,
    loop:true,
    on:{
      init:function(){
        this.slideTo(4,false)
      }
    }
  }
  }
 },
props:{
   chartData:{
    type:[Object,Array],
    required:true
  },
  sortType:{
    type:String,
    required:true
  },
  timeTitle:{
    type:String,
    required:true
  },
  title:{
     type:String,
    required:true
  }
 },
mounted(){
  this._initData().then(baseData=>{
    let fun=this.sortBy(this.sortType)
    baseData.sort(fun)
    this.userPost=baseData.splice(0,9)
  })
},
methods:{
  _initData(){
    return new Promise((resolve,reject)=>{
      let baseData=[]
      for(let k of this.chartData){
        // 获取caption
        let caption=[]
        if(k.edge_media_to_caption.edges&&k.edge_media_to_caption.edges.length>0){
          for(let c of k.edge_media_to_caption.edges){
            caption.push(c.node.text)
          }
        }else{
          caption=['']
        }
        let d=new Date(k.taken_at_timestamp*1000),
        month=monthName[d.getMonth()],
        year=(d.getFullYear()+'').substr(-2),
        day=d.getDate(),
        week=weekFullName[d.getDay()],
        hour=d.getHours()===0?22:d.getHours()-1,
        hourStr=hours[hour]
        let post={
          likeCount:k.edge_media_preview_like.count||0,
          commentCount:k.edge_media_to_comment.count||0,
          src:k.display_url,
          title:k.title||'  ',
          caption:caption.join(' '),
          userName:k.owner.full_name||k.owner.username,
          date:`${week},${day} ${month} ${year}`,
          url:'https://www.instagram.com/p/'+k.shortcode+'/',
        }
        post.likeCount=parseNum(post.likeCount)
        post.commentCount=parseNum(post.commentCount)
        baseData.push(post)
      }
      resolve(baseData)
    })
  },
  // type指排序方法
  // weight 即Like+Comment
  sortBy(type){
    switch (type) {
      case 'weight':
        return (a,b)=>{
          let anum=a.likeCount+a.commentCount,
              bnum=b.likeCount+b.commentCount
          return bnum-anum
        }
      case 'like':
        return (a,b)=>b.likeCount-a.likeCount
      case 'comment':
        return (a,b)=>b.commentCount-a.commentCount
        break;
      default:''
        break;
    }
  }
 },
computed:{}
}
</script>

<style scope>
.post{
  padding-top: 38px;
}
.post .titles{
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.post h4{
  font-size:24px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:#050505;
  line-height:33px;
  margin-bottom: 34px;
  text-indent: 21px;
}
.post h5{
font-size:24px;
font-family:PingFangSC-Semibold;
font-weight:600;
color:#8F8F8F;
line-height:33px;
}
.post_swiper .swiper-button-next,
.post_swiper .swiper-button-prev{
   width: 90px;
  height: 90px;
  background-size: cover;
  margin-top: -45px;
}
.post_swiper .swiper-button-next{
 
  background:url('../assets/images/next_ic.png') no-repeat left top;
}
.post_swiper .swiper-button-prev{
  background:url('../assets/images/back_ic.png') no-repeat left top;
}
.swiper-slide{
   width: 451px;
   height: 810px;
   border:2px solid #e9eaec;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;
   padding-top:15px;
   position: relative;
 }
 .swiper-slide .top{
   width:  93.12%;
   
 }
.swiper-slide img{
 width: 100%;
 height: 420px;
}
.swiper-slide .nums{
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 16px;
}
.swiper-slide .num p{
  color: #050505;
  font-size:30px;
  font-family:'Gill Sans Bold';
  font-weight:bold;
  line-height:35px;
}
.swiper-slide .num span{
  color:#676767;
  font-size:14px;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  line-height:20px;
}
.swiper-slide .content{
  width: 100%;
  margin: 0 auto;
}
.swiper-slide .content p{
  height: 20px;
  color:#676767;
  font-size:16px;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  line-height:20px;
}
.swiper-slide .content span{
  width: 100%;
  height: 104px;
  color:#3D4FD5;
  font-size:16px;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  line-height:26px;
  word-break:normal;
  display:block; 
  /* white-space:pre-wrap; */
  word-wrap : break-word ;
  -webkit-box-orient: vertical; 
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.swiper-slide  .bottom{
  width: 100%;
  height: 125px;
  box-sizing: border-box;
  padding-top: 33px;
  padding-left: 17px;
  padding-right: 19px;
  border-top: 1px solid #E9EAEC;
}
.swiper-slide  .bottom p{
font-size:16px;
font-family:PingFangSC-Semibold;
font-weight:600;
color:#3D4FD5;
line-height:22px;
margin-bottom: 6px;
}
.swiper-slide  .bottom span{
  font-size:16px;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  color:#8F8F8F;
  line-height:22px;
  display: block;
}
.swiper-slide  .bottom a{
  float: right;
  margin-top: 15px;
  font-size:16px;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  color:#8F8F8F;
  line-height:22px;
}
</style>
