$(function() {

	var mode = "1"; //模式 0--实时 1--点击按钮触发

	var pageForm = {

		init: function() {
			this.getData();
			this.eventFn();
		},
		eventFn: function() {
			if(mode == "0") {
				$(document).on("change", "input[type='checkbox']", function() {
					var self = $(this);
					var type = self.attr("name");
					if(type == "item1") {
						if(self.is(":checked")) { //左边-取消勾选表示需要删除小区
							self.attr({
								"name": "item2",
								"checked": false
							});
							$("#item2").append(self.parent().clone());
							self.parent().remove();
						}
					} else {
						if(self.is(":checked")) { //右边-勾选表示需要添加小区
							self.attr({
								"name": "item1",
								"checked": false
							});
							$("#item1").append(self.parent().clone());
							self.parent().remove();
						}
					}
				});
			} else {
				$(document).on("click", ".btn", function() {
					var self = $(this);
					if(self.is("#addBtn")) {
						var items = $("input[type='checkbox'][name='item2']:checked");
						if(items.length > 0) {
							items.each(function() {
								$(this).attr({
									"name": "item1",
									"checked": false
								})
								$("#item1").append($(this).parent().clone());
								$(this).parent().remove();
							});
						} else {
							alert("请先选择待添加的小区");
						}
					} else if(self.is("#removeBtn")) {
						var items = $("input[type='checkbox'][name='item1']:checked");
						if(items.length > 0) {
							items.each(function() {
								$(this).attr({
									"name": "item2",
									"checked": false
								})
								$("#item2").append($(this).parent().clone());
								$(this).parent().remove();
							});
						} else {
							alert("请先选择待删除的小区");
						}
					}
				});
			}
		},
		getData: function() {
			$.getJSON("data/data1.json", function(result) {
				pageForm.parseData(result);
			});
		},
		parseData: function(data) {
			var item1Html = "";
			var item2Html = "";
			var item1 = data.item1;
			var item2 = data.item2;
			for(var index in item1) {
				item1Html += '<div class="check-box"><input type="checkbox" id="' + item1[index].id + '" name="item1"><label>' + item1[index].name + '</label></div>';
			}
			$("#item1").html(item1Html);
			for(var index in item2) {
				item2Html += '<div class="check-box"><input type="checkbox" id="' + item2[index].id + '" name="item2"><label>' + item2[index].name + '</label></div>';
			}
			$("#item2").html(item2Html);
		}
	};
	pageForm.init();

});