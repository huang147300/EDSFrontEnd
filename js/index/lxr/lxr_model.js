define(function(require) {
	var Model = require("web/common/model");
	
	var LxrModel = Model.extend({
		idAttribute: "recordId",
		defaults: {
			addrName: "",
			equType: 0,
			camPort: 3,
			vagPort:0,
			presetNum: 0,
			voiIncentive: 1,
			micPort: [],
			incPriLev: 0,
			bandwidth: 384000,
			e164: "",
			ip: "0.0.0.0",
			url: "",
			storNum: 0
		},
		urls: {
			"create": "addAddr.psp",
			"update": "modifyAddr.psp",
			"delete": "delAddr.psp",
			"read": "getAddrDetail.psp"
		},
		parse: function(res, options) {
			if(options.collection) {
				return res;
			} else {
				return res.data;
			}
		}
	});
	
	return LxrModel;
});