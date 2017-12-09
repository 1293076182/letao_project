$(function () {
    var pageNum = 1;
    var pageSize = 5;

    function init(pageNum, pageSize) {
        $.ajax({
            url: '/user/queryUser',
            data: {
                page: pageNum,
                pageSize: pageSize
            },
            success: function (data) {
                console.log(data)
                var result = template('tableTMP', data)
                $('tbody').html(result)
                var page = Math.ceil(data.total / data.size)
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: pageNum, //当前页
                    totalPages: page, //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        pageNum = page;
                        init(pageNum, pageSize)
                    }
                });
            }
        })
    }
    init(pageNum, pageSize);
    $('tbody').on('click','button',function(){
        // console.log($(this).text())
        var id =parseInt($(this).parent().attr('data-id'));
        if($(this).text() == '禁用'){
            var isDelete = 1
        }else{
            var isDelete = 0
        }
        $.ajax({
            url:'/user/updateUser',
            type:'post',
            data:{
                id:id,
                isDelete:isDelete
            },
            success:function(data){
                init(pageNum, pageSize)
            }
        })
    })
})