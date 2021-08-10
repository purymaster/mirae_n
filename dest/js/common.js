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
        filter = $('.filter_wrap');
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
    });

    //스크롤 헤더 제어
    var isMain = false;
    if ($('#content').data('page') === "main") isMain = true;
    $(window).on('load scroll', function() {
        if (!isMain) {
            $('header').addClass('on');
            return;
        };
        scroll = $(this).scrollTop();
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

    //다운로드 팝업 제어
    $(document).on("click", '[data-open-download]', function() {
        $('[data-popup="download"]').addClass('on');
        disableScroll();
    }).on("click", '[data-close-download]', function() {
        $('[data-popup="download"]').removeClass('on');
        enableScroll();
    });

})

//스와이퍼 제어
function slideInit(name, opt) {
    var swiper = new Swiper(`${name}.swiper-container`, opt);
};