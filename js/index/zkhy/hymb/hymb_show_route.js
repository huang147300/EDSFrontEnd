define(function(require) {
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/zkhy/navLeft/navLeft_view");
	var HymbShowView = require("web/index/zkhy/hymb/hymb_show_view");
	
	var HymbCollection = require("web/index/zkhy/hymb/hymb_collection");

	var HymbShowRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			this.hymbCollection = new HymbCollection();
			
			this.hymbCollection.fetch({
				reset: true
			}).done(function() {
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new HymbShowView({
					collection: this.hymbCollection
				})
			});
		}
	});
	
	return HymbShowRoute;
});