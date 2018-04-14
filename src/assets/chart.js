//只有一个环的饼图----------------------------------------------------------
function getData(){
    var dat = null;
    $.ajax({
        type : "get",
        url : "http://127.0.0.1:3342/test/get/840e78fe-c900-4651-ae4a-a5a23ba438bc/1510813461589",
        dataType : "json",
        contentType : "application/json",
        async : false,// async: false先执行完ajax，在执行ajax后面的语句，(async:
        // true，分两个线程走，执行ajax的同时，回调去执行后面的语句)
        cache : false,// 不对结果进行缓存
        success : function(data) {
            dat = data.data;
        }
    });
    return dat;
}
var dat = getData();
var mapList = dat.mapList;
var dimensions = dat.dimensions;
var values = dat.values;
var title = [];
var data = [];
var vk = values[0].name;
var dk = dimensions[0].name;
for(var i = 0; i < mapList.length; i++) {
    var obj = {};
    for (var key in mapList[i]) {
        if(key == vk) {
            obj.value = mapList[i][key]
        } else if(key == dk) {
            title.push(mapList[i][key]);
            obj.name = mapList[i][key]
        }
    }
    data.push(obj);
}

option = {
    title : {
        show: true,//显示隐藏
        x: 'center', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'18'},//字体颜色
        text: '饼图',
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x: 'left', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'14'},//字体颜色
        data:title
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'left',
                        max: 1548
                    }
                }
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'访问来源',
            type:'pie',
            radius : [100,200],
            center: ['50%', '60%'],
            data:data
        }
    ]
};



//有多个环的饼图：------------------------------------------------------------

    function getData(){
        var dat = null;
        $.ajax({
            type : "get",
            url : "http://127.0.0.1:3342/test/get/840e78fe-c900-4651-ae4a-a5a23ba438bc/1510813480254",
            dataType : "json",
            contentType : "application/json",
            async : false,// async: false先执行完ajax，在执行ajax后面的语句，(async:
            // true，分两个线程走，执行ajax的同时，回调去执行后面的语句)
            cache : false,// 不对结果进行缓存
            success : function(data) {
                dat = data.data;
            }
        });
        return dat;
    }
var radiu = 100;
var dat = getData();
var mapList = dat.mapList;
var dimensions = dat.dimensions;
var values = dat.values;
var title = [];
var series = [];
var dk = dimensions[0].name;
for(var j = 0; j < values.length; j++) {
    var serie = {};
    var data = [];
    for(var i = 0; i < mapList.length; i++) {
        var obj = {};
        for (var key in mapList[i]) {
            if (key == values[j].name) {
                obj.value = mapList[i][key]
            } else if (key == dk) {
                if(j == 0) {
                    title.push(mapList[i][key]);
                }
                obj.name = mapList[i][key]
            }
        }
        data.push(obj);
    }
    if(j == 0) {
        serie = {
            name:values[j].comment,
            type:'pie',
            selectedMode: 'single',
            radius : [0, radiu],
            itemStyle : {
                normal : {
                    label : {
                        position : 'inner'
                    },
                    labelLine : {
                        show : false
                    }
                }
            },
            data:data
        }
    } else {
        serie = {
            name:values[j].comment,
            type:'pie',
            selectedMode: 'single',
            radius : [radiu * j + 40, radiu * j + 100],
            data:data
        }
    }
    series.push(serie);
}

option = {
    title : {
        show: true,//显示隐藏
        text: '饼图',
        x: 'center', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'18'}//字体颜色
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x: 'left', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'14'},//字体颜色
        data:title
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true,
                type: ['pie', 'funnel']
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : false,
    series : series
};

//堆积折线面积图--------------------------------------------------------------------------------------------------------------
    function getData(){
        var dat = null;
        $.ajax({
            type : "get",
            url : "http://127.0.0.1:3342/test/get/840e78fe-c900-4651-ae4a-a5a23ba438bc/1510885160004",
            dataType : "json",
            contentType : "application/json",
            async : false,// async: false先执行完ajax，在执行ajax后面的语句，(async:
            // true，分两个线程走，执行ajax的同时，回调去执行后面的语句)
            cache : false,// 不对结果进行缓存
            success : function(data) {
                dat = data.data;
            }
        });
        return dat;
    }
