define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/wjll/video_template.html");
	
	var VideoView = Mn.ItemView.extend({
		id: "videoView",
		template: tmpl,
		
		play: function(opt) {
			this.show();
			$("#video_jplayer").jPlayer("setMedia", {
				title: opt.title,
				m4v: opt.path,
				poster: "http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png"
			}).jPlayer("play");
		},
		
		pause: function() {
			$("#video_jplayer").jPlayer("pause");
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
			$("#video_jplayer").jPlayer({
				ready: function () {
					$(this).jPlayer("setMedia", {
						title: self.options.opt.title,
						m4v: self.options.opt.path,
						poster: "http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png"
					}).jPlayer("play");
				},
				cssSelectorAncestor: "#video_container",
				swfPath: "js/lib/pro/jplayer",
				supplied: "m4v",
				useStateClassSkin: true,
				autoBlur: false,
				smoothPlayBar: true,
				keyEnabled: true,
				remainingDuration: true,
				toggleDuration: true
			});
		}
	});
	
	return VideoView;
});
