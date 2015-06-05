define(function(require) {
	var Model = require("web/common/model");
	
	var SpjzModel = Model.extend({
		defaults: {
			venueId: [],
			matrixInOut:[],
			enableVM: 0
		},
		urls: {
			"create": "setVidMatrix.psp",
			"read": "getVidMatrix.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return SpjzModel;
});