 $(function(){

    $("#gg").click(function(){
        $("#papg1").css("display","none");
        $("#papg2").css("display","block");
    })

    $("#gwc").click(function(){
        $("#papg1").css("display","none");
        $("#papg3").css("display","block");
        var sw4 = new Swiper ('.gwc', {
            slidesPerView:'auto',
            freeMode: true,
            direction: 'vertical',
            mousewheel: true,
        })
    })
    $("#cle").click(function(){
        $("#papg1").css("display","block");
        $("#papg3").css("display","none");
    })

    $.ajax({
        type:"GET",
        url:"static/data.json",
        success:function(res){

            $("#papg1").prepend("<img src="+"'"+res.seller.avatar+"'"+"class='blur1' / >");
            $(".box1").prepend("<img src='"+res.seller.avatar+"' />");
            $(".box1 p").eq(0).html(res.seller.name);
            $(".box1 p").eq(1).html(res.seller.description+" / "+res.seller.deliveryTime+"分钟送达");
            $(".box1 p").eq(2).html(res.seller.supports[0].description+","+res.seller.supports[1].description);
            $(".mor").html(res.seller.supports.length+"个&nbsp;>")
            $(".box2>p").eq(0).html(res.seller.bulletin);

            var h = "";
            for(var i=0;i<res.goods.length;i++){
                h+= "<div class='swiper-slide'><p>"+res.goods[i].name+"</p></div>"
            }
            $(".sw1").html(h);

            var h1 = "";
            for(var i=0;i<res.goods.length;i++){
                h1+="<div class='goods swiper-slide'><div class='tittle'><p>"+res.goods[i].name+"</p></div>";
                for(var j=0;j<res.goods[i].foods.length;j++){
                    if(j==res.goods[i].foods.length-1){
                    h1+="<div class='foods'><img src='"+res.goods[i].foods[j].icon+"' ><div class='foods_1'><p>"+res.goods[i].foods[j].name+"</p><span>"+res.goods[i].foods[j].description+"</span><div class='foods_2'><p>月售"+res.goods[i].foods[j].sellCount+"份</p><p>好评率"+res.goods[i].foods[j].rating+"%</p></div><div class='foods_3'><div class='foods_4'><p>￥"+res.goods[i].foods[j].price+"</p><p>￥"+res.goods[i].foods[j].oldPrice+"</p></div><div class='foods_5'><img class='miu' src='SVG/remove_circle_outline.svg' /><span class='num'>0</span><img class='add' src='SVG/add_circle.svg' /></div></div></div></div></div>";
                }else{
                    h1+="<div class='foods'><img src='"+res.goods[i].foods[j].icon+"' ><div class='foods_1'><p>"+res.goods[i].foods[j].name+"</p><span>"+res.goods[i].foods[j].description+"</span><div class='foods_2'><p>月售"+res.goods[i].foods[j].sellCount+"份</p><p>好评率"+res.goods[i].foods[j].rating+"%</p></div><div class='foods_3'><div class='foods_4'><p>￥"+res.goods[i].foods[j].price+"</p><p>￥"+res.goods[i].foods[j].oldPrice+"</p></div><div class='foods_5'><img class='miu' src='SVG/remove_circle_outline.svg' /><span class='num'>0</span><img class='add' src='SVG/add_circle.svg' /></div></div></div></div>";
                }
            }
    }
    $(".sw2").html(h1);
        $(".foods_1").find("span:first").each(function(){
            if($(this).html()==""){
                $(this).remove();
            }
        })
        $(".foods_4").find("p:last-child").each(function(){
            if($(this).html()=="￥"){
                $(this).remove();
            }
        })

        $(".sw1>div").click(function(){
                sw2.slideTo($(this).index(), 300, false);
                cli($(this));
        });

        $(".add").bind("click",function(event){
            event.stopPropagation();
            var num = parseInt($(this).prev(".num").html())+1;
            $(this).prev(".num").prev(".miu").css("display","block");
            $(this).prev(".num").css("display","block");
            $(this).prev(".num").html(num);
            cpu();
        })
        $(".miu").bind("click",function(event){
            event.stopPropagation();
            var num = parseInt($(this).next(".num").html())-1;
            $(this).next(".num").html(num);
            cpu();
            if(parseInt($(this).next(".num").html())<1){
                $(this).next(".num").css("display","none");
                $(this).css("display","none");
            }
        })

        $(".c1_1>h1").html(res.seller.score);
        $(".c1_1>h3").html("高于周边商家"+res.seller.rankRate+"%")
        $(".ser_s").html(res.seller.serviceScore.toFixed(1));
        $(".fod_s").html(res.seller.foodScore.toFixed(1));
        $(".c1_2_2>p").eq(1).html(res.seller.deliveryTime+"分钟");
        star($(".ser_s"),36);
        star($(".fod_s"),36);
        $(".ban3_1_1>div>p:odd").eq(0).html(res.ratings.length);
        var h2 = "";
        var num1 = 0;
        var num2 = 0;
        for(var i=0;i<res.ratings.length;i++){
            h2+="<div class='c2'><div class='c2_con'><img src='"+res.ratings[i].avatar+"'><div class='c2_1'><div class='c2_1_1'><p>"+res.ratings[i].username+"</p><p>"+res.ratings[i].rateTime+"</p></div><div class='c2_1_2'><div></div><p>"+res.ratings[i].deliveryTime+"分钟送达</p></div><p class='comt'>"+res.ratings[i].text+"</p><div class='c2_1_4'><div class='recom'>"
            if(res.ratings[i].recommend.length==0){
                h2+="</div></div></div></div></div>";
            }else{
            for(var j=0;j<res.ratings[i].recommend.length;j++){
                if(j==res.ratings[i].recommend.length-1){
                    h2+="<span>"+res.ratings[i].recommend[j]+"</span></div></div></div></div></div>"
                    }else{
                        h2+="<span>"+res.ratings[i].recommend[j]+"</span>"
                    }
                }
            }
        }
        $(".com_con").html(h2);

        for(var k=0;k<res.ratings.length;k++){
            var sta = "";
            for(var l=0;l<res.ratings[k].score;l++){
                sta+="<img src='img/star24_on@2x.png'/>"
            }
            for(var p=0;p<5-res.ratings[k].score;p++){
                sta+="<img src='img/star24_off@2x.png'/>"
            }
            $(".c2_1_2>div").eq(k).prepend(sta)

            if(res.ratings[k].rateType==0){
                $(".c2_1_4").eq(k).prepend("<img src='SVG/thumb_up.svg'/>");
                num1++;
            }else{
                $(".c2_1_4").eq(k).prepend("<img src='SVG/thumb_down.svg'/>");
                num2++
            }
        }
        $(".ban3_1_1>div>p:odd").eq(1).html(num1);
        $(".ban3_1_1>div>p:odd").eq(2).html(num2);

        $(".sw5").height($(window).height()-$(".header").height()-$(".banner").height()-$(".foot").height());

        var sw5 = new Swiper('.commend_con',{
            slidesPerView:'auto',
            freeMode: true,
            direction: 'vertical',
            mousewheel: true,
        })

        tog($(".c2"),sw5)

        var h3 = "";
        h3+="<div class='d1'><div class='d1_1'><div class='d1_1_1'><h2>"+res.seller.name+"</h2><div><div></div><p class='toscore'>"+res.seller.score+"</p><p>("+res.seller.ratingCount+")</p><p>月售"+res.seller.sellCount+"单</p></div></div><div class='d1_1_2'><img src='SVG/favorite.svg'><p>未收藏</p></div></div><div class='d1_2'><div><p>起送价</p><div><p>"+res.seller.minPrice+"</p><p>元</p></div></div><div><p>商家配送</p><div><p>"+res.seller.deliveryPrice+"</p><p>元</p></div></div><div><p>平均配送时间</p><div><p>"+res.seller.deliveryTime+"</p><p>分钟</p></div></div></div></div><div class='banner-bla'></div><div class='d2'><h2>公告与活动</h2><p>"+res.seller.bulletin+"</p></div><div class='banner-bla'></div><div class='d3'><h2>商家实景</h2><div class='swiper-container sence'><div class='swiper-wrapper sw3'></div></div></div><div class='banner-bla'></div><div class='d4'><h2>商家信息</h2></div>"

        $(".sw6>div").html(h3);

        star($(".toscore"),36)

        even($(".d2"),4)

        for(var i=0;i<res.seller.pics.length;i++){
            $(".sw3").append("<img class='swiper-slide' src='"+res.seller.pics[i]+"'/>");
        }

        for(var i=0;i<res.seller.infos.length;i++){
            $(".d4").append("<div class='d4_1'><p>"+res.seller.infos[i]+"</p></div>")
        }

        var flag1 = 1;
        $(".d1_1_2>img").click(function(){
            if(flag1==1){
                $(this).attr("src","SVG/favorite_checked.svg")
                $(this).next("p").html("已收藏")
                flag1=0;
            }else{
                $(this).attr("src","SVG/favorite.svg")
                $(this).next("p").html("未收藏")
                flag1=1;
            }
        })


        $(".foods").bind("click",function(){
            var h4 = "";
            var num1=0;
            var num2=0;
            var foods = res.goods[$(this).parent().index()].foods[$(this).index()-1];
            h4+="<img class='return' src='SVG/arrow_lift.svg'/><img src='"+foods.image+"'class='bigima'><div class='ban1'><div class='ban1_1'><p>"+foods.name+"</p></div><div class='ban1_2'><p>月售"+foods.sellCount+"份</p><p>好评率"+foods.rating+"%</p></div><div class='ban1_3'><div><p>￥"+foods.price+"</p><p>￥"+foods.oldPrice+"</p></div><div><p>加入购物车</p></div></div></div><div class='banner-bla'></div><div class='ban2'><div class='ban2_1'><p>商品介绍</p></div><div class='ban2_2'><p>"+foods.info+"</p></div></div><div class='banner-bla'></div><div class='ban3'><div class='ban3_1'><p>商品评价</p><div class='ban3_1_1'><div><p>全部</p>&nbsp;<p>"+foods.ratings.length+"</p></div><div><p>推荐</p>&nbsp;<p></p></div><div><p>吐槽</p>&nbsp;<p></p></div></div></div><div class='ban3_2'><img src='SVG/check_circle.svg' /><p>只看有内容的评价</p></div></div><div class='ban4'>";
            for(var i=0;i<foods.ratings.length;i++){
                if(foods.ratings[i].rateType==0){
                h4+="<div class='ban4_1'><div class='ban4_1_1'><p>"+foods.ratings[i].rateTime+"</p><div><img src='SVG/thumb_up.svg' /><p class='comt'>"+foods.ratings[i].text+"</p></div></div><div class='ban4_1_2'><p>"+foods.ratings[i].username+"</p><img src='"+foods.ratings[i].avatar+"' /></div></div>";
                num1++;
                }else{
                h4+="<div class='ban4_1'><div class='ban4_1_1'><p>"+foods.ratings[i].rateTime+"</p><div><img src='SVG/thumb_down.svg' /><p class='comt'>"+foods.ratings[i].text+"</p></div></div><div class='ban4_1_2'><p>"+foods.ratings[i].username+"</p><img src='"+foods.ratings[i].avatar+"' /></div></div>";
                num2++;
                }
            }
                h4+="</div><div class='foot'><div class='f1' id='gwc'><img src='img/gwc.jpg'></div><div class='f2'><p>￥ 0</p></div><div class='f3'><p>另需配送费￥4元</p></div><div class='f4'><p>¥20元起送</p></div></div>"

            $("#papg4").html(h4)

            $("#papg4 .ban3_1_1>div>p:odd").eq(1).html(num1);
            $("#papg4 .ban3_1_1>div>p:odd").eq(2).html(num2);

            $(".ban1_3>div:first-child").find("p:last-child").each(function(){
            if($(this).html()=="￥"){
                $(this).remove();
            }
        })
            $(".ban2_2>p").each(function(){
                if($(this).html()=="undefined"){
                    $(this).remove();
                }
            })

            $("#papg1").css("display","none");
            $("#papg4").css("display","block")

            $(".return").click(function(){
                $("#papg1").css("display","block");
                $("#papg4").css("display","none")
            })

            tog($(".ban4_1"));

    })

        var h5 = "";
        h5+="<div class='g1'><p>"+res.seller.name+"</p></div><div class='g2'><div></div><p>"+res.seller.score+"</p></div><div class='g3'><span></span><p>优惠信息</p><span></span></div><div class='g4'></div><div class='g3'><span></span><p>商家公告</p><span></span></div><div class='g5'><p>"+res.seller.bulletin+"</p></div><div class='g6'><img id='clo' src='SVG/close.svg'/></div>";

        $(".gg").html(h5);

        star($(".g2>p"),48)

        even($(".g4"),2)

        $("#clo").click(function(){
            $("#papg2").css("display","none");
            $("#papg1").css("display","block");
        })

        $(".sw1").height($(window).height()-$(".header").height()-$(".banner").height()-$(".foot").height());
        $(".sw2").height($(window).height()-$(".header").height()-$(".banner").height()-$(".foot").height());
        $(".sw6").height($(window).height()-$(".header").height()-$(".banner").height()-$(".foot").height());
        $(".sw7").width($(window).width());

        var sw1 = new Swiper ('.menu', {
            direction: 'vertical',
            slidesPerView:'auto',
            freeMode: true,
            touchRatio: 0.2,
            mousewheel: true,
        })

        var sw2 = new Swiper ('.content', {
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            mousewheel: true,
            on:{
                slideChangeTransitionEnd:function(){
                    var a = sw2.activeIndex;
                    cli($(".sw1>div").eq(a));
                }
            }
        })

        var sw3 = new Swiper ('.sence', {
            slidesPerView:'auto',
            freeMode: true,
        })

        var sw6 = new Swiper('.seller_con',{
            slidesPerView:'auto',
            freeMode: true,
            direction: 'vertical',
            mousewheel: true,
        })

        var sw7 =  new Swiper('.home',{
            slidesPerView:'auto',
            resistanceRatio:0,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                paginationType : 'custom',
                renderBullet:function(index,className){
                var arr=["商品","评价","商家"];
                    return  '<p class="' + className + '">' + arr[index] + '</p>';
                }
            },
        })

        function tog(obj,swiper){
            var flag = 1;
            $(".ban3_2>img").click(function(){
            if(flag==1){
                $(this).attr("src","SVG/check_circle-checked.svg");
                obj.each(function(){
                    if($(this).find(".comt").html()==""){
                        $(this).css("display","none");
                    }
                })
                flag=0;
            }
            else{
                $(this).attr("src","SVG/check_circle.svg");
                obj.each(function(){
                    if($(this).find(".comt").html()==""){
                        $(this).css("display","inline-flex");
                    }
                })
                flag=1;
            }
            if(swiper){
            swiper.updateSlides();
            }
        })
        }
        function cli(obj){
            obj.addClass('menu_on')
            obj.css("border","none")
            obj.siblings().css("border-bottom","0.05rem solid rgba(7,17,27,0.1)")
            obj.prev("div").css("border","none")
            obj.find("p").addClass('menu_on')
            obj.siblings().removeClass('menu_on')
            obj.siblings().find("p").removeClass('menu_on')
        }

        function cpu(){
            var topri=[];
            for(var i=0;i<$(".num").length;i++){
                topri.push(($(".foods_4>p:first-child").eq(i).html().substring(1))*parseInt($(".num").eq(i).html()));
            }
            $(".f2>p").html("￥"+eval(topri.join("+")));
        }

        function star(obj,size){
        var n1 = obj.html().substring(0,1);
        var n2 = (parseFloat(obj.html())*10-parseFloat(n1)*10)/10;
        for(var i=0;i<n1;i++){
            obj.prev("div").append("<img src='img/star"+size+"_on@2x.png'/>")
        }
        if(n2<0.5){
            for(var j=0;j<5-parseInt(n1);j++){
            obj.prev("div").append("<img src='img/star"+size+"_off@2x.png'/>")
            }
        }else{
            obj.prev("div").append("<img src='img/star"+size+"_half@2x.png'/>")
            for(var k=0;k<4-n1;k++){
            obj.prev("div").append("<img src='img/star"+size+"_off@2x.png'/>")
            }
        }
    }

    function even(obj,size){
        for(var i=0;i<res.seller.supports.length;i++){
            switch(res.seller.supports[i].type){
                case 0:
                obj.append("<div><img src='img/decrease_"+size+"@2x.png'/><p>"+res.seller.supports[i].description+"</p></div>");
                break;
                case 1:
                obj.append("<div><img src='img/discount_"+size+"@2x.png'/><p>"+res.seller.supports[i].description+"</p></div>");
                break;
                case 2:
                obj.append("<div><img src='img/special_"+size+"@2x.png'/><p>"+res.seller.supports[i].description+"</p></div>");
                break;
                case 3:
                obj.append("<div><img src='img/invoice_"+size+"@2x.png'/><p>"+res.seller.supports[i].description+"</p></div>");
                break;
                case 4:
                obj.append("<div><img src='img/guarantee_"+size+"@2x.png'/><p>"+res.seller.supports[i].description+"</p></div>");
                break;
            }
        }
    }
},
    error:function(){
            alert("gg")
    },

    })
})