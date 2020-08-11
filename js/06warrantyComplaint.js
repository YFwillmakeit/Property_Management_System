
var repairinfo =[
    {
        type:'报修',
        owner:'01楼01单元01室',
        phonenumber:1111111111,
        state:'未受理',
        date:'2020-08-04',
        details:'垃圾桶烂掉了，快来个人换一下。'
    },
    {
        type:'报修',
        owner:'02楼02单元02室',
        phonenumber:2222222222,
        state:'未受理',
        date:'2020-08-04',
        details:'漏水了，我好慌,在线等，急急急！'
    },
    {
        type:'投诉',
        owner:'03楼03单元03室',
        phonenumber:3333333333,
        state:'未受理',
        date:'2020-08-04',
        details:'我测试看看能不能投诉。'
    },
    {
        type:'投诉',
        owner:'04楼04单元04室',
        phonenumber:4444444444,
        state:'未受理',
        date:'2020-08-04',
        details:'地没扫干净，麻烦重新打扫一下。'
    },
    {
        type:'报修',
        owner:'05楼05单元05室',
        phonenumber:5555555555,
        state:'未受理',
        date:'2020-08-04',
        details:'下水道堵住了，这味道有毒，快来救我。'
    },
    {
        type:'投诉',
        owner:'06楼06单元06室',
        phonenumber:6666666666,
        state:'未受理',
        date:'2020-08-04',
        details:'这个电梯是真的慢，我走路都比他快，淦！'
    }
];

console.log(localStorage.getItem('repairinfo') == null);
if(localStorage.getItem('repairinfo') == null){
    localStorage.setItem("repairinfo",JSON.stringify(repairinfo)); //  往本地存repairinfo这个数组  
}
repairinfo=JSON.parse(localStorage.getItem("repairinfo"));  //从本地取出 repairinfo这个数组  
// window.onload =  fun1(repairinfo); //页面创建时根据后台数据创建表格内容
var a;   //后面获取第几行要用的
var table=document.getElementById('#repair-info'); 

$('#repair-info').click(function(e){
    var e = arguments[0] || window.event;
    var target = e.target || e.srcElement;
    var afather = target.parentNode;          //td
    var tdfather = afather.parentNode;   //tr
    var lival = $('.active').text();
    a = $(tdfather).index();    //当前点击的是第几行
    console.log(a);
    if(target.text=='报修'||target.text=='投诉'){  
        $('#repair-alert').show();  //显示当前框
        $('#repair-alert p:first-child span:first-child').text('类型：'+repairinfo[((a+2)/2-1)+(lival-1)*5].type)   //类型
        $('#repair-alert p:first-child span:nth-child(2)').text('业主：'+repairinfo[((a+2)/2-1)+(lival-1)*5].owner)   //业主
        $('#repair-alert p:nth-child(2) span:first-child').text('手机号：'+repairinfo[((a+2)/2-1)+(lival-1)*5].phonenumber)   //手机号  
        $('#repair-alert p:nth-child(2) span:nth-child(2)').text('状态：'+repairinfo[((a+2)/2-1)+(lival-1)*5].state)   //状态
        $('#repair-alert p:nth-child(3) span:first-child').text('日期：'+repairinfo[((a+2)/2-1)+(lival-1)*5].date)   //日期
        $('#repair-alert p:nth-child(3) span:first-child').text('详情：'+repairinfo[((a+2)/2-1)+(lival-1)*5].details)   //详情
        $('#repair-alert button:nth-child(2)').click(function(){   //点击关闭，关闭弹出框
        $('#repair-alert').hide()
        });
        $('#repair-alert button:first-child').click(function(){    //点击受理，弹出派遣人员框
            $("#worker").val("");
            $('#repair-alert').hide();             //关闭第一个弹框
            $('#repair-worker').show();//打开派遣人员弹窗
        });
        $('#repair-worker>div>p button:first-of-type').click(function(){   //点击派遣人员框的确定按钮
            if($('#worker').val()==''||$('#worker-tel').val()==''){
                alert('维修人员信息不能为空！');               
            }else{
                $('#repair-worker').hide();   //关闭派遣人员框
                repairinfo[(a+2)/2-1+(lival-1)*5].state='已受理';
                $('tr:eq('+(a+1)+')>td:eq(4)').text('已受理');
                localStorage.setItem("repairinfo",JSON.stringify(repairinfo));
            }
           
        });
        localStorage.removeItem(repairinfo)
        $('#repair-worker>div>p button:last-of-type').click(function(){  //点击派遣人员框的取消按钮
            $('#repair-worker').hide(); //关闭派遣人员框  
        });               //取消按钮结束          
    }     //if循环结束，报修或投诉的点击事件结束
    if(target.text=='删除'){
        // $('tr:eq('+(a+1)+')').hide();
        repairinfo.splice((a/2+(lival-1)*5), 1);
        console.log('这是A'+a)
        localStorage.setItem("repairinfo",JSON.stringify(repairinfo));
        initTable()
    }
});


//分页

// function cutpage(){   //分页函数开始
var pageData = [];
var pageBox = document.querySelector('#pageBox');
initTable();
function initTable(){//进入页面的初始状态，初始化表格
  //默认获取第一页的数据
    getPageData(repairinfo,1,5);
//        渲染页面数据
    render(pageData);
    //        渲染分页
    getPage(repairinfo.length,5);
}
function render(repairinfo){
    var trData = '';
    var li = $('.active').text();
    for(var i =0;i<repairinfo.length;i++){
        trData += '<tr><td>'+(i+1)+'</td>'+
                            '<td><a href="javascript:;">'+repairinfo[i].type+'</a></td>'+
                            '<td>'+repairinfo[i].owner+'</td>'+
                            '<td>'+repairinfo[i].date+'</td>'+
                            '<td>'+repairinfo[i].state+'</td>'+
                            '<td><a href="javascript:;">删除</a></td><tr>';;
    }
    $('#t1').html(trData);
}
function getPage(total,numPerPage){//
    var pageNum = Math.ceil(total/numPerPage);
    var lis='';
    for(let i=1;i<=pageNum;i++){
        if(i == 1){
          lis += '<li class="active"><a href="#">'+i+'</a></li>'
        }else{
          lis += '<li><a href="#">'+i+'</a></li>'
        }
      }
    pageBox.innerHTML = lis;
}
function getPageData(arr,index,numPerPage){
    pageData = arr.slice((index-1)*numPerPage, index * numPerPage)
}
$(pageBox).on('click','li',function(){
    getPageData(repairinfo,Number($(this)[0].children[0].innerText),5);
    render(pageData);
    $(this).siblings('li').removeClass('active');
    $(this).addClass('active');
});
// 分页函数结束