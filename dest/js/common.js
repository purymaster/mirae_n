$(function() {

    //스크롤 방지
    function disableScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop,
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
        $('html').addClass('disable');
    }

    //스크롤 방지 해제
    function enableScroll() {
        window.onscroll = function() {};
        $('html').removeClass('disable');
    }

    //사이드 네비게이션 제어
    function navControl(move, target) {
        if (move === "show") {
            target.addClass('on')
            disableScroll();
        } else {
            target.removeClass('on');
            enableScroll();
        }
    };
    var gnb = $('.gnb_wrap'),
        gnb_sub = $('.gnb .sub_menu'),
        filter = $('.filter_wrap'),
        bookmenu = $('.bookmenu_wrap');
    $(document).on('click', '.nav_open', function() {
        navControl("show", gnb);
    }).on('click', '.nav_close', function() {
        navControl("", gnb);
        navControl("", gnb_sub);
    }).on('click', '.book_open', function() {
        navControl("show", gnb_sub);
    }).on('click', '.book_close', function() {
        navControl("", gnb_sub);
    }).on('click', '[data-open-filter]', function() {
        navControl("show", filter);
    }).on('click', '[data-close-filter]', function() {
        navControl("", filter);
    }).on('click', '[data-open-bookmenu]', function() {
        navControl("show", bookmenu);
    }).on('click', '[data-close-bookmenu]', function() {
        navControl("", bookmenu);
        $('[data-bookmenu]').find('li').removeClass('on');
    });

    //스크롤 헤더 제어
    var isMain = false,
        onPage = ['main', 'curation', 'mom', 'mom_sub', 'book', 'story'];
    if ($.inArray($('#content').data('page'), onPage) !== -1) isMain = true;
    $(window).on('load scroll', function() {
        if (!isMain) {
            $('header').addClass('on');
            return;
        };
        var scroll = $(this).scrollTop();
        if (scroll > 0) {
            $('header').addClass('on')
        } else {
            $('header').removeClass('on')
        }
    });

    //사업자 정보 노출 제어
    var infoBtn = $('footer .show_info');
    infoBtn.on('click', function() {
        $(this).next('.business').toggle();
    });

    //탭메뉴 제어
    $('[data-tab]').find('button').on('click', function() {
        var idx = $(this).parent().index(),
            tabName = $(this).parents('[data-tab]').data('tab');

        $(this).parent().addClass('on').siblings().removeClass('on');
        $(`[data-tab-cont=${tabName}] > .tab_cont`).eq(idx).show().siblings().hide();
        $(`[data-tab-cont=${tabName}]`).find('input').val("");
    });

    //하단 슬라이드 팝업 제어
    var popupName;
    $(document).on("click", '[data-slideup-popup]', function() {
        popupName = $(this).data('slideup-popup');
        $(`[data-popup="${popupName}"]`).addClass('on');
        disableScroll();
    }).on("click", '[data-slidedown-popup]', function() {
        popupName = $(this).data('slidedown-popup');
        $(`[data-popup="${popupName}"]`).removeClass('on');
        enableScroll();
    });

    //최상단 이동 버튼
    $(window).on('load scroll', function() {
        var scroll = $(this).scrollTop();
        if (scroll > 0) {
            $('[data-top-btn]').show();
        } else {
            $('[data-top-btn]').hide();
        }
    });
    $(document).on('click', '[data-top-btn] button', function() {
        $('html,body').animate({
            scrollTop: '0'
        }, 300);
    });

    //학습지 목록 제어
    var bookMenu = $('[data-bookmenu]');
    bookMenu.on('click', '.depth1 > li', function() {
        $(this).addClass('on').siblings('li').removeClass('on');
        bookMenu.find('.depth2 > li').removeClass('on');
    }).on('click', '.depth2 > li', function(e) {
        e.stopPropagation();
        if ($(this).hasClass('on')) {
            bookMenu.find('.depth2 > li').removeClass('on');
        } else {
            $(this).addClass('on').siblings('li').removeClass('on');
        }
    }).on('click', '.depth3 > li', function(e) {
        e.stopPropagation();
    });

})

//스와이퍼 제어
function slideInit(name, opt) {
    var swiper = new Swiper(`${name}.swiper-container`, opt);
};