define(function(require) {
	var $ = require("jquery");
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/pz/navLeft/navLeft_view");
	var SpsrView = require("web/index/pz/spsr/spsr_view");
	
	var SpsrModel = require("web/index/pz/spsr/spsr_model");

	var SpsrRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			this.spsrModel = new SpsrModel();
			
			$.when(
				$.getJSON("getSdiPort.psp"),//sdi输入
				
				$.getJSON("getVgaPort.psp")//vga输入
			).done(function(sdi,vga) {
				self.SDI = [];
				if(sdi[0].data && sdi[0].data.sdiInfo)
				{
					self.SDI = sdi[0].data.sdiInfo;
				}
				
				self.VGA = [];
				if(vga[0].data && vga[0].data.vgaInfo)
				{
					self.VGA = vga[0].data.vgaInfo;
				}
				
				$.when(self.spsrModel.myFetch({
					id: self.SDI[0].camPort || self.VGA[0].vgaPort
				})).done(function() {
					self.showView();
				});
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new SpsrView({
					model: this.spsrModel,
					templateHelpers: {
						SDI: this.SDI,
						VGA: this.VGA
					}
				})
			});
		}
	});
	
	return SpsrRoute;
});