$(function () {
    //发送ajax请求获取文章类别
    $.ajax({
      url: BigNew.category_list,
      success: function (backData) {
        var resHtml = template("act_temp", backData);
        $('tbody').html(resHtml);
      }
    })
    //判定点击按钮确定弹出框的内容
    $('#xinzengfenlei').on('click', function () {
      $('#exampleModalLabel').text('新增分类');
      $('#add_act').text('Add');
      $('#add_act').removeClass('btn-primary').addClass('btn-success');
    })
    //编辑按钮注册
    $('tbody').on('click', '#ed_act', function () {
      $('#exampleModalLabel').text('编辑分类');
      $('#add_act').text('Edit');
      $('#add_act').removeClass('btn-success').addClass('btn-primary');
      var id = $(this).attr('data-id');
      //点击编辑按钮的请求
      $.ajax({
        url: BigNew.category_search,
        data: {
          id: id,
        },
        success: function (backData) {
          if (backData.code == 200) {
            $('#recipient-name').val(backData.data[0].name);
            $('#message-text').val(backData.data[0].slug);
            $('#hideId').val(backData.data[0].id);
          }
        }
      })
    })
    //弹出框取消按钮事件
    $('#cancle').on('click', function () {
      $('#myModal form')[0].reset();
      //点击取消按钮重置表单
    })
    //弹出框提交按钮的事件注册
    $('#add_act').on('click', function (e) {
      e.preventDefault();
      //因为是同一个按钮所以,要判断是新增还是编辑
      //思路:如果有primary类名则为编辑,如果有success类名则为新增
      if ($(this).hasClass('btn-success')) {
        var addname = $('#recipient-name').val().trim();
        var addslug = $('#message-text').val().trim();
        $.ajax({
          type: 'post',
          url: BigNew.category_add,
          data: {
            name: addname,
            slug: addslug,
          },
          success: function () {
            window.location.reload();
          }
        })
      } else {
        var edname = $('#recipient-name').val().trim();
        var edslug = $('#message-text').val().trim();
        var edid = $('#hideId').val().trim();
        var id =
          $.ajax({
            type: 'post',
            url: BigNew.category_edit,
            data: {
              id: edid,
              name: edname,
              slug: edslug,
            },
            success: function (backData) {
              window.location.reload();
            }
          })
      }
    })
    //删除按钮事件
    $('tbody').on('click', '#act_del', function (e) {
      e.preventDefault();
      var id = $(this).attr('data-id');
      $.ajax({
        type: 'post',
        url: BigNew.category_delete,
        data: {
          id: id,
        },
        success: function (backData) {
          window.location.reload();
        }
      })
    })
  })