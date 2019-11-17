$(function () {
    getData();
    if (window.localStorage.token == undefined) {
        window.location.href = './login.html'
    }
    if (window.localStorage.turn != 1) {
        window.location.href = './login.html';
    }

    //进入首页发送ajax请求
    function getData() {
        $.ajax({
            type: 'get',
            url: BigNew.user_info,
            success: function (backData) {
                $('.user_info img').attr('src', backData.data.userPic);
                $('.user_info i').text(backData.data.nickname);
                $('.user_center_link img').attr('src', backData.data.userPic);
            }
        });
    }
    //注册登出事件
    $('.logout').on('click', function () {
        window.localStorage.removeItem('token');
        window.location.href = './login.html';
    })
    //注册右边栏点击事件
    $('.level01').on('click', function () {
        $(this).addClass('active').siblings('div').removeClass('active');
        if ($(this).index() == 1) {
            $(this).next().slideToggle();
            //点击文章管理按钮直接默认第一栏li
            $('.level02>li>a')[0].click();
            //DOM元素的click事件可以出发事件,也可以触发该标签里面的链接
            //改变文章管理标签的类名,给右侧箭头的旋转
            $(this).find('b').toggleClass('rotate0');
        }
    })
    //注册左边li标签点击
    $('.level02 li').on('click', function () {
        $(this).addClass('active').siblings('li').removeClass('active');

    })


})