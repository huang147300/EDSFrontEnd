define(function(require) {
	var FormView = require("web/common/formView");
	var tmpl = require("text!web/index/pz/wlsz/H323/H323_template.html");
    var check    = require("web/lib/pro/variableCheckAPI");
    var inspect  = require("web/lib/pro/variableCheck");
	
	var H323View = FormView.extend({
		id: "pz_wlsz_h323",
		template: tmpl,
		bindings: {
			"#enable": "enable",
			"#gkIp": "gkIp",
			"#regNum": "regNum",
			"#regName": "regName",
			"#regPwd": "regPwd"
		},
		events: {
			"click .saveBtn" : "saveModel"
		},
		saveModel: function(e) {
            if(!inspect.ipCheck("gkIp") ||
                    !inspect.numberCheck("regNum") ||
                    !inspect.check("regName") ||
                    !inspect.passCheck("regPwd"))
            {
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
            check.ipCheck("gkIp");
            check.numberCheck("regNum");
            check.universalCheck("regName");
            check.passwordCheck("regPwd");
		}
	});
	
	return H323View;
});
