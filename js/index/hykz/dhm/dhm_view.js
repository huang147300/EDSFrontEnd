define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var Mn = require("marionette");
	var tmpl = require("text!web/index/hykz/dhm/dhm_template.html");
	
	var SpjzView = Mn.LayoutView.extend({
		id: "hykz_dhm",
		template: tmpl,
		regions: {
			dhm: "#hykz_dhm_container"
		},
		
		bindings: {
			"#subPicInfo": "subPicInfo",
			"#showMpMode": "showMpMode"
		},
		
		events: {
			"click .saveBtn": "saveSpjz"
		},
		saveSpjz: function(e) {
			e.preventDefault();
			var self = this;
			
			var showMpMode = Radio.channel("dhm").request("getShowMpMode");
			var mpMode = Radio.channel("dhm").request("getMpMode");
			
			this.model.set({
				"showMpMode": showMpMode,
				"mpMode": mpMode
			})
			.save()
			.done(function() {
				self.saveSuccess();
			})
			.fail(function() {
				self.saveError();
			});
		},
		saveSuccess: function() {
			//alert("保存成功！");
		},
		saveError: function() {
			alert("保存失败！");
		},
		
		onBeforeShow: function(view, region, options) {
			this.showChildView("dhm", options.hykzHymbAddDhmView);
		},
		onAttach: function() {
			Radio.channel("index").command("activeLink");
		}
	});
	
	return SpjzView;
});
