'use strict'

jQuery(document).ready(function () {
  initDrop();
  initSlider();
  stickyNav();
  initModal();
  initQuantity();
  initTabs();
  initBurger();
  initChangeview();
  initGalery();
  initAccordion();
  initTooltip();
  // initTabOpener();
  initScroll();
  initFAQ();
  
  if ($('.clock').length) {
    initTimer();
  }
});

// function initTabOpener() {
//   $('.tab-opener').on('click', function () {
//     event.preventDefault();
//     $('.product-tabs').tabslet({});
//   });
// }

function initTooltip() {
  var $tooltipsArray = $('.tooltip-opener');

  $tooltipsArray.each(function () {
    var $tooltip = $(this);
    var $description = $tooltip.find(".description-tooltip");
    var descriptionWidth = $description.outerWidth();
    var openerLeftEdge = $tooltip.offset().left + $tooltip.width();

    $tooltip.on('mousemove', function (e) {
      var left = (e.clientX + descriptionWidth + 20) > openerLeftEdge ?
        openerLeftEdge - descriptionWidth :
        (e.clientX + 20);
      var right = e.clientY + 20;

      $description.css({ left: left, top: right });
    });
  });

}

function initTimer() {
  var clock;

  var currentDate = new Date().getTime();
  var countDownDate = new Date("Feb 14, 2021 18:00:00").getTime();
  var diff = countDownDate - currentDate;
  diff /= 1000;

  clock = $('.clock').FlipClock(diff, {
    clockFace: 'DailyCounter',
    language: 'ru',
    countdown: true
  });
}

function initDrop() {

  $("body").delegate(".drop-btn", "click", function (event) {
    event.preventDefault();
    var allDropBoxes = $('.drop-box');
    var currentDropBox = jQuery(this).closest('.drop-box');

    if (currentDropBox.hasClass('active')) {
      currentDropBox.removeClass('active');
    } else {
      allDropBoxes.removeClass('active');
      currentDropBox.addClass('active');
    }
  });

  jQuery(document).mouseup(function (e) {
    var block = jQuery('.drop-box');
    if (!block.is(e.target)
      && block.has(e.target).length === 0) {
      block.removeClass('active');
    }
  });
}

function initAccordion() {
  $(".accordion-opener").click(function () {
    var link = $(this);
    var closest_ul = link.closest(".accordion");

    event.preventDefault();
    closest_ul.find(".accordion-drop").slideToggle();
  })
}


