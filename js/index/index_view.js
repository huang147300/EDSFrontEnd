define(function(require) {
	var Backbone = require("backbone");
	var Radio = require("radio");
	var Mn = require("marionette");
	var tmpl = require("text!web/index/index_template.html");
	
	var LayoutView = Mn.LayoutView.extend({
		id: "wrapper",
		template: tmpl,
		regions: {
			container: "#c1",
			navLeft: ".navLeft",
			contentRight: ".contentRight"
		},
		
		initialize: function() {
			Radio.channel("index").reset();
			Radio.channel("index").comply("activeLink", this.activeLink, this);
		},
		
		activeLink: function() {
			var hash = Backbone.history.getHash();
			var num = hash.indexOf("/");
			var hashRoot = num === -1 ? hash : hash.slice(0, num);
			this.$(".navTop").find("a").removeClass("active").filter("[href='#"+hashRoot+"']").addClass("active");
			var $a = this.$(".navLeft").find("a");
			if($a.length === 0) return;
			$a.removeClass("active").filter("[href*='"+hash+"']").eq(0).addClass("active");
		},

		onBeforeShow: function(view, region, options) {
			var navLeftRegion = this.getRegion("navLeft");
			options.navLeftView && navLeftRegion.show(new options.navLeftView()) || navLeftRegion.empty();
			this.getRegion("contentRight").show(options.contentRightView, options);
		},
		
		onDestroy: function() {
			Radio.channel("index").reset();
		}
	});
	
	return LayoutView;
});