define(function(require) {
	var Model = require("web/common/model");
	
	var DhmModel = Model.extend({
		defaults: {
			venueId: [],
			subPicInfo: [],
			enableMp: 0
		},
		urls: {
			"create": "setVidMultiPic.psp",
			"read": "getVidMultiPic.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return DhmModel;
});