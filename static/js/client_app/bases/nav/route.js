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
		
		{
			"collectionName": "about", 
			"route": "about/collection",
			"$ref": "app/view/about/CollectionView",
		},
	];

});