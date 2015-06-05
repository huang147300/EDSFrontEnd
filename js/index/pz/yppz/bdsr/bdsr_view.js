define(function(require) {
	var FormView = require("web/common/formView");
	var Handlebars = require("handlebars");
	
	var tmpl = require("text!web/index/pz/yppz/bdsr/bdsr_template.html");
	
	var BdsrView = FormView.extend({
		id: "pz_yppz_bdsr",
		template: Handlebars.compile(tmpl),
		
		events: {
			"click .btn-switch1": "toggleSwitch",
			"click .btn-switch2": "toggleSwitch",
			"click .saveBtn" : "saveBdsr"
		},
		saveBdsr: function(e) {
			this.model.set({
				"volumeSingleInPut": this._getInput()
			})
			.save()
			.done(function() {
				alert("保存成功！");
			})
			.fail(function() {
				alert("保存失败！");
			});
		},
		_getInput: function() {
			return this.$(".slide-vertical-box").map(function() {
				var $this = $(this);
				return {
					audInPort: +$this.find("[name=audInPort]").val(),
					audInName: $this.find("[name=audInName]").val(),
					enable: $this.find("[name=enable]").is(".active") ? 1 : 0,
					phtPwrEn: $this.find("[name=phtPwrEn]").is(".active") ? 1 : 0,
					involume: $this.find(".slider").slider("value")
				};
			}).get();
		},
		
		initialize: function() {
			var model = this.model.get("volumeSingleInPut");
			this.options.templateHelpers = {
				MIC: model.slice(0, 12),
				LineIn: model.slice(12)
			};
		},
		onRender: function() {
			this.initSlider();
		},
		onAttach: function() {
			this.activeLink();
		}
	});
	
	return BdsrView;
});
