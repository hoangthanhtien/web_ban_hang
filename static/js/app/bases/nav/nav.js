define(function (require) {
	"use strict";
	return [
		// {
		// 	"text":"Quản lý đơn vị",
		// 	// "icon":"fa fa-child",
		// 	"type":"view",
		// 	"route":"organization/collection",
		// 	"visible": function(){
		// 		return this.getApp().checkRole("system_admin");
		// 	}
		// },
		{
			"text":"Quản lý gian hàng",
			// "icon":"fa fa-child",
			"type":"view",
			"route":"gianhang/collection"
		},
		{
			"text":"Lịch sử đặt hàng",
			// "icon":"cil-calendar",
			"type":"category",
			// "route":"procurement_group_by_time/collection", 
			"entries": [
				{
					"text":"Đơn quà tặng",
					// "icon":"cil-calendar",
					"type":"view",
					"route":"procurement_group_history/collection"
				},
				{
					"text":"Đơn theo kỳ",
					// "icon":"cil-calendar",
					"type":"view",
					"route":"procurement_group_by_time_history/collection"
				},
			]
		},
		{
			"text":"Quản lý hoá đơn",
			// "icon":"cil-calendar",
			"type":"category",
			// "route":"procurement_group_by_time/collection", 
			"entries": [
				{
					"text":"Đơn bán hàng",
					// "icon":"cil-calendar",
					"type":"view",
					"route":"hoadon/collection"
				},
				{
					"text":"Đơn mua",
					// "icon":"cil-calendar",
					"type":"view",
					"route":"hoadon/collection"
				},
			]
		},
		
	];

});

