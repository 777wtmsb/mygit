<template>
<section>
    <div class="goods" ref="goods">
        <div class="tab-menu" ref="menuScroll">
            <ul>
                <li v-for="(item,index) in goods" :class="{'on':onIndex == index}" ref="menu" @click="scrollto(index)"><p><span v-if="item.type>=0" :class="classArray[item.type]"></span>{{item.name}}</p></li>
            </ul>
        </div>
        <div class="list" ref="listScroll">
            <ul class="foodtitle">
                <li v-for="(item,index) in goods" ref="foodlist">
                    <h3>{{item.name}}</h3>
                    <ul class="foodlist">
                        <li v-for="(items,index1) in item.foods">
                            <div class="icon">
                                <img @click="showIndex(index,index1)" :src="items.icon" />
                            </div>
                            <div class="con">
                                <h2 class="name">{{items.name}}</h2>
                                <p class="description">{{items.description}}</p>
                                <p class="selldetail">月售{{items.sellCount}}份<span>好评率{{items.rating}}%</span></p>
                                <h4 class="price">{{items.price}}<span v-if="items.oldPrice">￥{{items.oldPrice}}</span></h4>
                                <change class="change" :foods="items"></change>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <div class="detail">
      <detail v-if="goods.length" class="foods-detail" ref="detail" :foods="goods[Index].foods[Index1]"></detail>
    </div>
    <shopcart @cleanAll="shopClean" :cartArr="tocartnum" :seller="seller"></shopcart>
</section>
</template>

<script>
    import bs from 'better-scroll'
    import shopcart from "@/components/shopcart/shopcart"
    import changenum from "@/components/changenum/changenum"
    import goodsdetail from "../goodsdetail/goodsdetail"
    export default {
        name:"goods",
        data(){
            return {
                goods:[],
                listHight:[],
                scrollHeight:0,
                Index:0,
                Index1:0,
            }
        },
        props:{
            seller:{}
        },
        created:function(){
            var that = this;
            this.$http.get('/api/goods').then((response)=>{
                if(response.data.err==0){
                    this.goods = response.data.data;
                    this.$nextTick(function() {
                        this.initscroll()
                        this.getHeight()
                    });
                }
            })
            this.classArray = ["decrease1","discount1","special1","invoice1","guarantee1"]
        },
        computed:{
            onIndex(){
                for(let i=0;i<this.listHight.length;i++){
                    if(this.scrollHeight>=this.listHight[i] && this.scrollHeight<this.listHight[i+1]){
                        this.menuScroll.scrollToElement(this.$refs.menu[i],300)
                        return i
                    }
                }
            },
            tocartnum(){
                let cartArr = [];
                for(let i=0;i<this.goods.length;i++){
                    for(let j=0;j<this.goods[i].foods.length;j++){
                        if(this.goods[i].foods[j].num>0){
                            cartArr.push(this.goods[i].foods[j])
                        }
                    }
                }
                return cartArr
            },
        },
        methods:{
            showIndex(index,index1){
                this.Index = index
                this.Index1 = index1
                this.$refs.detail.show()
                this.$refs.goods.style.overflow = "auto"
            },
            shopClean(){
              for(let i=0;i<this.goods.length;i++){
                for(let j=0;j<this.goods[i].foods.length;j++){
                  this.goods[i].foods[j].num--
                }
              }
            },
            initscroll(){
                this.menuScroll = new bs(this.$refs.menuScroll,{
                    click:true,
                    probeType:3
                });
                this.listScroll = new bs(this.$refs.listScroll,{
                    click:true,
                    probeType:3
                });
                this.listScroll.on('scroll',(pos) =>{
                    this.scrollHeight = Math.abs(Math.round(pos.y))
                })
            },
            getHeight(){
                let height = 0;
                this.listHight.push(height);
                for(var i=0;i<this.$refs.foodlist.length;i++){
                    height += this.$refs.foodlist[i].clientHeight;
                    this.listHight.push(height);
                }
            },
            scrollto(index){
                this.listScroll.scrollToElement(this.$refs.foodlist[index],300)
            }
        },
        components:{
            change:changenum,
            shopcart:shopcart,
            detail:goodsdetail
        }
    }
</script>

<style type="text/css">
    .goods{
        display:flex;
        position:absolute;
        top: 17.5rem;
        bottom:5.3rem;
        overflow:hidden;
    }
    .tab-menu{
        flex:0 0 8rem;
        width: 8rem;
        background:#F3F5F7;
    }
    .tab-menu li{
        height:5.4rem;
        padding:0 1.2rem;
        display:table;
        color:rgb(77,85,93);
    }
    .tab-menu li p{
        display:table-cell;
        vertical-align:middle;
        width: 5.6rem;
        font-size:1.2rem;
        line-height:1.4rem;
        border-bottom:1px solid rgba(7,17,27,.1);
    }
    .tab-menu li.on{
        background:#fff;
        color:rgb(7,17,27);
    }
    .tab-menu li span{
        display:inline-block;
        margin-right:0.2rem;
        margin-top:0.1rem;
        vertical-align:top;
        width: 1.2rem;
        height:1.2rem;
        background-repeat:no-repeat;
        background-size:100% 100%;
    }
    .decrease1{
        background:url('../img/decrease_3@2x.png');
    }
    .discount1{
        background:url('../img/discount_3@2x.png');
    }
    .guarantee1{
        background:url('../img/guarantee_3@2x.png');
    }
    .invoice1{
        background:url('../img/invoice_3@2x.png');
    }
    .special1{
        background:url('../img/special_3@2x.png');
    }
    .foodtitle h3{
        height:2.6rem;
        padding-left:1.4rem;
        border-left:2px solid #d9dde1;
        background:#f3f5f7;
        font-size:1.2rem;
        color:rgb(147,153,159);
        line-height:2.6rem;
        font-weight:200;
    }
    .foodlist li{
        position:relative;
        padding:1.8rem 0;
        margin:0 1.8rem;
        display:flex;
        border-bottom:1px solid rgba(7,17,27,0.1);
    }
    .foodlist>li:last-child{
        border:0;
    }
    .icon img{
        width: 5.7rem;
        height:5.7rem;
        border-radius:2px;
        margin-right:1rem;
    }
    .con{
        padding-top:0.2rem;
        font-size:1rem;
        color:rgb(147,153,159);
        line-height:1rem;
    }
    .name{
        font-size:1.4rem;
        font-weight:200;
        color:rgb(7,17,27);
        line-height:1.4rem;
    }
    .description{
        margin:0.8rem 0;
    }
    .selldetail span{
        margin-left:1.2rem;
    }
    .price{
        font-size:1.4rem;
        color:rgb(240,20,20);
        line-height:2.4rem;
    }
    .price:before{
        content:"￥";
        font-size:1rem;
        font-weight:normal;
        line-height:2.4rem;
    }
    .price span{
        margin-bottom:8px;
        margin-left:0.8rem;
        text-decoration:line-through;
        font-size:1rem;
        color:rgb(147,153,159);
        line-height:2.4rem;
    }
    .change{
        position:absolute;
        right:0;
        bottom:1.8rem;
    }
    .detail{
      /* min-height: 100vh; */
    }
    .foods-detail{
        position:absolute;
        top:0;
        left: 0;
        width: 37.5rem;
        background:#fff;
        margin-bottom:6rem;
    }
</style>
