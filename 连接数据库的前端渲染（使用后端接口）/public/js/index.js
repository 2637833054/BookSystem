$(function () {
	//初始化渲染页面
	function initList() {
		$.ajax({
			type:'get',
			url:'/books',
			dataType:'json',
			success:function (data) {
				var html = template('indexTpl',{list:data});
				$('#dataList').html(html);
				//必须在渲染完成后才能对修改和删除进行DOM操作
				
				$('#dataList').find('tr').each(function (index,element) {
					//$(element)将DOM对象转为jquery对象
					var td = $(element).find('td:eq(5)');
					var id = $(element).find('td:eq(0)').text();
					//绑定编辑图书的单击事件
					td.find('a:eq(0)').click(function () {
						editBook(id);
					});
					//绑定删除图书的单击事件
					td.find('a:eq(1)').click(function () {
						deleteBook(id);
					});


					//绑定添加图书信息的单击事件
					addBook();
					//重置表单
					var form = $('#addBookForm');
					form.get(0).reset();
					form.find('input[type=hidden]').val('');					

				});
			}
		});
	}
	initList();
	//编辑图书信息
	function editBook (id) {
		//根据id查询数据
		$.ajax({
			type:'get',
			url:'/books/book/' + id,
			dataType:'json',
			success:function (data) {
				var form = $('#addBookForm');
				var mark = new MarkBox(600,400,'修改图书',form.get(0));
				mark.init();
				//填充表单数据
				form.find('input[name=id]').val(data.id);
				form.find('input[name=name]').val(data.name);
				form.find('input[name=author]').val(data.author);
				form.find('input[name=category]').val(data.category);
				form.find('input[name=descript]').val(data.descript);
				//对表单提交按钮重新绑定单击事件
				form.find('input[type=button]').unbind('click').click(function () {
					$.ajax({
						type:'put',
						url:'/books/book',
						data:form.serialize(),
						dataType:'json',
						success:function (data) {
							if(data.flag == '1') {
								//关闭弹窗
								mark.close();
								//重新渲染主页数据
								initList();
							}
						}
					});
				});
			}
		});
	}

	//添加图书信息
	function addBook () {
		$('#addBookId').click(function () {
			var form = $('#addBookForm');
			//实例化弹窗对象         .get(0)将jquery对象转为DOM对象
			var mark = new MarkBox(600,400,'添加图书',form.get(0));
			mark.init();
	
			form.find('input[type=button]').unbind('click').click(function () {
				$.ajax({
					type:'post',
					url:'/books/book',
					data:form.serialize(),		//jquery中获取form中全部数据的方法
					dataType:'json',
					success:function (data) {
						if(data.flag == '1') {
							//关闭弹窗
							mark.close();
							//重新渲染主页数据
							initList();
						}
					}
				});
			});
		});
	}

	//删除图书
	function deleteBook (id) {
		$.ajax ({
			type:'delete',
			url:'/books/book/' + id,
			dataType:'json',
			success:function (data) {
				if(data.flag == '1') {
					//重新渲染主页数据
					initList();
				}
			}
		});
	}

});