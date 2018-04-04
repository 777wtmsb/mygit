<template>
    <div class="header">
        <div class="content">
            <img :src="seller.avatar" class="avatar" />
            <div class="text">
                <div class="title">
                    <span></span>
                    <h1>{{seller.name}}</h1>
                </div>
                <p class="delivery">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
                <div class="event">
                    <span :class="classArray[seller.supports[0].type]"></span>
                    <p>{{seller.supports[0].description}}</p>
                </div>
                <div class="event_num" @click="showDetail=true">
                    <span>{{seller.supports.length}}个</span>
                    <span>&gt;</span>
                </div>
            </div>
        </div>
        <div class="notice" @click="showDetail=true">
            <p>{{seller.bulletin}}</p>
            <span>&gt;</span>
        </div>
        <div class="headfilter">
            <img :src="seller.avatar" width="100%" height="100%" >
        </div>
        <transition name="fade">
        <div class="detail" v-show="showDetail">
            <div class="detail-wrap clearfix">
                <div class="detail-content">
                    <h1>{{seller.name}}</h1>
                    <star :size="48" :score="seller.score"></star>
                    <div class="banner">
                        <span></span>
                        <h2>优惠信息</h2>
                        <span></span>
                    </div>
                    <ul class="supports">
                        <li v-for="item in seller.supports">
                            <span :class="classArray[item.type]"></span>
                            <p>{{item.description}}</p>
                        </li>
                    </ul>
                    <div class="banner">
                        <span></span>
                        <h2>商家公告</h2>
                        <span></span>
                    </div>
                    <p class="bulletin">{{seller.bulletin}}</p>
                </div>
            </div>
            <div class="close" @click="showDetail=false">×</div>
        </div>
        </transition>
    </div>
</template>

<script>
    import star from "@/components/star/star"
    export default {
        name:"header",
        data(){
            return{
                showDetail:false
            }
        },
        props:{
            seller:{}
        },
        created:function(){
            this.classArray = ["decrease","discount","special","invoice","guarantee"]

        },
        components:{
            star:star
        }

    }

</script>

<style type="text/css">
    .header{
        background:rgba(7,17,27,0.5);
        padding-top:2.4rem;
        position:relative;
        overflow:hidden;
    }
    .content{
        display:flex;
        margin:0 1.2rem 1.8rem 2.4rem;
    }
    .avatar{
        width:6.4rem;
        height:6.4rem;
        border-radius:4px;
        margin-right:1.6rem;
    }
    .text{
        color:rgb(255,255,255);
        flex:1;
        padding:0.2rem 0;
        position:relative;
    }
    .title {
        display:flex;
    }
    .title h1{
        font-size:1.6rem;
        line-height:1.8rem;
        margin-left:0.6rem;
    }
    .title span{
        width: 3rem;
        height: 1.8rem;
        background:url('../img/brand@2x.png');
        background-size:100% 100%;
    }
    .delivery{
        font-size:1.2rem;
        font-weight:200;
        line-height:1.2rem;
        margin-top: 0.8rem;
        margin-bottom:1rem;
    }
    .event{
        display:flex;
    }
    .event span{
        width: 1.2rem;
        height:1.2rem;
        background-size:100% 100%;
        margin-right:0.4rem;
    }
    .event p{
        font-size:1.2rem;
        font-weight:200;
        line-height:1.2rem;
    }
    .decrease{
        background:url('../img/decrease_1@2x.png');
    }
    .discount{
        background:url('../img/discount_1@2x.png');
    }
    .guarantee{
        background:url('../img/guarantee_1@2x.png');
    }
    .invoice{
        background:url('../img/invoice_1@2x.png');
    }
    .special{
        background:url('../img/special_1@2x.png');
    }
    .event_num{
        position:absolute;
        right:0;
        bottom:0;
        height:1rem;
        background:rgba(0,0,0,0.2);
        padding:0.7rem 0.8rem;
        border-radius:1.8rem;
        font-size:1rem;
        line-height:1.2rem;
    }
    .event_num span:first-child{
        margin-right:0.2rem;
    }
    .notice{
        display:flex;
        justify-content:center;
        align-items: center;
        height:2.8rem;
        padding:0 1.2rem;
        background:rgba(7,17,27,0.2);
        font-size:1rem;
        color:rgb(255,255,255);
        font-weight:200;
        line-height:1.2rem;
    }
    .notice p{
        background:url('../img/bulletin@2x.png') 0 center no-repeat;
        background-size:2.2rem 1.2rem;
        padding-left:2.6rem;
        margin-right:0.4rem;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
    }
    .headfilter{
        width: 100%;
        height:100%;
        position:absolute;
        top:0;
        left:0;
        filter:blur(10px);
        z-index:-1;
    }
    .detail{
        width: 100%;
        height:100%;
        background:rgba(7,17,27,0.8);
        position:fixed;
        top:0;
        left:0;
        overflow:auto;
        z-index:999;
    }
    .clearfix{
        display: inline-block;
    }
    .clearfix:after{
        content:"";
        clear:both;
        height:0;
    }
    .detail-wrap{
        width: 100%;
        min-height: 100%;
    }
    .detail-content{
        margin-top:6.4rem;
        padding-bottom:6.4rem;
        text-align:center;
    }
    .close{
        position:relative;
        width: 3.2rem;
        height:3.2rem;
        margin:-6.4rem auto 0;
        clear:both;
        font-size:3.2rem;
        color:rgba(255,255,255,.5);
    }
    .detail-content h1{
        font-size:1.6rem;
        color:rgb(255,255,255);
        line-height:1.6rem;
        margin-bottom:1.6rem;
    }
    .banner{
        display:flex;
        padding:0 3.6rem;
        margin-top:2.8rem;
        margin-bottom:2.4rem;
        text-align:center;
    }
    .banner h2{
        font-size:1.4rem;
        color:#fff;
        line-height:1.4rem;
        margin:0 1.2rem;
    }
    .banner span{
        margin-bottom:0.7rem;
        border-bottom:1px solid rgba(255,255,255,0.2);
        flex:1;
    }
    .supports{
        padding:0 4.8rem;
        text-align:left;
    }
    .supports li{
        height:1.6rem;
        margin-bottom:1.2rem;
        display:flex;
    }
    .supports li span{
        width: 1.6rem;
        height:1.6rem;
        background-size:100% 100%;
        margin-right:0.6rem;
    }
    .supports li p{
        font-size:1.2rem;
        color:#fff;
        font-weight:200;
        line-height:1.2rem;
        padding-top:0.2rem;
    }
    .bulletin{
        text-align:left;
        font-size:1.2rem;
        color:#fff;
        line-height:2.4rem;
        padding:0 4.8rem;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>