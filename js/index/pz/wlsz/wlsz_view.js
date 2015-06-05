define(function(require) {
	var Radio = require("radio");
	var Mn = require("marionette");
	var tmpl = require("text!web/index/pz/wlsz/wlsz_template.html");
	
	var WkModel = require("web/index/pz/wlsz/wk/wk_model");
	var WkView = require("web/index/pz/wlsz/wk/wk_view");
	
	var DkszModel = require("web/index/pz/wlsz/dksz/dksz_model");
	var DkszView = require("web/index/pz/wlsz/dksz/dksz_view");
	
	var QosModel = require("web/index/pz/wlsz/qos/qos_model");
	var QosView = require("web/index/pz/wlsz/qos/qos_view");
	
	var SIPModel = require("web/index/pz/wlsz/sip/sip_model");
	var SIPView = require("web/index/pz/wlsz/sip/sip_view");
	
	var NATModel = require("web/index/pz/wlsz/nat/nat_model");
	var NATView = require("web/index/pz/wlsz/nat/nat_view");
	
	var RTSPModel = require("web/index/pz/wlsz/rtsp/rtsp_model");
	var RTSPView = require("web/index/pz/wlsz/rtsp/rtsp_view");
	
	var H323Model = require("web/index/pz/wlsz/H323/H323_model");
	var H323View = require("web/index/pz/wlsz/H323/H323_view");
	
	var WlszView = Mn.LayoutView.extend({
		id: "pz_wlsz",
		template: tmpl,
		regions: {
			container: "#pz_wlsz_container"
		},
		events: {
			"click .wlsz-box .btn" : "wlsz",
		},
		modelViewMap: {
			"wk" : [WkModel, WkView],
			"dksz" : [DkszModel, DkszView],
			"sip" : [SIPModel, SIPView],
			"nat" : [NATModel, NATView],
			"h323" : [H323Model, H323View],
			"rtsp" : [RTSPModel, RTSPView],
			"qos" : [QosModel, QosView]
		},
		wlsz: function(e) {
			var self = this;
			var btn = e.target;
			var ModelView = this.modelViewMap[btn.name];
			var wkOption = this._getWkOption(btn);
			
			var Model = ModelView[0];
			var View = ModelView[1];
			
			var model = new Model();
			model.fetch(wkOption).done(function() {
				self.showChildView("container", new View({
					model: model
				}));
			});
		},
		_getWkOption: function(btn) {
			if(btn.id === "wk1" || btn.id === "wk2") {
				return {
					data: JSON.stringify({
						device: btn.id === "wk1" ? 0 : 1
					})
				};
			}
		},
		
		onBeforeShow: function(view, region, options) {
			this.showChildView("container", options.pzWlszWkView);
		},
		onAttach: function() {
			Radio.channel("index").command("activeLink");
		}
	});
	
	return WlszView;
});
