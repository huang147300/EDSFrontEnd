define(function(require) {
	var Mn = require("marionette");
	var PortalView = require("web/portal/portal_view");
	
	var PortalRouter = Mn.AppRouter.extend({
		initialize: function(options) {
			this.container = options.container;
		},
		
		routes: {
			"portal": "portal"
		},
		
		portal: function() {
			this.container.show(new PortalView());
		}
	});
	
	return PortalRouter;
});