define(function(require) {
	var Model = require("web/common/model");
	
	var JhtjModel = Model.extend({
		defaults: {
			outPort: 0,
			eqGain: []
		},
		urls: {
			"create": "setEqAllChannelCfg.psp",
			"read": "getEqAllChannelCfg.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return JhtjModel;
});