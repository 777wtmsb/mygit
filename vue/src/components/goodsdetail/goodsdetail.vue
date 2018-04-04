<template>
    <transition name="hairu">
    <div v-if="isShow" class="goodsdetail">
        <i @click="goback" class="goback iconfont icon-arrow_lift"></i>
        <img class="head" :src="foods.image"  />
        <div class="detail-box">
            <h2>{{foods.name}}</h2>
            <div class="detail-data">
                <span>月售{{foods.sellCount}}份</span>
                <span>好评率{{foods.rating}}%</span>
            </div>
            <div class="detail-price">
                <h4>{{foods.price}}<span v-if="foods.oldPrice">{{foods.oldPrice}}</span></h4>
            </div>
            <div class="add-cart" @click="add()">加入购物车</div>
        </div>
        <div class="banner-bla"></div>
        <div class="detail-box">
            <h3>商品介绍</h3>
            <p class="detail-bull">{{foods.info}}</p>
        </div>
        <div class="banner-bla"></div>
        <div class="detail-box">
            <h3>商品评价</h3>
            <div class='ban3_1'>
                <div class='ban3_1_1'>
                    <div><p>全部</p>&nbsp;<p>{{foods.ratings.length}}</p></div>
                    <div><p>推荐</p>&nbsp;<p>{{good}}</p></div>
                    <div><p>吐槽</p>&nbsp;<p>{{foods.ratings.length-good}}</p></div>
                </div>
            </div>
            <div class='ban3_2'>
                <i :class="{'on':checked==true}" @click="check" class="check iconfont icon-check_circle-checked"></i>
                <p>只看有内容的评价</p>
            </div>
        </div>
        <div class="detail-rat">
            <ul>
                <li v-for="(item,index) in foods.ratings" ref="comment">
                    <div class="time-user">
                        <span>{{totime[index]}}</span>
                        <span>{{item.username}}</span>
                        <img :src="item.avatar">
                    </div>
                    <div class="rate-text">
                        <i class="iconfont" :class="{'icon-thumb_up':item.rateType==0,'icon-thumb_down':item.rateType==1}"></i>
                        <p>{{item.text}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    </transition>
</template>

<script>
    import Vue from "Vue"
    export default {
        props:{
            foods:{}
        },
        data(){
            return {
                isShow:false,
                checked:false
            }
        },
        methods:{
            show(){
                this.isShow = true
            },
            goback(){
                this.isShow = false
            },
            check(){
                for(var i=0;i<this.$refs.comment.length;i++){
                    if(this.$refs.comment[i].children[1].children[1].innerHTML==""){
                        if(!this.checked){
                            this.$refs.comment[i].style.display="none"
                        }else{
                            this.$refs.comment[i].style.display="block"
                        }
                    }
                }
                this.checked = !this.checked
            },
            add(){
                if(!this.foods.num){
                    Vue.set(this.foods,"num",1)
                }else{
                    alert("已加入购物车！")
                }
            }
        },
        computed:{
            good(){
                var num1 = 0;
                for(let i=0;i<this.foods.ratings.length;i++){
                        if(this.foods.ratings[i].rateType==0){
                            num1++
                    }
                }
                return num1
            },
            totime(){
                var time=[]
                for(let i=0;i<this.foods.ratings.length;i++){
                    var date = new Date(this.foods.ratings[i].rateTime);
                    var Y = date.getFullYear() + '-';
                    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                    var D = date.getDate() + ' ';
                    var h = date.getHours() + ':';
                    var m = date.getMinutes() + ':';
                    var s = date.getSeconds();
                    time.push(Y+M+D+h+m+s);
                }
                return time
            }
        },
    }
</script>

<style lang="less">
    .goodsdetail{
        transform: translate3d(0,0,0);
    }
    .hairu-enter-active,.hairu-leave-active{
        transition:all .5s;
    }
    .hairu-enter,.hairu-leave-active{
        opacity:0;
        transform: translate3d(-100%,0,0);
    }
    .goback{
        position:absolute;
        left: 2rem;
        top: 2rem;
        font-size:2rem;
        line-height:2rem;
        color:rgba(147,153,159,0.8);
    }
    .head{
        width: 100%;
        height:37.5rem;
    }
    .detail-box{
    padding: 1.8rem;
    position:relative;
    h2{
        font-size: 1.4rem;
        color:rgb(7,17,27);
        line-height: 1.4rem;
    }
    .ban3_1,.ban3_2{
        margin-left:0;
        margin-bottom:0;
        width: 100%
    }
    .detail-data{
        margin-top: 0.8rem;
        span{
            font-size:1rem;
            color:rgb(147,153,159);
            line-height:1rem;
            margin-right: 1.2rem
        }
    }
    .detail-price{
        margin-top:1.8rem;
        h4{
            font-size:1.4rem;
            color:rgb(240,20,20);
            line-height:2.4rem;
        }
        h4:before{
            content: "￥";
            font-size:1rem;
            font-weight: 200;
        }
        span{
            margin-left:0.8rem;
            font-size:1rem;
            font-weight:700;
            color:rgb(147,153,159);
            line-height:2.4rem;
            text-decoration: line-through;
        }
        span:before{
            font-weight:200;
        }
    }
    .add-cart{
        position: absolute;
        right: 1.8rem;
        bottom: 1.8rem;
        width: 7.4rem;
        height: 2.4rem;
        padding:0.6rem 0;
        box-sizing:border-box;
        text-align:center;
        background: rgb(0,160,220);
        border-radius: 1.2rem;
        font-size:1rem;
        color:#fff;
        line-height:1.2rem;
    }
    h3{
        font-size: 1.4rem;
        font-weight:200;
        color:rgb(7,17,27);
        line-height: 1.4rem;
    }
    .detail-bull{
        margin-top:0.6rem;
        padding:0 0.8rem;
        font-size:1.2rem;
        color:rgb(77,85,93);
        line-height:2.4rem;
    }
}
.detail-rat{
    border-top: 1px solid rgba(7,17,27,.1);
    padding: 0 1.8rem;
    ul{
        li{
            padding:1.6rem 0;
            border-bottom: 1px solid rgba(7,17,27,.1);
            .time-user{
                width: 100%;
                display:flex;
                span{
                    font-size:1rem;
                    color:rgb(147,153,159);
                    line-height:1.2rem;
                }
                span:first-child{
                    flex:1;
                }
                img{
                    width: 1.2rem;
                    height:1.2rem;
                    margin-left: 0.6rem;
                    border-radius:50%;
                }
            }
            .rate-text{
                display: flex;
                margin-top:0.6rem;
                i{
                    font-size:1.2rem;
                    color:rgb(147,153,159);
                    line-height:2.4rem;
                    margin-right:0.4rem;
                }
                p{
                    padding-top:0.4rem;
                    font-size:1rem;
                    color:rgb(7,17,27);
                    line-height:1.6rem;
                }
            }
        }
    }
}
    .ban3_1{
    margin:1.8rem 1.8rem 0 1.8rem;
    display: inline-flex;
    flex-direction:column;
    border-bottom:0.05rem solid rgba(7,17,27,0.1);
}
.ban3_1 > p{
    font-size:1.4rem;
    font-weight:bold;
    color:rgb(7,17,27);
    line-height:1.4rem;
}
.ban3_1_1{
    margin:1.8rem 0 1.8rem 0;
    display: inline-flex;
}
.ban3_1_1 div:first-child{
    border-radius:0.1rem;
    background-color:rgb(0,160,220);
    display: inline-flex;
    justify-content:spce-between;
}
.ban3_1_1 div:first-child p:first-child{
    font-size:1.2rem;
    color:rgb(255,255,255);
    line-height:1.6rem;
    margin:0.8rem 0 0.8rem 1.2rem;
}
.ban3_1_1 div:first-child p:last-child{
    font-size:0.8rem;
    color:rgb(255,255,255);
    line-height:1.6rem;
    margin:0.8rem 1.2rem 0.8rem 0;
}
.ban3_1_1 div:nth-child(2){
    margin-left:0.8rem;
    border-radius:0.1rem;
    background-color:rgba(0,160,220,0.2);
    display: inline-flex;
    justify-content:spce-between;
}
.ban3_1_1 div:nth-child(2) p:first-child{
    font-size:1.2rem;
    color:rgb(77,85,93);
    line-height:1.6rem;
    margin:0.8rem 0 0.8rem 1.2rem;
}
.ban3_1_1 div:nth-child(2) p:last-child{
    font-size:0.8rem;
    color:rgb(77,85,93);
    line-height:1.6rem;
    margin:0.8rem 1.2rem 0.8rem 0;
}
.ban3_1_1 div:last-child{
    margin-left:0.8rem;
    border-radius:0.1rem;
    background-color:rgba(77,85,93,0.2);
    display: inline-flex;
    justify-content:spce-between;
}
.ban3_1_1 div:last-child p:first-child{
    font-size:1.2rem;
    color:rgb(77,85,93);
    line-height:1.6rem;
    margin:0.8rem 0 0.8rem 1.2rem;
}
.ban3_1_1 div:last-child p:last-child{
    font-size:0.8rem;
    color:rgb(77,85,93);
    line-height:1.6rem;
    margin:0.8rem 1.2rem 0.8rem 0;
}
.ban3_2{
    margin:1.2rem 0 1.2rem 1.8rem;
    display: inline-flex;
}
.ban3_2 i{
    font-size:2.4rem;
    color:rgb(147,153,159);
    line-height:2.4rem;
    &.on{
        color:rgb(0,160,220);
    }
}
.ban3_2 p{
    margin-left:0.4rem;
    font-size:1.2rem;
    color:rgb(147,153,159);
    line-height:2.4rem;
}
.banner-bla{
    width:100%;
    height:1.6rem;
    background-color:#f3f5f7;
    border-top: 0.1rem solid rgba(7,17,27,0.1);
    border-bottom: 0.1rem solid rgba(7,17,27,0.1);
}
</style>