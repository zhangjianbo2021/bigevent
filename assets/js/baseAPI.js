//每次发起$.post()或$.get()或$.ajax()都会
//先调用这个函数，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {

    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    console.log('这是调试打印出来的数据：' + options.url);
    if (options.url.indexOf('/my') !== -1) {
        //统一为有权限的接口设置headers请求头
        options.headers = { Authorization: localStorage.getItem('token') || '' }
    }
<<<<<<< HEAD
    //全局统一挂载complete回调函数
    options.complete = function(res) {
        console.log('执行了complete回调');
        console.log(res)
            //在complete回调函数中可以使用res.responsJSON拿到服务器响应回来的数据
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }

    }
=======
>>>>>>> 83906a1a82a86c49dac6cfe374c6ad23486f1f4a
})