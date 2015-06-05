define(function(require) {
	var Route = require("web/common/route");
	
	var LxrShowView = require("web/index/lxr/show/lxr_show_view");
	var LxrCollection = require("web/index/lxr/lxr_collection");

	var LxrShowRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			this.lxrCollection = new LxrCollection();
			
			this.lxrCollection.fetch({
				reset: true
			}).done(function() {
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				contentRightView: new LxrShowView({
					collection: this.lxrCollection
				})
			});
		}
	});
	
	return LxrShowRoute;
});