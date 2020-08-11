

var datas = [
    {
        numberx:'0',
        id:"1-1-704",
        name:"水费",
        stime:'123',
        etime:'123',
        jg:'456',
        qm:'123',
        zm:'456',
        sh:'456',
        money:'300',
        zt:'待缴费'

 },
 {
    numberx:'1',
    id:"1-1-704",
    name:'水费',
    stime:'123',
    etime:'123',
    jg:'456',
    qm:'123',
    zm:'456',
    sh:'456',
    money:'300',
    zt:'待缴费'

 },
 {
    numberx:'2',
    id:"1-1-704",
    name:'水费',
    stime:'123',
    etime:'123',
    jg:'456',
    qm:'123',
    zm:'456',
    sh:'456',
    money:'300',
    zt:'待缴费'

 },
 {
    numberx:'3',
    id:"1-1-704",
    name:'水费',
    stime:'123',
    etime:'123',
    jg:'456',
    qm:'123',
    zm:'456',
    sh:'456',
    money:'300',
    zt:'待缴费'

    },
    {
    numberx:'4',
    id:"1-1-704",
    name:'水费',
    stime:'123',
    etime:'123',
    jg:'456',
    qm:'123',
    zm:'456',
    sh:'456',
    money:'300',
    zt:'待缴费'

 },
 {
    numberx:'5',
    id:"1-1-704",
name:'水费',
stime:'123',
etime:'123',
jg:'456',
qm:'123',
zm:'456',
sh:'456',
money:'300',
zt:'待缴费'

 },
 {
    numberx:'6',
    id:"1-1-705",
name:'水费',
stime:'123',
etime:'123',
jg:'456',
qm:'123',
zm:'456',
sh:'456',
money:'300',
zt:'待缴费'

 },
 {
    numberx:'7',
    id:"1-1-705",
name:'水费',
stime:'123',
etime:'123',
jg:'456',
qm:'123',
zm:'456',
sh:'456',
money:'300',
zt:'待缴费'

 },
 {
    numberx:'8',
    id:"1-1-705",
name:'水费',
stime:'123',
etime:'123',
jg:'456',
qm:'123',
zm:'456',
sh:'456',
money:'300',

zt:'待缴费'
 },
 {
    numberx:'9',
    id:"1-1-706",
name:'水费',
stime:'123',
etime:'123',
jg:'456',
qm:'123',
zm:'456',
sh:'456',
money:'300',
zt:'待缴费'

 },
 {
    numberx:'10',
    id:"1-1-706",
name:'水费',
stime:'123',
etime:'123',
jg:'456',
qm:'123',
zm:'456',
sh:'456',
money:'300',
zt:'待缴费'

 },
 {
    numberx:'11',
    id:"1-1-706",
name:'水费',
stime:'123',
etime:'123',
jg:'456',
qm:'123',
zm:'456',
sh:'456',
money:'300',
zt:'待缴费'

 },
 {
    numberx:'12',
    id:"1-1-706",
name:'水费',
stime:'123',
etime:'123',
jg:'456',
qm:'123',
zm:'456',
sh:'456',
money:'300',
zt:'待缴费'

 },
 {
    numberx:'13',
    id:"1-1-706",
name:'水费',
stime:'123',
etime:'123',
jg:'456',
qm:'123',
zm:'456',
sh:'456',
money:'300',
zt:'待缴费'

 },
 {
    numberx:'14',
    id:"1-1-707",
name:'水费',
stime:'123',
etime:'123',
jg:'456',
qm:'123',
zm:'456',
sh:'456',
money:'300',
zt:'待缴费'

 },
 {
    numberx:'15',
    id:"1-1-707",
name:'水费',
stime:'123',
etime:'123',
jg:'456',
qm:'123',
zm:'456',
sh:'456',
money:'300',
zt:'待缴费'

 },
 {
    numberx:'16',
    id:"1-1-707",
name:'水费',
stime:'123',
etime:'123',
jg:'456',
qm:'123',
zm:'456',
sh:'456',
money:'300',

zt:'待缴费'
 }



    ];
  
    if(localStorage.getItem('datas') == null){
        localStorage.setItem("datas",JSON.stringify(datas)); //  往本地存datas这个数组  
    }
    datas=JSON.parse(localStorage.getItem("datas"));  //从本地取出datas这个数组  
    var pageData = [];
    var tableBody = document.querySelector('#personInfo tbody');
    var pageBox = document.querySelector('#pageBox');
    
    function initTable(){
        getPageData(datas,1,5);
        render(pageData);
        getPage(datas.length,5);
    }
    function render(datas){
        var pros = JSON.parse(localStorage.getItem("pros"));
        var customer = JSON.parse(localStorage.getItem("customer"));
        var trData = ''
        for(var i =0;i<datas.length;i++){
            trData += "<tr>" +
            "<td><button class='jf btn btn-info' >缴费</button></td>" +
            "<td>"+datas[i].numberx+"</td>" +
            "<td>"+datas[i].id+"</td>" +
            "<td>"+datas[i].name+"</td>" +
            "<td>"+datas[i].stime+"</td>" +
            "<td>"+datas[i].etime+"</td>" +
            "<td>"+pros[0].price+"</td>" +
            "<td>"+customer[i].start+"</td>" +
            "<td>"+customer[i].end+"</td>" +
            "<td>"+customer[i].loss+"</td>" +
            "<td>"+datas[i].money+"</td>" +
            "<td><button class='delBtn btn btn-danger' data-index='"+i+"'>删除</button></td>" +
            "<td>"+datas[i].zt+"</td>" +
            "</tr>" ;
        }
        tableBody.innerHTML = trData;
    }
    function getPage(total,numPerPage){
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

    $('#pageBox').on('click','li',function(){
        getPageData(datas,Number($(this)[0].children[0].innerText),5);
        render(pageData);
        $(this).addClass('active').siblings('li').removeClass('active');
    });
    $('#pageBox2').on('click','li',function(){
        getPageData(cxh,Number($(this).html()),5);
        render(pageData);
        $(this).addClass('active').siblings('li').removeClass('active');
    });
 
    var addBtn = $('#add');
    var dh=16;

    addBtn.click(function(){
        
        dh++
        var id=$('#id')
        var name =$('#name');
        var stime =$('#stime');
        var etime =$('#etime');
        var jg =$('#jg');
        var qm =$('#qm');
        var zm =$('#zm');
        var sh =$('#sh');
        var money =$('#money');
        var shh=zm.val()-qm.val();
        var moneyy=jg.val()*shh;
        var numberx=dh;
       if((id.val()||name.val()||stime.val()||etime.val()||jg.val()||qm.val()||zm.val())==0){
           alert('请输入值')
       }
       else{
        datas.push({
            id:id.val(),
            name:name.val(),
            stime:stime.val(),
            etime:etime.val(),
            jg:pros[0].price,//jg.val(),
            qm:qm.val(),
            zm:zm.val(),
            sh:shh,
           money:moneyy,
           numberx:numberx,
           zt:'待缴费'
           
        });
        alert('添加成功')
           
       }
       localStorage.setItem("datas",JSON.stringify(datas));
 
       
        initTable();
    })

    $(tableBody).on('click','.delBtn',function(){
        var p=$(this).parent().parent()[0].children[1].innerText;
        
        for(var i=0;i<datas.length;i++){
            if(datas[i].numberx==p){
                datas.splice(i,1)
                localStorage.setItem("datas",JSON.stringify(datas));
            }
        }

        initTable();
    })

    $(tableBody).on('click','.jf',function(){
        var p=$(this).parent().parent()[0].children[1].innerText;
        for(var i=0;i<datas.length;i++){
            if(datas[i].numberx==p){
              alert('该用户需要缴费：'+datas[i].money)
              datas[i].zt='已缴费'
            }
        }
        initTable();
    })

    var cxh=[];             
    var input1=document.getElementById('input1');
   
    $('#button1').click (function(){
        cxh=[]
        if(cxh.length==0){
            var select=$('#input1').val();
            var find= false;
            for(var i=0;i<datas.length;i++){
                 if(datas[i].id==input1.value){
                     cxh.unshift(datas[i]);
                     find=true
                 }  
        } 
            if(find==false){
                alert('用户不存在')
            }
   }
   
   var pageData2=cxh;
   var tableBody2=document.querySelector('#personInfo2 tbody');
   var pageBox2=document.querySelector('#pageBox2');
   initTable2();
    function initTable2(){      
        getPageData(cxh,1,5);
        render2( pageData2);
        getPage(cxh.length,5);
        function render2(cxh){
        var trData = ''
       
        for(var i =0;i<cxh.length;i++){
           
            trData += "<tr>" +
             "<td><button class='jf btn btn-info' >缴费</button></td>" +
            "<td>"+cxh[i].numberx+"</td>" +
            "<td>"+cxh[i].id+"</td>" +
            "<td>"+cxh[i].name+"</td>" +
            "<td>"+cxh[i].stime+"</td>" +
            "<td>"+cxh[i].etime+"</td>" +
            "<td>"+cxh[i].jg+"</td>" +
            "<td>"+cxh[i].qm+"</td>" +
            "<td>"+cxh[i].zm+"</td>" +
            "<td>"+cxh[i].sh+"</td>" +
            "<td>"+cxh[i].money+"</td>" +
            "<td><button class='delBtn btn btn-danger'  data-index='"+i+"'>删除</button></td>" +
            "<td>"+datas[i].zt+"</td>" +
            "</tr>" ;
          
        }
        tableBody2.innerHTML = trData;
       
  }  
    }
    var y;
    $(tableBody2).on('click','.delBtn',function(){
        console.log('123')
          y=$(this).parent().parent()[0].children[1].innerText
         for(var i=0;i<datas.length;i++){
             if(y==datas[i].numberx){
                datas.splice(i,1)
                initTable()
                console.log(datas)
                localStorage.setItem("datas",JSON.stringify(datas));
             }
         }
        cxh.splice($(this).data('index'),1);
        initTable2();
 
    }) 
    });
$('#button3').click(function(){
    $('#personInfo').hide()
    $('#personInfo2').show()
    $('#pageBox').hide()
    $('#p1').show()
    $('#divx').hide()
    $('#add').hide()
   
}
)
$('#button2').click(function(){
    
    $('#personInfo').show()
    $('#personInfo2').hide()
    $('#pageBox').show()
    $('#divx').show()
    $('#p1').hide()
    initTable()
    $('#add').show()
})
initTable();