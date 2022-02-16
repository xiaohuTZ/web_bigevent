$(function() {
    $('#link_reg').on('click', () => {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    $('#link_login').on('click', () => {
        $('.login-box').show();
        $('.reg-box').hide();
    })


    //从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        password: [
            /^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'
        ],
        repassword: function(value) {
            var psd = $('.reg-box [name=password]').val();
            if (value !== psd) return '两次密码不一致'
        }
    })

    // 监听注册表单的提交事件

    $('#form_reg').on('submit', (e) => {
        // 阻止默认的提交行为
        e.preventDefault();
        const data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        };
        $.post('api/reguser', data, function(res) {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg('注册成功,请登录')
            $('#link_login').click()
        })
    })


    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = './index.html'
            }
        })
    })
})