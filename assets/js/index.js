$(function () {
    //调用getUserInfo获取用户信息
    getUserInfo()
    var layer = layui.layer

    $("#btnLoginout").on("click", function () {
        //是否退出提示框
        layer.confirm('你确定要退出了吗?', { icon: 3, title: '提示' }, function (index) {
            //do something

            //删除token
            localStorage.removeItem('token')
            //返回login
            location.href = '/login.html'
            //弹出提示框
            layer.close(index);

        });
    })

    //获取用户的基本信息
    function getUserInfo() {
        $.ajax({
            url: '/my/userinfo', //服务器路径
            type: 'GET', //传递参数的方式，可POST可GET，一般用POST
            data: {}, //传递的参数，可为空，可多个
            dataType: 'json', //数据传递的格式，有Json和xml两种
            async: true,//异步，同步为false
            success: function (res) { //成功返回数据执行这里，排第2
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                //调用renderAvatar渲染用户头像
                renderAvatar(res.data)
            },
            
            error: function () { //服务器路径错误，或是服务器内部错误，走这里报错，此位置与success只会走一个
            }
        })
    }

    //渲染用户的头像
    function renderAvatar(user) {
        //1.获取用户名称
        var name = user.username || nickname
        //2.欢迎文本
        $("#welcome").html("欢迎 " + name)
        //3.设置头像,如果有图就显示图片,没有就显示名字大写
        if (user.user_pic !== null) {
            $(".layui-nav-img").attr("src", user.user_pic).show()
            $(".text-avatar").hide()
        }
        var first = name[0].toUpperCase()
        $(".layui-nav-img").hide()
        $(".text-avatar").html(first).show()

        // 
    }
})       