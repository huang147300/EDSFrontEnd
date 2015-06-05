define(function(require) {
	var Model = require("web/common/model");
	
	var BdscModel = Model.extend({
		defaults: {
			volumeSingleOutPut : []
		},
		urls: {
			"create": "setVolOutControlCfg.psp",
			"read": "getVolOutControlCfg.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return BdscModel;
});