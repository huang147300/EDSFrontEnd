define(function(require) {
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/zkhy/navLeft/navLeft_view");
	var YdyhyShowView = require("web/index/zkhy/ydyhy/ydyhy_show_view");
	
	var YdyhyCollection = require("web/index/zkhy/ydyhy/ydyhy_collection");

	var YdyhyShowRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			this.ydyhyCollection = new YdyhyCollection();
			
			this.ydyhyCollection.fetch({
				reset: true
			}).done(function() {
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new YdyhyShowView({
					collection: this.ydyhyCollection
				})
			});
		}
	});
	
	return YdyhyShowRoute;
});