var shuju=[
    {
        bh:"",
        bt:"关于三月份停电通知",
        sj:"2016-03-01",
        cz:"",
        xq:"我随便写的",
        ba:"1"
    },
    {
        bh:"",
        bt:"关于九月份停电通知",
        sj:"2016-03-02",
        cz:"",
        xq:"我随便写的222",
        ba:"2"
    },
    {
        bh:"",
        bt:"关于八月份停电通知",
        sj:"2016-03-03",
        cz:"",
        xq:"我随便写的333",
        ba:"3"
    },
    {
        bh:"",
        bt:"关于七月份停电通知",
        sj:"2016-03-04",
        cz:"",
        xq:"我随便写的333",
        ba:"4"
    },
    {
        bh:"",
        bt:"关于六月份停电通知",
        sj:"2016-03-05",
        cz:"",
        xq:"我随便写的333",
        ba:"5"
    },
    {
        bh:"",
        bt:"关于三月份停电通知",
        sj:"2016-03-06",
        cz:"",
        xq:"我随便写的333",
        ba:"6"
    },
    {
        bh:"",
        bt:"关于三月份停电通知",
        sj:"2016-03-06",
        cz:"",
        xq:"我随便写的333",
        ba:"7"
    },
    {
        bh:"",
        bt:"关于11停电通知",
        sj:"2016-03-06",
        cz:"",
        xq:"我随便写的333",
        ba:"8"
    },{
        bh:"",
        bt:"关于333停电通知",
        sj:"2016-03-06",
        cz:"",
        xq:"我随便写的333",
        ba:"9"
    },{
        bh:"",
        bt:"关于444停电通知",
        sj:"2016-03-06",
        cz:"",
        xq:"我随便写的333",
        ba:"10"
    },
    {
        bh:"",
        bt:"关于555停电通知",
        sj:"2016-03-06",
        cz:"",
        xq:"我随便写的333",
        ba:"11"
    },
    {
        
        bh:"",
        bt:"关于三月份停电通知",
        sj:"2016-03-06",
        cz:"",
        xq:"我随便写的333",
        ba:"12"
    }
]



if(localStorage.getItem('tempArr') == null) {
    localStorage.setItem('tempArr',JSON.stringify(shuju));
}  

$("#tianjia").click(function(){//点击添加按钮弹出添加框
    $("#jia").show();
})
$(".quxiao").click(function(){//点击取消按钮
    $("#jia").hide();   //，弹出框隐藏
})

 //1、获取tbody
var tbody=document.getElementById('neirong');
//2、获取翻页按钮
var pageBox=document.getElementById('pageBox');
//3、每页显示数据
var ymsj=[];
var tempArr=""; 
init();

function init(){//初始化表格
    tempArr = JSON.parse(localStorage.getItem('tempArr'));
    //获取第一页的数据为1页5个
    getymsj(tempArr,1,5);
    //渲染页面数据
    render(ymsj);
    //渲染分页,一页5个
    getye(tempArr.length,5);
}
    function render(ziliao){//添加表格数据
        var str='';
        for(var i=0;i<ziliao.length;i++){   //i是一条数据
            str=str+    //把数据拼接起来成表格样式
                '<tr><td>'+[i+1]+'</td>'+ 
                '<td>'+ziliao[i].bt+'</td>'+
                '<td>'+ziliao[i].sj+'</td>'+
                "<td><a class='xiugai' data-xiu='"+ziliao[i].ba+"'>修改</a><a class='shanchu')>删除</a></td><tr>";
        }
        tbody.innerHTML=str;    //把数据插入到表格里面去
        $('td:last-child').css("color","red")
        $('td:nth-of-type(4)').css("color","blue")
    }

    //设置分页
    function getye(zong,tiao){   //总是总共的消息数，条是每一页设置多少条
        var yeshu=Math.ceil(zong/tiao);     //页数=总数/条数，然后往上取整
        var str='';
        for(var i=1;i<=yeshu;i++){  
            if(i==1){   //因为默认进来是第一页，所以要设置默认的第一页的样式
                str=str+'<li class="active">'+i+'</li>';
            }else{
                str=str+'<li>'+i+'</li>';
            }
        }
        pageBox.innerHTML=str; //把翻页按钮插入到ul里面
    }
    //每页对应的数据
    function getymsj(arr,index,numperpage){ 
        ymsj=arr.slice((index-1)*numperpage,index*numperpage)
        //页面数据就是裁剪（多少个开始，裁剪几个）
        //数组的第几页-一页以后*每一页放多少个。（就是求到他的下标）
        //比如，想算第7页的，每一页有5个。他的最后一个下标是34。因为想要第7页的第一个开始算
        //所以要-1，就是7-1=6  6*5=30   那么那一页，30-34就是第7页的下标了[下标从0开始的，所以是34个]
    }


    //点击切换分页
    $(pageBox).on('click','li',function(){
        getymsj(tempArr,Number($(this).html()),5);
        render(ymsj);
        $(this).addClass('active').siblings('li').removeClass('active')
        //被点击的那个给他样式，其他的取消样式
    });
    //===========================弹出框===========================

    $("#tianjia").click(function(){//点击添加按钮弹出添加框
        $("#jia").show();
    })
    //取消=======
    $(".quxiao").click(function(){//点击取消按钮
        $("#jia").hide();   //，弹出框隐藏
        $("#gai").hide();
    })
    //=====================删除====================

