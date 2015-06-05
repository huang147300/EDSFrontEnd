define(function(require) {
	var Model = require("web/common/model");
	
	var DkszModel = Model.extend({
		defaults: {
			gkdk: 1719,
			hjjtdk: 1720,
			xydk_min: 3000,
			xydk_max: 3016,
			mtdk_min: 6000,
			mtdk_max: 6020
		},
		urls: {
			"create": "dksz.psp",
			"update": "dksz.psp",
			"delete": "dksz.psp",
			"read": "dksz.psp"
		}
	});
	
	return DkszModel;
});