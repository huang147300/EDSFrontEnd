define(function(require) {
	var Model = require("web/common/model");
	
	var BdsrModel = Model.extend({
		defaults: {
			groupNum: 0,
			inputNum: 10,
			audInPort: [0,2,4,6,8,10,12,14,16,18]
		},
		urls: {
			"create": "setAudGroupMixInfo.psp",
			"read": "getAudGroupMixInfo.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return BdsrModel;
});