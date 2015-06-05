define(function(require) {
	var Model = require("web/common/model");
	
	var SIPModel = Model.extend({
		defaults: {
			zcfwq: 1,
			fwqdz: "172.0.0.1",
			qydlfwq: 1,
			dlfwqdz: "172.0.0.123",
			hyfwhm: "号码123",
			hchm: "号码345",
			yhm: "tom",
			mm: "12345678"
		},
		urls: {
			"create": "sip.psp",
			"update": "sip.psp",
			"delete": "sip.psp",
			"read": "sip.psp"
		}
	});
	
	return SIPModel;
});