define(function(require) {
	var Model = require("web/common/model");
	
	var WkModel = Model.extend({
		defaults: {
			prot: 0,
			device: 0,
			mainDevice: 0,
			netType: 0,
			ip: "172.0.0.1",
			mask: "255.255.255.0",
			gateway: "172.16.0.1",
			mainDns: "8.8.8.8",
			autoDial: 1,
			user: "",
			pwd: ""
		},
		urls: {
			"create": "setNetInfo.psp",
			"read": "getNetInfo.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return WkModel;
});