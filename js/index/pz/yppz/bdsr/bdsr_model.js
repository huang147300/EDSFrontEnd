define(function(require) {
	var Model = require("web/common/model");
	
	var BdsrModel = Model.extend({
		defaults: {
			volumeSingleInPut: []
		},
		urls: {
			"create": "setVolInControlCfg.psp",
			"read": "getVolInControlCfg.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return BdsrModel;
});