define(function(require) {
	var FormView = require("web/common/formView");
	var tmpl = require("text!web/index/pz/wlsz/sip/sip_template.html");

	var check    = require("variableCheckAPI");
	var inspect  = require("variableCheck");
	var prompt = require("filletPrompt");
	
	var SIPView = FormView.extend({
		id: "pz_wlsz_sip",
		template: tmpl,
		bindings: {
			"#zcfwq": "zcfwq",
			"#fwqdz": "fwqdz",
			"#qydlfwq": "qydlfwq",
			"#dlfwqdz": "dlfwqdz",
			"#hyfwhm": "hyfwhm",
			"#hchm": "hchm",
			"#yhm": "yhm",
			"#mm": "mm" 
		},
		events: {
			"click .saveBtn" : "saveModel"
		},
		saveModel: function(e) {
			if(!inspect.ipCheck("fwqdz") || !inspect.ipCheck("dlfwqdz") || !inspect.numberCheck("hyfwhm") || !inspect.numberCheck("hchm")||
				!inspect.check("hchm") || !inspect.passCheck("mm")){
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
		},
		onAttach: function() {
			this.selectmenu();
			check.ipCheck("fwqdz");
			check.ipCheck("dlfwqdz");
			check.numberCheck("hyfwhm");
			check.numberCheck("hchm");
			check.universalCheck("yhm");
			check.passwordCheck("mm");
		}
	});
	
	return SIPView;
});
