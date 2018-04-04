<template>
  <div id="app">
    <vheader :seller="msg"></vheader>
    <ul class="menu">
      <li><router-link to="/goods">商品</router-link></li>
      <li><router-link to="/comment">评论</router-link></li>
      <li><router-link to="/seller">商家</router-link></li>
    </ul>
    <router-view :seller="msg"></router-view>
  </div>
</template>

<script>
import header from "@/components/header/header"

export default {
  name: 'App',
  data(){
    return {
        msg:{}
    }
  },
  created(){
    var that = this;
    this.$http.get('/api/seller').then(function(response){
        if(response.data.err==0){
            that.msg = response.data.data
        }
    })
  },
  components:{
      vheader:header,
  }
}
</script>

<style>
  a{
    text-decoration:none;
    color:#000;
  }
  .menu{
    display:flex;
    height:4rem;
    list-style:none;
    text-align:center;
    border-bottom:1px solid rgba(7,17,27,0.1);
  }
  .menu li{
    flex:1;
    font-size:1.4rem;
    color:rgb(77,85,93);
    line-height:1.4rem;
    display:flex;
    justify-content:center;
    align-items: center;
  }
  .router-link-active{
    color:rgb(240,20,20)
  }
</style>
