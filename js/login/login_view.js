define(function(require) {
	var Backbone = require("backbone");
	var Mn = require("marionette");
	var tmpl = require("text!web/login/login_template.html");

	var check    = require("variableCheckAPI");
	var inspect  = require("variableCheck");
	var prompt = require("filletPrompt");
	
	var LoginModel = Backbone.Model.extend({
		urls: {
			"create": "login.psp"
		}
	});
	
	var LoginView = Mn.ItemView.extend({
		id: "wrapper",
		template: tmpl,
		events: {
			"click [type=submit]": "login",
			"click [type=reset]" : "onReset"
		},
		bindings: {
			"#username": "username",
    		"#password": "password"
		},
		initialize: function() {
			this.model = new LoginModel();
		},
		onAttach:function(e){
			check.universalCheck("username");
			check.passwordCheck("password");
		},
		login: function(e) {
			e.preventDefault();
			var self = this;
			if(!inspect.check("username") ||
				!inspect.passCheck("password"))
			{
				return;
			}
			this.model.set("version","super");
			this.model.save().done(function(res) {
				self.success(res);
			});
		},
		success: function(res) {
			if(res.code === 0) {
    			Backbone.history.navigate("portal", {trigger: true});
    		} else {
    			//console.log("login failed");
    		}
		},
		onReset: function(){
			prompt.closePromptText("username");
			prompt.closePromptText("password");
		}
	});
	
	return LoginView;
});