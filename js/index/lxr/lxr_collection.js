define(function(require) {
	var Backbone = require("backbone");
	var LxrModel = require("web/index/lxr/lxr_model");
	
	var LxrCollection = Backbone.Collection.extend({
		model: LxrModel,
		urls: {
			"read": "getAddrBook.psp"
		},
		parse: function(res) {
			if(res && res.data && res.data.bookInfo)
				return res.data.bookInfo;
			return [];
		}
	});
	
	return LxrCollection;
});