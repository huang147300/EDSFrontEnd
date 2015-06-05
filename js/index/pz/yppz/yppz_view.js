define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var Mn = require("marionette");
	var tmpl = require("text!web/index/pz/yppz/yppz_template.html");
	
	var BdsrModel = require("web/index/pz/yppz/bdsr/bdsr_model");
	var BdsrView = require("web/index/pz/yppz/bdsr/bdsr_view");
	
	var BdscModel = require("web/index/pz/yppz/bdsc/bdsc_model");
	var BdscView = require("web/index/pz/yppz/bdsc/bdsc_view");
	
	var JhtjModel = require("web/index/pz/yppz/jhtj/jhtj_model");
	var JhtjView = require("web/index/pz/yppz/jhtj/jhtj_view");
	
	var FsydhyModel = require("web/index/pz/yppz/fsydhy/fsydhy_model");
	var FsydhyView = require("web/index/pz/yppz/fsydhy/fsydhy_view");
	
	var JsydhyModel = require("web/index/pz/yppz/jsydhy/jsydhy_model");
	var JsydhyView = require("web/index/pz/yppz/jsydhy/jsydhy_view");
	
	var BzhyModel = require("web/index/pz/yppz/bzhy/bzhy_model");
	var BzhyView = require("web/index/pz/yppz/bzhy/bzhy_view");
	
	var HsxcModel = require("web/index/pz/yppz/hsxc/hsxc_model");
	var HsxcView = require("web/index/pz/yppz/hsxc/hsxc_view");
	
	var ZdjzModel = require("web/index/pz/yppz/zdjz/zdjz_model");
	var ZdjzView = require("web/index/pz/yppz/zdjz/zdjz_view");
	
	var FkyzModel = require("web/index/pz/yppz/fkyz/fkyz_model");
	var FkyzView = require("web/index/pz/yppz/fkyz/fkyz_view");
	
	var YppzView = Mn.LayoutView.extend({
		id: "pz_yppz",
		template: tmpl,
		regions: {
			container: "#pz_yppz_container"
		},
		initialize: function(options) {
			var self = this;
			$.when(
				$.getJSON("getMuteFlag.psp"),//静音
				$.getJSON("getShieldFlag.psp")//闭音
			).done(function(mute,shield) {
				if(mute[0].data.enable == 0)
				{
					$(".btn-switch4").addClass("active");
				}
				
				if(shield[0].data.enable == 0)
				{
					$(".btn-switch5").addClass("active");
				}
			});
		},
		events: {
			"click .btn-switch4": "toggleSwitch4",
			"click .btn-switch5": "toggleSwitch5",
			"click .yppz-box .btn" : "yppz"
		},
		toggleSwitch4: function(e) {
			var $this = $(e.target);
  			
  			var value = $this.is(".active") ? 1 : 0;
  			$.getJSON("setMuteFlag.psp", JSON.stringify({
  				enable: value
  			})).done(function(res){
  				if(res.code == 0)
  				{
  					$this.toggleClass("active");
  				}
  				else
  				{
  					alert("保存失败！");
  				}
  			});
  		},
  		toggleSwitch5: function(e) {
			var $this = $(e.target);
			
  			var value = $this.is(".active") ? 1 : 0;
  			$.getJSON("setShieldFlag.psp", JSON.stringify({
  				enable: value
  			})).done(function(res){
  				if(res.code == 0)
  				{
  					$this.toggleClass("active");
  				}
  				else
  				{
  					alert("保存失败！");
  				}
  			});;
  		},
		modelViewMap: {
			"bdsr" : [BdsrModel, BdsrView],
			"bdsc" : [BdscModel, BdscView],
			"jhtj" : [JhtjModel, JhtjView],
			"fsydhy" : [FsydhyModel, FsydhyView],
			"jsydhy" : [JsydhyModel, JsydhyView],
			"bzhy" : [BzhyModel, BzhyView],
			"hsxc" : [HsxcModel, HsxcView],
			"zdjz" : [ZdjzModel, ZdjzView],
			"fkyz" : [FkyzModel, FkyzView]
		},
		yppz: function(e) {
			var self = this;
			var ModelView = this.modelViewMap[e.target.id];
			
			var Model = ModelView[0];
			var View = ModelView[1];
			
			var model = new Model();
			model.fetch().done(function() {
				self.showChildView("container", new View({
					model: model
				}));
			});
		},
		
		onBeforeShow: function(view, region, options) {
			this.showChildView("container", options.pzYppzBdsrView);
		},
		onAttach: function() {
			Radio.channel("index").command("activeLink");
		}
	});
	
	return YppzView;
});
