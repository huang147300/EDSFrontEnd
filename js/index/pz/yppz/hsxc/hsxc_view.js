define(function(require) {
	var FormView = require("web/common/formView");
	
	var tmpl = require("text!web/index/pz/yppz/hsxc/hsxc_template.html");
	
	var HsxcView = FormView.extend({
		id: "pz_yppz_hsxc",
		template: tmpl,
		
		events: {
			"click .btn-switch3": "toggleSwitch",
			"click .saveBtn" : "saveHsxc"
		},
		saveHsxc: function(e) {
			this.model.set(this._getHsxc())
			.save()
			.done(function() {
				alert("保存成功！");
			})
			.fail(function() {
				alert("保存失败！");
			});
		},
		_getHsxc: function() {
			var $el = this.$el;
			return {
				agcEn: $el.find("#agcEn").is(".active") ? 1 : 0,
				aecEn: $el.find("#aecEn").is(".active") ? 1 : 0,
				aecMode: +$el.find("[name=aecMode]:checked").val()
			};
		},
		
		onRender: function() {
			this.renderData().fixRadio();
		},
		renderData: function() {
			var $el = this.$el;
			var model = this.model;
			model.get("agcEn") && $el.find("#agcEn").addClass("active");
			model.get("aecEn") && $el.find("#aecEn").addClass("active");
			var aecMode = model.get("aecMode");
			$el.find("[name=aecMode][value=" + aecMode + "]").prop("checked", true);
			return this;
		},
		onAttach: function() {
			this.activeLink();
		}
	});
	
	return HsxcView;
});
