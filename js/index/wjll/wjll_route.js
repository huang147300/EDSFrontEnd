define(function(require) {
	var Route = require("web/common/route");
	
	var WjllView = require("web/index/wjll/wjll_view");
	var SearchTermsView = require("web/index/wjll/searchTerms_view");
	var SearchTermsModel = require("web/index/wjll/searchTerms_model");
	var FileView = require("web/index/wjll/file_view");
	var FileCollection = require("web/index/wjll/file_collection");

	var WjllRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			this.searchTermsModel = new SearchTermsModel();
			this.searchTerms = this.searchTermsModel.toJSON();
			this.pageNum = 1;
			this.fileCollection = new FileCollection();

			$.when(
				$.getJSON("getDiskList.psp"),
				$.getJSON("getFileList.psp", JSON.stringify({
					searchTerms: this.searchTerms,
					pageNum: this.pageNum
				}))
			).done(function(diskList, fileList) {
				self.diskList = diskList[0].data.diskList;
				self.endFlag = fileList[0].data.endFlag;
				self.fileCollection.reset(fileList[0].data.fileList);
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				contentRightView: new WjllView({
					searchTerms: this.searchTerms,
					pageNum: this.pageNum,
					endFlag: this.endFlag,
					templateHelpers: {
						diskList: this.diskList
					}
				}),
				searchTermsView: new SearchTermsView({
					model: this.searchTermsModel,
					templateHelpers: {
						diskList: this.diskList
					}
				}),
				fileView: new FileView({
					collection: this.fileCollection
				})
			});
		}
	});
	
	return WjllRoute;
});