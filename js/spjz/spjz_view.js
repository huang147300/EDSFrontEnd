define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/portal/portal_template.html");
	
	var PortalView = Mn.ItemView.extend({
		id: "wrapper",
		template: tmpl
	});
	
	return PortalView;
});