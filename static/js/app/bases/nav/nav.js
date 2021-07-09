define(function (require) {
	"use strict";
	return [
		{
			"text":"Quản lý gian hàng",
			// "icon":"fa fa-child",
			"type":"view",
			"route":"gianhang/collection"
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
					"text":"Đơn mua hàng",
					// "icon":"cil-calendar",
					"type":"view",
					"route":"hoadon/collection"
				},
			]
		},
		{
			"text":"Báo cáo",
			// "icon":"cil-calendar",
			"type":"category",
			// "route":"procurement_group_by_time/collection", 
			"entries": [
				{
					"text":"Báo cáo tổng hợp",
					// "icon":"cil-calendar",
					"type":"view",
					"route":"baocaotonghop/collection"
				},
				{
					"text":"Thống kê doanh số",
					// "icon":"cil-calendar",
					"type":"view",
					"route":"baocaodoanhso/collection"
				},
			]
		},
		
	];

});

