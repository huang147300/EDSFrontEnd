define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var Mn = require("marionette");
	var tmpl = require("text!web/index/hykz/spjz/spjz_template.html");
	
	var SpjzView = Mn.LayoutView.extend({
		id: "hykz_spjz",
		template: tmpl,
		regions: {
			spjz: "#hykz_spjz_container"
		},
		
		bindings: {
			"#matrixInOut": "matrixInOut",
			"#enableVM": "enableVM"
		},
		
		events: {
			"click .saveBtn": "saveSpjz"
		},
		saveSpjz: function(e) {
			e.preventDefault();
			var self = this;
			
			var matrixInOut = Radio.channel("spjz").request("getMatrixInOut");
			
			this.model.set({
				"matrixInOut": matrixInOut,
				"matrixNum": matrixInOut.length
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
			this.showChildView("spjz", options.hykzHymbAddSpjzView);
		},
		onAttach: function() {
			Radio.channel("index").command("activeLink");
		}
	});
	
	return SpjzView;
});
