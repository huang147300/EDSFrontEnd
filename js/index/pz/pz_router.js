define(function(require) {
	var Mn = require("marionette");
	var SpsrRoute = require("web/index/pz/spsr/spsr_route");
	var SpscRoute = require("web/index/pz/spsc/spsc_route");
	var YppzRoute = require("web/index/pz/yppz/yppz_route");
	var WlszRoute = require("web/index/pz/wlsz/wlsz_route");
	
	var PzRouter = Mn.AppRouter.extend({
		initialize: function(options) {
			this.container = options.container;
		},
		
		routes: {
			"pz": "spsr",
			"pz/spsr": "spsr",
			"pz/spsc": "spsc",
			"pz/yppz": "yppz",
			"pz/wlsz": "wlsz"
		},
		
		spsr: function() {
			new SpsrRoute({
				container: this.container
			});
		},
		
		spsc: function() {
			new SpscRoute({
				container: this.container
			});
		},
		
		yppz: function() {
			new YppzRoute({
				container: this.container
			});
		},
		
		wlsz: function() {
			new WlszRoute({
				container: this.container
			});
		}
	});
	
	return PzRouter;
});