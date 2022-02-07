(function($,window){
  var starbucks = {
    init:function(){
      this.header();
      this.section1();
      this.section2Notice();
      this.section2Slide();
      this.section3();
      this.section4();
      this.section5();
      this.section6();
      this.section7();
      this.section8();
      this.quickMenu();
      this.goTop();
      this.footer();
      this.mobMenu();
    },
    header:function(){
      $('.search a').on({
        click:function(e){
          e.preventDefault();
          $('.search').toggleClass('show')
        }
      })
      $('.main_menu').on({
        mouseenter:function(){
          $('.sub').stop().slideUp(0);
          $(this).next().stop().slideDown(400,'easeOutQuad');
          $('.main_menu').removeClass('on')
          $(this).addClass('on')
        }
      })
      $('#nav').on({
        mouseleave :function(){
          $('.main_menu').removeClass('on')
          $('.sub').stop().slideUp(400);
        }
      })

    },
    section1:function(){
      var currentIdx = -1;
      function ani(){
        $('.img').eq(currentIdx).stop().animate({opacity:1},600)
      }
      function nextani(){
        if(currentIdx <= $('.img').length -2) {
          currentIdx++
          ani()
        }
      }
      setInterval(nextani,600)
    },
    section2Notice:function(){
      var currentIdx = 0,
          slides = $('.notice');
      function noticeSlide(){
        var nextSlide = (currentIdx + 1) % slides.length;
        slides.eq(currentIdx).css({zIndex:1}).stop().delay(600).animate({top:30},0)
        slides.eq(nextSlide).css({zIndex:2}).stop().animate({top:0},600)
        currentIdx = nextSlide;
      }
      function autoTimer(){
        setInterval(noticeSlide,2500);
      }
      setTimeout(autoTimer,100);

    },
    section2Slide:function(){
      var cnt = 0,
          slide_container = $('.slide_container'),
          slide_wrap = slide_container.find('.slide_wrap'),
          slides = slide_wrap.find('.slide'),
          next_btn = slide_container.find('.next_btn'),
          prev_btn = slide_container.find('.prev_btn'),
          play_btn = slide_container.find('.play_btn'),
          page_btn = slide_container.find('.page_btn'),
          timer,
          prom_btn = $('.prom_btn'),
          prom_box = $('#slide'),
          winW = $(window).innerWidth()*0.9;


      function resizeFn(){
        if($(window).innerWidth()*0.9 <= 819){
          winW = $(window).innerWidth()*0.9;
        }else{
          winW = 819
        }
        slides.css({width:winW})
        mainSlide()
      }
      resizeFn()
      $(window).resize(function(){
        resizeFn()
      })




      function mainSlide(){
        slide_wrap.stop().animate({left : -winW * cnt},600,
          function(){
            if(cnt > slides.length -3) {cnt = 0}
            if(cnt < 0) {cnt = slides.length -3}
            slide_wrap.stop().animate({left : -winW * cnt}, 0)
            slides.removeClass('on')
            slides.eq(cnt+1).addClass('on')
          })
          pageEvent()
      }

      /* ========= Next & Prev Button ========= */
      function nextCount(){
        if(!slide_wrap.is(':animated')){
          cnt++
          mainSlide()
        }
      }
      next_btn.on({
        click:function(e){
          e.preventDefault();
          stopFn();
          nextCount();
        },
        mouseenter : function(){
          clearInterval(timer)
        },
        mouseleave : function(){
          if(play_btn.hasClass('on')){
            autoTimer();
          }else{
            clearInterval(timer)
          }
        }
      })

      function prevCount(){
        if(!slide_wrap.is(':animated')){
          cnt--
          mainSlide()
        }
      }
      prev_btn.on({
        click:function(e){
          e.preventDefault();
          stopFn();
          prevCount();
        },
        mouseenter : function(){
          clearInterval(timer)
        },
        mouseleave : function(){
          if(play_btn.hasClass('on')){
            autoTimer();
          }else{
            clearInterval(timer)
          }
        }
      })

      /* ============= Indicator ============= */
      function pageEvent(){
        page_btn.children().attr('src', './img/main_prom_off.png')
        page_btn.eq(cnt > 2 ? 0 : cnt).children().attr('src', './img/main_prom_on.png')
      }
      page_btn.each(function(i){
        $(this).on({
          click:function(e){
            e.preventDefault();
            cnt = i;
            stopFn();
            mainSlide();
          }
        })
      })
      play_btn.on({
        click:function(e){
          e.preventDefault();
          if($(this).hasClass('on')){
            stopFn()
          }else{
            playFn() 
          }
        }
      })


      /* ============= Timer ============= */
      function stopFn(){
        play_btn.removeClass('on')
        play_btn.addClass('off')
        play_btn.find('img').attr('src','./img/main_prom_play.png')
        clearInterval(timer)
      }
      function playFn(){
        play_btn.removeClass('off')
        play_btn.addClass('on')
        play_btn.find('img').attr('src','./img/main_prom_stop.png')
        autoTimer()
      }
      function autoTimer(){
        timer = setInterval(nextCount,3000)
      }



      /*======== Slide button & Slide Box ========*/

      prom_btn.on({
        click:function(e){
          e.preventDefault();
          $(this).toggleClass('active');
          prom_box.slideToggle(400,'easeOutQuad');
          if($(this).hasClass('active')){
            playFn()
          }else{
            cnt = 0;
            clearInterval(timer);
            slide_wrap.css({left :0})
            slides.removeClass('on')
            slides.eq(cnt+1).addClass('on')
            pageEvent()
          }
        }
      })

      /* Mouse over Stop */
      slide_wrap.on({
        mouseenter : function(){
          clearInterval(timer)
        },
        mouseleave : function(){
          if(play_btn.hasClass('on')){
            autoTimer();
          }else{
            clearInterval(timer)
          }
        }
      })
     



    },
    section3:function(){

      
    },
    section4:function(){
      var section = $('#section4'),
          wind = $(window),
          section_offsetTop = section.offset().top - 900;
          wind.scroll(function(){
            if($(this).scrollTop() > section_offsetTop){
              section.addClass('move')
            }else{
              section.removeClass('move')
            }
          })
    },
    section5:function(){
      var section = $('#section5'),
      wind = $(window),
      section3offsetTop = $('#section3').offset().top - 300;
      wind.scroll(function(){
        if($(this).scrollTop() > section3offsetTop){
          section.addClass('show')
        }else{
          section.removeClass('show')
        }
      })
      
    },
    section6:function(){
      var section = $('#section6'),
      wind = $(window),
      section4offsetTop = $('#section4').offset().top - 300;
      wind.scroll(function(){
        if($(this).scrollTop() > section4offsetTop){
          section.addClass('show')
        }else{
          section.removeClass('show')
        }
      })
      
    },
    section7:function(){
      var section = $('#section7'),
      wind = $(window),
      section5offsetTop = $('#section5').offset().top;
      wind.scroll(function(){
        if($(this).scrollTop() > section5offsetTop){
          section.addClass('show')
        }else{
          section.removeClass('show')
        }
      })
      
    },
    section8:function(){
      var section = $('#section8'),
      wind = $(window),
      section6offsetTop = $('#section6').offset().top,
      leftW = $('#section8 .left').innerWidth();
      wind.scroll(function(){
        if($(this).scrollTop() > section6offsetTop){
          section.addClass('show')
        }else{
          section.removeClass('show')
        }
      })


      function leftResize(){
        leftW = $('#section8 .left').innerWidth();
        if(leftW <= 366){
          $('#section8 .left').css({height : leftW * 0.85245})
        }else{
          $('#section8 .left').css({height : 312})
        }
      }
      leftResize()

      $(window).resize(function(){
        leftResize()
      })

      
    },
    quickMenu:function(){
      var quick1 = ($(window).height()- 96)/2;
      var quick2 = 154;
      quickMenuFn()
      $(window).scroll(function(){
        if($(window).scrollTop()){
          quickMenuFn()
        }
      })
      function quickMenuFn(){
        $('.quick_menu').stop().animate({top: $(window).scrollTop() + quick2},200,'easeOutExpo')
      }
      
    },
    goTop:function(){

      $(window).scroll(function(){
        if($(window).scrollTop() >= 100){
          $('.go_top_box').stop().fadeIn(400)
        }else{
          $('.go_top_box').stop().fadeOut(400)
        }
      })

      $('.go_top_box').click(function(e){
        e.preventDefault();
        $('html,body').stop().animate({scrollTop:0},1000,'easeOutExpo')
      })
    },
    footer:function(){
      var footer = $('#footer'),
          dl = footer.find('dl'),
          dt = dl.find('dt');

          dt.click(function(e){
            e.preventDefault();
            $(this).parent().find('dd').stop().slideToggle()
            $(this).toggleClass('show')
          })
    },
    mobMenu:function(){
      /* 모바일 */
    
      var t = false;

      $(window).resize(function(){
        if(t == false){
          if($(this).width() > 960 - 17){
            t = true
            $('#main').removeClass('halfHide')
            $('#mobile_menu').removeClass('show')
            $('.m_menu_cl_btn').addClass('hide');
            $('.m_menu_cl_btn').removeClass('show');
            $('.m_container').stop().animate({left:120+'%'},600,function(){
              $('.m_menu_btn').removeClass('active');
              $('.m_menu_btn').next().stop().slideUp();
              $('.sub_arrow').removeClass('active');
              $('.sub_arrow').next().stop().slideUp();
            })
          }
        }else{
          t = false;
        }
        
      })
      
       
        $('.berger_menu_btn').on({
          click:function(e){
            e.preventDefault();
            $('#main').addClass('halfHide')
            $('#mobile_menu').addClass('show')
            $('.m_container').stop().animate({left:0},600)
            $('.m_menu_cl_btn').addClass('show');
            $('.m_menu_cl_btn').removeClass('hide');
          }
        })
        $('.m_menu_cl_btn').on({
          click:function(e){
            e.preventDefault();
            $('#main').removeClass('halfHide')
            $(this).addClass('hide');
            $(this).removeClass('show');
            $('.m_container').stop().animate({left:120+'%'},600,function(){
              $('#mobile_menu').removeClass('show')
              $('.m_menu_btn').removeClass('active');
              $('.m_menu_btn').next().stop().slideUp();
              $('.sub_arrow').removeClass('active');
              $('.sub_arrow').next().stop().slideUp();
            })
           
          }
        })
        
        
        $('.m_menu_btn').on({
          click:function(e){
            e.preventDefault();
            $(this).toggleClass('active');
            $(this).next().stop().slideToggle();
            $('.sub_arrow').removeClass('active');
            $('.sub_arrow').next().stop().slideUp();
          }
        })
        $('.sub_arrow').on({
          click:function(e){
            e.preventDefault();
            $(this).toggleClass('active');
            $(this).next().stop().slideToggle();
          }
        })
  
    }
  }
  starbucks.init();
})(jQuery,window);