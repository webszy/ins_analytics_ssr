<template>
  <div class='post' v-if="userPost.length">
     <div class="post_swiper">
       <div v-swiper:mySwiper="swiperOptions" >
            <div class="swiper-wrapper">
               <div class="swiper-slide" v-for="(k,i) in userPost" :key=i>
                 <s-image :src=k.src :width='420' :height='420'/>

               </div>
               <div class="swiper-pagination"></div>
            </div>
       </div>
     </div>
  </div>
</template>


<script>
import {hours,monthName,weekName} from '../utils/variables'
import sImage from './sImage'
export default {
name:'TopPost',
components:{sImage},
data(){
return {
  userPost:[],
  swiperOptions:{
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
		},
    effect:'slide',
    observer:true,
    observeParents:true,
    observeSlideChildren:true,
    allowTouchMove: true,
    slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: true,
    centerInsufficientSlides: true,
    loop:true
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
  }
 },
mounted(){
  this._initData().then(baseData=>{
    let fun=this.sortBy(this.sortType)
    baseData.sort(fun)
    this.userPost=baseData.splice(0,10)

   
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
        week=weekName[d.getDay()],
        hour=d.getHours()===0?22:d.getHours()-1,
        hourStr=hours[hour]
        let post={
          likeCount:k.edge_media_preview_like.count||0,
          commentCount:k.edge_media_to_comment.count||0,
          src:k.display_url,
          title:k.title,
          caption:caption,
          userName:k.owner.full_name,
          date:`${week},${day} ${month} ${year}`
        }

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

<style lang="scss">
.post{
  .swiper-slide{
    width: 451px;
    height: 846px;
    border:2px solid #e9eaec;
  }
}


</style>
