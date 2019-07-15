<template>
  <section class="home">
    <common-head></common-head>
    <section class="banner">
      <div>
        <h5>WelCome to <span>{{info.name}}</span> </h5>
        <h3>{{info.subName}}</h3>
        <p>Enter any @Profile or #Hashtag to ananlyze real-time <span>Engagement Analysis</span></p>
      </div>
    </section>
    <section class="actions">
      <div class="item">
        <p>Profile Analytics</p>
        <div>
          <i>@</i>
          <input type="text" v-model="username" placeholder="Type an instagram account" @keyup.enter="toProfile">
          <button @click="toProfile"></button>
        </div>
      </div>
      <span></span>
      <div class="item">
        <p>Hashtag Analytics</p>
        <div>
          <i>@</i>
          <input type="text" v-model="hashtag" placeholder="Type a hashtag" @keyup.enter="toHashtag">
          <button @click="toHashtag"></button>
        </div>
      </div>
    </section>
    <section class="features">
      <h2>Our Features</h2>
      <p>For Brand Markets，Agencies，influencers，and Media Publishers</p>
      <div class="icons">
        <div class="ficon" v-for="(k,i) in featureIcons" :key="i">
          <img :src=k.src :alt=k.word>
          <p>{{k.word}}</p>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import featureIcons from '../assets/content/featuresIcons'
import commonHead from '../components/commonHead'
import info from '../assets/content/seo'
export default {
  name:'HomePage',
  components: {commonHead},
  data(){
    return {
      username:'',
      hashtag:'',
      featureIcons:featureIcons,
      info:info
    }
  },
  methods: {
    toProfile(){
      if(this.username!=''){
        this.$router.push({name:'profile-userName',params:{userName:this.username}})
      }else{
        this.$message.warning('Please enter a username ')
      }
    },
    toHashtag(){
      if(this.hashtag!=''){
        this.$router.push({name:'hashtag-hashtag',params:{hashtag:this.hashtag}})
      }else{
        this.$message.warning('Please enter a Tag ')
      }
    }
  }
}
</script>

<style>
.home{
  width: 100%;
  height: 100%;
}
.banner{
    width: 100%;
    /* height: 988px; */
    height: 640px;
    background: url('../assets/images/bg2.jpg') no-repeat ;
    /* background-size: cover; */
    background-position:90% 30px; 
    background-size: 40%;
}
.banner div{
  padding-left: 13.48%;
  /* padding-top: 27.08%; */
  padding-top: 15%;
  color:#000;
  font-size: 10px;
  box-sizing: border-box;
}
.banner h5{
  font-size: 5em;
  line-height: 1.4;
  font-family: 'PingFangSC-Medium';
  font-weight:500;
  margin-bottom: 11px;
}
.banner h5 span{
  color:#1F2FA3;
}
.banner h3{
  font-size:7em;
  line-height: 1.22;
  font-family: 'Gill Sans Bold';
  font-weight:600;
  margin-bottom: 32px;
}
.banner p{
  color:#8F8F8F;
  width: 53.71%;
  font-size: 2.8em;
  line-height: 1.85;
  font-family:'PingFangSC-Regular';
  font-weight: 400;
}
.banner p sapn{
  font-weight: 600;
}
.actions{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 13.48%;
  box-sizing: border-box;
}
.actions span{
  display: block;
  width: 1px;
  height: 164px;
  background: #E5E5E5;
}
.actions .item {
  width: 47.41%;
  position: relative;
}
.actions .item p{
  font-size:30px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgb(5,5,5);
  line-height:42px;
  margin-bottom: 30px;
}
.actions .item div{
  width: 100%;
  height: 98px;
  box-shadow:0px 2px 27px 0px rgba(123,123,123,0.11);
  border-radius:8px;
  box-sizing: border-box;
  padding-left: 22px;
  display: flex;
  align-items: center;
  background-color: #fff;
}
.actions .item i{
  color:#3D4FD5;
  font-size: 34px;
  font-style: normal;
}
.actions .item input{
  display: block;
  width: 81.26%;
  min-width: 254px;
  height: 100%;
  font-size: 34px;
  box-sizing: border-box;
  padding-left: 12px;
  color: #050505;
}
.actions .item input::placeholder{
  color:#CFCFCF !important;
  font-size: 30px;
  opacity: 1;
  padding: 1px;
  line-height: 200%;
}

.actions .item button{ 
  width:14.82%;
  height: 100%;
  min-width: 96px;
  display: block;
  background-image: url('../assets/images/search_ic.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 36px 37px;
  background-color: #3D4FD5;
  border-radius:0px 8px 8px 0px;
}
.features{
  width: 100%;
  padding-top: 186px;
  padding-bottom: 526px;
}
.features h2{
  font-size:40px;
  font-family: 'Gill Sans Bold';
  font-weight: 600;
  color:#000;
  line-height:48px;
  text-align: center;
  margin-bottom: 8px;
}
.features h2+p{
  font-size:24px;
  font-family:'PingFangSC-Regular';
  font-weight:400;
  color:#8F8F8F;
  line-height:33px;
  text-align: center;
}
.features .icons{
  width: 100%;
  box-sizing: border-box;
  padding: 106px 15.89% 0 16.2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.features .ficon{
  width: 25%;
  height: 134px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size:24px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#000;
  line-height:33px;
  margin-bottom: 157px;
}
@media screen and (min-width:1025px) and (max-width: 1360px){
  .banner{
    /* height: 620px; */
  }
  .banner h3{
    font-size: 6em;
  }
  .banner div{
   font-size: 9px;
   /* padding-top: 30%; */
  }
  .features .icons{
     justify-content: flex-start;
  }
  .features .ficon{
    width: 33.33%;
    
  }
  .actions .item input::placeholder{
    font-size: 21px;
  }

  .actions .item div{
    height: 80px;
  }
  .actions .item button{
    min-width: 80px;
  }
}
.features .ficon img{
  display: block;
  width: 60px;
}
.features .ficon p{
   text-align: center;
}


</style>