var dat = getData();
var mapList = dat.mapList;
var dimensions = dat.dimensions;
var values = dat.values;
var legend = [];
var xAxis = [];
var series = [];
var dk = dimensions[0].name;
for(var j = 0; j < values.length; j++) {
    var serie = {};
    var data = [];
    legend.push(values[j].comment);
    for(var i = 0; i < mapList.length; i++) {
        for (var key in mapList[i]) {
            if (key == values[j].name) {
                data.push(mapList[i][key]);
            } else if(dk == key && j == 0) {
                xAxis.push(mapList[i][key]);
            }
        }
    }
    serie = {
        name:values[j].comment,
        type:'line',
        stack: '1',//赋相同的任意值，就变成堆积折线图
        itemStyle: {normal: {
            areaStyle: {type: 'default'},
            color:''//设置线条的颜色
        }},
        data:data
    };
    series.push(serie);
}

option = {
    backgroundColor: 'rgba(0,0,0,0)',//背景色,透明rgba(0,0,0,0)
    title : {
        show: true,//显示隐藏
        text: '折线图',
        x: 'left', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'18'}//字体颜色
    },
    grid:{
        borderWidth:0//设置边框大小
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        orient: 'horizontal', // 'vertical'标题横向或纵向排列
        x: 'right', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'14'},//字体颜色
        data:legend
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            show:true,//显示或隐藏X轴
            axisLine: {
                lineStyle: {
                    color: '#008ACD'//坐标线颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'black',
                    fontSize:'14'
                }
            },//设置字体颜色和大小
            splitLine:{ show:false},//隐藏或显示网格线
            type : 'category',
            boundaryGap : false,
            data : xAxis
        }
    ],
    yAxis : [
        {
            show:true,//显示或隐藏Y轴
            axisLine: {
                lineStyle: {
                    color: '#008ACD'//坐标线颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'black',
                    fontSize:'14'
                }
            },//设置字体颜色和大小
            splitLine:{show:false},//隐藏或显示网格线
            type : 'value'
        }
    ],
    series : series
};

//标准折线面积图--------------------------------------------------------------------------------
    function getData(){
        var dat = null;
        $.ajax({
            type : "get",
            url : "http://127.0.0.1:3342/test/get/840e78fe-c900-4651-ae4a-a5a23ba438bc/1510885160004",
            dataType : "json",
            contentType : "application/json",
            async : false,// async: false先执行完ajax，在执行ajax后面的语句，(async:
            // true，分两个线程走，执行ajax的同时，回调去执行后面的语句)
            cache : false,// 不对结果进行缓存
            success : function(data) {
                dat = data.data;
            }
        });
        return dat;
    }
var dat = getData();
var mapList = dat.mapList;
var dimensions = dat.dimensions;
var values = dat.values;
var legend = [];
var xAxis = [];
var series = [];
var dk = dimensions[0].name;
for(var j = 0; j < values.length; j++) {
    var serie = {};
    var data = [];
    legend.push(values[j].comment);
    for(var i = 0; i < mapList.length; i++) {
        for (var key in mapList[i]) {
            if (key == values[j].name) {
                data.push(mapList[i][key]);
            } else if(dk == key && j == 0) {
                xAxis.push(mapList[i][key]);
            }
        }
    }
    serie = {
        name:values[j].comment,
        type:'line',
        itemStyle: {normal: {
            areaStyle: {type: 'default'},
            color:''//设置线条的颜色
        }},
        data:data
    };
    series.push(serie);
}

