<template>
<div>
    <div class='d1'><div class='d1_1'><div class='d1_1_1'><h2>{{seller.name}}</h2><div><star :size="36" :score="seller.score"></star><p>({{seller.ratingCount}})</p><p>月售{{seller.sellCount}}单</p></div></div><div class='d1_1_2'><i :class="{'on':checked}" @click="check" class="iconfont icon-favorite"></i><p>{{checktext}}</p></div></div><div class='d1_2'><div><p>起送价</p><div><p>{{seller.minPrice}}</p><p>元</p></div></div><div><p>商家配送</p><div><p>{{seller.deliveryPrice}}</p><p>元</p></div></div><div><p>平均配送时间</p><div><p>{{seller.deliveryTime}}</p><p>分钟</p></div></div></div></div><div class='banner-bla'></div><div class='d2'><h2>公告与活动</h2><p>{{seller.bulletin}}</p><ul class="seller-supports"><li v-for="item in seller.supports"><span :class="classArray[item.type]"></span><p>{{item.description}}</p></li></ul></div><div class='banner-bla'></div><div class='d3'><h2>商家实景</h2><div class="seller-scroll" ref="tab"><div ref="tabWrapper"><img v-for="item in seller.pics" :src="item" ref="tabitem" /></div></div></div><div class='banner-bla'></div><div class='d4'><h2>商家信息</h2><div class='d4_1' v-for="item in seller.infos"><p>{{item}}</p></div></div>
</div>
</template>

<script>
    import star from "@/components/star/star"
    import bs from 'better-scroll'
    export default {
        data(){
            return {
                checked:false,
                checktext:"未收藏"
            }
        },
        props:{
            seller:{}
        },
        components:{
            star:star
        },
        created:function(){
            this.classArray = ["seller-decrease","seller-discount","seller-special","seller-invoice","seller-guarantee"]
            this.$nextTick(()=>{
                this.initscroll()
            });
        },
        methods:{
            check(){
                if(this.checked){
                    this.checktext = "未收藏"
                }else{
                    this.checktext = "已收藏"
                }
                this.checked = !this.checked
            },
            initscroll(){
                let width=0
          for (let i=0;i<this.$refs.tabitem.length;i++) {
              width+=this.$refs.tabitem[0].getBoundingClientRect().width;
          }
          this.$refs.tabWrapper.style.width=width+'px'
              this.$nextTick(()=>{
                  if (!this.scroll) {
                    this.scroll=new bs(this.$refs.tab,{
                      startX:0,
                      click:true,
                      scrollX:true,
                      scrollY:false,
                      eventPassthrough:'vertical'
                    });
                  }else{
                    this.scroll.refresh()
                  }
              });
        }
    }
}
</script>

