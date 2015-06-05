define(function(require) {
	var $ = require("jquery");
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/hykz/navLeft/navLeft_view");
	
	var SpjzView = require("web/index/hykz/spjz/spjz_view");
	
	var HymbAddSpjzView = require("web/index/zkhy/hymb/hymb_add_spjz_view");
	
	var SpjzModel = require("web/index/hykz/spjz/spjz_model");

	var SpjzRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			this.spjzModel = new SpjzModel();
			
			$.when(
				$.getJSON("getAllAddrBook.psp"),//所有联系人
				$.getJSON("getVidOutPort_VMatrix.psp"),//视频输出端口
				
				$.getJSON("getVenueCfg.psp"),//会场
				//$.getJSON("getVidMatrix.psp"),//视频矩阵
				
				this.spjzModel.fetch(options)
			).done(function(allLxr,outPort,venue) {
				var venueId = [];
				if(venue && venue[0].data && venue[0].data.venueId)
				{
					venueId = venue[0].data.venueId;
				}
				self.spjzModel.set({
						"venueId": venueId,
						//"matrixInOut": matrixInOut[0].data.matrixInOut
				});
				
				self.allLxr = allLxr[0].data.bookInfo;
				
				self.dviArr = [];
				if(outPort[0].data && outPort[0].data.outPortInfo)
				{
					self.dviArr = outPort[0].data.outPortInfo;
				}
				
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new SpjzView({
					model: this.spjzModel
				}),
				hykzHymbAddSpjzView: new HymbAddSpjzView({
					model: this.spjzModel,
					allLxr: this.allLxr,
					dviArr: this.dviArr
				}),
			});
		}
	});
	
	return SpjzRoute;
});