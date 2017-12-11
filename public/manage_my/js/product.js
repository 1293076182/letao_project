$(function () {
    var myPage = 1;
    function init() {
        $.ajax({
            url: '/product/queryProductDetailList',
            data: {
                page: myPage,
                pageSize: 5
            },
            success: function (data) {
                console.log(data)
                var result = template('tableTMP', data)
                var myPageSise = Math.ceil(data.total / data.size)
                $('.table tbody').html(result)
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPage, //当前页
                    totalPages: myPageSise, //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        myPage = page;
                        init()
                    }
                });
            }
        })
    }
    init();
    //使用表单校验插件
    $('form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            proName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '不能为空'
                    }
                }
            },
            proDesc: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '不能为空'
                    }
                }
            },
            num: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '不能为空'
                    }
                }
            },
            price: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '不能为空'
                    }
                }
            },
            oldPrice: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '不能为空'
                    }
                }
            },
            size: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '不能为空'
                    }
                }
            }
        }

    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url: '/product/addProduct',
            type: 'post',
            data: $('form').serialize(),
            success: function (data) {
                console.log(data)
                $('.modal-add').modal('hide')
                init()
            }
        })
    });
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data);
            $('form').append('<a href="javascript:;"><img style="width:100px" src="' + data.result.picAddr + '" alt=""><span></span></a>')
            if ($('form>img').length == 3) {
                $('form').data('bootstrapValidator').updateStatus('pic1', 'VALID');
            }
        }
    });
    $('#fileupload').on('click', function (e) {
        if ($('form>img').length == 3) {
            e.preventDefault();
        }
    })
    $('.modal-add .modal-footer button[type=button]').on('click',function(){
        window.location.reload()
    })
    $('.modal-add .modal-header span').on('click',function(){
        window.location.reload()
    })
    $('form').on('mouseover','a',function(){
        $(this).children('span').addClass('glyphicon glyphicon-remove')
    }).on('mouseout','a',function(){
        $(this).children('span').removeClass('glyphicon glyphicon-remove')
    })
    $('form').on('click','a',function(){
        $(this).remove()
    })
})