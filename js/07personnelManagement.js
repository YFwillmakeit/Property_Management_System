let tempData = [{ // 模拟已经有的数据
  name: '王1',
  gender: '男',
  position: '清洁工',
  department: '后勤部',
  phone: '11111111111'
},{
  name: '王2',
  gender: '女',
  position: '保安',
  department: '门卫部',
  phone: '22222222222'
},{
  name: '王3',
  gender: '男',
  position: '修理工',
  department: '后勤部',
  phone: '33333333333'
},{
  name: '王4',
  gender: '女',
  position: '客服',
  department: '咨询部',
  phone: '44444444444'
},{
  name: '王5',
  gender: '女',
  position: '数据录入',
  department: '后台部',
  phone: '55555555555'
},{
  name: '王6',
      gender: '女',
      position: '清洁工',
      department: '后勤部',
      phone: '66666666666'
},{
  name: '王7',
  gender: '女',
  position: '清洁工',
  department: '后勤部',
  phone: '77777777777'
},{
  name: '王8',
  gender: '女',
  position: '清洁工',
  department: '后勤部',
  phone: '88888888888'
},{
  name: '王9',
  gender: '女',
  position: '清洁工',
  department: '后勤部',
  phone: '99999999999'
}];

if(localStorage.getItem('data') == null){// 如果本地没有初始值，则将数据存在本地
  localStorage.setItem('data',JSON.stringify(tempData));
}
let data; // 总数据
let pageData; // 保存一页5条数据的临时数组
let nowPage = 1; // 当前是第几页
init();
// 动态初始化界面
function init() {
  data = JSON.parse(localStorage.getItem('data')); // 从本地获取数据
  getPageData(data,1,5); // 初始化第一页的5条数据
  initTableData(pageData);// 初始化表格数据
  getPage(data.length,5); // 初始化分页页码
  deleteFn(); // 给按钮添加删除事件
  modifyFn(); // 给按钮添加修改事件
}

// 初始化表格数据  参数：（将要初始化的数据的数组）
function initTableData(data) {
  $('tbody')[0].innerHTML = '';
  // console.log($('tbody')[0].innerHTML); // 往后面添加元素就行了
  for (let i = 0; i<data.length; i++) {
    $('tbody')[0].innerHTML += `<tr>
    <td>${data[i].name}</td>
    <td>${data[i].gender}</td>
    <td>${data[i].position}</td>
    <td>${data[i].department}</td>
    <td>${data[i].phone}</td>
    <td>
      <button type="button" class="btn btn-info modify-person">修改信息</button>
      <button type="button" class="btn btn-danger delete-person">删除信息</button>
    </td>
  </tr>`
  }
}

// 新增人员
$('#add-person')[0].onclick = function () {
  // 清空一下遮罩层里面的input内容，因为修改信息和新增人员共享一个遮罩层
  $('#exampleInputName1')[0].value = '';
  $('#exampleInputName2')[0].value = '';
  $('#exampleInputName3')[0].value = '';
  $('#exampleInputName4')[0].value = '';
  $('#exampleInputName5')[0].value = '';
  $('#add-mask')[0].style.display = 'block';
};
$('#add-determine')[0].onclick = function () {// 点击遮罩层里面的确定按钮
  if($('#exampleInputName1')[0].value == ''|| $('#exampleInputName2')[0].value == ''|| $('#exampleInputName3')[0].value == ''|| $('#exampleInputName4')[0].value == ''|| $('#exampleInputName5')[0].value == ''){
    alert('信息输入不完整，请重新输入！');
  }else{
    // 朝table里面新增一行
    let isRepeat = false; // 判断是否重复添加数据
    let tempObj = {};  // 保存现在新增的值
    tempObj.name = $('#exampleInputName1')[0].value;
    tempObj.gender = $('#exampleInputName2')[0].value;
    tempObj.position = $('#exampleInputName3')[0].value;
    tempObj.department = $('#exampleInputName4')[0].value;
    tempObj.phone = $('#exampleInputName5')[0].value;
    data.forEach((value)=>{
      if(value.phone == tempObj.phone){
        alert('添加失败');
        isRepeat = true;
        return
      }
    })
    if(!isRepeat){
      data.unshift(tempObj);
      localStorage.setItem('data',JSON.stringify(data));// 存到本地中
      init();// 重新渲染数据
    }
  }
  $('#add-mask')[0].style.display = 'none';
};
$('#add-cancel')[0].onclick = function () { // 点击遮罩层里面的取消按钮
  $('#add-mask')[0].style.display = 'none';
};