option = {
    backgroundColor: 'rgba(0,0,0,0)',//背景色,透明rgba(0,0,0,0)
    title : {
        show: true,//显示隐藏
        text: '折线图',
        x: 'left', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'18'}//字体颜色
    },
    grid:{
        borderWidth:0//设置边框大小
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        orient: 'horizontal', // 'vertical'标题横向或纵向排列
        x: 'right', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'14'},//字体颜色
        data:legend
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            show:true,//显示或隐藏X轴
            axisLine: {
                lineStyle: {
                    color: '#008ACD'//坐标线颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'black',
                    fontSize:'14'
                }
            },//设置字体颜色和大小
            splitLine:{ show:false},//隐藏或显示网格线
            type : 'category',
            boundaryGap : false,
            data : xAxis
        }
    ],
    yAxis : [
        {
            show:true,//显示或隐藏Y轴
            axisLine: {
                lineStyle: {
                    color: '#008ACD'//坐标线颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'black',
                    fontSize:'14'
                }
            },//设置字体颜色和大小
            splitLine:{show:false},//隐藏或显示网格线
            type : 'value'
        }
    ],
    series : series
};

//堆积折线图---------------------------------------------------------------------------------------
    function getData(){
        var dat = null;
        $.ajax({
            type : "get",
            url : "http://127.0.0.1:3342/test/get/840e78fe-c900-4651-ae4a-a5a23ba438bc/1510885160004",
            dataType : "json",
            contentType : "application/json",
            async : false,// async: false先执行完ajax，在执行ajax后面的语句，(async:
            // true，分两个线程走，执行ajax的同时，回调去执行后面的语句)
            cache : false,// 不对结果进行缓存
            success : function(data) {
                dat = data.data;
            }
        });
        return dat;
    }
var dat = getData();
var mapList = dat.mapList;
var dimensions = dat.dimensions;
var values = dat.values;
var legend = [];
var xAxis = [];
var series = [];
var dk = dimensions[0].name;
for(var j = 0; j < values.length; j++) {
    var serie = {};
    var data = [];
    legend.push(values[j].comment);
    for(var i = 0; i < mapList.length; i++) {
        for (var key in mapList[i]) {
            if (key == values[j].name) {
                data.push(mapList[i][key]);
            } else if(dk == key && j == 0) {
                xAxis.push(mapList[i][key]);
            }
        }
    }
    serie = {
        name:values[j].comment,
        type:'line',
        stack: '1',//赋相同的任意值，就变成堆积折线图
        itemStyle: {normal: {
            color:''//设置线条的颜色
        }},
        data:data
    };
    series.push(serie);
}

option = {
    backgroundColor: 'rgba(0,0,0,0)',//背景色,透明rgba(0,0,0,0)
    title : {
        show: true,//显示隐藏
        text: '折线图',
        x: 'left', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'18'}//字体颜色
    },
    grid:{
        borderWidth:0//设置边框大小
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        orient: 'horizontal', // 'vertical'标题横向或纵向排列
        x: 'right', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'14'},//字体颜色
        data:legend
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            show:true,//显示或隐藏X轴
            axisLine: {
                lineStyle: {
                    color: '#008ACD'//坐标线颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'black',
                    fontSize:'14'
                }
            },//设置字体颜色和大小
            splitLine:{ show:false},//隐藏或显示网格线
            type : 'category',
            boundaryGap : false,
            data : xAxis
        }
    ],
    yAxis : [
        {
            show:true,//显示或隐藏Y轴
            axisLine: {
                lineStyle: {
                    color: '#008ACD'//坐标线颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'black',
                    fontSize:'14'
                }
            },//设置字体颜色和大小
            splitLine:{show:false},//隐藏或显示网格线
            type : 'value'
        }
    ],
    series : series
};

//标准折线图----------------------------------------------------------------------------
    function getData(){
        var dat = null;
        $.ajax({
            type : "get",
            url : "http://127.0.0.1:3342/test/get/840e78fe-c900-4651-ae4a-a5a23ba438bc/1510885160004",
            dataType : "json",
            contentType : "application/json",
            async : false,// async: false先执行完ajax，在执行ajax后面的语句，(async:
            // true，分两个线程走，执行ajax的同时，回调去执行后面的语句)
            cache : false,// 不对结果进行缓存
            success : function(data) {
                dat = data.data;
            }
        });
        return dat;
    }
