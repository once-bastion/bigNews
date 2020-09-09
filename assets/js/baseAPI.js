// 注意：1. 每次调用 $.get() 或 $.post() 或 $.ajax() 的时候 2.会先调用 ajaxPrefilter 这个函数 3.在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url

  //统一为有权限的接口,设置headers请求头
  if (options.url.indexOf('/my/') !== -1) {//'my'可以根据说明资料中给出的路径进行相应调整
    options.headers = {//请求头配置对象
      //Authorization根据后端具体调用
      Authorization: localStorage.getItem('token') || ''
    }
  }

  //全局统一挂载
  options.complete = function (res) { //所有的方法都执行完毕后再来执行这里，排最后（不管成功失败都会执行）
    console.log("实现回调");
    console.log(res);
    //在complete里,可以用responseJSON拿到服务器数据
    if (res.responseJSON.message === "身份认证失败！" && res.responseJSON.status === 1) {
      location.href = '/login.html'
    }
  }
})