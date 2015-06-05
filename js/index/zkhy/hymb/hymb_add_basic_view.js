define(function(require) {
	var _ = require("underscore");
	var FormView = require("web/common/formView");
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_basic_template.html");
	var Radio = require("radio");
	
	var check    = require("variableCheckAPI");
    var inspect  = require("variableCheck");
    var prompt = require("filletPrompt");
    
	var BasicView = FormView.extend({
		id: "hymb_add_basic",
		template: tmpl,
		
		bindings: {
			"#name": "lineName",
			"#desc": "desc",
			"#secVidFlag": "secVidFlag",
			"#enbTransGuard": "enbTransGuard",
			
			"#audProt": {
				observe: "audProt",
				selectName: "audProt"
			},
			"#vidProt": {
				observe: "vidProt",
				selectName: "vidProt"
			},
			"#vidFmt": {
				observe: "vidFmt",
				selectName: "vidFmt"
			},
			"#frameRate": {
				observe: "frameRate",
				selectName: "frameRate"
			},
			"#vidQuality": {
				observe: "vidQuality",
				selectName: "vidQuality"
			},
			"#secProt": {
				observe: "secProt",
				selectName: "secProt"
			},
			"#secFmt": {
				observe: "secFmt",
				selectName: "secFmt"
			},
			"#secFrameRate": {
				observe: "secFrameRate",
				selectName: "secFrameRate"
			},
			"#secQuality": {
				observe: "secQuality",
				selectName: "secQuality"
			},
			"#secVidSend": {
				observe: "secVidSend",
				selectName: "secVidSend"
			}
		},
		
		initialize: function() {
			this.setSelectBindings(this.bindings);
			Radio.channel("basic").reset();
			Radio.channel("basic").reply("basicCheck", this.basicCheck, this);
			Radio.channel("basic").reply("nameDup", this.nameDup, this);
		},
		onRender: function() {
			this.stickit().fixCheckbox();
		},
		nameDup:function(){
			prompt.buildPrompt("模板名称重复", "lineName");
			$("#lineName").focus();
		},
		basicCheck:function(){
			if(inspect.notNull("lineName")&&inspect.check("lineName") &&inspect.check("desc"))
            {
                return true;
            }
            return false;
		},
		onAttach: function() {
			this.selectmenu();
			check.notNull("lineName");
			check.universalCheck("desc");
		},
		onDestroy:function(){
			prompt.closePromptText("lineName");
			prompt.closePromptText("desc");
		}
	});
	
	return BasicView;
});