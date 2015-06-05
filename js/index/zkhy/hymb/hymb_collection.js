define(function(require) {
	var Backbone = require("backbone");
	var HymbModel = require("web/index/zkhy/hymb/hymb_model");
	
	var HymbCollection = Backbone.Collection.extend({
		model: HymbModel,
		urls: {
			"read": "getMeetingTemp.psp"
		},
		parse: function(res) {
			if(res && res.data && res.data.tempList)
				return res.data.tempList;
			return [];
		}
	});
	
	return HymbCollection;
});