$(window).on('load resize', function () {
  if ($(window).width() < 1200) {
    $('.about-slider:not(.slick-initialized)').slick({
      centerMode: true,
      slidesToShow: 6,
      slidesToScroll: 1,
      lazyLoad: 'ondemand',
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  } else {
    $(".about-slider.slick-initialized").slick("unslick");
  }
});

function initSlider() {
  $('.home-slider').slick({
    centerMode: false,
    // autoplay:true,
    // autoplaySpeed:3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    dots: true,
    lazyLoad: 'ondemand',
  });

  $('.product-slider').slick({
    centerMode: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  // $('.about-slider').slick({
  //   centerMode: true,
  //   slidesToShow: 6,
  //   slidesToScroll: 1,
  //   responsive: [
  //     {
  //       breakpoint: 992,
  //       settings: {
  //         slidesToShow: 3
  //       }
  //     },
  //     {
  //       breakpoint: 500,
  //       settings: {
  //         slidesToShow: 1
  //       }
  //     }
  //   ]
  // });
}

function stickyNav() {
  var navOffset = $('.header-nav-holder').offset().top;
  var navHolder = $('.sticky-nav');
  var navHeight = navHolder.height();
  var headHeight = $('#header').height();
  $(window).on('resize', function () {
    navHeight = navHolder.height();
  });
  $(window).on('scroll', function () {
    navOffset = $('.header-nav-holder').offset().top;

    if ($(document).scrollTop() > headHeight) {
      navHeight = $('.header-nav-holder').height();
      $('.header-nav-holder').css('height', navHeight);
      navHolder.addClass('fixed-nav');
    } else {
      navHolder.removeClass('fixed-nav');
    }
  });
}

function initModal() {
  var btn = jQuery('.modal-opener');
  var btnFaq = jQuery('.faq-opener');
  var btnCompare = jQuery('.compare-opener');
  var btnWish = jQuery('.wish-opener');
  var btnLogin = jQuery('.login-opener');
  var modal = jQuery('body');

  btn.on('click', function () {
    event.preventDefault();
    modal.addClass('modal-active');
  });

  btnWish.on('click', function () {
    event.preventDefault();
    modal.addClass('modal__wish-active');
  });

  btnLogin.on('click', function () {
    event.preventDefault();
    modal.addClass('modal__login-active');
  });

  btnCompare.on('click', function () {
    event.preventDefault();
    modal.addClass('modal__compare-active');
  });

  btnFaq.on('click', function () {
    event.preventDefault();
    modal.addClass('modal__faq-active');
  });

  $(document).on('click', '.addcart-opener', function () {
    event.preventDefault();
    modal.addClass('modal__cart-active');
    modal.removeClass('modal__preview-active');
  });

  $(document).on('click', '.fast-order-opener', function () {
    event.preventDefault();
    modal.addClass('modal__fast-active');
  });

  $(document).on('click', '.preview-opener', function () {
    event.preventDefault();
    modal.addClass('modal__preview-active');
  });

  $("body").delegate(".modal-close", "click", function (event) {
    event.preventDefault();
    modal.removeClass('modal-active');
    modal.removeClass('modal__cart-active');
    modal.removeClass('modal__fast-active');
    modal.removeClass('modal__preview-active');
    modal.removeClass('modal__faq-active');
    modal.removeClass('modal__wish-active');
    modal.removeClass('modal__compare-active');
    modal.removeClass('modal__login-active');
    //$(".modal-overlay").remove();
  });

  jQuery(function (jQuery) {
    jQuery(document).mouseup(function (e) {
      var block = jQuery(".modal-container");
      var holder = jQuery("body");

      if (!block.is(e.target)
        && block.has(e.target).length === 0) {
        holder.removeClass('modal-active');
        holder.removeClass('modal__cart-active');
        holder.removeClass('modal__fast-active');
        holder.removeClass('modal__preview-active');
        holder.removeClass('modal__faq-active');
        holder.removeClass('modal__wish-active');
        holder.removeClass('modal__compare-active');
        holder.removeClass('modal__login-active');
        //$(".modal-overlay").remove();
      }
    });
  });
}

function initQuantity() {
  $('.input-quantity').bind("change keyup input click", function () {
    if (this.value.match(/[^0-9]/g)) {
      this.value = this.value.replace(/[^0-9]/g, '');
    }
  });

  $('.input-quantity').on('blur', function () {
    var $input = $(this).parents('.product-quantity').find('input');
    if ($(this).val() === '') {
      $(this).val('1')
    }
    $input.change();
  });

  $("body").delegate(".minus", "click", function (event) {
    var $input = $(this).parents('.product-quantity').find('input');
    var count = parseInt($input.val()) - 1;

    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });

  $("body").delegate(".plus", "click", function (event) {
    var $input = $(this).parents('.product-quantity').find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });

  $('.input-quantity').on("change input", function () {
    var $price = $(this).closest('.product-caption').find('.price-new');
    $price.text(this.value * $price.data('price') + ' грн');
    var $price2 = $(this).closest('.product-caption').find('.price-old');
    $price2.text(this.value * $price2.data('price') + ' грн');
    var $price3 = $(this).closest('.product-caption').find('.price-noformat');
    $price3.text(this.value * $price3.data('price') + ' грн');
  });
}

// function initProductSlider() {
//   var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//   if (width >= 1366) {
//     $('.slider-box').addClass('row');
//     $('.slider-box').removeClass('product-slider');
//     $('.slider-box .product-slide').addClass('col-lg-3');
//   } else {
//     $('.product-slider').slick({
//       centerMode: false,
//       slidesToShow: 4,
//       slidesToScroll: 1,
//       infinite: false,
//       responsive: [
//         {
//           breakpoint: 1200,
//           settings: {
//             slidesToShow: 3
//           }
//         },
//         {
//           breakpoint: 768,
//           settings: {
//             slidesToShow: 2
//           }
//         },
//         {
//           breakpoint: 500,
//           settings: {
//             slidesToShow: 1
//           }
//         }
//       ]
//     });
//   }
// }

function initTabs() {
  // $('.product-tabs').tabslet({});

  $('body').delegate('.tabnav li a', 'click', function (e) {
    e.preventDefault();

    if ($(this).hasClass('is-active')) return false;

    let $tab = $(this).attr('href');
    // console.log($tab);
    $('.tabnav li a').removeClass('is-active');
    $(this).addClass('is-active');

    $('.tab-content').removeClass('is-active');
    $($tab).addClass('is-active');
  });

}

function initGalery() {
  $('.preview-slider-thumb .imgView').hover(function (e) {
    if ($(this).hasClass('active')) return false;
    $('.preview-slider-thumb .imgView').removeClass('active');
    $(this).addClass('active');
  
    var $imgUrl = $(this).find('img').attr('src');
  
    $('.preview-slider-main img').attr({
      'src': $imgUrl
    });
  });

  $('.open-galery').on('click', function () {
    $('.preview-slider-thumb .active a').click();
  })
}

function initBurger() {
  var menuBtn = jQuery('.topnav-left-opener');
  var menu = jQuery('body');

  menuBtn.on('click', function () {
    event.preventDefault();
    menu.toggleClass('top-nav-active');
  });
}

function initChangeview() {
  var btn = jQuery('.view-switch');
  var box = jQuery('.row .product-wrap')

  btn.on('click', function () {
    event.preventDefault();
    var gridType = $(this).data('type');
    document.cookie = "product_grid=" + gridType;
    jQuery('.catalog-section-filter li').removeClass('active');
    box.removeClass('product-list product-table');
    jQuery(this).parent('li').addClass('active');
    box.addClass(gridType);
  })
}

function initStickySidebar() {
  var sidebar = $(".product-right-panel");
  var sidebarHeight = sidebar.outerHeight();
  if ($(".sidebar-stop").length) {
    var footerOffsetTop = $(".sidebar-stop").offset().top;
  } else {
    var footerOffsetTop = $("#footer").offset().top;
  }
  //var footerOffsetTop = $(".sidebar-stop").offset().top;
  var topNavHeight = $('.sticky-nav').innerHeight();
  var heightToSidebar = $(".product-info").offset().top + $(".product-info").outerHeight();

  if ($(window).width() > 991) {
    if ($(document).scrollTop() > heightToSidebar) {
      sidebar.css({ 'position': 'fixed', 'top': topNavHeight + 10, 'bottom': 'auto' });
      if ($(document).scrollTop() > $('.product-tabs').offset().top - sidebarHeight / 2) {
        sidebar.addClass('scroll-info-visible')
      }
    }
    if (sidebar.offset().top + sidebarHeight + 30 > footerOffsetTop) sidebar.css({
      'position': 'absolute',
      'bottom': 0,
      'top': 'auto'
    });

    if ($(document).scrollTop() < heightToSidebar) {
      sidebar.css({ 'position': 'static', 'bottom': 'auto', 'top': 'auto' });
      sidebar.removeClass('scroll-info-visible')
    }
  } else {
    sidebar.removeAttr('style');
  }
}

jQuery(window).on({
  load: function () {
    if ($(".product-right-panel").length) {
      initStickySidebar();
    }
  },
  scroll: function () {
    if ($(".product-right-panel").length) {
      initStickySidebar();
    }
  },
  resize: function () {
    if ($(".product-right-panel").length) {
      initStickySidebar();
    }
  }
});

jQuery(window).on({
  load: function () {
    if ($(".hero-section").length) {
      jQuery('.static-category-menu').addClass('open')
    }
  }
});

function initScroll() {
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (width >= 992) {
  }
  if ($(".custom-scroll").length) {
    $(".custom-scroll").mCustomScrollbar({
      scrollbarPosition: 'outside',
      autoHideScrollbar: true,
      axis: "yx" 
    });
  }
}


function quickview_open(id) {
  event.preventDefault();
  //$('body').addClass('modal__preview-active');
  $.ajax({
    type: 'post',
    data: 'quickview29=1',
    url: 'index.php?route=product/quickview&product_id=' + id,
    beforeSend: function () {
      //creatOverlayLoadPage(false);
    },
    complete: function () {
      $('.mfp-bg-quickview').hide();
      $('#messageLoadPage').hide();
      //creatOverlayLoadPage(false);
    },
    success: function (data) {
      var new_data = data;
      $('body').addClass('modal__preview-active');
      $('body').append(new_data);
      initTabs();
      gtag('event', ' view', {
        'event_category': ' view ',
        'event_action': 'view ',
        'event_label': $data.find('.product-name-quick').html()
      });

    }
  });
}


function initFAQ(){
  $(".faq-block__item-title").click(function(){
    $(this).next().find('.faq-block__item-content').slideToggle("fast")
    // return false;
    $(this).parent().toggleClass("active");
  })
}