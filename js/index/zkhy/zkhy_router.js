define(function(require) {
	var Mn = require("marionette");
	var YdyhyShowRoute = require("web/index/zkhy/ydyhy/ydyhy_show_route");
	var YdyhyAddRoute = require("web/index/zkhy/ydyhy/ydyhy_add_route");
	var HymbShowRoute = require("web/index/zkhy/hymb/hymb_show_route");
	var HymbAddRoute = require("web/index/zkhy/hymb/hymb_add_route");
	
	var DhmRoute = require("web/index/hykz/dhm/dhm_route");
	
	var Const = require("web/common/const");
	
	var LxrRouter = Mn.AppRouter.extend({
		initialize: function(options) {
			this.container = options.container;
		},
		
		routes: {
			"zkhy": "showYdyhy",
			"zkhy/showYdyhy": "showYdyhy",
			"zkhy/addYdyhy": "addYdyhy",
			"zkhy/modifyYdyhy/:id/:state": "modifyYdyhy",
			"zkhy/showHymb": "showHymb",
			"zkhy/addHymb(/:id)": "addHymb",
		},
		
		showYdyhy: function() {
			new YdyhyShowRoute({
				container: this.container
			});
		},
		addYdyhy: function() {
			new YdyhyAddRoute({
				container: this.container
			});
		},
		modifyYdyhy: function(id, state) {
			if(state == Const.MeetingState_UnderWay) {
				//会议控制
				Backbone.history.navigate("hykz/dhm/"+id, {trigger:true});
			} else {
				new YdyhyAddRoute({
					container: this.container,
					id: id
				});
			}
		},
		showHymb: function() {
			new HymbShowRoute({
				container: this.container
			});
		},
		addHymb: function(id) {
			new HymbAddRoute({
				container: this.container,
				id: id
			});
		}
	});
	
	return LxrRouter;
});