define(function(require) {
	var Mn = require("marionette");
	var SpjzView = require("web/index/zkhy/hymb/hymb_add_spjz_view");
	
	var HymbModel = require("web/index/zkhy/hymb/hymb_model");
	
	var SpjzRouter = Mn.AppRouter.extend({
		initialize: function(options) {
			this.container = options.container;
		},
		
		routes: {
			"spjz": "spjz"
		},
		
		spjz: function() {
			var self = this;
			this.hymbModel = new HymbModel();
			
			$.when(
				$.getJSON("getAllAddrBook.psp"),//所有联系人
				$.getJSON("getVidOutPort_VMatrix.psp"),//视频输出端口
				
				$.getJSON("getVenueCfg.psp"),//会场
				$.getJSON("getVidMatrix.psp")//视频矩阵
				
//				this.hymbModel.myFetch(options)
			).done(function(allLxr, outPort,venue,matrixInOut) {
				self.hymbModel.set({
						"venueId": venue[0].data.venueId,
						"matrixInOut": matrixInOut[0].data.matrixInOut
				});
				self.container.show(new SpjzView({
					model: self.hymbModel,
					allLxr: allLxr[0].data.bookInfo,
					dviArr: outPort[0].data.outPortInfo
				}));
			});
		}
	});
	
	return SpjzRouter;
});