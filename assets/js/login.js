$(function () {
    // 登录点击事件
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 注册点击事件
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取form
    var form = layui.form
    var layer = layui.layer
    // 表单验证
    form.verify({

        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            if ($('#reg-pwd').val() !== value) {
                return '两次密码不一致'
            }
        }
    });

    // 注册功能
    $('#form_reg').submit(function (e) {
        // 阻止表单默认提交
        e.preventDefault()
        // Ajax发送异步提交
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#link_login').click()
                $('#form_reg')[0].reset()
            }
        })

    })

    // 登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            // data: {
            //     username: $('#form_login [name=username]').val(),
            //     password: $('#form_login [name=password]').val()
            // },
            success: function (res) {
                // console.log(res);
                // 注册失败校验
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 注册成功
                layer.msg(res.mssage)
                // 保存token
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })

    })






})