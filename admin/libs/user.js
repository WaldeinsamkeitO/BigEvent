$(function () {
    //进入用户主页则发送请求
    $.ajax({
        url: BigNew.user_detail,
        success: function (backData) {
            if (backData.code == 200) {
                console.log(backData);
                // $('.nickname').val(backData.data.nickname);
                // $('.username').val(backData.data.username);
                // $('.email').val(backData.data.email);
                // $('.password').val(backData.data.password);
                for (const key in backData.data) {
                    $('input.' + key).val(backData.data[key])
                }
                $('.user_pic').attr('src', backData.data.userPic)
            }


        }
    })
    //图片预览
    $('#exampleInputFile').on('change',function(){
        console.log(this.files);
        var url_pic = this.files[0];
        url = URL.createObjectURL(url_pic);
        $('.user_pic').attr('src',url);
        
    })
    //修改按钮的提交事件
    $('.btn-edit').on('click',function(e){
        e.preventDefault();
        var fd = new FormData($('#form')[0]);
        console.log(fd);
        
        $.ajax({
            type:'post',
            url:BigNew.user_edit,
            data:fd,
            contentType:false,
            processData:false,
            success:function(){
                window.localStorage.setItem('turn',1);
                parent.window.location.reload();
            }
       })




    })


})

