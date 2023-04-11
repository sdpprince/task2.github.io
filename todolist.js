$(function() {
	// alert(11)
	load();
	// 一、
	$("#title").on("keydown", function(e) {
		if (e.keyCode === 13) {
			if ($(this).val() === "") {
				alert("请输入您的操作")
			} else {
				//先读取本地存储原来数据
				var local = getDate();
				// 把local数组进行更新数据把最新的数据追加给local数组
				local.push({
					title: $(this).val(),
					done: false
				});
				// 把这个数组local 存储给本地存储
				saveDate(local);
				//toDoList 本地存储数据渲染加载到页面
				load();
				$(this).val("")
			}

		}
	});
	$("#makeSure").click(function(){
		console.log(123132132);
		if ($("#title").val() === "") {
			alert("请输入您的操作")
		} else {
			//先读取本地存储原来数据
			var local = getDate();
			// 把local数组进行更新数据把最新的数据追加给local数组
			local.push({
				title: $("#title").val(),
				done: false
			});
			// 把这个数组local 存储给本地存储
			saveDate(local);
			//toDoList 本地存储数据渲染加载到页面
			load();
			$("#title").val("")
		}
	})
	// 五、
	//删除操作
	$("ol,ul").on("click", "a", function() {
		// alert(22)
		// 先获取本地存储
		var data = getDate()
		// console.log(data);
		// 修改数据
		var index = $(this).attr("id");
		// console.log(index);
		data.splice(index, 1)

		// 保存到本地存储
		saveDate(data);
		// 重新渲染页面
		load();
	})
	// 六、
	$("ol,ul").on("click", "input", function() {
		// alert(11)
		// 先获取本地存储
		var data = getDate()

		// 修改数据
		var index = $(this).siblings("a").attr("id")
		data[index].done = $(this).prop("checked")
		console.log(data);
		// 保存到本地存储
		saveDate(data);
		// 重新渲染页面
		load();
	})
	// 二、
	function getDate() {
		var data = localStorage.getItem("todolist");
		if (data !== null) {
			// 本地存储里面的数据是字符串格式的但是我们需要的是对象格式的
			return JSON.parse(data);
		} else {
			return [];
		}
	}
	// 三、
	//保存本地存储数据
	function saveDate(data) {
		localStorage.setItem("todolist", JSON.stringify(data))
	}
	// 四、
	//渲染加载数据
	function load() {
		//读取本地数据
		var data = getDate();
		// console.log(data);
		//遍历之前清空里面的内容
		$("ol,ul").empty()
		var todoCount = 0; //正在进行个数
		var doneCount = 0; //已完成个数
		//遍历这个数据
		$.each(data, function(i, n) {
			// console.log(n);
			if (n.done) {
				$("ul").prepend("<li><input type='checkbox' checked='checked'/><p>" + n.title +
					"</p><a href='javascript:;' id=" + i + ">删除</a></li>")
				doneCount++;
			} else {
				$("ol").prepend("<li><input type='checkbox'/><p>" + n.title +
					"</p><a href='javascript:;' id=" + i + ">删除</a></li>")
				todoCount++;

			}
		});
		$("#todocount").text(todoCount)
		$("#donecount").text(doneCount)
	}

})
