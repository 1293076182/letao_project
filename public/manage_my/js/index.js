$(function () {
    $.ajax({
        url:'/employee/checkRootLogin',
        success:function(data){
            console.log(data)
            if(data.error==400){
                window.location='login.html'
            }
        }
    })
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [1000, 2000, 3000, 4000, 5000, 6000]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    var myChart1 = echarts.init(document.getElementById('yuan'));

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '阿迪', '百伦', '安踏', '李宁']
        },
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{
                    value: 335,
                    name: '耐克'
                },
                {
                    value: 310,
                    name: '阿迪'
                },
                {
                    value: 234,
                    name: '百伦'
                },
                {
                    value: 135,
                    name: '安踏'
                },
                {
                    value: 1548,
                    name: '李宁'
                }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);
    $('.lt_aside-right .top a').first().on('click',function(){
        $('.lt_aside-left').toggle()
        $('.lt_aside-right').toggleClass('on')
    }) 

    $('.lt_aside-right .top a').last().on('click',function(){
        $('.modal').show().toggleClass('fade')
    })

    $('.modal-footer button').first().on('click',function(){
        $('.modal').hide().toggleClass('fade')
        $.ajax({
            url:'/employee/employeeLogout',
            success:function(data){
                console.log(data)
                window.location='login.html'
            }
        })
        
    })
    $('.modal-footer button').last().on('click',function(){
        $('.modal').hide().toggleClass('fade')
    })
    $('.modal-header .close span').on('click',function(){
        $('.modal').hide().toggleClass('fade')
    })
})