<style lang="less">
.d1{
    width:100%;
    display: inline-flex;
    flex-direction:column;
}
.d1_1{
    margin:1.8rem 1.8rem 0 1.8rem;
    width:33.9rem;
    display: inline-flex;
    justify-content:space-between;
    border-bottom:0.05rem solid rgba(7,17,27,0.1);
}
.d1_1_1{
    margin-bottom:1.8rem;
    display: inline-flex;
    flex-direction:column;
}
.d1_1_1 h2{
    font-size:1.4rem;
    font-weight:normal;
    color:rgb(7,17,27);
    line-height:1.4rem;
}
.d1_1_1>div{
    margin-top:0.8rem;
    display: inline-flex;
}
.d1_1_1>div>div img{
    width:1.5rem;
    height: 1.45rem;
}
.d1_1_1>div>div img+img{
    margin-left:0.4rem;
}
.d1_1_1>div> p{
    font-size:1rem;
    color:rgb(77,85,93);
    line-height:1.8rem;
}
.d1_1_1>div p:first-of-type{
    margin-left:0.8rem;
}
.d1_1_1>div p:last-of-type{
    margin-left:1.2rem;
}
.d1_1_2{
    display: inline-flex;
    flex-direction:column;
}
.d1_1_2 i{
    font-size:2.4rem;
    color:rgb(147,153,159);
    line-height:2.4rem;
    align-self: center;
    transition: all .5s;
    &.on{
        transition: all .5s;
        color:rgb(240,20,20);
    }
}
.d1_1_2 p{
    margin-top:0.4rem;
    font-size:1rem;
    color:rgb(77,85,93);
    line-height:1rem;
}
.d1_2{
    width:100%;
    display: inline-flex;
}
.d1_2>div{
    width:33%;
    margin-top:1.8rem;
    margin-bottom:1.8rem;
    display: inline-flex;
    flex-direction:column;
}
.d1_2>div+div{
    border-left:0.05rem solid rgba(7,17,27,0.1);
}
.d1_2>div>p{
    align-self: center;
    font-size:1rem;
    color:rgb(147,153,159);
    line-height:1rem;
}
.d1_2>div>div{
    margin-top:0.4rem;
    display: inline-flex;
    align-self: center;
}
.d1_2>div>div p{
    font-weight:200;
    color:rgb(7,17,27);
    line-height:2.4rem;
}
.d1_2>div>div p:first-child{
    font-size:2.4rem;
}
.d1_2 div p:last-child{
    font-size:1rem;
    margin-top:0.3rem;
}
.d2{
    padding:1.8rem 1.8rem 0 1.8rem;
    display: inline-flex;
    flex-direction:column;
}
.d2 h2,.d3 h2,.d4 h2{
    font-size:1.4rem;
    font-weight:normal;
    color:rgb(7,17,27);
    line-height:1.4rem;
}
.d2>p{
    margin:0.8rem 1.2rem 1.6rem 1.2rem;
    font-size:1.2rem;
    font-weight:200;
    color:rgb(240,20,20);
    line-height:2.4rem;
}
.d3{
    padding:1.8rem 0 1.8rem 1.8rem;
    display: inline-flex;
    flex-direction:column;
    .seller-scroll{
        margin-top:1.2rem;
        width: 35.7rem;
        overflow:hidden;
        div{
            display:flex;
            width: 12rem;
            img{
            width: 12rem;
            height:9rem;
            margin-right:0.6rem;
            }
            img:last-child{
                margin-right:0;
            }
        }
    }
}
.d4{
    padding:1.8rem 1.8rem 0 1.8rem;
    display: inline-flex;
    flex-direction:column;
}
.d4_1{
    display: inline-flex;
    margin:0 1.8rem;
    border-top:0.05rem solid rgba(7,17,27,0.1);
}
.d4>div:first-of-type{
    margin-top:1.2rem;
}
.d4_1 p{
    margin:1.6rem 1.2rem;
    font-size:1.2rem;
    font-weight:200;
    color:rgb(7,17,27);
    line-height:1.6rem;
}
.banner-bla{
    width:100%;
    height:1.6rem;
    background-color:#f3f5f7;
    border-top: 0.1rem solid rgba(7,17,27,0.1);
    border-bottom: 0.1rem solid rgba(7,17,27,0.1);
}
.seller-decrease{
    background:url('../img/decrease_4@2x.png');
}
.seller-discount{
    background:url('../img/discount_4@2x.png');
}
.seller-guarantee{
    background:url('../img/guarantee_4@2x.png');
}
.seller-invoice{
    background:url('../img/invoice_4@2x.png');
}
.seller-special{
    background:url('../img/special_4@2x.png');
}
.seller-supports{
    li{
        display:flex;
        border-top:1px solid rgba(7,17,27,.1);
        padding:1.6rem 1.2rem;
        span{
            display:block;
            width: 1.6rem;
            height:1.6rem;
            background-size:100% 100%;
            margin-right:0.6rem;
        }
        p{
            font-size:1.2rem;
            color:rgb(7,17,27);
            line-height:1.6rem;
        }
    }
}
</style>