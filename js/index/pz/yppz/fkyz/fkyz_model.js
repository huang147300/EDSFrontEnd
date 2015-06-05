define(function(require) {
	var Model = require("web/common/model");
	
	var FkyzModel = Model.extend({
		defaults: {
			afrEn: 0,
			afrMode: 0,
			afrRange: 0
		},
		urls: {
			"create": "setAfrCfg.psp",
			"read": "getAfrCfg.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return FkyzModel;
});