// 删除信息函数
function deleteFn() {
  for (let i = 0; i<$('.delete-person').length; i++) {
    $('.delete-person')[i].onclick = function () {// 出现遮罩层
      $('#delete-mask')[0].style.display = 'block';
      let tempName = this.parentNode.parentNode.children[0].innerText; // 获取当前tr中的name
      $('#delete-determine')[0].onclick = function () { // 确定删除
        data.forEach((value,index)=>{ // 删除数组中的对象
          if(value.name == tempName){
            data.splice(index,1);
            return
          }
        });
        localStorage.setItem('data',JSON.stringify(data));// 存到本地中
        init(); // 重新渲染
        $('#delete-mask')[0].style.display = 'none';
      };
      $('#delete-cancel')[0].onclick = function () { // 取消删除
        $('#delete-mask')[0].style.display = 'none';
      }
    }
  }
}

// 修改信息函数
function modifyFn() {
  for (let i = 0; i<$('.modify-person').length; i++) {
    $('.modify-person')[i].onclick = function () {// 打开遮罩层
      $('#modify-mask')[0].style.display = 'block';
      // this.parentNode.parentNode.children 当前tr的所有td组成的伪数组
      // 点开遮罩层的时候，展现原来的表格信息
      let tempTr = this.parentNode.parentNode;
      $('#exampleInputName6')[0].value = tempTr.children[0].innerText;
      $('#exampleInputName7')[0].value = tempTr.children[1].innerText;
      $('#exampleInputName8')[0].value = tempTr.children[2].innerText;
      $('#exampleInputName9')[0].value = tempTr.children[3].innerText;
      $('#exampleInputName10')[0].value = tempTr.children[4].innerText;

      $('#modify-determine')[0].onclick = function () { // 点击遮罩层里面的确认按钮
        let tempObj = {};  // 保存修改后的值
        tempObj.name = $('#exampleInputName6')[0].value;
        tempObj.gender = $('#exampleInputName7')[0].value;
        tempObj.position = $('#exampleInputName8')[0].value;
        tempObj.department = $('#exampleInputName9')[0].value;
        tempObj.phone = $('#exampleInputName10')[0].value;
        data.forEach((value,index)=>{ // 修改数组中的对象
          if(value.name == tempObj.name){
            data.splice(index,1,tempObj);
            return
          }
        });
        localStorage.setItem('data',JSON.stringify(data));// 存到本地中
        getPageData(data,nowPage,5); // 点击页码时，修改对应的pageData中的5条数据
        initTableData(pageData); // 重新渲染表格
        deleteFn(); // 给按钮添加删除事件
        modifyFn(); // 给按钮添加修改事件
        $('#modify-mask')[0].style.display = 'none';
      };
      $('#modify-cancel')[0].onclick = function () { // 点击遮罩层里面的取消按钮
        $('#modify-mask')[0].style.display = 'none';
      }
    }
  }
}

// 初始化总页码，参数：（总条数，每页条数）
function getPage(total,numPerPage){
  let pageNum = Math.ceil(total/numPerPage);
  let lis='';
  let leftIcon; // 左移按钮
  let rightIcon; // 右移按钮
  for(let i=1;i<=pageNum;i++){
    if(i == 1){
      lis += '<li class="active"><a href="#">'+i+'</a></li>'
    }else{
      lis += '<li><a href="#">'+i+'</a></li>'
    }
  }

  $('.pagination')[0].innerHTML = `${lis}`;
}

// 显示第n页对应的5条数据， 参数：（总数据数组，第几页，每页多少条）
function getPageData(arr,index,numPerPage){
  // 1  0*numPerPage ~  numPerPage-1
  //2  numPerPage ~  2numPerPage-1
  //3  2numPerPage ~  3numPerPage-1
  pageData = arr.slice((index-1)*numPerPage, index * numPerPage)
}

// 点击切换页码
$('.pagination').on('click','li',function(){
  nowPage = Number($(this)[0].children[0].innerText); // 当前是第几页
  getPageData(data,nowPage,5); // 修改对应的pageData中的5条数据
  initTableData(pageData); // 表格显示对应的数据
  deleteFn();
  modifyFn();
  $(this).addClass('active').siblings('li').removeClass('active'); // 当前的页码加上背景色
});