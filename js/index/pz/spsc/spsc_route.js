define(function(require) {
	var $ = require("jquery");
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/pz/navLeft/navLeft_view");
	var SpscView = require("web/index/pz/spsc/spsc_view");
	
	var SpscModel = require("web/index/pz/spsc/spsc_model");

	var SpscRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			this.spscModel = new SpscModel();
			
			$.getJSON("getVidOutPort.psp").done(function(vga) {
				self.VGA = [];
				if(vga.data && vga.data.outPortInfo)
				{
					self.VGA = vga.data.outPortInfo;
				}
				
				$.when(self.spscModel.myFetch({
					id: self.VGA[0].vidOutPort
				})).done(function() {
					self.showView();
				});
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new SpscView({
					model: this.spscModel,
					templateHelpers: {
						VGA: this.VGA
					}
				})
			});
		}
	});
	
	return SpscRoute;
});