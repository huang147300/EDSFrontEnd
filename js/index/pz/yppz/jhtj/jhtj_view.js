define(function(require) {
	var FormView = require("web/common/formView");
	
	var tmpl = require("text!web/index/pz/yppz/jhtj/jhtj_template.html");
	
	var JhtjView = FormView.extend({
		id: "pz_yppz_jhtj",
		template: tmpl,
		
		events: {
			"click .saveBtn" : "saveJhtj",
			"change [name=outPort]" : "changeOutport"
		},
		changeOutport:function(){
			var self = this;
			this.model.fetch(this.model.getFetchOptions({
				outPort: this._getOutport()
			})).done(function() {
				self.renderData().refreshSlider();
			});
		},
		saveJhtj: function(e) {
			this.model.set({
				"eqGain": this._getCfgArg(),
				"outPort": this._getOutport()
			})
			.save()
			.done(function() {
				alert("保存成功！");
			})
			.fail(function() {
				alert("保存失败！");
			});
		},
		_getCfgArg: function() {
			return this.$(".slide-vertical-box").map(function() {
				return +$(this).find(".slider").slider("value");
			}).get();
		},
		
		onRender: function() {
			this.renderData().fixRadio().initSlider();
		},
		_getOutport:function(){
			var $el = this.$el;
			return  +$el.find("[name=outPort]:checked").val();
		},
		renderData: function() {
			var outPort = this.model.get("outPort");
			this.$el.find("[name=outPort][value=" + outPort + "]").prop("checked", true);
			
			var output = this.model.get("eqGain");
			this.$(".slide-vertical-box").each(function(i) {
				$(this).find(".sliderValue").text(output[i] || 0);
			});
			return this;
		},
		onAttach: function() { 
			this.activeLink();
		}
	});
	
	return JhtjView;
});
