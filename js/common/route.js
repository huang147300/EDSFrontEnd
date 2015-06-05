define(function(require) {
	var Mn = require("marionette");
	var IndexView = require("web/index/index_view");
	
	var Route = Mn.Object.extend({
  		
		show: function(options) {
			var indexView = this.container.currentView, navLeftRegion, navLeftView, contentRightRegion;
			if(indexView && indexView instanceof IndexView) {
				navLeftRegion = indexView.getRegion("navLeft");
				navLeftView = navLeftRegion.currentView;
				contentRightRegion = indexView.getRegion("contentRight");
				if(!(navLeftView && options.navLeftView && navLeftView instanceof options.navLeftView)) {
					options.navLeftView && navLeftRegion.show(new options.navLeftView()) || navLeftRegion.empty();
				}
				contentRightRegion.show(options.contentRightView, options);
			} else {
				this.container.show(new IndexView(), options);
			}
		}
  		
	});
	
	return Route;
});