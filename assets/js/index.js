$(function() {
        //调用getUserInfo，获取基本信息
        getUserInfo();
        $('#btnLoginOut').on('click', function() {
            layer.confirm('确认退出吗？', { icon: 3, title: '提示' }, function(index) {
                //清除token值
                localStorage.removeItem('token')
                    //跳转到登录页面
                location.href = '/login.html'
                    //关闭弹出框
                layer.close(index);
            });
        })
    })
    //获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                console.log('这个是在请求失败时返回的数据：')
                console.log(res);
                return layui.layer.msg('获取用户信息失败')
            }
            //渲染用户的头像
            console.log('这个是在请求用户信息成功后获取到的数据：res.data')
            console.log(res.data);
            renderAvatar(res.data);
        },
        //不论ajax请求是成功还是失败，都会调用complete回调函数
        // complete: function(res) {
        //     console.log('执行了complete回调');
        //     console.log(res)
        //         //在complete回调函数中可以使用res.responsJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }

        // }
    })
}
//渲染用户头像方法
function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username
        //设置欢迎的文本
    $('#welcom').html('欢迎&nbsp;&nbsp;' + name)
        //按需设置用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var fist = name[0].toUpperCase();
        $('.text-avatar').html(fist)
    }
}