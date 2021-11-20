$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
            nickname: function(value) {
                if (value.length > 6) {
                    return '昵称字符必须在1-6字符之间！'

                }
            }

        })
        //调用初始化用户信息函数
    initUserInfo();

    //初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('获取用户信息失败！');
                }
                console.log(res.data)
                    //调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data)

            }
        })

    }
    //重置表单的数据
    $('#bthReset').on('click', function(e) {
        //阻止表单的默认重置行为
        e.preventDefault();
        initUserInfo();
    });

    //监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败！');
                }
                layer.msg(res.message);
                //调用父页面中的方法，重新渲染用户头像和信息
                window.parent.getUserInfo();
            }
        })
    })








})