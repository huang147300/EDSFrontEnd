define(function(require) {
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/pz/navLeft/navLeft_view");
	var WlszView = require("web/index/pz/wlsz/wlsz_view");

	var WkModel = require("web/index/pz/wlsz/wk/wk_model");
	var WkView = require("web/index/pz/wlsz/wk/wk_view");

	var WlszRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			
			this.wkModel = new WkModel();
			this.wkModel.fetch({
				data: JSON.stringify({ device: 0 }) //网卡1
			}).done(function() {
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new WlszView(),
				pzWlszWkView: new WkView({
					model: this.wkModel
				})
			});
		}
	});
	
	return WlszRoute;
});