$(function() {
    // 获取用户基本信息
    $(document).ready(function() {
        getUserInfo();
    })

    $('#btnLogout').on('click', () => {
        layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token');
            location.href = './login.html';
            layer.close(index);
        });
    })
})


function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: 'my/userinfo',
        success: function(res) {
            if (res.status !== 0) return layui.layer.msg('获取用户信息失败')
                // 调用用户头像函数
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);

    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $('.text-avatar').html(text).show();
    }
}