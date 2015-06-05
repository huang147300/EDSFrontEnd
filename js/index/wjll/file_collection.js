define(function(require) {
	var Backbone = require("backbone");
	var FileModel = require("web/index/wjll/file_model");
	
	var FileCollection = Backbone.Collection.extend({
		model: FileModel,
		urls: {
			"read": "getFileList.psp"
		},
		parse: function(res) {
			if(res && res.data && res.data.fileList)
				return res.data.fileList;
			return [];
		}
	});
	
	return FileCollection;
});