var dat = getData();
var mapList = dat.mapList;
var dimensions = dat.dimensions;
var values = dat.values;
var legend = [];
var xAxis = [];
var series = [];
var dk = dimensions[0].name;
for(var j = 0; j < values.length; j++) {
    var serie = {};
    var data = [];
    legend.push(values[j].comment);
    for(var i = 0; i < mapList.length; i++) {
        for (var key in mapList[i]) {
            if (key == values[j].name) {
                data.push(mapList[i][key]);
            } else if(dk == key && j == 0) {
                xAxis.push(mapList[i][key]);
            }
        }
    }
    serie = {
        name:values[j].comment,
        type:'line',
        itemStyle: {normal: {
            color:''//设置线条的颜色
        }},
        data:data
    };
    series.push(serie);
}

option = {
    backgroundColor: 'rgba(0,0,0,0)',//背景色,透明rgba(0,0,0,0)
    title : {
        show: true,//显示隐藏
        text: '折线图',
        x: 'left', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'18'}//字体颜色
    },
    grid:{
        borderWidth:0//设置边框大小
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        orient: 'horizontal', // 'vertical'标题横向或纵向排列
        x: 'right', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'14'},//字体颜色
        data:legend
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            show:true,//显示或隐藏X轴
            axisLine: {
                lineStyle: {
                    color: '#008ACD'//坐标线颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'black',
                    fontSize:'14'
                }
            },//设置字体颜色和大小
            splitLine:{ show:false},//隐藏或显示网格线
            type : 'category',
            boundaryGap : false,
            data : xAxis
        }
    ],
    yAxis : [
        {
            show:true,//显示或隐藏Y轴
            axisLine: {
                lineStyle: {
                    color: '#008ACD'//坐标线颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'black',
                    fontSize:'14'
                }
            },//设置字体颜色和大小
            splitLine:{show:false},//隐藏或显示网格线
            type : 'value'
        }
    ],
    series : series
};

//标准柱状图--------------------------------------------------------------------
    function getData(){
        var dat = null;
        $.ajax({
            type : "get",
            url : "http://127.0.0.1:3342/test/get/840e78fe-c900-4651-ae4a-a5a23ba438bc/1510885160004",
            dataType : "json",
            contentType : "application/json",
            async : false,// async: false先执行完ajax，在执行ajax后面的语句，(async:
            // true，分两个线程走，执行ajax的同时，回调去执行后面的语句)
            cache : false,// 不对结果进行缓存
            success : function(data) {
                dat = data.data;
            }
        });
        return dat;
    }
var dat = getData();
var mapList = dat.mapList;
var dimensions = dat.dimensions;
var values = dat.values;
var legend = [];
var xAxis = [];
var series = [];
var dk = dimensions[0].name;
for(var j = 0; j < values.length; j++) {
    var serie = {};
    var data = [];
    legend.push(values[j].comment);
    for(var i = 0; i < mapList.length; i++) {
        for (var key in mapList[i]) {
            if (key == values[j].name) {
                data.push(mapList[i][key]);
            } else if(dk == key && j == 0) {
                xAxis.push(mapList[i][key]);
            }
        }
    }
    serie = {
        name:values[j].comment,
        type:'bar',
        itemStyle: {normal: {
            color:''//设置柱状的颜色
        }},
        data:data
    };
    series.push(serie);
}

