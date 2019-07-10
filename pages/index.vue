<template>
  <section class="home">
    <common-head></common-head>
    <section class="banner">
      <div>
        <h5>WelCome to <span>XXX</span> </h5>
        <h3>Instagram AI Analytics</h3>
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
export default {
  name:'HomePage',
  components: {commonHead},
  data(){
    return {
      username:'ddbo119',
      hashtag:'water',
      featureIcons:featureIcons
    }
  },
  methods: {
    toProfile(){
      if(this.username!=''){
        this.$router.push({name:'profile-userName',params:{userName:this.username}})
      }else{
        alert('请输入用户名')
      }
    },
    toHashtag(){
      if(this.hashtag!=''){
        this.$router.push({name:'hashtag-hashtag',params:{hashtag:this.hashtag}})
      }else{
        alert('请输入用户名')
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
    height: 988px;
    background: url('../assets/images/bg.jpg') no-repeat left top;
    background-size: cover;
}
.banner div{
  padding-left: 262px;
  padding-top: 441px;
  color:#000;
  width: 42.71%;
}
.banner h5{
  font-size: 50px;
  line-height: 70px;
  font-family: 'PingFangSC-Medium';
  font-weight:500;
  margin-bottom: 11px;
}
.banner h5 span{
  color:#1F2FA3;
}
.banner h3{
  font-size:70px;
  line-height: 81px;
  font-family: 'Gill Sans Bold';
  font-weight:600;
  margin-bottom: 32px;
}
.banner p{
  color:#8F8F8F;
  width: 75.98%;
  font-size: 28px;
  line-height: 52px;
  font-family:'PingFangSC-Regular';
  font-weight: 400;
}
.banner p sapn{
  font-weight: 600;
}
.actions{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 47px;
}
.actions span{
  display: block;
  width: 1px;
  height: 164px;
  background: #E5E5E5;
  margin-right: 35px;
}
.actions .item {
  width: 36.41%;
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
  width: 96.24%;
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
}
.actions .item button{ 
  width:14.82%;
  height: 100%;
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
  padding: 106px 305px 0 311px;
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
}
.features .ficon img{
  display: block;
  width: 60px;
}
</style>
