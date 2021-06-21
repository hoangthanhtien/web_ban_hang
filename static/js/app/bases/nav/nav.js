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
			"text":"Quản lý phòng ban",
			// "icon":"fa fa-child",
			"type":"view",
			"route":"organization_user_group/collection"
		},
		{
			"text":"Danh sách người dùng",
			// "icon":"fa fa-child",
			"type":"view",
			"route":"organization_contact_relation/collection"
		},
		{
			"text":"Quản lý đơn quà tặng",
			// "icon":"fa fa-child",
			"type":"view",
			"route":"procurement_group/collection"
		},
		{
			"text":"Quản lý đơn theo kỳ",
			// "icon":"cil-calendar",
			"type":"view",
			"route":"procurement_group_by_time/collection"
		},
		{
			"text":"Báo cáo tổng hợp",
			// "icon":"cil-calendar",
			"type":"view",
			"route":"organization_report/collection"
		},
		{
			"text":"Báo cáo mua trước trả sau",
			// "icon":"cil-calendar",
			"type":"view",
			"route":"organization_debit_report/collection"
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
					"text":"Đơn quà tặng",
					// "icon":"cil-calendar",
					"type":"view",
					"route":"salesorder/collection"
				},
				{
					"text":"Đơn theo kỳ",
					// "icon":"cil-calendar",
					"type":"view",
					"route":"procurement_group_by_time_invoice/collection"
				},
			]
		},
		
	];

});

