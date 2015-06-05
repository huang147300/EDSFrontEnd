define(function(require) {
	var Backbone = require("backbone");
	var YdyhyModel = require("web/index/zkhy/ydyhy/ydyhy_model");
	
	var YdyhyCollection = Backbone.Collection.extend({
		model: YdyhyModel,
		urls: {
			"read": "getMeeting.psp"
		},
		parse: function(res) {
			if(res && res.data && res.data.meetingList)
				return res.data.meetingList;
			return [];
		}
	});
	
	return YdyhyCollection;
});