option = {
    backgroundColor: 'rgba(0,0,0,0)',//背景色,透明rgba(0,0,0,0)
    title : {
        show: true,//显示隐藏
        text: '柱状图',
        x: 'left', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'18'}//字体颜色
    },
    grid:{
        borderWidth:0//设置边框大小
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        orient: 'horizontal', // 'vertical'标题横向或纵向排列
        x: 'right', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'14'},//字体颜色
        data:legend
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            show:true,//显示或隐藏X轴
            axisLine: {
                lineStyle: {
                    color: '#008ACD'//坐标线颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'black',
                    fontSize:'14'
                }
            },//设置字体颜色和大小
            splitLine:{ show:false},//隐藏或显示网格线
            type : 'category',
            data : xAxis
        }
    ],
    yAxis : [
        {
            show:true,//显示或隐藏Y轴
            axisLine: {
                lineStyle: {
                    color: '#008ACD'//坐标线颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'black',
                    fontSize:'14'
                }
            },//设置字体颜色和大小
            splitLine:{show:false},//隐藏或显示网格线
            type : 'value'
        }
    ],
    series : series
};

//堆积柱状图-----------------------------------------------------------------------------------------------
    function getData(){
        var dat = null;
        $.ajax({
            type : "get",
            url : "http://127.0.0.1:3342/test/get/840e78fe-c900-4651-ae4a-a5a23ba438bc/1510885160004",
            dataType : "json",
            contentType : "application/json",
            async : false,// async: false先执行完ajax，在执行ajax后面的语句，(async:
            // true，分两个线程走，执行ajax的同时，回调去执行后面的语句)
            cache : false,// 不对结果进行缓存
            success : function(data) {
                dat = data.data;
            }
        });
        return dat;
    }
var dat = getData();
var mapList = dat.mapList;
var dimensions = dat.dimensions;
var values = dat.values;
var legend = [];
var xAxis = [];
var series = [];
var dk = dimensions[0].name;
for(var j = 0; j < values.length; j++) {
    var serie = {};
    var data = [];
    legend.push(values[j].comment);
    for(var i = 0; i < mapList.length; i++) {
        for (var key in mapList[i]) {
            if (key == values[j].name) {
                data.push(mapList[i][key]);
            } else if(dk == key && j == 0) {
                xAxis.push(mapList[i][key]);
            }
        }
    }
    serie = {
        name:values[j].comment,
        type:'bar',
        stack: '1',//赋相同的任意值，就变成堆积折线图
        itemStyle: {normal: {
            color:''//设置柱状的颜色
        }},
        data:data
    };
    series.push(serie);
}

option = {
    backgroundColor: 'rgba(0,0,0,0)',//背景色,透明rgba(0,0,0,0)
    title : {
        show: true,//显示隐藏
        text: '柱状图',
        x: 'left', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'18'}//字体颜色
    },
    grid:{
        borderWidth:0//设置边框大小
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        orient: 'horizontal', // 'vertical'标题横向或纵向排列
        x: 'right', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'14'},//字体颜色
        data:legend
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            show:true,//显示或隐藏X轴
            axisLine: {
                lineStyle: {
                    color: '#008ACD'//坐标线颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {//设置字体颜色和大小
                    color: 'black',
                    fontSize:'14'
                }
            },//设置字体颜色和大小
            splitLine:{ show:false},//隐藏或显示网格线
            type : 'category',
            data : xAxis
        }
    ],
    yAxis : [
        {
            show:true,//显示或隐藏Y轴
            axisLine: {
                lineStyle: {
                    color: '#008ACD'//坐标线颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'black',
                    fontSize:'14'
                }
            },//设置字体颜色和大小
            splitLine:{show:false},//隐藏或显示网格线
            type : 'value'
        }
    ],
    series : series
};

//标准条形图--------------------------------------------------------------------------
    function getData(){
        var dat = null;
        $.ajax({
            type : "get",
            url : "http://127.0.0.1:3342/test/get/840e78fe-c900-4651-ae4a-a5a23ba438bc/1510885160004",
            dataType : "json",
            contentType : "application/json",
            async : false,// async: false先执行完ajax，在执行ajax后面的语句，(async:
            // true，分两个线程走，执行ajax的同时，回调去执行后面的语句)
            cache : false,// 不对结果进行缓存
            success : function(data) {
                dat = data.data;
            }
        });
        return dat;
    }
