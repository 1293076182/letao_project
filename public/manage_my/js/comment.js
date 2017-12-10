$(function(){
    $.ajax({
        url:'/employee/checkRootLogin',
        success:function(data){
            console.log(data)
            if(data.error==400){
                window.location='login.html'
            }
        }
    })

    $('.lt_aside-right .top a').first().on('click',function(){
        $('.lt_aside-left').toggle()
        $('.lt_aside-right').toggleClass('on')
    }) 

    $('.lt_aside-right .top a').last().on('click',function(){
        $('.modal-sure').show().toggleClass('fade')
    })

    $('.modal-sure .modal-footer button').first().on('click',function(){
        $('.modal').hide().toggleClass('fade')
        $.ajax({
            url:'/employee/employeeLogout',
            success:function(data){
                console.log(data)
                window.location='login.html'
            }
        })
        
    })

    $('.modal-sure .modal-footer button').last().on('click',function(){
        $('.modal').hide().toggleClass('fade')
    })
    
    $('.modal-header .close span').on('click',function(){
        $('.modal').hide().toggleClass('fade')
    })
    $('.lt_aside-left ul li:eq(1)>a').on('click',function(){
        $(this).siblings('ol').slideToggle()
    })
})