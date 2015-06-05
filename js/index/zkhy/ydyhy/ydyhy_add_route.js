define(function(require) {
	var $ = require("jquery");
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/zkhy/navLeft/navLeft_view");
	var YdyhyAddView = require("web/index/zkhy/ydyhy/ydyhy_add_view");
	var YdyhyAddFormView = require("web/index/zkhy/ydyhy/ydyhy_add_form_view");
	var HymbAddYhzView = require("web/index/zkhy/hymb/hymb_add_yhz_view");
	
	var YdyhyModel = require("web/index/zkhy/ydyhy/ydyhy_model");

	var YdyhyAddRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			this.ydyhyModel = new YdyhyModel();
			
			$.when(
				$.getJSON("getAllMeetingTemp.psp"),
				$.getJSON("getAllAddrBook.psp"),
				$.getJSON("getDateTime.psp"),
				this.ydyhyModel.myFetch(options)
			).done(function(allTemp,allLxr,dateTime) {
				self.ydyhyModel.set({
					"date": dateTime[0].data.date,
					"time": dateTime[0].data.time
				});
				self.allTemp = allTemp[0].data.tempList?allTemp[0].data.tempList:[];
				self.allLxr = allLxr[0].data.bookInfo?allLxr[0].data.bookInfo:[];
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new YdyhyAddView(),
				zkhyYdyhyAddFormView: new YdyhyAddFormView({
					model: this.ydyhyModel,
					templateHelpers: {
						allTemp: this.allTemp
					}
				}),
				zkhyYdyhyAddYhzView: new HymbAddYhzView({
					model: this.ydyhyModel,
					allLxr: this.allLxr
				})
			});
		}
	});
	
	return YdyhyAddRoute;
});