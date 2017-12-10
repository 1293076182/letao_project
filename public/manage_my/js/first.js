$(function () {
    var myPage = 1;
    var myPageNum = 5;

    function init(myPage, myPageNum) {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: myPage,
                pageSize: myPageNum
            },
            success: function (data) {
                console.log(data)
                var result = template('tableTMP', data)
                $('.table-add tbody').html(result)
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:myPage,//当前页
                    totalPages:myPageNum,//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,page){
                      //为按钮绑定点击事件 page:当前点击的按钮值
                      myPage = page;
                      init(myPage,myPageNum);
                    }
                  });
            }
        })
    }
    init(myPage, myPageNum)

    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '分类不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: '用户名长度必须在6到30之间'
                    },
                }
            }
        }

    }).on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/category/addTopCategory',
            type: 'post',
            data: $('form').serialize(),
            success: function (data) {
                console.log(data)
                $('.modal-add').modal('hide')
                init(myPage,myPageNum)
                $('.form-control').val('')
            }
        })
    });
})