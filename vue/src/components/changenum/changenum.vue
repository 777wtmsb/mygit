<template>
    <div class="add-box">
        <transition name="move">
            <div class="reduce iconfont icon-remove_circle_outlin" @click="reduce" v-show="foods.num>0"></div>
        </transition>
        <span class="num" v-show="foods.num>0">{{foods.num}}</span>
        <div class="add iconfont icon-add_circle" @click="add"></div>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        props:{
            foods:{}
        },
        methods:{
            add(){
                if(!this.foods.num){
                    Vue.set(this.foods,"num",1)
                }else{
                    this.foods.num++
                }
            },
            reduce(){
                if(this.foods.num){
                    this.foods.num--
                }
            }
        },
    }
</script>

<style type="text/css">
    .add-box{
        display:flex;
    }
    .reduce,.add{
        font-size:2.4rem;
        color:rgb(0,160,220);
        line-height:2.4rem;
        padding:0 0.7rem;
    }
    .reduce{
        transition:all .3s;
        transform: translate3d(0,0,0);
    }
    .move-enter-active,.move-leave-active{
        transition:all .3s;
    }
    .move-enter,.move-leave-active{
        opacity:0;
        transform:rotate(180deg) translate3d(-2.4rem,0,0);
    }
    .num{
        font-size:1rem;
        color:rgb(147,153,159);
        line-height:2.4rem;
    }
</style>