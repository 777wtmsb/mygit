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

  $('.goodsTab li').click(function(){
    $(this).addClass('active').siblings().removeClass('active')
  })
})
