define(function(require) {
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/pz/navLeft/navLeft_view");
	var YppzView = require("web/index/pz/yppz/yppz_view");
	
	var BdsrModel = require("web/index/pz/yppz/bdsr/bdsr_model");
	var BdsrView = require("web/index/pz/yppz/bdsr/bdsr_view");

	var YppzRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			
			this.bdsrModel = new BdsrModel();
			this.bdsrModel.fetch().done(function() {
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new YppzView(),
				pzYppzBdsrView: new BdsrView({
					model: this.bdsrModel
				})
			});
		}
	});
	
	return YppzRoute;
});