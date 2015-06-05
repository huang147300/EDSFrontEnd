define(function(require) {
	var Radio = require("radio");
	var Mn = require("marionette");
	var tmpl = require("text!web/index/vmatrix/vmatrix_template.html");
	
	var VMatrixView = Mn.LayoutView.extend({
		id: "vmatrix",
		template: tmpl,
		regions: {
			vmatrix: "#vmatrix_vmatrix"
		},
		
		onBeforeShow: function(view, region, options) {
			this.showChildView("vmatrix", options.vMatrixView);
		},
		onAttach: function() {
			Radio.channel("index").command("activeLink");
		}
	});
	
	return VMatrixView;
});