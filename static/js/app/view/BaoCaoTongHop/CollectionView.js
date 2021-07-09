// Import thư viện, template linh tinh
define(function (require) {
  "use strict";
  var $ = require("jquery"),
    _ = require("underscore"),
    Gonrin = require("gonrin");

  var template = require("text!app/view/BaoCaoTongHop/tpl/collection.html");
  var schema = require("json!schema/HoaDonSchema.json");
  //   Tạo view
  return Gonrin.CollectionView.extend({
    template: template, // Template jinja (HTML)
    modelSchema: schema, // model của view
    urlPrefix: "/api/v1/",
    collectionName: "hoadon",
    tools: [
      {
        name: "default",
        type: "group",
        groupClass: "toolbar-group",
        buttons: [],
      },
    ],
    uiControl: {
      fields: [],
      onRowClick: function (event) {},
    },
    render: function () {
      let self = this;
      let currentUser = self.getApp().currentUser;
      let currentUserId = currentUser.id;
      let buy_quantity = [];
      let sale_quantity = [];
      let apiReport =
        self.getApp().serviceURL + "/general_report?user_id=" + currentUserId;
      $.ajax({
        url: apiReport,
        type: "GET",
        success: function (data) {
          buy_quantity = data.buy_data;
	  sale_quantity = data.sale_data;
        },
        error: function (data) {
		self.getApp().notify({message:"Lấy dữ liệu báo cáo thất bại"},{type:"danger"})
	},
      });
      /* -------------------------------------------------------------------------- */
      /*                                  PIE_CHART                                 */
      /* -------------------------------------------------------------------------- */
      // Load the Visualization API and the corechart package.
      google.charts.load("current", { packages: ["corechart"] });

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawPieChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawPieChart() {
        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn("string", "Mặt hàng");
        data.addColumn("number", "Số lượng");
	// console.log("buy_quantity in draw",buy_quantity)
	// buy_quantity.forEach(element => {
	// 	console.log(element)	
	// 	console.log(typeof element[0])
	// 	console.log(typeof element[1])
	// });	
        data.addRows(
		buy_quantity
	);

        // Set chart options
        var options = {
          title: "Tỉ lệ các mặt hàng đã mua",
          width: 400,
          height: 300,
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(
          document.getElementById("pie_chart_div")
        );
        chart.draw(data, options);
      }

      /* -------------------------------------------------------------------------- */
      /*                                PIE CHART 3D                                */
      /* -------------------------------------------------------------------------- */

      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        // var data = google.visualization.arrayToDataTable([
        //   ['Task', 'Hours per Day'],
        //   ['Work',     11],
        //   ['Eat',      2],
        //   ['Commute',  2],
        //   ['Watch TV', 2],
        //   ['Sleep',    7]
        // ]);
	let headers = ['Tên mặt hàng', 'số lượng']
	sale_quantity.unshift(headers)
	console.log("sale_quantity", sale_quantity)
        var data = google.visualization.arrayToDataTable(sale_quantity)
        var options = {
          title: "Tỉ lệ các mặt hàng bán ra",
          is3D: true,
          width: 400,
          height: 300,
        };

        var chart = new google.visualization.PieChart(
          document.getElementById("piechart_3d")
        );
        chart.draw(data, options);
      }

      /* -------------------------------------------------------------------------- */
      /*                                COLUMN CHART                                */
      /* -------------------------------------------------------------------------- */
      google.charts.load("current", { packages: ["corechart", "bar"] });
      google.charts.setOnLoadCallback(drawTrendlines);

      function drawTrendlines() {
        var data = new google.visualization.DataTable();
        data.addColumn("timeofday", "Time of Day");
        data.addColumn("number", "Motivation Level");
        data.addColumn("number", "Energy Level");

        data.addRows([
          [{ v: [8, 0, 0], f: "8 am" }, 1, 0.25],
          [{ v: [9, 0, 0], f: "9 am" }, 2, 0.5],
          [{ v: [10, 0, 0], f: "10 am" }, 3, 1],
          [{ v: [11, 0, 0], f: "11 am" }, 4, 2.25],
          [{ v: [12, 0, 0], f: "12 pm" }, 5, 2.25],
          [{ v: [13, 0, 0], f: "1 pm" }, 6, 3],
          [{ v: [14, 0, 0], f: "2 pm" }, 7, 4],
          [{ v: [15, 0, 0], f: "3 pm" }, 8, 5.25],
          [{ v: [16, 0, 0], f: "4 pm" }, 9, 7.5],
          [{ v: [17, 0, 0], f: "5 pm" }, 10, 10],
        ]);

        var options = {
          title: "Những khách hàng mua nhiều nhất",
          trendlines: {
            0: { type: "linear", lineWidth: 5, opacity: 0.3 },
            1: { type: "exponential", lineWidth: 10, opacity: 0.3 },
          },
          hAxis: {
            title: "Time of Day",
            format: "h:mm a",
            viewWindow: {
              min: [7, 30, 0],
              max: [17, 30, 0],
            },
          },
          vAxis: {
            title: "Rating (scale of 1-10)",
          },
        };

        var chart = new google.visualization.ColumnChart(
          document.getElementById("column_chart_div")
        );
        chart.draw(data, options);
      }
      this.applyBindings();
      return this;
    },
  });
});
