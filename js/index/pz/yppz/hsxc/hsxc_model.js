define(function(require) {
	var Model = require("web/common/model");
	
	var HsxcModel = Model.extend({
		defaults: {
			aecEn: 0,
			aecMode: 0,
			agcEn: 0
		},
		urls: {
			"create": "setAecAgcCfg.psp",
			"read": "getAecAgcCfg.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return HsxcModel;
});