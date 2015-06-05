define(function(require) {
	var Model = require("web/common/model");
	
	var ZdjzModel = Model.extend({
		defaults: {
			ansEn: 0,
			ansMode: 0
		},
		urls: {
			"create": "setAnsCfg.psp",
			"read": "getAnsCfg.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return ZdjzModel;
});