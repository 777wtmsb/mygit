$(function(){
  var bannerSwiper = new Swiper('.banner',{
    autoplay:{
      disableOnInteraction:false,
    },
    loop:true,
    observer:true,
    observeParents:true,
    pagination: {
      el: '.swiper-pagination',
      clickable:true,
    },
  })

  $('.serviceItem').hover(function(){
    $(this).find('ul').stop().slideToggle()
  })

  $('.tabs li').click(function(){
    //推荐分类选择
    $(this).addClass('active').siblings().removeClass('active')
  })

  $('.submit').click(function(){
    //提交鉴定信息

  })

  $('.second').each(function(){
    var that = $(this)
    var t = setInterval(function(){
      var second = that.text().charAt(0)==0 ? that.text().slice(1) : that.text()
      if(that.prevAll('.day').text()=='00' && that.prevAll('.hour').text()=='00' && that.prevAll('.min').text()=='00' && second==0){
        that.text('00')
        that.parents('.text').find('a').text('已结束')
        clearInterval(t)
      }else{
        if(second == 0){
          second = 60
          minChange(that)
        }
        if(second.length==1){
          that.text('0'+(second-1))
        }else{
          that.text(second-1)
        }
      }
    },1000)
  })

  function minChange(dom){
    var min = dom.prevAll('.min').text().charAt(0)==0 ? dom.prevAll('.min').text().slice(1) : dom.prevAll('.min').text()
    if(dom.prevAll('.day').text()=='00' && dom.prevAll('.hour').text()=='00' && min == 0){
      dom.prevAll('.min').text('00')
    }else{
      if(min == 0){
        min = 60
        hourChange(dom.prevAll('.min'))
      }
      if(min.length==1){
        dom.prevAll('.min').text('0'+(min-1))
      }else{
        dom.prevAll('.min').text(min-1)
      }
    }
  }

  function hourChange(dom){
    var hour = dom.prevAll('.hour').text().charAt(0)==0 ? dom.prevAll('.hour').text().slice(1) : dom.prevAll('.hour').text()
    if(dom.prevAll('.day').text()=='00' && hour==0){
      dom.prevAll('.hour').text('00')
    }else{
      if(hour == 0){
        hour = 24
        dayChange(dom.prevAll('.hour'))
      }
      if(hour.length==1){
        dom.prevAll('.hour').text('0'+(hour-1))
      }else{
        dom.prevAll('.hour').text(hour-1)
      }
    }
  }

  function dayChange(dom){
    var day = dom.prevAll('.day').text().charAt(0)==0 ? dom.prevAll('.day').text().slice(1) : dom.prevAll('.day').text()
    if(day != 0){
      if(day.length==1){
        dom.prevAll('.day').text('0'+(day-1))
      }else{
        dom.prevAll('.day').text(day-1)
      }
    }
  }

  //初始化藏品列表轮播
  var marketSwiper = new Swiper('.marketList',{
    autoplay:{
      disableOnInteraction:false,
    },
    slidesPerView:7,
    direction:'vertical',
    loop:true,
    observer:true,
    observeParents:true,
  })

  //软文推荐图片轮播
  var articSwiper = new Swiper('.articImg',{
    autoplay:{
      disableOnInteraction:false,
    },
    loop:true,
    observer:true,
    observeParents:true,
  })

  $('.leftBtn').click(function(){
    articSwiper.slidePrev()
  })

  $('.rightBtn').click(function(){
    articSwiper.slideNext()
  })

})
