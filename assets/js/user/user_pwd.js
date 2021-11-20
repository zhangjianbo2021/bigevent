//首先写一个jquery的入口函数
$(function() {
    //导入layui中的form对象
    var form = layui.form;
    //导入layui中的layer对象
    var layer = layui.layer;
    //自定义校验规则
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            samePwd: function(value) {
                if (value === $('.layui-form [name=oldPwd]').val()) {
                    return '新旧密码输入不能相同！'
                }

            },
            rePwd: function(value) {
                if (value !== $('.layui-form [name=newPwd]').val()) {
                    return '两次密码输入不一致！'
                }
            }
        })
        //给确认提交按钮添加监听函数
    $('.layui-form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $('.layui-form').serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    if (res.message === '原密码错误！') {
                        layer.msg(res.message);
                        //给旧密码获取焦点
                        $('[name=oldPwd]').focus();
                    } else {
                        layer.msg('修改密码失败！');
                    }
                } else {
                    //重置表单
                    $('.layui-form')[0].reset();
                }


            }
        })
    })
})