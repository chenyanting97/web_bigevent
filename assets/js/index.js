$(function () {
  getUserInfo()
})
// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    url: '/my/userinfo',
    method: 'GET',
    // 获取头部配置对象
    headers: {
      Authorization: localStorage.getItem('token')
    },
    success: function (res) {
      if (res.status !== 0) {
        return console.log('获取用户数据失败');
      }
      console.log('获取用户数据成功' + res);

    }
  })
}