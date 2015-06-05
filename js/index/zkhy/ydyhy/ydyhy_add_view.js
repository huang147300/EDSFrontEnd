define(function(require) {
	var Radio = require("radio");
	var Mn = require("marionette");
	var tmpl = require("text!web/index/zkhy/ydyhy/ydyhy_add_template.html");
	
	var YdyhyAddView = Mn.LayoutView.extend({
		id: "zkhy_ydyhy_add",
		template: tmpl,
		regions: {
			yhz: "#zkhy_ydyhy_add_yhz",
			form: "#zkhy_ydyhy_add_form"
		},
		
		onBeforeShow: function(view, region, options) {
			this.showChildView("yhz", options.zkhyYdyhyAddYhzView);
			this.showChildView("form", options.zkhyYdyhyAddFormView);
		},
		onAttach: function() {
			Radio.channel("index").command("activeLink");
		}
	});
	
	return YdyhyAddView;
});