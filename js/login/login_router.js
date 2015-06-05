define(function(require) {
	var Mn = require("marionette");
	var LoginView = require("web/login/login_view");
	
	var LoginRouter = Mn.AppRouter.extend({
		initialize: function(options) {
			this.container = options.container;
		},
		
		routes: {
			"": "login",
			"login": "login"
		},
		
		login: function() {
			this.container.show(new LoginView());
		}
	});
	
	return LoginRouter;
});