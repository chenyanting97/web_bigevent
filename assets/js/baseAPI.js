// 每次调用 $.get()或者 $.post()或者 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起 ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url;


  // 统一为有权限的接口，设置 header 请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  };

  // 全局统一挂载 complete 回调函数
  // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
  options.complete = function (res) {
    console.log(res);
    console.log(res.responseJSON);

    if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
      // 强制清空本地存储中的token
      localStorage.removeItem('token')
      // 强制回退到 login 登录页面
      location.href = '/login.html'
    }
  }

})