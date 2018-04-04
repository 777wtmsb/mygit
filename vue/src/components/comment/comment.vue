<template>
<div>
    <div class="c1">
        <div class="c1_1">
            <h1>{{seller.score}}</h1>
            <h2>综合评分</h2>
            <h3>高于周边商家{{seller.rankRate}}%</h3>
        </div>
        <div class="c1_2">
            <div class="c1_2_1">
                <p>服务态度</p>
                <star :size="36" :score="seller.serviceScore"></star>
                <p class="ser_s">{{seller.serviceScore}}</p>
            </div>
            <div class="c1_2_1">
                <p>菜品评价</p>
                <star :size="36" :score="seller.foodScore"></star>
                <p class="fod_s">{{seller.foodScore}}</p>
            </div>
            <div class="c1_2_2">
                <p>送达时间</p>
                <p>{{seller.deliveryTime}}分钟</p>
            </div>
        </div>
    </div>
    <div class='banner-bla'></div>
    <div class='ban3'>
        <div class='ban3_1'>
        <div class='ban3_1_1'>
        <div><p>全部</p>&nbsp;<p>{{ratings.length}}</p></div>
        <div><p>满意</p>&nbsp;<p>{{good}}</p></div>
        <div><p>不满意</p>&nbsp;<p>{{ratings.length-good}}</p></div>
        </div>
        </div>
        <div class='ban3_2'>
        <i :class="{'on':checked==true}" @click="check" class="check iconfont icon-check_circle-checked"></i><p>只看有内容的评价</p></div>
    </div>
    <div class="rat-con">
        <ul>
            <li v-for="(item,index) in ratings" ref="comment">
                <img class="user-icon" :src="item.avatar"/>
                <div class="user-rat">
                    <div class="name-time"><p>{{item.username}}</p><span>{{totime[index]}}</span></div>
                    <div class="star-time"><star :size="24" :score="item.score"></star><span class="deli-time">{{item.deliveryTime}}分钟送达</span></div>
                    <h3 class="rat-text">{{item.text}}</h3>
                    <div class="type">
                    <i class="iconfont" :class="{'icon-thumb_up':item.rateType==0,'icon-thumb_down':item.rateType==1}"></i>
                    <span v-for="items in item.recommend">{{items}}</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
    import star from "@/components/star/star"
    export default {
        data(){
            return {
                ratings:{},
                checked:false
            }
        },
        props:{
            seller:{}
        },
        created(){
            this.$http.get('/api/ratings').then((response)=>{
                if(response.data.err==0){
                    this.ratings = response.data.data
                }
            })
        },
        computed:{
            good(){
                var num1 = 0;
                for(let i=0;i<this.ratings.length;i++){
                    if(this.ratings[i].rateType==0){
                        num1++
                    }
                }
                return num1
            },
            totime(){
                var time=[]
                for(let i=0;i<this.ratings.length;i++){
                    var date = new Date(this.ratings[i].rateTime);
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
        methods:{
            check(){
                for(var i=0;i<this.$refs.comment.length;i++){
                    if(this.$refs.comment[i].children[1].children[2].innerHTML==""){
                        if(!this.checked){
                            this.$refs.comment[i].style.display="none"
                        }else{
                            this.$refs.comment[i].style.display="flex"
                        }
                    }
                }
                this.checked = !this.checked
            }
        },
        components:{
            star:star
        }
    }
</script>

<style lang="less">
    .c1{
    width:100%;
    display: inline-flex;
}
.c1_1{
    width: 13.75rem;
    margin:1.8rem 0;
    border-right:0.05rem solid rgba(7,17,27,0.1);
    display: inline-flex;
    flex-direction:column;
}
.c1_1 h1{
    font-size:2.4rem;
    font-weight:normal;
    color:rgb(255,153,0);
    line-height:2.8rem;
    align-self:center;
}
.c1_1 h2{
    margin-top:0.6rem;
    font-weight:normal;
    font-size:1.2rem;
    color:rgb(7,17,27);
    line-height:1.2rem;
    align-self:center;
}
.c1_1 h3{
    margin-top:0.8rem;
    margin-bottom:0.6rem;
    font-size:1rem;
    font-weight:normal;
    color:rgb(147,153,159);
    line-height:1rem;
    align-self:center;
}
.c1_2{
    margin:1.8rem 2.4rem;
    width: 23.7rem;
    display: inline-flex;
    flex-direction:column;
}
.c1_2>div:nth-child(2){
    margin-top:0.8rem;
}
.c1_2_1{
    display: flex;
}
.c1_2_1 p:first-child{
    font-size:1.2rem;
    color:rgb(7,17,27);
    line-height:1.8rem;
    margin-right:1.2rem;
}
.c1_2_1 p:last-child{
    margin-left:1.2rem;
    font-size:1.2rem;
    color:rgb(255,153,0);
    line-height:1.8rem;
}
.c1_2_2{
    margin-top:0.8rem;
    display: inline-flex;
}
.c1_2_2 p:first-child{
    font-size:1.2rem;
    color:rgb(7,17,27);
    line-height:1.8rem;
}
.c1_2_2 p:last-child{
    margin-left:1.2rem;
    font-size:1.2rem;
    color:rgb(147,153,159);
    line-height:1.8rem;
}
.commend_con>div:nth-child(3)>div>div{
    margin-top:0;
}
.com_con{
    width:100%;
    display: inline-flex;
    flex-direction:column;
}
.c2{
    width:100%;
}
.c2_con{
    margin:1.8rem 1.8rem 0 1.8rem;
    display: inline-flex;
    border-bottom:0.05rem solid rgba(7,17,27,0.1);
}
.c2_con>img{
    width:2.8rem ;
    height: 2.8rem;
    border-radius:50%;
}
.c2_1{
    margin-left:1.2rem;
    margin-bottom:1.8rem;
    display: inline-flex;
    flex-direction:column;
}
.c2_1_1{
    width: 29.9rem;
    display: inline-flex;
    justify-content:space-between;
}
.c2_1_1 p:first-child{
    font-size: 1rem;
    color:rgb(7,17,27);
    line-height:1.2rem;
}
.c2_1_1 p:last-child{
    font-size: 1rem;
    font-weight:200;
    color:rgb(147,153,159);
    line-height:1.2rem;
}
.c2_1_2{
    margin-top:0.4rem;
    display: inline-flex;
}
.c2_1_2>div{
    display: inline-flex;
}
.c2_1_2 img{
    width:1rem;
    height: 0.95rem;
}
.c2_1_2 p{
    margin-left:0.6rem;
    font-size: 1rem;
    font-weight:200;
    color:rgb(147,153,159);
    line-height:1.2rem;
}
.c2_1>p{
    margin-top:0.6rem;
    font-size:1.2rem;
    color:rgb(7,17,27);
    line-height:1.8rem;
}
.c2_1_4{
    margin-top:0.8rem;
    display: inline-flex;
}
.c2_1_4 img{
    margin-top:0.4rem;
    width:1.2rem;
    height: 1rem;
}
.ban3{
    width:100%;
    display: inline-flex;
    flex-direction:column;
    justify-content:space-between;
    border-bottom:0.1rem solid rgba(7,17,27,0.1);
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
.rat-con li{
    margin:0 1.8rem;
    padding: 1.8rem 0;
    display:flex;
    border-bottom: 1px solid rgba(7,17,27,.1);
    .user-icon{
        width: 2.8rem;
        height: 2.8rem;
        border-radius: 50%;
        margin-right: 1.2rem;
    }
    .user-rat{
        width: 100%;
        .name-time{
            display: flex;
            p{
                flex:1;
                font-size: 1rem;
                color:rgb(7,17,27);
                line-height: 1.2rem;
            }
            span{
                font-size: 1rem;
                color:rgb(147,153,159);
                line-height: 1.2rem;
            }
        }
        .star-time{
            display:flex;
            margin-top:0.4rem;
            .deli-time{
                font-size: 1rem;
                color:rgb(147,153,159);
                line-height: 1.2rem;
                margin-left: 0.6rem;
            }
        }
        .rat-text{
            margin-top:0.6rem;
            font-size: 1.2rem;
            font-weight:200;
            color:rgb(7,17,27);
            line-height: 1.8rem;
        }
        .type{
            i{
                float:left;
                font-size:1.2rem;
                color:rgb(183,187,191);
                line-height:1.6rem;
                margin-top:0.8rem;
            }
            span{
                float:left;
                max-width:5.3rem;
                height:1.6rem;
                border:1px solid rgba(7,17,27,.1);
                border-radius:2px;
                background-color: #fff;
                font-size:0.9rem;
                color:rgb(147,153,159);
                line-height:1.6rem;
                margin-left:0.8rem;
                margin-top:0.8rem;
                padding:0 0.6rem;
                overflow:hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
            }
        }
    }
}
</style>