define(function(require) {
	var FormView = require("web/common/formView");
	
	var tmpl = require("text!web/index/pz/yppz/bzhy/bzhy_template.html");
	
	var BzhyView = FormView.extend({
		id: "pz_yppz_bzhy",
		template: tmpl,
		events: {
			"click .saveBtn" : "saveBzhy",
			"change [name=groupNum]" : "changeNum"
		},
		changeNum:function(){
			var self = this;
			this.model.fetch(this.model.getFetchOptions({
				groupNum: this._getNum()
			})).done(function() {
				self.renderData().initCheckboxClass().initRadioClass();
			});
		},
		saveBzhy: function() {
			this.model.set(this._getBzhy())
			.save()
			.done(function() {
				alert("保存成功！");
			})
			.fail(function() {
				alert("保存失败！");
			});
		},
		_getNum:function(){
			var $el = this.$el;
			return  +$el.find("[name=groupNum]:checked").val();
		},
		_getBzhy: function() {
			var $el = this.$el;
			var portArr = $el.find("[name=Mic]:checked").map(function() {
				return +this.value;
			}).get();
			
			return {
				groupNum: +$el.find("[name=groupNum]:checked").val(),
				inputNum: portArr.length,
				audInPort: portArr
			};
		},
		
		onRender: function() {
			this.renderData().fixRadio().fixCheckbox();
		},
		renderData: function() {
			var $el = this.$el;
			var model = this.model;
			var groupNum = model.get("groupNum");
			$el.find("[name=groupNum][value=" + groupNum + "]").prop("checked", true);
			var audInPort = model.get("audInPort");
			var $MICs = $el.find("[name=Mic]");
			$MICs.prop("checked", false);
			_.each(audInPort, function(port) {
				$MICs.filter("[value=" + port + "]").prop("checked", true);
			});
			return this;
		},
		onAttach: function() {
			this.activeLink();
		}
	});
	
	return BzhyView;
});