var dat = getData();
var mapList = dat.mapList;
var dimensions = dat.dimensions;
var values = dat.values;
var legend = [];
var yAxis = [];
var series = [];
var dk = dimensions[0].name;
for(var j = 0; j < values.length; j++) {
    var serie = {};
    var data = [];
    legend.push(values[j].comment);
    for(var i = 0; i < mapList.length; i++) {
        for (var key in mapList[i]) {
            if (key == values[j].name) {
                data.push(mapList[i][key]);
            } else if(dk == key && j == 0) {
                yAxis.push(mapList[i][key]);
            }
        }
    }
    serie = {
        name:values[j].comment,
        type:'bar',
        //stack: '1',//赋相同的任意值，就变成堆积折线图
        itemStyle: {normal: {
            color:''//设置柱状的颜色
        }},
        data:data
    };
    series.push(serie);
}

option = {
    backgroundColor: 'rgba(0,0,0,0)',//背景色,透明rgba(0,0,0,0)
    title : {
        show: true,//显示隐藏
        text: '条形图',
        x: 'left', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'18'}//字体颜色
    },
    grid:{
        borderWidth:0//设置边框大小
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        orient: 'horizontal', // 'vertical'标题横向或纵向排列
        x: 'right', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'14'},//字体颜色
        data:legend
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            show:true,//显示或隐藏X轴
            axisLine: {
                lineStyle: {
                    color: '#008ACD'//坐标线颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'black',
                    fontSize:'14'
                }
            },//设置字体颜色和大小
            splitLine:{ show:false},//隐藏或显示网格线
            type : 'value'
        }
    ],
    yAxis : [
        {
            show:true,//显示或隐藏Y轴
            axisLine: {
                lineStyle: {
                    color: '#008ACD'//坐标线颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'black',
                    fontSize:'14'
                }
            },//设置字体颜色和大小
            splitLine:{show:false},//隐藏或显示网格线
            type : 'category',
            data : yAxis
        }
    ],
    series : series
};

//堆积条形图------------------------------------------------------------------------
    function getData(){
        var dat = null;
        $.ajax({
            type : "get",
            url : "http://127.0.0.1:3342/test/get/840e78fe-c900-4651-ae4a-a5a23ba438bc/1510885160004",
            dataType : "json",
            contentType : "application/json",
            async : false,// async: false先执行完ajax，在执行ajax后面的语句，(async:
            // true，分两个线程走，执行ajax的同时，回调去执行后面的语句)
            cache : false,// 不对结果进行缓存
            success : function(data) {
                dat = data.data;
            }
        });
        return dat;
    }
var dat = getData();
var mapList = dat.mapList;
var dimensions = dat.dimensions;
var values = dat.values;
var legend = [];
var yAxis = [];
var series = [];
var dk = dimensions[0].name;
for(var j = 0; j < values.length; j++) {
    var serie = {};
    var data = [];
    legend.push(values[j].comment);
    for(var i = 0; i < mapList.length; i++) {
        for (var key in mapList[i]) {
            if (key == values[j].name) {
                data.push(mapList[i][key]);
            } else if(dk == key && j == 0) {
                yAxis.push(mapList[i][key]);
            }
        }
    }
    serie = {
        name:values[j].comment,
        type:'bar',
        stack: '1',//赋相同的任意值，就变成堆积图
        itemStyle: {normal: {
            color:''//设置柱状的颜色
        }},
        data:data
    };
    series.push(serie);
}

option = {
    backgroundColor: 'rgba(0,0,0,0)',//背景色,透明rgba(0,0,0,0)
    title : {
        show: true,//显示隐藏
        text: '条形图',
        x: 'left', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'18'}//字体颜色
    },
    grid:{
        borderWidth:0//设置边框大小
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        orient: 'horizontal', // 'vertical'标题横向或纵向排列
        x: 'right', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'14'},//字体颜色
        data:legend
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            show:true,//显示或隐藏X轴
            axisLine: {
                lineStyle: {
                    color: '#008ACD'//坐标线颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'black',
                    fontSize:'14'
                }
            },//设置字体颜色和大小
            splitLine:{ show:false},//隐藏或显示网格线
            type : 'value'
        }
    ],
    yAxis : [
        {
            show:true,//显示或隐藏Y轴
            axisLine: {
                lineStyle: {
                    color: '#008ACD'//坐标线颜色
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'black',
                    fontSize:'14'
                }
            },//设置字体颜色和大小
            splitLine:{show:false},//隐藏或显示网格线
            type : 'category',
            data : yAxis
        }
    ],
    series : series
};

