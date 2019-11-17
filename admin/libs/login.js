$(function () {

    // if (window.history && window.history.pushState) {
    //   window.onpopstate = function () {
    //     window.location.reload();
    //   }
    // }
    // $(document).ready(function () {
    //   if ($.cookie("user") == null) {
    //     alert("11111111111111");
    //   }
    //   else {
    //   }
    //   $.cookie("user", "1");
    // });

    $('.input_sub').on('click', function (e) {
      e = e || window.event;

      e.preventDefault();
      var username = $('.input_txt').val().trim();
      var password = $('.input_pass').val().trim();
      if (username == '' || password == '') {
        $('#myModal').modal();
        $('.modal-body').text('用户名及密码不能为空');
        return false;
      };
      $.ajax({
        type: 'post',
        url: BigNew.user_login,
        data: {
          username: username,
          password: password
        },
        success: function (backData) {
          $('#myModal').modal();
          $('.modal-body').text(backData.msg);
          if (backData.code == 200) {
            $('#myModal').on('hidden.bs.modal', function () {
              window.localStorage.setItem('token', backData.token);
              window.localStorage.setItem('turn',1);
              window.location.href = './index.html'
            })
          }
        }
      })

    })

  })


