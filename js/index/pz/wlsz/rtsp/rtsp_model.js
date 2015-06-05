define(function(require) {
	var Model = require("web/common/model");
	
	var RTSPModel = Model.extend({
		defaults: {
			swzwk: true,
			wllx: 0,
			ipdz: "172.0.0.1",
			zwym: "255.255.255.254",
			wgdz: "172.16.0.1",
			dns: "8.8.8.8",
			sxdk: 0,
			xxdk: 0
		},
		urls: {
			"create": "wk1.psp",
			"update": "wk1.psp",
			"delete": "wk1.psp",
			"read": "wk1.psp"
		}
	});
	
	return RTSPModel;
});