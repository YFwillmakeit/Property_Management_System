var tmepPros = [{
					name: '水费',
					price: 4.30,
					type: '用水量',
					pricetype: '周期性',
					pricetime: '每1月'
				},
				{
					name: '临时停车',
					price: 5,
					type: '小时',
					pricetype: '周期性',
					pricetime: '每1月'
				},
				{
					name: '代步车',
					price: 500,
					type: '用水量',
					pricetype: '周期性',
					pricetime: '每1月'
				},
				{
					name: '天然气',
					price: 4.30,
					type: '每立方',
					pricetype: '周期性',
					pricetime: '每1月'
				},
				{
					name: '公摊费',
					price: 50,
					type: '每平方',
					pricetype: '周期性',
					pricetime: '每1月'
				},
				{
					name: '饮用水',
					price: 3,
					type: '每吨',
					pricetype: '周期性',
					pricetime: '每1月'
				},
				{
					name: '楼道清洁',
					price: 20,
					type: '楼层',
					pricetype: '周期性',
					pricetime: '每6月'
				},
				{
					name: '保护费',
					price: 500,
					type: '每人',
					pricetype: '周期性',
					pricetime: '每1月'
				}
			];
			
			
			var price, name, pricetype, counttype, round, tr = $("<tr></tr>");
			if (localStorage.getItem('pros') == null) { // 初始化一次数据
				localStorage.setItem('pros', JSON.stringify(tmepPros));
			}

			var pros;
			
			var pageData = [];
			initTable();

			function initTable() { //进入页面的初始状态，初始化表格
			    pros = JSON.parse(localStorage.getItem('pros'));
				//默认获取第一页的数据
				getPageData(pros, 1, 5);
				//       渲染页面数据
				render(pageData);
				//        渲染分页
				getPage(pros.length, 5);
			}

			function render(pros) {
				var tr = '';
				for (let i = 0; i < pros.length; i++) {
					var td1 = '<td>' + pros[i].name + '</td>',
						td2 = '<td>' + pros[i].price + '</td>,'
					td3 = '<td>' + pros[i].type + '</td>',
						td4 = '<td>' + pros[i].pricetype + '</td>',
						td5 = '<td>' + pros[i].pricetime + '</td>',
						td6 = "<td><a href='javascript:;' class='del'>删除</a></td>";
					td7 = "<td><a href='javascript:;' class='update'>修改</a></td>";
					tr += '<tr>' + td1 + td2 + td3 + td4 + td5 + td6 + td7 + '</tr>';
					$('tbody').html(tr);
					// console.log(tr);
				}
				del();
				update();
			}

			function getPage(total, numPerPage) { //
				var pageNum = Math.ceil(total / numPerPage);
				var lis = '';
				for (let i = 1; i <= pageNum; i++) {
					if (i == 1) {
						lis += '<li class="active">' + i + '</li>'
					} else {
						lis += '<li>' + i + '</li>'
					}
				}
				$('#pagenum').html(lis);
			}

			function getPageData(arr, index, numPerPage) {
				//1  0*numPerPage ~  numPerPage-1
				//2  numPerPage ~  2numPerPage-1
				//3  2numPerPage ~  3numPerPage-1
				pageData = arr.slice((index - 1) * numPerPage, index * numPerPage)
			}

			$('#pagenum').on('click', 'li', function() {
				getPageData(pros, Number($(this).html()), 5);
				render(pageData);
				$(this).addClass('active').siblings('li').removeClass('active');
			});

			$('tbody').on('click', '.delBtn', function() {
				//在数组中删除数据
				pros.splice($(this).data('index'), 1);
				//渲染页面。渲染分页
				initTable();
			})
			
			//新增收费项目按钮,第一个弹出框
			$('#add').click(function() {
				$('#newproject').css('display', 'block');
			})
			$($('#newproject_btn button')[0]).click(function() {
				var nameCheck = [];
				for (let i = 0; i < pros.length; i++) {
					nameCheck[i] = pros[i].name;
				}
				if ($('#name').val() == '' || !($('#choose1').prop('checked') || $('#choose2').prop('checked') || $('#choose3').prop(
						'checked'))) {
					alert('有内容没填，请完善');
				} else if (nameCheck.indexOf($('#name').val()) != -1) {
					alert('该项目已存在')
				} else {
					$('#newproject').css('display', 'none');
					$('#newproject_s').css('display', 'block');
					$('#newproject_s .name').text($('#newproject #name').val()) //新的名称取出来到第二个弹出框
					// price = $('#newproject_s #price').val();
					name = $('#newproject #name').val();
					pricetype = $('#newproject_radio input[name=choose]:checked').val();
					$(':text').val(''); //清空值
					$("input[name='choose']").prop('checked', false);
				}
			})


			$($('#newproject_btn button')[1]).click(function() {
				$('#newproject').css('display', 'none');
				$(':text').val('');
				$("input[name='choose']").prop('checked', false);
			})

			//第二个弹出框

			//第二个弹出框确定按钮功能
			$($('#newproject_s_btn button')[0]).click(function() {
				var tr = $("<tr></tr>");
				if ($('#price').val() == '' || $('#counttype').val() == '' || $('#round').val() == '') {
					alert('请完善信息');
				} else {
					$('#newproject_s').css('display', 'none');
					price = $('#newproject_s #price').val(); //获取输入框价格
					type = $('#newproject_s #counttype').val(); //获取计量类型
					pricetime = '每' + $('#newproject_s #round').val() + '月'; //获取收费周期

					$("input[name='method']").prop('checked', false);
					//向表格中添加数据
					tr.html("<td>" + name + "</td><td>" + price + "</td>" + "<td>" + type + "</td><td>" + pricetype + "</td><td>" +
						pricetime + "</td>" + "<td><a href='javascript:;'>删除</a></td>");
					$("table").append(tr);

					//将新添加的项目加入到数组对象pros中
					pros.unshift({
						name,
						price,
						type,
						pricetype,
						pricetime
					});
					//将最新的数组对象加入到本地存储
					localStorage.pros = JSON.stringify(pros);
					initTable();
				}
			})
			// console.log(price);
			// console.log(name);
			//第二个弹出窗取消按钮功能
			$($('#newproject_s_btn button')[1]).click(function() {
				$('#newproject_s').css('display', 'none');
				$("input[name='method']").prop('checked', false);
			})

			function del() {
				$('table .del').click(function() {
					if (confirm('确定删除吗？')) {

						$(this).parent().parent().remove();
						var delName = $(this).parent().parent()[0].children[0].innerText;
						//获取删除节点的name
						var delName = $(this).parent().parent()[0].children[0].innerText;
						//遍历数组对象把name相同的删掉
						for (let i = 0; i < pros.length; i++) {
							console.log(pros[i].name);
							if (pros[i].name == delName) {
								pros.splice(i, 1);
								//删除后更新本地存储
								localStorage.pros = JSON.stringify(pros);
								break;
							}
						}
					}
					initTable(); //有问题使用了这个后没法一直删
				})
			}

			var sign; // 存储当前tr节点
			function update() {
				$('table .update').click(function() {
					$('#updateBox').css('display', 'block');
					sign = $(this).parent().parent().children(":first").text();
					console.log(sign);
				})
				//修改框取消按钮
				$($('#updateBox_btn button')[1]).click(function() {
					$('#updateBox').css('display', 'none');
					$(':text').val(''); //清空值
					$("input[name='upchoose']").prop('checked', false);
					$("input[type='number']").prop('value', '');
				})

				//修改框确定按钮
				$($('#updateBox button')[0]).click(function() {
					// =====================================================
					console.log($('#upchoose1'), 1111);
					console.log($('#upchoose2').prop('checked'), 2222);
					console.log($('#upchoose3').prop('checked'), 3333);
					console.log($('#upprice'), 444444);
					console.log($('#upcounttype').val(), 5555);
					console.log($('#upround').val(), 66666);

					// ==========================================
					console.log($(this)[0]);
					pricetype = $('#update_radio input[name=upchoose]:checked').val();
					price = $('#updateBox #upprice').val(); //获取输入框价格
					type = $('#updateBox #upcounttype').val(); //获取计量类型
					pricetime = '每' + $('#updateBox #upround').val() + '月'; //获取收费周期
					name = sign;
					$('.sign td:nth-child(2)').innerText = $('#updateBox #upprice').val();
					$("input[name='method']").prop('checked', false);
					
					
					//先删除
					for (var i = 0; i < pros.length; i++) {
						if (pros[i].name == sign) {
							//将新添加的项目加入到数组对象pros中
							pros.splice(i, 1, {
								name,
								price,
								type,
								pricetype,
								pricetime
							});
							localStorage.pros = JSON.stringify(pros);
							initTable();
						}
					}
					$('#updateBox').css('display', 'none');
					// $('#updateBox #upprice').val() = "";
					// $('#updateBox #upcounttype')[0].value = "";
					// $('#updateBox #upround')[0].value = "";
					// $("input[name='upchoose']").prop('checked', false);

					
					//将最新的数组对象加入到本地存储
					
					

				})
			}

			function update() {
				$('table .update').click(function() {
					$('#updateBox').css('display', 'block');
					sign = $(this).parent().parent().children(":first").text();
					console.log(sign);
				})
				//修改框取消按钮
				$($('#updateBox_btn button')[1]).click(function() {
					$('#updateBox').css('display', 'none');
					$(':text').val(''); //清空值
					$("input[name='upchoose']").prop('checked', false);
					$("input[type='number']").prop('value', '');
				})

				//修改框确定按钮
				$($('#updateBox button')[0]).click(function() {
					// =====================================================
					console.log($('#upchoose1'), 1111);
					console.log($('#upchoose2').prop('checked'), 2222);
					console.log($('#upchoose3').prop('checked'), 3333);
					console.log($('#upprice'), 444444);
					console.log($('#upcounttype').val(), 5555);
					console.log($('#upround').val(), 66666);

					// ==========================================
					console.log($(this)[0]);
					pricetype = $('#update_radio input[name=upchoose]:checked').val();
					price = $('#updateBox #upprice').val(); //获取输入框价格
					type = $('#updateBox #upcounttype').val(); //获取计量类型
					pricetime = '每' + $('#updateBox #upround').val() + '月'; //获取收费周期
					name = sign;
					$('.sign td:nth-child(2)').innerText = $('#updateBox #upprice').val();
					$("input[name='method']").prop('checked', false);
					
					
					//先删除
					for (var i = 0; i < pros.length; i++) {
						if (pros[i].name == sign) {
							//将新添加的项目加入到数组对象pros中
							pros.splice(i, 1, {
								name,
								price,
								type,
								pricetype,
								pricetime
							});
							localStorage.pros = JSON.stringify(pros);
							initTable();
						}
					}
					$('#updateBox').css('display', 'none');
					// $('#updateBox #upprice').val() = "";
					// $('#updateBox #upcounttype')[0].value = "";
					// $('#updateBox #upround')[0].value = "";
					// $("input[name='upchoose']").prop('checked', false);

					
					//将最新的数组对象加入到本地存储
					
					

				})
			}