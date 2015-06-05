define(function(require) {
	var Model = require("web/common/model");
	
	var HymbModel = Model.extend({
		idAttribute: "recordId",
		defaults: {
			venueId: [],
			name: "",
			desc: "",
			audProt: 3,
			vidProt: 5,
			vidFmt: 7,
			frameRate: 0,
			vidQuality: 1,
			secVidFlag: true,
			secProt: 6,
			secFmt: 7,
			secFrameRate: 0,
			secQuality: 2,
			secVidSend: 1,
			enbTransGuard: true,
			enableMp:0,
			showMpMode:1,
			mpMode: [],
			enableVM:0,
			
			recorder: {
				recNum: 0,
				recList: []
			}
		},
		urls: {
			"create": "addMeetingTemp.psp",
			"update": "modifyMeetingTemp.psp",
			"delete": "delMeetingTemp.psp",
			"read": "getMeetingTempDetail.psp"
		},
		parse: function(res, options) {
			if(options.collection) {
				return res;
			} else {
				return res.data;
			}
		}
	});
	
	return HymbModel;
});