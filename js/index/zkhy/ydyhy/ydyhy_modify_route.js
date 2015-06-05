define(function(require) {
	var Route = require("web/common/route");
	
	var YdyhyAddRoute = require("web/index/zkhy/ydyhy/ydyhy_add_route");

	var YdyhyModifyRoute = Route.extend({
		
		initialize: function(options) {
			if(options.state === "yjzk") {
				new YdyhyAddRoute({
					container: options.container,
					id: options.id,
					state: options.state
				});
			}
		},
		
		showView: function() {}
	});
	
	return YdyhyModifyRoute;
});