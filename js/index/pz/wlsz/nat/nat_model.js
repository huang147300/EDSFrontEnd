define(function(require) {
	var Model = require("web/common/model");
	
	var NATModel = Model.extend({
		defaults: {
			enable: 1,
			externalIp: "172.0.0.1",
			callBeginPort: 3000,
			callEndPort: 3010,
			rtpBeginPort: 6000,
			rtpEndPort: 6020
		},
		urls: {
			"create": "setNatInfo.psp",
			"update": "setNatInfo.psp",
			"read": "getNatInfo.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return NATModel;
});