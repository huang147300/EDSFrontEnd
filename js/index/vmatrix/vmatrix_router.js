define(function(require) {
	var $ = require("jquery");
	var Route = require("web/common/route");
	
	var VMatrixView = require("web/index/zkhy/hymb/hymb_add_spjz_view");
	
	var VMatrixRouter = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			self.showView();
			/*$.when(
				$.getJSON("getAllAddrBook.psp"),//所有联系人
				$.getJSON("getVidOutPort_VMatrix.psp"),//视频输出端口
				
			).done(function(allLxr,outPort) {
				self.allLxr = allLxr[0].data.bookInfo;
				
				self.dviArr = [];
				if(outPort[0].data && outPort[0].data.outPortInfo)
				{
					self.dviArr = outPort[0].data.outPortInfo;
				}
				
				self.showView();
			});*/
		},
		
		showView: function() {
			this.show({
				vMatrixView: new VMatrixView({
					//和父层View共享同一个hymbModel
					//但是只有enableSpjz字段同步
					//其它字段对应不了表单元素，所以只能手动初始化页面
					//获取其它字段需要使用Radio.channel.request
					/*model: this.hymbModel,
					dviArr: this.dviArr*/
				})
			});
		}
	});
	
	return VMatrixRouter;
});