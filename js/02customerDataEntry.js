/**
 * Created by lenovo on 2020/8/10.
 */

    //左边的二级菜单
    $(".dong").click(function(){
        $(this).next('ul').toggle().parent('li').siblings().find('.floor').hide()
    });
    //头部的五角星变色
    $('.tou').click(function(){
        $(this).siblings('span').css('color','red').parent('li').siblings().find('span').css('color','yellow');
    });


// =========================================================右边表单操作================================================
    //原始本地数据
    var initData=[
        {
            louyu:'一号楼',
            bianhao:'1-1-204',
            names:'丽丽',
            ceng:2,
            tell:'18952316846',
            mianji:127,
            zhuangtai:'租客'
        },
        {
            louyu:'二号楼',
            bianhao:'1-1-204',
            names:'老苟',
            ceng:2,
            tell:'15364952161',
            mianji:147,
            zhuangtai:'租客'

        },
        {
            louyu:'二号楼',
            bianhao:'3-1-604',
            names:'二哈',
            ceng:6,
            tell:'13584521594',
            mianji:167,
            zhuangtai:'租客'

        },{
            louyu:'四号楼',
            bianhao:'4-1-301',
            names:'孙悟空',
            ceng:3,
            tell:'15648461521',
            mianji:127,
            zhuangtai:'业主'

        },
        {
            louyu:'五号楼',
            bianhao:'5-1-504',
            names:'秋秋',
            ceng:5,
            tell:'15686468222',
            mianji:147,
            zhuangtai:'业主'

        },
        {
            louyu:'三号楼',
            bianhao:'3-1-604',
            names:'萨',
            ceng:6,
            tell:'15899546481',
            mianji:167,
            zhuangtai:'租客'

        }
    ];
    // 先把假数据 存到本地
    if(localStorage.getItem('alterArr') == null) {
        localStorage.setItem('alterArr',JSON.stringify(initData));
    }
    var alterArr=JSON.parse(localStorage.alterArr);      //从本地取出数据;
    var tbody=document.getElementById('neirong');
    var pageBox=document.getElementById('pageBox');
    initTable();
    search();
    //进入页面的初始状态，初始化表格
    function initTable(){
        getPageData(alterArr,1,5);    //默认获取第一页的数据
        render(pageData);  //        渲染页面数据
        getPage(alterArr.length,5);  //        渲染分页
    }
    //把数据插入到表格里面去
    function render(initData){
            var str='';
            for(var i=0;i<initData.length;i++){   //i是一条数据
                str +=
                    '<tr>'+'<td>'+initData[i].louyu+'</td>'+
                    '<td>'+initData[i].bianhao+'</td>'+
                    '<td>'+initData[i].names+'</td>'+
                    '<td>'+initData[i].ceng+'</td>'+
                    '<td>'+initData[i].tell+'</td>'+
                    '<td>'+initData[i].mianji+'</td>'+
                    '<td>'+initData[i].zhuangtai+'</td>'+
                    '<td><a id="revise"  data-index="'+i+'"  href="javascript:;" >修改</a> <a id="delete"  data-index="'+i+'"  href="javascript:;">删除</a></td>'+
                    '</tr>'
            }
            tbody.innerHTML=str;
        }
    // 加按钮li   分页
    function getPage(total,tiao){   //总是总共的消息数，条是每一页设置多少条
        var pageNum=Math.ceil(total/tiao);     //页数=总数/条数，然后往上取整
        var lis='';
        for(let i=1;i<=pageNum;i++){
            if(i == 1){
              lis += '<li class="active"><a href="#">'+i+'</a></li>'
            }else{
              lis += '<li><a href="#">'+i+'</a></li>'
            }
          }
        pageBox.innerHTML=lis;
    }
    // 每页对应的数据
    function getPageData(arr,index,numperpage){
        pageData=arr.slice((index-1)*numperpage,index*numperpage);
    }
    // 点击按钮切换分页
    $(pageBox).on('click','li',function(){
        getPageData(initData,Number($(this)[0].children[0].innerText),5);
        render(pageData);
        $(this).addClass('active').siblings('li').removeClass('active')
    });

//==========================================================添加======================================================
    // 添加里面的确定按钮
    $('.tou').eq(0).click(function(){  //点击添加按钮弹出模态框
        $('.box').show();
        //清空数据
        $('.bigBox').text('');

    });
    queding();
    //添加确定按钮
    function queding(){
        $('#anniu>button').eq(0).click(function(){
            $(".box").hide();   //，弹出框隐藏

            var louYu=$("#louyu").val();       //---------------------------楼宇的值
            var zhuangTai=$("#zhuangtai").val();  //---------------------------入住状态的值
            var bianhao=$(".bianhao").val(); //---------------------客户编号
            var kehuName=$(".names").val();  //--------------------客户名字
            var ceng=$('.ceng').val(); // ---------------------------楼层
            var tell=$('.tell').val(); //----------------------------电话
            var mianji=$('.mianji').val();//-----------------------面积
            var shoufei='';   //----------------------------------收费项目，余额
            initData.unshift(
                {
                    louyu:louYu,
                    bianhao:bianhao,
                    names:kehuName,
                    ceng:ceng,
                    tell:tell,
                    mianji:mianji,
                    zhuangtai:zhuangTai,
                    shoufei:shoufei
                });
            initTable();
            localStorage.setItem('alterArr',JSON.stringify(initData));   //存数据到浏览器  给个变量表示存入的数组
            alterArr=JSON.parse(localStorage.alterArr);      //取出数据
            render(alterArr);
            initTable();
        });

    }
    //添加里面的取消按钮
    $('#anniu>button').eq(1).click(function(){
        $(".box").hide();   //，弹出框隐藏
    });

