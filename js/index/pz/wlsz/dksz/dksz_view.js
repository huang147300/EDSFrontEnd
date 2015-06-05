define(function(require) {
	var FormView = require("web/common/formView");
	var tmpl = require("text!web/index/pz/wlsz/dksz/dksz_template.html");

	var check    = require("variableCheckAPI");
	var inspect  = require("variableCheck");
	var prompt = require("filletPrompt");
	
	var DkszView = FormView.extend({
		id: "pz_wlsz_dksz",
		template: tmpl,
		bindings: {
			"#gkdk": "gkdk",
			"#hjjtdk": "hjjtdk",
			"#xydk_min": "xydk_min",
			"#xydk_max": "xydk_max",
			"#mtdk_min": "mtdk_min",
			"#mtdk_max": "mtdk_max"
		},
		events: {
			"click .saveBtn" : "saveModel"
		},
		saveModel: function(e) {
			if(!inspect.numberCheck("xydk_min") || !inspect.numberCheck("xydk_max") ||  !inspect.numberCheck("mtdk_min") || !inspect.numberCheck("mtdk_max")){
				return;
			}
			this.model.save().done(this.saveSuccess).fail(this.saveError);
		},
		saveSuccess: function() {
			alert("保存成功！");
		},
		saveError: function() {
			alert("保存失败！");
		},
		
		onRender: function() {
			this.stickit().fixCheckbox();
			this.$(".spinner").spinner();
		},
		onAttach: function() {
			this.selectmenu();
			check.numberCheck("xydk_min");
			check.numberCheck("xydk_max");
			check.numberCheck("mtdk_min");
			check.numberCheck("mtdk_max");
		}
	});
	
	return DkszView;
});
