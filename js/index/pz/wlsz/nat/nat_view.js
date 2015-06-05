define(function(require) {
	var FormView = require("web/common/formView");
	var tmpl = require("text!web/index/pz/wlsz/nat/nat_template.html");

	var check    = require("variableCheckAPI");
	var inspect  = require("variableCheck");
	var prompt = require("filletPrompt");
	
	var NATView = FormView.extend({
		id: "pz_wlsz_nat",
		template: tmpl,
		bindings: {
			"#enable": "enable",
			"#externalIp": "externalIp",
			"#callBeginPort": "callBeginPort",
			"#callEndPort": "callEndPort",
			"#rtpBeginPort": "rtpBeginPort",
			"#rtpEndPort": "rtpEndPort"
		},
		events: {
			"click .saveBtn" : "saveModel"
		},
		saveModel: function(e) {
			if(!inspect.ipCheck("externalIp") || !inspect.numberCheck("callBeginPort") || !inspect.numberCheck("callEndPort") || !inspect.numberCheck("rtpBeginPort")
						|| !inspect.numberCheck("rtpEndPort")){
				return;
			}
			this.model.save().done(this.saveSuccess).fail(this.saveError);
		},
		saveSuccess: function() {
			//alert("保存成功！");
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
			check.ipCheck("externalIp");
			check.numberCheck("callBeginPort");
			check.numberCheck("callEndPort");
			check.numberCheck("rtpBeginPort");
			check.numberCheck("rtpEndPort");
		}
	});
	
	return NATView;
});