$(tbody).on('click','.shanchu',function(e){  //事件委托的方式
    var e=arguments[0] || window.event;
    var target=e.target || e.srcElement;
    var afather=target.parentNode;
    var tdfather=afather.parentNode;
    var a=$(tdfather).index();  //获取唯一编号的下标
    var zhi=$('.active').text(); //获取是第几个翻页按钮被选中
    
    tempArr.splice(((a/2)+(zhi-1)*5),1);
    //因为引用了btoos的表格，他是2行变1行（有一行是空的），所以要/2。
    //因为翻页，所以要获取到删第几页的第几个。要去掉第一页的，所以是-1，
    //然后*每一页的个数，就能获取到是第几页的第一个了。
    //然后是a的下标+获取到的数字，就是在数组中实际的下标了。
    //然后从新的a下标开始，删除1个。

    //=========本地删
    localStorage.setItem('tempArr',JSON.stringify(tempArr));  
    init();
});


//================添加===========
    
    $('.queding').click(function(){
        var localdata =JSON.parse(localStorage.tempArr);  //唯一编号从12开始。
        var xx = localdata[0].ba > localdata[localdata.length-1].ba ? localdata[0].ba: localdata[localdata.length-1].ba;
        //设置编号，如果数组第一个的下标编号大于最后一个下标的编号，就选择从第一个下标的编号开始算，否则就是从最后一个下标的开始算
        xx++;   //编号++
        var bt=$('#biaoti');    //点击添加的时候，添加的标题就是获取到的标题节点
        var sj=$('#riqi');
        var xq=$('#neirong2');
        var ba; //设置唯一编号
        tempArr.unshift({   //在数组最上面添加
            bt:bt.val(),    //标题节点的内容就是标题的
            sj:sj.val(),
            xq:xq.val(),
            ba:xx   //唯一编号从12开始++
        })
        //清空并隐藏添加菜单
        bt.val(""),
        sj.val(""),
        xq.val(""),
        $('#jia').hide();
    //=========================本地存=====================
        localStorage.setItem('tempArr',JSON.stringify(tempArr));//存数据
        render(tempArr);
        init();
    })



//==================终修改================

var xiu='';
$(tbody).on('click','.xiugai',function(){  //事件委托的方式
    var tempArr =JSON.parse(localStorage.tempArr);   //获取数组
    $("#gai").show();  //修改显示
    var e=arguments[0] || window.event;
    var target=e.target || e.srcElement;
    xiu= $(this).data("xiu");  //获取当前点击的xiu的编号。(上面有给他给唯一编号ba)
    //把数据库里面的内容提出来到修改弹框显示

    for(var i=0;i<tempArr.length;i++){  
       if(tempArr[i].ba==xiu){  //如果，数组里面第i个的编号==修改节点的编号
        $("#biaoti2").val(tempArr[i].bt);    //弹框的内容就是数组第i个的内容
        $("#riqi2").val(tempArr[i].sj);
        $("#neirong3").val(tempArr[i].xq);
        break;
    }
}
    $('.queding2').click(function(){    //点击确定的时候
        var tempArr =JSON.parse(localStorage.tempArr);      //获取数组
        var bt=$('#biaoti2').val();     //定义 标题就是修改后的标题
        var sj=$('#riqi2').val();     //定义 时间就是修改后的时间
        var xq=$("#neirong3").val();     //定义 内容就是修改后的内容

        for(var j=0;j<tempArr.length;j++){  //循环判断
            if(tempArr[j].ba==xiu){     //如果数组的第j个的编号和xiu的编号一样
                tempArr[j].bt=bt;   //数组j的标题就是修改的标题的值
                tempArr[j].sj=sj;   //数组j的时间就是修改的时间的值
                tempArr[j].xq=xq;   //数组j的内容就是修改的内容的值
                break;
            }
        } 
        localStorage.setItem('tempArr',JSON.stringify(tempArr));
        $('#gai').hide();   //修改隐藏
        init();     //获取页面初始值
    })
})