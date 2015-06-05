define(function(require) {
	var Model = require("web/common/model");
	
	var BdsrModel = Model.extend({
		defaults: {
			name: "默认名称000",
			kzck: 0,
			ydsd: 0,
			srjkxh: 0,
			
			ld: 123,
			dbd: 124,
			bhd: 125,
			sppy: 126,
			czpy: 127,
			
			abc: 16
		},
		urls: {
			"create": "yppz_fsydhy.psp",
			"update": "yppz_fsydhy.psp",
			"delete": "yppz_fsydhy.psp",
			"read": "yppz_fsydhy.psp"
		}
	});
	
	return BdsrModel;
});