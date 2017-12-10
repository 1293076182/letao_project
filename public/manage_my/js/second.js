$(function () {
    var myPage = 1;
    var myPageSize = 5;
    $.ajax({
        url: '/category/querySecondCategoryPaging',
        data: {
            page: myPage,
            pageSize: myPageSize
        },
        success: function (data) {
            console.log(data)
            var result = template('tableTMP', data)
            $('tbody').html(result)
        }
    })
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data);
            $('.modal-add img').attr('src', data.result.picAddr)
            $('.modal-add input[name=brandLogo]').val(data.result.picAddr)
        }
    });
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        data: {
            page: 1,
            pageSize: 266
        },
        success: function (data) {
            for (var i = 0; i < data.rows.length; i++) {
                $('.dropdown-menu').append('<li><a href="#" data-id="'+data.rows[i].id+'">' + data.rows[i].categoryName + '</a></li>')
            }
        }
    })
    $('.dropdown-menu').on('click', 'a', function () {
        $('#secondForm .btn-group span').first().html($(this).text())
        $('#secondForm input[name=categoryId]').val($(this).attr('data-id'))
    })
    $('#secondForm').bootstrapValidator({
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                }
            },
            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                }
            },
        }

    }).on('success.form.bv', function (e) {
        e.preventDefault();
        $('.modal-add').modal('hide')
    })
})