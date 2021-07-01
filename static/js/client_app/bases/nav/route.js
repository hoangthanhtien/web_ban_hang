define(function (require) {
	"use strict";
	return [
		////////////////////// Gian Hàng
		// {
		// 	"collectionName": "gianhang", 
		// 	"route": "gianhang/collection(/:id)",
		// 	"$ref": "app/view/GianHang/CollectionView",
		// },
		// {
		// 	"collectionName": "gianhang",
		// 	"route": "gianhang/model(/:id)",
		// 	"$ref": "app/view/GianHang/ModelView",
		// },
		
		// {
		// 	"collectionName": "about", 
		// 	"route": "about/collection",
		// 	"$ref": "app/view/about/CollectionView",
		// },


		/////////////
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
	];

});