//标准散点图---------------------------------------------------------------------------------
function getData(){
    var dat = null;
    $.ajax({
        type : "get",
        url : "http://127.0.0.1:3342/test/get/840e78fe-c900-4651-ae4a-a5a23ba438bc/1511159893111",
        dataType : "json",
        contentType : "application/json",
        async : false,// async: false先执行完ajax，在执行ajax后面的语句，(async:
        // true，分两个线程走，执行ajax的同时，回调去执行后面的语句)
        cache : false,// 不对结果进行缓存
        success : function(data) {
            dat = data.data;
        }
    });
    return dat;
}
var dat = getData();
var mapList = dat.mapList;
var dimensions = dat.dimensions;
var values = dat.values;
var legend = [];
var series = [];
var dk = dimensions[0].name;
for(var i = 0; i < mapList.length; i++) {
    for (var key in mapList[i]) {
        if(key == dk) {
            if($.inArray(mapList[i][key],legend) < 0){//jquery去重添加
                legend.push(mapList[i][key]);
            }
        }
    }
}
for(var j = 0; j < legend.length; j++) {
    var serie = {};
    var datas = [];
    for(var i = 0; i < mapList.length; i++) {
        var data = [];
        if(legend[j] == mapList[i][dk]) {
            for (var key in mapList[i]) {
                for(var l = 0; l < values.length; l++) {
                    if (key == values[l].name) {
                        data.push(mapList[i][key]);
                    }
                }
            }
        }
        datas.push(data);
    }
    serie = {
        name: legend[j],
        type: 'scatter',
        data: datas
    }
    series.push(serie);
}

option = {
    backgroundColor: 'rgba(0,0,0,0)',//背景色,透明rgba(0,0,0,0)
    grid:{
        borderWidth:0//设置边框大小
    },
    title : {
        show: true,
        text: '散点图',
        x: 'left', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'20'}//字体颜色


    },
    tooltip : {
        trigger: 'axis',
        showDelay : 0,
        axisPointer:{
            show: true,
            type : 'cross',
            lineStyle: {
                type : 'dashed',
                width : 1
            }
        }
    },
    legend: {
        orient: 'horizontal', // 'vertical'标题横向或纵向排列
        x: 'right', // 'center' | 'left' | {number},标题左右位置
        y: 'top', // 'center' | 'bottom' | {number}标题上下位置
        textStyle: {color: 'black',fontSize:'14'},//字体颜色
        data:legend
    },
    toolbox: {
        show : false,
        feature : {
            mark : {show: true},
            dataZoom : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    xAxis : [
        {
            show:true,//显示或隐藏X轴
            type : 'value',
            scale:true,
            axisLine: {
                lineStyle: {
                    color: '#008ACD'//坐标线颜色
                }
            },
            splitLine:{ show:false},//隐藏或显示网格线
            axisLabel : {
                show: true,
                formatter: '{value}',//{value} cm,添加单位
                textStyle: {//设置字体颜色和大小
                    color: 'black',
                    fontSize:'14'
                }
            }
        }
    ],
    yAxis : [
        {
            show:true,//显示或隐藏Y轴
            type : 'value',
            scale:true,
            axisLine: {
                lineStyle: {
                    color: '#008ACD'//坐标线颜色
                }
            },
            splitLine:{ show:false},//隐藏或显示网格线
            axisLabel : {
                show: true,
                formatter: '{value}',//{value} cm,添加单位
                textStyle: {//设置字体颜色和大小
                    color: 'black',
                    fontSize:'14'
                }
            }
        }
    ],
    series : series
};
