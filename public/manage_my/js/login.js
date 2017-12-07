$(function () {
    //使用表单校验插件
    $('form').bootstrapValidator({
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: '用户名长度必须在6到30之间'
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '用户名长度必须在6到30之间'
                    },
                    callback: {
                        message: '密码输入有误'
                    }
                }
            },

        }

    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url: '/employee/employeeLogin',
            data: $('form').serialize(),
            type: 'post',
            success: function (data) {
                console.log(data)
                var validator = $("form").data('bootstrapValidator'); //获取表单校验实例
                if (data.success) {
                    window.location = './index.html'
                } else {
                    if (data.error == 1000) {
                        validator.updateStatus('username', 'INVALID', 'callback')
                    } else if (data.error == 1001) {
                        validator.updateStatus('password', 'INVALID', 'callback')
                    }
                }
            }
        })
    });
    $('form button[type=reset]').on('click',function(){
        var validator = $("form").data('bootstrapValidator'); //获取表单校验实例
        validator.resetForm();
    })
})