define(function(require) {
	var Model = require("web/common/model");
	
	var YdyhyModel = Model.extend({
		idAttribute: "recordId",
		defaults: {
			venueId: [],
			name: "",
			number: "",
			pwChairman: "",
			date: "",
			time: "",
			desc: "",
			meetingType: 0,
			tempRecordId:0,
			bandwidth: 1920000,
			pwMeeting: "",
			duration: 120
		},
		urls: {
			"create": "addMeeting.psp",
			"update": "modifyMeeting.psp",
			"delete": "delMeeting.psp",
			"read": "getMeetingDetail.psp"
		},
		parse: function(res, options) {
			if(options.collection) {
				return res;
			} else {
				return res.data;
			}
		}
	});
	
	return YdyhyModel;
});