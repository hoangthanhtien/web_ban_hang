define(function (require) {
	"use strict";
	return [
		////////////////////// Gian Hàng
		{
			"collectionName": "gianhang", 
			"route": "gianhang/collection(/:id)",
			"$ref": "app/view/GianHang/CollectionView",
		},
		{
			"collectionName": "gianhang",
			"route": "gianhang/model(/:id)",
			"$ref": "app/view/GianHang/ModelView",
		},
		////////////////////// Hàng Hóa 
		{
			"collectionName": "hanghoa", 
			"route": "hanghoa/collection(/:id)",
			"$ref": "app/view/HangHoa/CollectionView",
		},
		{
			"collectionName": "hanghoa",
			"route": "hanghoa/model(/:id)",
			"$ref": "app/view/HangHoa/ModelView",
		},
		////////////////////// REGISTER - Form đăng ký
		{
			"collectionName": "register", 
			"route": "register",
			"$ref": "app/bases/views/RegisterView",
		},
		////////////////////// ORGANIZATION
		{
			"collectionName": "organization", 
			"route": "organization/collection(/:id)",
			"$ref": "app/view/organization/CollectionView",

		},
		{
			"collectionName": "organization",
			"route": "organization/model(/:id)",
			"$ref": "app/view/organization/ModelView",
		},

		////////////////////// ORGANIZATION REPORT
		{
			"collectionName": "organization_report",
			"route": "organization_report/collection(/:id)",
			"$ref": "app/view/organization_report/view/ModelView",
		},

		////////////////////// ORGANIZATION USER GROUP
		{
			"collectionName": "organization_user_group", 
			"route": "organization_user_group/collection(/:id)",
			"$ref": "app/view/organization_user_group/CollectionView",

		},
		{
			"collectionName": "organization_user_group",
			"route": "organization_user_group/model(/:id)",
			"$ref": "app/view/organization_user_group/ModelView",
		},

		////////////////////// PROCUREMENT GROUP
		{
			"collectionName": "procurement_group", 
			"route": "procurement_group/collection(/:id)",
			"$ref": "app/view/procurement_group/CollectionView",

		},
		{
			"collectionName": "procurement_group",
			"route": "procurement_group/model(/:id)",
			"$ref": "app/view/purchase_history/procurement_group/ModelView",
		},

		////////////////////// PROCUREMENT GROUP BY TIME
		{
			"collectionName": "procurement_group_by_time", 
			"route": "procurement_group_by_time/collection(/:id)",
			"$ref": "app/view/procurement_group_by_time/CollectionView",

		},
		{
			"collectionName": "procurement_group_by_time",
			"route": "procurement_group_by_time/model(/:id)",
			"$ref": "app/view/purchase_history/procurement_group_by_time/ModelView",
		},

		{
			"collectionName": "delivery_history",
			"route": "delivery_history/model(/:id)",
			"$ref": "app/view/purchase_history/procurement_group_by_time/delivery_history/ModelView",
		},
		////////////////////// PROCUREMENT GROUP BY TIME INVOICE
		{
			"collectionName": "procurement_group", 
			"route": "procurement_group_by_time_invoice/collection(/:id)",
			"$ref": "app/view/procurement_group_by_time_invoice/CollectionView",

		},
		
		////////////////////// ORGANIZATION CONTACT RELATION
		{
			"collectionName": "organization_contact_relation", 
			"route": "organization_contact_relation/collection",
			"$ref": "app/view/organization_contact_relation/CollectionView",
		},
		{
			"collectionName": "organization_contact_relation",
			"route": "organization_contact_relation/model(/:id)",
			"$ref": "app/view/organization_contact_relation/ModelView",
		},

		////////////////////// PROCUREMENT GROUP HISTORY
		{
			"collectionName": "procurement_group", 
			"route": "procurement_group_history/collection",
			"$ref": "app/view/purchase_history/procurement_group/CollectionView",
		},
		// {
		// 	"collectionName": "procurement_group",
		// 	"route": "procurement_group_history/model(/:id)",
		// 	"$ref": "app/view/purchase_history/procurement_group/ModelView",
		// },

		////////////////////// PROCUREMENT GROUP BY TIME HISTORY
		{
			"collectionName": "procurement_group_by_time", 
			"route": "procurement_group_by_time_history/collection",
			"$ref": "app/view/purchase_history/procurement_group_by_time/CollectionView",
		},
		// {
		// 	"collectionName": "procurement_group_by_time",
		// 	"route": "procurement_group_by_time_history/model(/:id)",
		// 	"$ref": "app/view/purchase_history/procurement_group_by_time/ModelView",
		// },

		////////////////////// SALESORDER
		{
			"collectionName": "salesorder", 
			"route": "salesorder/collection(/:id)",
			"$ref": "app/view/salesorder/CollectionView",

		},
		{
			"collectionName": "salesorder",
			"route": "salesorder/model(/:id)",
			"$ref": "app/view/salesorder/ModelView",
		},

		////////////////////// Organization Debit Report - Báo cáo mua trước trả sau 
		{
			"collectionName": "organization_debit_report",
			"route": "organization_debit_report/collection",
			"$ref": "app/view/organization_debit_report/ModelView",
		},
	];

});