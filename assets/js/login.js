$(function () {
  // 点击“去注册账号”的链接
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  // 点击“去登录”的链接
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  // 从 layui中获取 form对象
  var form = layui.form;
  var layer = layui.layer;
  // 通过 form.verify() 函数自定义校验规则
  form.verify({
    // 自定义了一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验两次密码是否一致的规则
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败,则return一个提示消息即可
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "两次密码不一致!";
      }
    },
  })

  // 监听注册表单的提交事件
  $("#form_reg").on("submit", e => {
    //阻止表单默认提交行为
    e.preventDefault()
    //发起Ajax POST请求(用线上地址)
    var data = {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val(),
    }
    $.post(
      "/api/reguser",
      // 根路径+具体地址
      data,
      (res) => {
        if (res.status !== 0) {
          //console.log("注册失败", res.message);
          return layer.msg(res.message)
        }
        //console.log("注册成功");
        layer.msg("注册成功,请登录")
        //模拟人的点击行为
        $("#link_login").click()
      }
    );
  });

  // 监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    console.log($(this))

    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url: '/api/login',//服务器路径
      //快速获取表单中的数据
      type: "POST", //传递参数的方式，可POST可GET，一般用POST
      data: $(this).serialize(), //传递的参数，可为空，可多个
      //dataType: 'json', //数据传递的格式，有Json和xml两种
      async: true,//异步，同步为false
      success: res => { //成功返回数据执行这里，排第2
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        console.log(res.token);
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        // location.href = '/index.html'
      },

      beforeSend: function () { //一触发ajax就执行，无任何延迟，排第1
      },
      complete: function () { //所有的方法都执行完毕后再来执行这里，排最后（不管成功失败都会执行）
      },
      error: function () { //服务器路径错误，或是服务器内部错误，走这里报错，此位置与success只会走一个
      }
    })
  });

});
