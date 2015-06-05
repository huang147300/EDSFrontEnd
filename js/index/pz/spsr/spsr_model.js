define(function(require) {
	var Model = require("web/common/model");
	
	var SpsrModel = Model.extend({
		idAttribute: "recordId",
		defaults: {
			name: "SDI1",
			kzck: 0,
			ydsd: 0,
			srjkxh: 0,
			
			ld: 123,
			dbd: 124,
			bhd: 125,
			sppy: 126,
			czpy: 127
		},
		urls: {
			"create": "spsr.psp",
			"update": "spsr.psp",
			"delete": "spsr.psp",
			"read": "spsr.psp"
		}
	});
	
	return SpsrModel;
});