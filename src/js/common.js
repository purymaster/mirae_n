$(function () {

    //사이드 네비게이션 제어
    function navControl(move, target) {
        move === "show" ? target.addClass('on') : target.removeClass('on');
    };
    var gnb = $('.gnb_wrap'),
        gnb_sub = $('.gnb .sub_menu');
    $(document).on('click', '.nav_open', function () {
        navControl("show", gnb);
    }).on('click', '.nav_close', function () {
        navControl("", gnb);
        navControl("", gnb_sub);
    }).on('click', '.book_open', function () {
        navControl("show", gnb_sub);
    }).on('click', '.book_close', function () {
        navControl("", gnb_sub);
    });

    //스크롤 헤더 제어
    var isMain = false;
    if ($('#content').data('page') === "main") isMain = true;
    $(window).on('load scroll', function () {
        if (!isMain) {
            $('header').addClass('on');
            return;
        };
        scroll = $(this).scrollTop();
        scroll > 0 ? $('header').addClass('on') : $('header').removeClass('on')
    });

    //사업자 정보 노출 제어
    var infoBtn = $('footer .show_info');
    infoBtn.on('click', function () {
        $(this).next('.business').toggle();
    });

    //animate.css 정의
    var move_el = $('[data-animation]'), //무빙 요소
        move_name, //무빙 정의
        move_delay, //순차무빙 딜레이
        move_duration, //순차무빙 시간
        scroll, //스크롤 값
        start_point = $(window).height() * 0.99, //애니메이션 시작 높이(밑에서부터 화면 높이의 5%)
        top_btn = $('.move_top'), //TOP 버튼
        top_btn_flag = 0; //TOP 버튼 상태

    move_el.addClass('wait-animation');
    $(window).on('load scroll', function () {
        scroll = $(this).scrollTop();

        //순차 애니메이션 제어
        move_el.each(function () {
            move_name = $(this).data('animation');
            move_delay = $(this).data('delay') * 100; //단위 0.1초
            move_duration = $(this).data('duration') * 1000; //단위 1초
            $(this).addClass('animated ' + move_name);
            if (move_delay >= 0)
                $(this).css({
                    '-webkit-animation-delay': move_delay + 'ms',
                    'animation-delay': move_delay + 'ms'
                });
            if (move_duration >= 0)
                $(this).css({
                    '-webkit-animation-duration': move_duration + 'ms',
                    'animation-duration': move_duration + 'ms'
                });
            if (scroll > $(this).offset().top - start_point)
                $(this).removeClass('wait-animation');
        });

        //TOP 버튼 제어
        (scroll === 0) ? top_btn.removeClass('on') : top_btn.addClass('on');

        top_btn.find('button').on('click', function () {
            if (top_btn_flag) return false;
            top_btn_flag = 1;
            $('html, body').animate({
                scrollTop: 0
            }, function () {
                top_btn_flag = 0;
                top_btn.removeClass('on');
            });
            return false;
        });

    });


})

//스와이퍼 제어
function slideInit(name, opt) {
    var swiper = new Swiper(`${name}.swiper-container`, opt);
};