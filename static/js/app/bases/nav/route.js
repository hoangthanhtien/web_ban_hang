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
			"$ref": "app/bases/views/RegisterView2",
		},
		////////////////////// Hóa Đơn 
		{
			"collectionName": "hoadon", 
			"route": "hoadon/collection(/:id)",
			"$ref": "app/view/HoaDon/CollectionView",
		},
		// {
		// 	"collectionName": "hanghoa",
		// 	"route": "hanghoa/model(/:id)",
		// 	"$ref": "app/view/HangHoa/ModelView",
		// },
	];

});