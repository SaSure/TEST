(function() {
	
	//加载登录cookie数据
	var loginInfo = LsyStorage.getItem('userData');
	var userInfo = loginInfo;
	var userId = userInfo.Role.Id

	var pageIndex = 1;
	var pageSize = 20;
	
	var hasFile = false;
	//资料列表
	var FilesList = $('#FilesList').datagrid({
		rownumbers: true,
		striped: true,
		fitColumns: true,
		url: window.baseUrl + '/learningmaterials',
		loadMsg: '正在加载数据。。。',
		emptyMsg: '没有数据记录',
		toolbar: '#zlfx-tool',
		pagination: true,
		pageNumber: pageIndex,
		pageSize: pageSize,
		pageList: [20, 40],
		method: 'GET',
		queryParams: {},
		loadFilter: function(data) {
			//      	console.log(data)
			if(data.Count) {
				return {
					rows: data.Items,
					total: data.Count
				}
			}
			return {
				rows: [],
				total: 0
			}
		},
		columns: [
			[{
					field: 'FileName',
					title: '资料名称',
					width: '20%'
				},
				{
					field: 'Type',
					title: '分类',
					width: '20%'
				},
				{
					field: 'FileExt',
					title: '格式类型',
					width: '20%'
				},
				{
					field: 'UploadDate',
					title: '上传事件',
					width: '20%',
					formatter: fmt_time
				},
				{
					field: 'Name',
					title: '贡献者',
					width: '20%'
				},
				{
					field: '#',
					title: '操作',
					width: '25%',
					formatter: fmt_setting
				},
			]
		]

	});

	//搜索按钮点击事件
	$('.zlfx-Search').on('click', function() {
		var search_text = $('#search-text').val();
		$.ajax({
			type: "get",
			url: ""
		});
	})

	//上传点击事件
	$('.zlfx-upload').on('click', function() {
		$('#uploadForm').window('open');
	});
	//关闭窗口
	$('#close_Window').click(function() {
		$('#uploadForm').window('close');
	})
	//确认上传
	$('#btn-enter-upload').on('click', function() {
		var type = $('#type').combobox('getValue');
		if(hasFile){
			$.ajax({
				type:"post",
				url: w.baseUrl + '/learningmaterials',
				data:{
					
				}
			});
		}else{
			$.messager.show({
                title: '提示',
                msg: '请先上传文件'
            });
		}
			
	});
  
	function fmt_setting(val, row) {
		if(userId == 0) {
			var str = '<a href="#" class="icon update" title="修改" onclick="_hdmdc_update(\'' + row.Id + '\')"></a>';
			return str;
		} else {
			var str = '<a href="#" class="icon update" title="修改" onclick="_hdmdc_update(\'' + row.Id + '\')"></a>' +
				'<a href="javascript:void(0)" class="icon delete" title="删除" onclick="_hdmdc_delete(\'' + row.Id + '\')"></a>';
			return str;

		}

	}
 
	function fmt_time(val) {
		if(val) {
			return $.formatDate('yyyy-MM-dd', val);
		}
	}
	 
	
//上传方法=================================================


	$('.add-btn').click(function() {
		$('#fileupload').click()
	})
	
	$('#fileupload').fileupload({

		//进度条
		progress: function(e, data) {

			var progress = parseInt(data.loaded / data.total * 100, 10);
			$('.line .bar').css(
				'width',
				progress + '%'
			);
		},
		dataType: 'json',
		//添加方法
		add: function(e, data) {

			var fileName = data.files[0].name;
			var div = $('<div class="line clear-float"></div>').html(function() {
				var el = '<span title=' + fileName + '>' + fileName + '<span class="bar"></span></span>' +
					'<button class="delete">清除</button>';
				return el;
			}).appendTo('.file-list');
			data.context = $('<button class="state">上传</button>').appendTo('.file-list .line:last-of-type').click(function() {
				$('.state').text('上传中...');
				data.submit();
			})
		},
 
		//完成回调
		done: function(e, data) {
			hasFile = true;
			$('.state').text('完成');
		}
	});
	      
	//取消指定文件
	$('.file-list').on('click', $('.delete'), function(e) {

		var target = e.target || e.srcElement;
		var delObj = $('.delete');
		if(target.nodeName.toLowerCase() == "button") {
			var that = target;
			var index;
			for(var i = 0; i < delObj.length; i++)
				if(delObj[i] === target) index = i;
			if(index >= 0) {
				delObj.eq(index).parent('.line').remove()
			}
		}
		if($('.delete').length == 0){
			hasFile = false;
		}
	})
	
	
	
	
	
	
	
	
	
	
	
	
//上传方法End=================================================




})();