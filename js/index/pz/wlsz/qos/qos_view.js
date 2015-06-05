define(function(require) {
	var FormView = require("web/common/formView");
	var tmpl = require("text!web/index/pz/wlsz/qos/qos_template.html");
	
	var QosView = FormView.extend({
		id: "pz_wlsz_qos",
		template: tmpl,
		bindings: {
			"#swzwk": "swzwk",
			"#wllx":  "wllx",
			"#ipdz":  "ipdz",
			"#zwym":  "zwym",
			"#wgdz":  "wgdz",
			"#dns":   "dns",
			"#sxdk":  "sxdk",
			"#xxdk":  "xxdk" 
		},
		events: {
			"click .saveBtn" : "saveModel"
		},
		saveModel: function(e) {
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
		}
	});
	
	return QosView;
});
