$(function () {
    //1.获取所有的categlory,添加到分类选项上
    $.ajax({
        url: BigNew.category_list,
        success: function (backData) {
            var resHtml = template('category_list', backData);
            $('.category').html(resHtml);
        }
    })
    //2.添加时间模态框
    jeDate("#testico", {
        format: "YYYY-MM-DD",
        isTime: false,
        minDate: "2014-09-19 00:00:00",
        zIndex: 20999,
    })
    //3.富文本编辑器
    var E = window.wangEditor;
    var editor = new E('#editor');
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create()
    //4.图片预览
    $('#inputCover').on('change', function () {
        console.log(this.files[0]);
        var url = this.files[0];
        url = URL.createObjectURL(url);
        $('.article_cover').attr('src', url);
    })
    //3.进入编辑页面发送请求
    var id = window.location.search.split('=')[1];
    //根据href带过来的id发送请求
    $.ajax({
        url: BigNew.article_search,
        data: {
            id: id,
        },
        success: function (backData) {
            if (backData.code == 200) {
                $('#inputTitle').val(backData.data.title);
                $('.article_cover').attr('src', backData.data.cover);
                $('.category').val(backData.data.categoryId);
                $('#testico').val(backData.data.date);
                editor.txt.html(backData.data.content);
            }
        }
    });
    //修改按钮点击事件
    $('.btn-edit').on('click', function (e) {
        e.preventDefault();
        var fd = new FormData($('form')[0]);
        //获取富文本编辑器的文本,追加到fd中
        var text_editor = editor.txt.html();
        fd.append('content', text_editor);
        //追加id到fd中
        fd.append('id', id);
        //追加编辑状态到fd中
        fd.append('state', '已发布');
        $.ajax({
            type: 'post',
            url: BigNew.article_edit,
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                if (backData.code == 200) {
                    window.history.back();
                }
            }
        })
    })
    //修改草稿事件
    $('.btn-draft').on('click', function (e) {
        e.preventDefault();
        var fd = new FormData($('form')[0]);
        //获取富文本编辑器的文本,追加到fd中
        var text_editor = editor.txt.html();
        fd.append('content', text_editor);
        //追加id到fd中
        fd.append('id', id);
        //追加编辑状态到fd中,草稿发布状态为空
        $.ajax({
            type: 'post',
            url: BigNew.article_edit,
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                window.history.back();
            }
        })
    })
})
