<template>
    <div class="shopcart">
        <div class="left">
            <div class="cart-back" :class="{'on':totalnum>0}">
                <div class="point" v-if="totalnum>0" @click="showcart"></div>
                <i class="iconfont icon-shopping_cart"></i>
            </div>
            <div class="cart-num" v-if="totalnum>0">{{totalnum}}</div>
            <div class="cart-price">
                <h2>￥{{totalprice}}</h2>
                <p>另需配送费￥{{seller.deliveryPrice}}元</p>
            </div>
        </div>
        <div class="right" :class="payenable">
            <h2>{{minprice}}</h2>
        </div>
        <transition name="fold">
        <div class="cart-list" v-show="cartshow && totalnum>0">
          <div class="list-title">
            <h3>购物车</h3>
            <span @click="clean">清空</span>
          </div>
          <ul>
            <li v-for="item in cartArr">
              <h4>{{item.name}}</h4>
              <div>
                <span class="list-price">{{item.price}}</span>
                <change :foods="item" ></change>
              </div>
            </li>
          </ul>
        </div>
        </transition>
    </div>
</template>

<script>
    import changenum from "@/components/changenum/changenum"
    export default {
        data(){
            return {
                cartshow:false
            }
        },
        props:{
            cartArr:[],
            seller:{}
        },
        computed:{
            totalnum(){
                var totalnum = 0;
                for(let i=0;i<this.cartArr.length;i++){
                    totalnum += this.cartArr[i].num
                }
                return totalnum
            },
            totalprice(){
                var totalprice = 0;
                for(let i=0;i<this.cartArr.length;i++){
                    totalprice += (this.cartArr[i].num * this.cartArr[i].price)
                }
                return totalprice
            },
            minprice(){
              if(this.totalprice == 0){
                return `￥${this.seller.minPrice}起送`
              }else if(this.totalprice<this.seller.minPrice){
                return `还差￥${this.seller.minPrice-this.totalprice}起送`
              }else{
                return "去结算"
              }
            },
            payenable(){
              if(this.totalprice>=this.seller.minPrice){
                return "ispay"
              }else{
                return "none"
              }
            }
        },
        methods:{
            showcart(){
                this.cartshow = !this.cartshow
            },
            clean(){
                this.cartArr=[];
                this.cartshow = false
            }
        },
        components:{
            change:changenum
        }
    }
</script>

<style lang="less">
    .shopcart{
        display:flex;
        width: 100%;
        height:4.8rem;
        position:fixed;
        bottom:0;
        left: 0;
        z-index:10;
        .left{
            display:flex;
            align-items: center;
            flex:1;
            background-color:#141d27;
            z-index:10;
            .cart-back{
                width: 4.4rem;
                height:4.4rem;
                margin-top:-0.6rem;
                margin-left:1.8rem;
                background:rgba(255,255,255,0.1);
                border-radius:50%;
                position: relative;
                display:flex;
                justify-content:center;
                align-items: center;
                .point{
                    width: 100%;
                    height:100%;
                    position:absolute;
                    top: 0;
                    left: 0;
                }
                i{
                    font-size:2.4rem;
                    color:rgba(255,255,255,.4);
                    line-height:2.4rem;
                }
                &.on{
                  background: rgb(0,160,220);
                  i{
                    color:#fff;
                  }
                }
            }
            .cart-num{
                position:absolute;
                top:-0.6rem;
                left: 4.4rem;
                text-align:center;
                width: 2.4rem;
                height:1.6rem;
                border-radius:12px;
                font-size:0.9rem;
                font-weight:700;
                color:#fff;
                line-height:1.6rem;
                background-color:rgb(240,20,20);
                box-shadow:0 4px 8px 0 rgba(0,0,0,0.4);
            }
            .cart-price{
                margin-left:1.8rem;
                display:flex;
                h2{
                    font-size:1.6rem;
                    color:rgba(255,255,255,.4);
                    line-height:2.4rem;
                    padding-right:1.2rem;
                    border-right:1px solid rgba(255,255,255,0.1);
                }
                p{
                    font-size:1.2rem;
                    color:rgba(255,255,255,.4);
                    line-height:2.4rem;
                    margin-left:1.2rem;
                }
            }
        }
        .left:before{
            content:"";
            width:5.6rem;
            height:5.6rem;
            border-radius:50%;
            background-color:#141d27;
            position:absolute;
            top:-0.8rem;
            left:1.2rem;
            box-sizing:border-box;
            padding:0.6rem;
        }
        .right{
            flex:0 0 10.5rem;
            width: 10.5rem;
            background:#2b333b;
            display:flex;
            justify-content:center;
            align-items: center;
            z-index:10;
            h2{
                font-size:1.6rem;
                color:rgba(255,255,255,.4);
                line-height:2.4rem;
            }
            &.ispay{
              background: #4cd964;
              h2{
                color:#fff;
              }
            }
        }
        .cart-list{
            width: 100%;
            position:absolute;
            left: 0;
            bottom: 4.8rem;
            transform:translate3d(0,0,0);
            &.fold-enter-active,&.fold-leave-active{
                transition:all .5s;
            }
            &.fold-enter,&.fold-leave-active{
                transition:all .5s;
                transform:translate3d(0,100%,0);
            }
            .list-title{
                height:4rem;
                padding:0 1.8rem;
                background:#f3f5f7;
                display:flex;
                justify-content:space-between;
                border-bottom:1px solid rgba(7,17,27,0.1);
                h3{
                    font-size:1.4rem;
                    font-weight:200;
                    color:rgb(7,17,27);
                    line-height:4rem;
                }
                span{
                    font-size:1.2rem;
                    color:rgb(0,160,220);
                    line-height:4rem;
                }
            }
            ul{
                max-height:21.7rem;
                overflow:hidden;
                background:#fff;
                li{
                    height:4.8rem;
                    margin:0 1.8rem;
                    padding:1.2rem 0;
                    box-sizing:border-box;
                    display:flex;
                    justify-content:space-between;
                    border-bottom:1px solid rgba(7,17,27,0.1);
                    h4{
                        font-size:1.4rem;
                        font-weight:200;
                        color:rgb(7,17,27);
                        line-height:2.4rem;
                    }
                    div{
                        display:flex;
                        .list-price{
                            font-size:1.4rem;
                            font-weight:700;
                            color:rgb(240,20,20);
                            line-height:2.4rem;
                            margin-right:1.2rem;
                        }
                        .list-price:before{
                            content:"￥";
                            font-size:1rem;
                        }
                    }
                }
            }
        }
    }
</style>
