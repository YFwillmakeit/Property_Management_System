$('.month').click(function () {
    $(this).next('ul').toggle()
})
var customer = [
    {
        number: '1-1-704',
        project: '水费',
        start: 1234,
        end: 2345,
        times: 2,
        loss: 3.5,
    },
    {
        number: '1-1-104',
        project: '水费',
        start: 1234,
        end: 2345,
        times: 2,
        loss: 3.5,
    },
    {
        number: '1-1-204',
        project: '水费',
        start: 1234,
        end: 2345,
        times: 2,
        loss: 3.5,
    },
    {
        number: '1-1-304',
        project: '水费',
        start: 1234,
        end: 2345,
        times: 2,
        loss: 3.5,
    },
    {
        number: '1-1-404',
        project: '水费',
        start: 1234,
        end: 2345,
        times: 2,
        loss: 3.5,
    },
    {
        number: '1-1-504',
        project: '水费',
        start: 1234,
        end: 2345,
        times: 2,
        loss: 3.5,
    }
];
localStorage.setItem("customer", JSON.stringify(customer)); //  往本地存customer这个数组  
customer = JSON.parse(localStorage.getItem("customer"));  //从本地取出customer这个数组
var alertarr = JSON.parse(localStorage.getItem("alterArr"));


var pageData = [];
var pageBox = document.querySelector('#pageBox');
initTable();
function initTable() {//进入页面的初始状态，初始化表格
    //默认获取第一页的数据
    getPageData(customer, 1, 5);
    //        渲染页面数据
    render(pageData);
    //        渲染分页
    getPage(customer.length, 5);
}
function render(customer) {
    var trData = '';
    for (var i = 0; i < customer.length; i++) {
        trData += '<tr><td>' + alertarr[i].bianhao + '</td>' +
            '<td>' + customer[i].project + '</td>' +
            '<td>' + customer[i].start + '</td>' +
            '<td>' + customer[i].end + '</td>' +
            '<td>' + customer[i].times + '</td>' +
            '<td>' + customer[i].loss + '</td>' +
            '<td><a href="javascript:;">删除</a></td><tr>';;
    }
    $('#content').html(trData);
}
function getPage(total, numPerPage) {//
    var pageNum = Math.ceil(total / numPerPage);
    var lis = '';
    for(let i=1;i<=pageNum;i++){
        if(i == 1){
          lis += '<li class="active"><a href="#">'+i+'</a></li>'
        }else{
          lis += '<li><a href="#">'+i+'</a></li>'
        }
      }
    pageBox.innerHTML = lis;
}
function getPageData(arr, index, numPerPage) {
    pageData = arr.slice((index - 1) * numPerPage, index * numPerPage)
}
$(pageBox).on('click', 'li', function () {
    getPageData(customer, Number($(this)[0].children[0].innerText), 5);
    render(pageData);
    $(this).siblings('li').removeClass('active');
    $(this).addClass('active');
});
// 分页函数结束

//底部添加功能
$('#data-info-add').click(function () {
    var find = $('#addsure').index();
    if (find == -1) {    //判断是否生成输入框
        var addstr = '';
        addstr += '<tr><td><input type="text" class="add"></td>' +            //生成一排输入框
            '<td><input type="text" class="add"></td>' +
            '<td><input type="text" class="add"></td>' +
            '<td><input type="text" class="add"></td>' +
            '<td><input type="text" class="add"></td>' +
            '<td><input type="text" class="add"></td>' +
            '<td><a href="javascript:;" id ="addsure">确定</a></td><tr>';
        $('#content').append(addstr);    //添加到表格最下方
        $('#addsure').click(function () {
            customer = JSON.parse(localStorage.getItem("customer"));  //从本地取出customer这个数组
            customer[customer.length] = {    //向数组中添加对象
                number: $('.add:eq(0)').val(),
                project: $('.add:eq(1)').val(),
                start: $('.add:eq(2)').val(),
                end: $('.add:eq(3)').val(),
                times: $('.add:eq(4)').val(),
                loss: $('.add:eq(5)').val()
            }
            localStorage.setItem("customer", JSON.stringify(customer)); //  往本地存customer这个数组  
            customer = JSON.parse(localStorage.getItem("customer"));  //从本地取出customer这个数组
            initTable()
        })

    }
})
$('#data-info').click(function () {
    var e = arguments[0] || window.event;
    var target = e.target || e.srcElement;
    var afather = target.parentNode;          //td
    var tdfather = afather.parentNode;   //tr
    a = $(tdfather).index();    //当前点击的是第几行
    var lival = $('.active').text();
    if (target.text == '删除') {
        customer = JSON.parse(localStorage.getItem("customer"));  //从本地取出customer这个数组
        customer.splice(((a+1)/2+(lival-1)*5), 1);
        localStorage.setItem("customer", JSON.stringify(customer));
        initTable()
    }
})
