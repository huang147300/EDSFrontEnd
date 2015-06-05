define(function(require) {
	var Model = require("web/common/model");
	
	var FileModel = Model.extend({
		defaults: {
			fileType: 0,
			fileName: "",
			filePath: "",
			fileSize: 0,
			playTime: "",
			recordTime: "",
			confNum: 0,
			confName: "",
			convenor: ""
		}
	});
	
	return FileModel;
});