// ==========================================================修改======================================================
    var flagNumber; // 点击时候获取唯一编号
    //修改按钮
    $('table').on('click','#revise',function(){
        flagNumber = $(this)[0].parentNode.parentNode.children[1].innerHTML;
        $(".box1").show();
        $('#louyu1').val($(this)[0].parentNode.parentNode.children[0].innerText);
        $('.bianhao1').val($(this)[0].parentNode.parentNode.children[1].innerText);
        $('.names1').val($(this)[0].parentNode.parentNode.children[2].innerText);
        $('.ceng1').val($(this)[0].parentNode.parentNode.children[3].innerText);
        $('.tell1').val($(this)[0].parentNode.parentNode.children[4].innerText);
        $('.mianji1').val($(this)[0].parentNode.parentNode.children[5].innerText);
        $('#zhuangtai1').val($(this)[0].parentNode.parentNode.children[6].innerText);
        arr= $(this).parent().parent().index();
    });
    //修改里面的确定
    $('#anniu1>button').eq(0).click(function() {
        alterArr = JSON.parse(localStorage.alterArr); // 拿到了本地数据
        var input1 = $('#louyu1').val();
        var input2 = $('.bianhao1').val();
        var input3 = $('.names1').val();
        var input4 = $('.ceng1').val();
        var input5 = $('.tell1').val();
        var input6 = $('.mianji1').val();
        var input7 = $('#zhuangtai1').val();
        var tempObj = {
            louyu: input1,
            bianhao: input2,
            names: input3,
            ceng: input4,
            tell: input5,
            mianji: input6,
            zhuangtai: input7
        }
        alterArr.forEach((value,index)=> {
            if(value.bianhao == flagNumber)
            {
                alterArr.splice(index, 1, tempObj);
               initTable();
                localStorage.setItem('alterArr',JSON.stringify(alterArr));   //存数据到浏览器  给个变量表示存入的数组            
                $(".box1").hide();// 弹出框隐藏
            }
         });
    })
    //修改里面的取消按钮
    $('#anniu1>button').eq(1).click(function(){
            $(".box1").hide();
        });

//===========================================================删除======================================================
    //删除按钮
    $('table').on('click','#delete',function(e){   //选中删除
        var flag = confirm("是否删除？");
        if(flag){
            alterArr.splice($(this).data('index'),1);
            localStorage.removeItem('alterArr');
            localStorage.setItem('alterArr',JSON.stringify(alterArr));
            initTable();
        }
    });


// =======================================================右上角搜索================================================
    function search() {
        var searchArr = [];
        $('#run')[0].onclick = function () {
                if($('#search')[0].value.trim() != ''){
                    for(var i = 0; i<alterArr.length; i++){
                        if(alterArr[i].bianhao == $('#search')[0].value.trim()){
                            searchArr = alterArr.slice(i,i+1)
                        }
                    }

                    // 渲染过滤出来的表格数据
                    render(searchArr);
                    getPageData(searchArr,1,5);
                    getPage(searchArr.length,5);
            }

        }
    }

//====================================================左边列表的操作====================================================
//    $('.floor').on("click","li",function(){
//        console.log($(this).text());
//
//    })
//====================================================左边列表的操作====================================================
$('.north').on("click",".dong",function(){
    searchArr = [];
    console.log($(this).text());
    dongThis = $(this);
    var flag = 0;
    $.each(alterArr,function(index,ele){
        console.log(ele);
        console.log(ele.louyu);
        console.log(dongThis.text().trim());
        if((ele.louyu.trim())==(dongThis.text().trim())){
            console.log('wo jin lai le');
            searchArr.push(alterArr[index]);
        }
    })
    //for(var i = 0; i<alterArr.length; i++){
    //
    //    if(alterArr[i].louyu == $(this).text()){
    //        searchArr.push(alterArr[i]);
            //searchArr.push(
            //    {
            //        louyu:alterArr[i].louyu,
            //        bianhao:alterArr[i].bianhao,
            //        names:alterArr[i].names,
            //        ceng:alterArr[i].ceng,
            //        tell:alterArr[i].tell,
            //        mianji:alterArr[i].mianji,
            //        zhuangtai:alterArr[i].zhuangtai
            //    });

        //}

    //}
    console.log(searchArr);
    render(searchArr);
    getPageData(searchArr,1,5);
    getPage(searchArr.length,5);
});