define(function(require) {
	var Mn = require("marionette");
	var LxrShowRoute = require("web/index/lxr/show/lxr_show_route");
	var LxrAddRoute = require("web/index/lxr/add/lxr_add_route");

	var LxrRouter = Mn.AppRouter.extend({
		initialize: function(options) {
			this.container = options.container;
		},
		
		routes: {
			"lxr": "show",
			"lxr/show": "show",
			"lxr/add(/:id)": "add"
		},
		
		show: function() {
			new LxrShowRoute({
				container: this.container
			});
		},
		
		add: function(id) {
			new LxrAddRoute({
				container: this.container,
				id: id
			});
		}
	});
	
	return LxrRouter;
});