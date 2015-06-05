define(function(require) {
	var Model = require("web/common/model");
	
	var H323Model = Model.extend({
		defaults: {
			enable: 0,
			gkIp: "0.0.0.0",
			regNum: "",
			regName: "",
			regPwd: ""
		},
		urls: {
			"create": "setRegInfo.psp",
			"update": "setRegInfo.psp",
			"delete": "H323.psp",
			"read": "getRegInfo.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return H323Model;
});