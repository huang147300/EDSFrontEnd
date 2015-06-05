define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/zkhy/navLeft/navLeft_template.html");
	
	var NavLeftView = Mn.ItemView.extend({
		tagName: "ul",
		template: tmpl,
	});
	
	return NavLeftView;
});
