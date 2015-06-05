define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/wjll/audio_template.html");
	
	var AudioView = Mn.ItemView.extend({
		id: "audioView",
		template: tmpl,
		
		play: function(opt) {
			this.show();
			$("#audio_jplayer").jPlayer("setMedia", {
				title: opt.title,
				m4a: opt.path
			}).jPlayer("play");
		},
		
		pause: function() {
			$("#audio_jplayer").jPlayer("pause");
		},
		
		hide: function() {
			this.$el.css({
				width: 0,
				height: 0
			});
		},
		
		show: function() {
			this.$el.css({
				width: "auto",
				height: "auto"
			});
		},
		
		onAttach: function() {
			var self = this;
			$("#audio_jplayer").jPlayer({
				ready: function () {
					$(this).jPlayer("setMedia", {
						title: self.options.opt.title,
						m4a: self.options.opt.path,
					}).jPlayer("play");
				},
				cssSelectorAncestor: "#audio_container",
				swfPath: "js/lib/pro/jplayer",
				supplied: "m4a",
				useStateClassSkin: true,
				autoBlur: false,
				smoothPlayBar: true,
				keyEnabled: true,
				remainingDuration: true,
				toggleDuration: true
			});
		}
	});
	
	return AudioView;
});
