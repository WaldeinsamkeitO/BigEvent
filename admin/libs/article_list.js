$(function () {
    //获取文章全部分类下拉列表
    $.ajax({
        url: BigNew.category_list,
        success: function (backData) {

            var resHtml = template("sel_temp", backData);
            $('#selCategory').html(resHtml);
        }
    })
    var mypage = 1;
    //调用函数创建模板框架,把获取的文章渲染到页面,并引入页码框架
    getArticle(mypage, function (backData) {
        $('#pagination').twbsPagination({
            totalPages: backData.data.totalPage,
            visiblePages: 7,
            onPageClick: function (event, page) {
                getArticle(page, null);
            }
        })
    });

    //进入页面开始获取所有文章函数
    function getArticle(myPage, callback) {
        $.ajax({
            url: BigNew.article_query,
            data: {
                key: '',
                type: $('#selCategory').val().trim(),
                state: $('#selStatus').val().trim(),
                page: myPage,
                perpage: 10,
            },
            success: function (backData) {

                var resHtml = template("article_temp", backData);
                $('tbody').html(resHtml);
                if (callback != null) {
                    callback(backData);
                }
            }
        })
    }
    //筛选事件
    $('#btnSearch').on('click', function (e) {
        e.preventDefault();
        getArticle(1, function (backData) {
            $('#pagination').twbsPagination('changeTotalPages', backData.data.totalPage, 1);

        })
    })

    //删除事件
    $('tbody').on('click', '.delete', function () {
        var id = $(this).attr('data-id');
        console.log(id);
        $.ajax({
            type: 'post',
            url: BigNew.article_delete,
            data: {
                id: id,
            },
            success: function (backData) {
                if (backData.code == 204) {
                    getArticle(mypage, function (backData) {
                        //删除了部分数据,那总页数就有可能发生了改变
                        //调用changeTotalPages 这个方法 根据新的总页数 重新生成分页结构. 
                        $('#pagination-demo').twbsPagination('changeTotalPages',
                            backData.data.totalPage, mypage);
                            console.log(mypage);
                    });
                }

            }
        })
    })
})