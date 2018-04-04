<template>
    <div class="star" :class="starSize">
        <span v-for="item in stars" :class="item"></span>
    </div>
</template>

<script>
export default {
    props:{
        size:{
            type:Number
        },
        score:{
            type:Number
        }
    },
    name:"star",
    computed:{
        starSize:function(){
            return "star-"+this.size;
        },
        stars:function(){
            let result = []
            let integer = Math.floor(this.score)
            let decimal = this.score - integer
            for(var i=0;i<integer;i++){
                result.push("on")
            }
            if(decimal>=0.5){
                result.push("half")
            }
            while(result.length<5){
                result.push("off")
            }
            return result
        }
    }
}
</script>

<style type="text/css">
    .star span{
        display:inline-block;
        background-repeat:no-repeat;
    }
    .star.star-48 span{
        width: 2.4rem;
        height:2.4rem;
        background-size:100% 100%;
        margin-right:2rem;
    }
    .star.star-48 .on{
        background-image:url('../img/star48_on@2x.png');
    }
    .star.star-48 .half{
        background-image:url('../img/star48_half@2x.png');
    }
    .star.star-48 .off{
        background-image:url('../img/star48_off@2x.png');
    }
    .star.star-36 span{
        width: 1.8rem;
        height:1.8rem;
        background-size:100% 100%;
        margin-right:0.6rem;
    }
    .star.star-36 span:last-child{
        margin-right:0;
    }
    .star.star-36 .on{
        background-image:url('../img/star36_on@2x.png');
    }
    .star.star-36 .half{
        background-image:url('../img/star36_half@2x.png');
    }
    .star.star-36 .off{
        background-image:url('../img/star36_off@2x.png');
    }
    .star.star-24 span{
        width: 1.2rem;
        height:1.2rem;
        background-size:100% 100%;
        margin-right:0.4rem;
    }
    .star.star-24 .on{
        background-image:url('../img/star24_on@2x.png');
    }
    .star.star-24 .half{
        background-image:url('../img/star24_half@2x.png');
    }
    .star.star-24 .off{
        background-image:url('../img/star24_off@2x.png');
    }
</style>