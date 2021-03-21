$(function () {
  // 调用 getUserInfo 获取用户的基本信息
  getUserInfo();

  var layer = layui.layer;

  $('#btnLogout').on('click', function () {
    layer.confirm('是否要退出登录?', { icon: 3, title: '提示' }, function (index) {
      //do something
      // 清空本地存储中的token
      localStorage.removeItem('token')
      // 重新跳转到登录页面
      location.href = '/login.html'
      // 关闭confirm询问框
      layer.close(index);
    });
  })


})
// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    url: '/my/userinfo',
    method: 'GET',
    // 获取头部配置对象，可以分装在baseAPI.js文件中方便维护
    /*  headers: {
       Authorization: localStorage.getItem('token') || ''
     }, */

    success: function (res) {
      if (res.status !== 0) {
        return console.log('获取用户数据失败');
      }
      console.log(res.data);
      console.log(res);
      // 调用 randerAvatar 渲染用户头像的
      randerAvatar(res.data)
    },

    // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据， 该函数可以封装在 baseAPI.js 中使用，方便于后期维护
    /* complete: function (res) {
      console.log(res);
      console.log(res.responseJSON);

      if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        // 强制清空本地存储中的token
        localStorage.removeItem('token')
        // 强制回退到 login 登录页面
        location.href = '/login.html'
      }
    } */
  })
}

// 渲染用户的头像
function randerAvatar(user) {
  // 获取用户的名称
  var name = user.nickname || user.username;
  // 设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
  // 按需渲染用户的头像
  if (user.user_pic !== null) {
    // 渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    // 渲染文本头像
    $('.layui-nav-img').hide();
    var first = name[0].toUpperCase();
    $('.text-avatar').html(first).show();
  }
}