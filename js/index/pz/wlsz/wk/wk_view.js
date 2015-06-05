define(function(require) {
	var FormView = require("web/common/formView");
	var tmpl = require("text!web/index/pz/wlsz/wk/wk_template.html");
	var AckId = require("web/common/ackid");

	var check    = require("variableCheckAPI");
	var inspect  = require("variableCheck");
	var prompt = require("filletPrompt");
	
	var WkView = FormView.extend({
		id: "pz_wlsz_wk",
		template: tmpl,
		bindings: {
			"#prot":  "prot",
			"#device":  "device",
			"#mainDevice": "mainDevice",
			"#netType":  "netType",
			"#ip":  "ip",
			"#mask":  "mask",
			"#gateway":  "gateway",
			"#mainDns":   "mainDns",
			"#autoDial":  "autoDial",
			"#user":  "user",
			"#pwd":  "pwd" 
		},
		events: {
			"click .saveBtn" : "saveModel"
		},
		saveModel: function(e) {
			var self = this;
			if(!inspect.ipCheck("ip") || !inspect.ipCheck("mask") || !inspect.ipCheck("gateway") || !inspect.check("mainDns") || !inspect.check("user") ||
					!inspect.passCheck("pwd")){
				 return;
			}
			this.model.save().done(function(res) {
				self.saveSuccess(res);
			}).fail(function() {
				self.saveError();
			});
		},
		saveSuccess: function(res) {
			if(res.code != AckId.AckId_Suc)
			{
				switch (res.code){
					case AckId.AckId_SysInCalling:
						alert("正在召开会议，不允许修改网络!");
						break;
					default:
						alert("改网络失败！");
						break;
				}
			}
		},
		saveError: function() {
			alert("保存失败！");
		},
		onRender: function() {
			this.stickit().fixCheckbox().changeNetType();
			this.showKdbh();
		},
		showKdbh: function() {
			if(this.model.get("mainDevice")) {
				if(this.$kdbh) {
					this.$("#netType").append(this.$kdbh);
					this.$kdbh = null;
				}
			} else {
				if(!this.$kdbh) {
					this.$kdbh = this.$("#netType").children().last().detach().prop("selected", false);
					this.$("#netType").change();
				}
			}
		},
		onAttach: function() {
			this.selectmenu();
			check.ipCheck("ip");
			check.ipCheck("mask");
			check.ipCheck("gateway");
			check.universalCheck("mainDns");
			check.universalCheck("user");
			check.passwordCheck("pwd");
		},
		initialize: function() {
			this.listenTo(this.model, "change:netType", this.changeNetType);
			if(this.model.get("mainDevice")) {
				this.listenTo(this.model, "change:mainDevice", this.changeMainDevice);
			}
		},
		changeNetType: function() {
			var curNet = this.model.get("netType");
			var preNet = this.model.previous("netType");
			this.$("[netType*="+preNet+"]").hide();
			this.$("[netType*="+curNet+"]").show();			
			if(curNet == 1)
			{
				this.$("[netType*=4]").prop("disabled", true).css({"opacity":0.5});
			}
			else
			{
				this.$("[netType*=4]").removeAttr("disabled").css({"opacity":1});
			}
			var netCnnt = this.model.get("netCnnt");
			this.model.set(netCnnt[curNet]);
		},
		changeMainDevice: function() {
			this.showKdbh();
			this.refreshSelectmenu();
		}
	});
	
	return WkView;
});
