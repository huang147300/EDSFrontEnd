define(function(require) {
	var Mn = require("marionette");
	var SpjzRoute = require("web/index/hykz/spjz/spjz_route");
	var DhmRoute = require("web/index/hykz/dhm/dhm_route");
	
	var HykzRouter = Mn.AppRouter.extend({
		initialize: function(options) {
			this.container = options.container;
		},
		
		routes: {
			"hykz": "dhm",
			"hykz/spjz(/:id)": "spjz",
			"hykz/dhm(/:id)": "dhm"
		},
		
		spjz: function(id) {
			new SpjzRoute({
				container: this.container,
				id: id
			});
		},
		
		dhm: function(id) {
			new DhmRoute({
				container: this.container,
				id: id
			});
		}
	});
	
	return HykzRouter;
});