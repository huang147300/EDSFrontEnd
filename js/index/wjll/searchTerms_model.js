define(function(require) {
	var Model = require("web/common/model");
	
	var SearchTermsModel = Model.extend({
		defaults: {		
			startTime: "",
			endTime: "",
			diskPath: "",
			fileType: 2,
			confNum: "",
			confName: "",
			convenor: ""
		}
	});
	
	return SearchTermsModel;
});