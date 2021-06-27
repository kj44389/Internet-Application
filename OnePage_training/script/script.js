  function setup(){
    let didScroll;
    let lastScrollTop = 0;
    let delta = 5;
    let navbarHeight = $('#navConteiner').outerHeight();

      $(window).scroll(function(event){
          didScroll = true;
          if(($(window).scrollTop()>=0)&&($(window).scrollTop()<=100)){
              // When sticky with top
              $('#navConteiner').css({"background-color":"rgba(14,60,91,0)"})

          }
          if($(document).find('.navBar_active')){
              // When sticky with top
              $(".navBar_active").attr('class','navBar');

          }
      });
      setInterval(function() {
          if (didScroll) {
              hasScrolled();
              didScroll = false;
          }

      }, 100);
      function hasScrolled() {
          var st = $(this).scrollTop();

          // Make sure they scroll more than delta
          if(Math.abs(lastScrollTop - st) <= delta)
              return;

          // If they scrolled down and are past the navbar, add class .nav-up.
          // This is necessary so you never see what is "behind" the navbar.
          if (st > lastScrollTop && st > navbarHeight){
              // Scroll Down
              $('#navConteiner').css({"background-color":"rgba(14,60,91,0)","position":"fixed","transform": "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -100, 0, 1)"})
          }
          else {
              // Scroll Up
              if(($(window).scrollTop()>100)&&(st + $(window).height() < $(document).height())) {
                $('#navConteiner').css({"background-color":"rgba(14,60,91,.8)","position":"fixed","transform": "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"})
              }
          }
          console.log(lastScrollTop+" - "+st+" - "+navbarHeight);
          lastScrollTop = st;
      }

    $(document).ready(function() {

      /* /// START SCROLLS FUNCTIONS /// */

        // Welcome Reveal
        ScrollReveal().reveal('.welcome_text', { delay: 1200, interval: 200, distance: '150px', origin: 'left' });
        // Steps Reveals
        ScrollReveal().reveal('.see_more-container', { delay: 500, interval: 200, distance: '50px', origin: 'right' });
        ScrollReveal().reveal('.step', { delay: 500, interval: 200, distance: '50px', origin: 'top' });
        // Steps description
        ScrollReveal().reveal('.step-description', { delay: 500, interval: 200, distance: '50px', origin: 'left' });
        ScrollReveal().reveal('.step-description h3', { delay: 700, interval: 200, distance: '50px', origin: 'left' });
        ScrollReveal().reveal('.step-description span', { delay: 900, interval: 200, distance: '50px', origin: 'left' });
        // Points Reveals
        ScrollReveal().reveal('.point', { delay: 500, interval: 200, distance: '50px', origin: 'left', transition: 'all .3s ease-in-out' });
        // About Us Reveals
        ScrollReveal().reveal('.team_card', { delay: 500, interval: 200, distance: '50px', origin: 'left', transition: 'all .3s ease-in-out' });
        // Contact Reveals
        ScrollReveal().reveal('.contact-form-body', { delay: 500, interval: 200, distance: '50px', origin: 'left', transition: 'all .3s ease-in-out' });
        ScrollReveal().reveal('.contact-info', { delay: 500, interval: 200, distance: '50px', origin: 'right', transition: 'all .3s ease-in-out' });
      /* /// END SCROLLS FUNCTIONS /// */



        $( ".form-input" ).focus(function() {
          $(".contact-info").css({"margin-bottom":"45vh"});
        });

        $( ".form-input" ).focusout(function() {
          $(".contact-info").css({"margin-bottom":"0"});
        });

        $( ".form-textarea" ).focus(function() {
          $(".contact-info").css({"margin-bottom":"45vh"});
        });

        $( ".form-textarea" ).focusout(function() {
          $(".contact-info").css({"margin-bottom":"0"});
        });

        //team css image change
        let images = $('.person_image').length;
        let image = $('.person_image');
        $(image[0]).css({"background-image":"linear-gradient(to top right, rgba(190,46,46,.3), rgba(231,76,77,.2)),url('./images/teamPicture.jpg')"})
        $(image[1]).css({"background-image":"linear-gradient(to top right, rgba(190,46,46,.3), rgba(231,76,77,.2)),url('./images/teamPicture2.jpg')"})
        $(image[2]).css({"background-image":"linear-gradient(to top right, rgba(190,46,46,.3), rgba(231,76,77,.2)),url('./images/teamPicture3.jpg')"})
      });


  /* /// Loading page /// */
    var curtain = false;
    setInterval(function(){
      if(curtain==false){

            setTimeout(function(){
              $('.curtainLoading').html("ŁADOWANIE")
            }, 0);
            setTimeout(function(){
              $('.curtainLoading').html("ŁADOWANIE.")
            }, 400);
            setTimeout(function(){
              $('.curtainLoading').html("ŁADOWANIE..")
            }, 800);
            setTimeout(function(){
              $('.curtainLoading').html("ŁADOWANIE...")
            }, 1200);

      }
    }, 1600);
    var curtainOut = function(){
      curtain= true;
      setTimeout(function(){
        $('.curtain').css({'opacity' : '0'})
      }, 1000);
      setTimeout(function(){
        $('.curtain').css({'z-index':'-10', 'visibility':'hidden', 'display':'none'})
      }, 1300);
    };
   curtainOut();


  /* /// Open menu bar /// */
      $(document).on('click', '.navIcon', function(){
          let exist = $("#wrapper").find('.navBar');
          console.log(exist);
          if(exist.length!==0){
            $(".navBar").attr('class','navBar_active');
          }
          else if(exist.length===0){
            $(".navBar_active").attr('class','navBar');
          }
      });

  /* /// Change position when menu link click /// */
      $('a[href^="#"]').click(function(){
          var the_id = $(this).attr("href");
          $(".navBar_active").attr('class','navBar');
          $('html, body').animate({

            scrollTop:$(the_id).offset().top

          }, 'slow');
          return false;
      });





}
