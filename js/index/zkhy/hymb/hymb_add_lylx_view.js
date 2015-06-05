define(function(require) {
	var FormView = require("web/common/formView");
	var Radio = require("radio");
	var Const = require("web/common/const");
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_lylx_template.html");
	
	var LzbmView = FormView.extend({
		id: "hymb_add_lxly",
		template: tmpl,
		
		ui: {
			"equSrc": "#equSrc"
		},
		
		bindings: {
			"#enbRec":         "enbRec",
			
			"#camPort":        "equSrc.camPort",
			"#equType":        "equSrc.equType",
			"#recordId":       "equSrc.recordId",
			"#vgaPort":        "equSrc.vgaPort",
			//"#equSrc":         "equSrc",
			
			"#HD_enbHandle":   {
				observe: "vidHdCfg.enbHandle",
				visible: true,
				visibleFn: "showMore"
			},
			
			"#HD_enbStoreHd":  "vidHdCfg.enbStoreHd",
			"#HD_vidProt": {
				observe: "vidHdCfg.vidEncParam.vidProt",
				selectName: "recordVidProt"
			},
			"#HD_fmt": {
				observe: "vidHdCfg.vidEncParam.fmt",
				selectName: "vidFmt"
			},
			"#HD_frameRate": {
				observe: "vidHdCfg.vidEncParam.frameRate",
				selectName: "frameRate"
			},
			"#HD_bitRate": {
				observe: "vidHdCfg.vidEncParam.bitRate",
				selectName: "bandwidth"
			},
			"#HD_RTSP_enable": {
				observe: "vidHdCfg.vodServeParam.enable",
				visible: true,
				visibleFn: "disableText"
			},
			"#HD_RTSP_name":   "vidHdCfg.vodServeParam.name",
			"#HD_RTMP_enable": {
				observe: "vidHdCfg.pushDumpParam.enable",
				visible: true,
				visibleFn: "disableText"
			},
			"#HD_RTMP_url":    "vidHdCfg.pushDumpParam.url",
			
			"#SD_enbHandle":   {
				observe: "vidSdCfg.enbHandle",
				visible: true,
				visibleFn: "showMore"
			},
			
			"#SD_enbStoreHd":  "vidSdCfg.enbStoreHd",
			
			"#SD_vidProt": {
				observe: "vidSdCfg.vidEncParam.vidProt",
				selectName: "recordVidProt"
			},
			"#SD_fmt": {
				observe: "vidSdCfg.vidEncParam.fmt",
				selectName: "vidFmt"
			},
			"#SD_frameRate": {
				observe: "vidSdCfg.vidEncParam.frameRate",
				selectName: "frameRate"
			},
			"#SD_bitRate": {
				observe: "vidSdCfg.vidEncParam.bitRate",
				selectName: "bandwidth"
			},
			
			"#SD_RTSP_enable": {
				observe: "vidSdCfg.vodServeParam.enable",
				visible: true,
				visibleFn: "disableText"
			},
			"#SD_RTSP_name":   "vidSdCfg.vodServeParam.name",
			"#SD_RTMP_enable": {
				observe: "vidSdCfg.pushDumpParam.enable",
				visible: true,
				visibleFn: "disableText"
			},
			"#SD_RTMP_url":    "vidSdCfg.pushDumpParam.url",
			
			"#YP_enbHandle":   "audCfg.enbHandle",
			
			"#YP_audProt": {
				observe: "audCfg.audEncParam.audProt",
				selectName: "audProt"
			},
			"#YP_sampleRate": {
				observe: "audCfg.audEncParam.sampleRate",
				selectName: "sampleRate"
			},
			"#YP_bitRate": {
				observe: "audCfg.audEncParam.bitRate",
				selectName: "bitRate"
			},
			
			"#endShowTheme":   "osdCfg.endShowTheme",
			"#enbShowMark":    "osdCfg.enbShowMark",
			"#dispPos": {
				observe: "osdCfg.dispPos",
				selectName: "dispPos"
			},
			
			"#enbShowVolume":  "osdCfg.enbShowVolume",
			"#volPos": {
				observe: "osdCfg.volPos",
				selectName: "dispPos"
			},
			"#enbShowCaption": "osdCfg.enbShowCaption",
			
			"#capPos": {
				observe: "osdCfg.capPos",
				selectName: "captionPos"
			},
			"#scrollSpeed": {
				observe: "osdCfg.scrollSpeed",
				selectName: "scrollSpeed"
			},
			
			"#caption":        "osdCfg.caption"
		},
		
		showMore: function($el, isVisible) {
			var $nextFieldBox = $el.parents(".fieldBox").eq(0).next(".fieldBox");
			isVisible && $nextFieldBox.slideDown() || $nextFieldBox.slideUp();
		},
		
		disableText: function($el, isVisible) {
			if(isVisible) {
				$el.next().next().removeClass("disabled").prop("disabled", false);
			} else {
				$el.next().next().addClass("disabled").prop("disabled", true);
			}
		},
		
		events: {
			"click .btn-switch6": "toggleSwitch",
			"change @ui.equSrc": "getSelectEquSrc"
		},
		toggleSwitch: function(e) {
			$(e.target).toggleClass("active").parents(".fieldBox").eq(0).next(".fieldBox").slideToggle();
		},
		getSelectEquSrc: function() {
			var lxr = this.ui.equSrc.find("option:selected").data();
			if(_.isEmpty(lxr)) return;
			this.model.set({
				"equSrc.camPort": lxr.camPort,
				"equSrc.equType": lxr.equType,
				"equSrc.recordId": lxr.recordId,
				"equSrc.vgaPort": lxr.vgaPort
			});
		},
		setSelectEquSrc: function() {
			var lxr = _.pick(this.model.toJSON(), "equSrc.camPort", "equSrc.equType", "equSrc.recordId", "equSrc.vgaPort");
			var isMatch = false;
			this.ui.equSrc.find("option").each(function() {
				var $this = $(this);
				var optData = $this.data();
				if((lxr["equSrc.camPort"] === optData["camPort"] || lxr["equSrc.vgaPort"] === optData["vgaPort"])  &&
					lxr["equSrc.equType"] === optData["equType"] &&
					lxr["equSrc.recordId"] === optData["recordId"]) {
						isMatch = true;
						$this.attr("selected", true);
						return;
				}
				/*if(lxr["equSrc.equType"] == Const.EquType_SDI)
				{
					if(lxr["equSrc.recordId"] === optData["recordId"])
					{
						if(lxr["equSrc.camPort"] != Const.VidInPort_Cnt && lxr["equSrc.camPort"] == optData["camPort"])
		    			{
		    				isMatch = true;
							$this.attr("selected", true);
							return;
		    			}
		    			
		    			if(lxr["equSrc.vgaPort"] != Const.VidInPort_Cnt && lxr["equSrc.vgaPort"] == optData["vgaPort"])
		    			{
		    				isMatch = true;
							$this.attr("selected", true);
							return;
		    			}
					}
				}
				else
				{
					if(lxr["equSrc.camPort"] === optData["camPort"] &&
					lxr["equSrc.equType"] === optData["equType"] &&
					lxr["equSrc.recordId"] === optData["recordId"] &&
					lxr["equSrc.vgaPort"] === optData["vgaPort"]) {
						isMatch = true;
						$this.attr("selected", true);
						return;
					}
				}*/
				
			});
			if(!isMatch) {
				this.ui.equSrc.get(0).selectedIndex = 0;
				this.getSelectEquSrc();
			}
		},
		
		initialize: function() {
			this.setSelectBindings(this.bindings);
		},
		
		addVidSrc: function(lxrArr) {
			this.ui.equSrc.append(this._getOptions(lxrArr)).selectmenu("refresh");
		},
		_getOptions: function(lxrArr) {
			if(_.isEmpty(lxrArr)) return;
			
			var $option = $('<option></option>');
			var $curOption,$vgaOption;
			var self = this;
			var srcArr = [];
			_.each(lxrArr, function(lxr) {
			    if(lxr.equType == Const.EquType_SDI) {
			    	var addrName = lxr.addrName;
			    	var camInfo = _.extend({}, lxr);
			    	var vgaInfo = _.extend({}, lxr);
			    	
			    	if(lxr.camPort != Const.VidInPort_Cnt && lxr.vgaPort != Const.VidInPort_Cnt)
			    	{
			    		camInfo.addrName = addrName+" \r"+lxr.camName;
			    		camInfo.vgaPort = Const.VidInPort_Cnt;
						srcArr.push(self._getOption($curOption,camInfo));
			    		
			    		vgaInfo.addrName = addrName+" \r"+lxr.vgaName;
			    		vgaInfo.camPort = Const.VidInPort_Cnt;
						srcArr.push(self._getOption($vgaOption,vgaInfo));
			    	}
			 		else
			 		{
			 			srcArr.push(self._getOption($curOption,lxr));
			 		}
				}else{
					
					srcArr.push(self._getOption($curOption,lxr));
				}
			});
			return srcArr;
		},
		
		_getOption:function($curOption,lxr)
		{
			var $option = $('<option></option>');
			$curOption = $option.clone();
			$curOption.data(lxr);
			$curOption.text(lxr.addrName);
			return $curOption;
		},
		
		subVidSrc: function(lxrArr) {
			if(_.isEmpty(lxrArr)) return;
			
			var self = this;
			this.ui.equSrc.children().each(function() {
				var $this = $(this);
				var lxrObj = $this.data();
				if(self._isLxrInArr(lxrObj, lxrArr)) {
					$this.remove();
				}
			}).end().selectmenu("refresh");
		},
		
		_isLxrInArr: function(lxrObj, lxrArr) {
			var equType = lxrObj.equType;
			var recordId = lxrObj.recordId;
			
			return _.some(lxrArr, function(lxr) {
				if(equType === Const.EquType_PLAYER )
				{
					return true;
				}
				if(equType === lxr.equType)
				{
					if(equType == Const.EquType_SDI)
					{
						if(recordId === lxr.recordId)
						{
							if(lxrObj.camPort != Const.VidInPort_Cnt && lxrObj.camPort == lxr.camPort)
			    			{
			    				return true;
			    			}
			    			
			    			if(lxrObj.vgaPort != Const.VidInPort_Cnt && lxrObj.vgaPort == lxr.vgaPort)
			    			{
			    				return true;
			    			}
						}
					}
					else
					{
						if(recordId === lxr.recordId)
						{
							return true;
						}
					}
				}
				return false;
//				if(equType === lxr.equType && (equType === Const.EquType_PLAYER || recordId === lxr.recordId)) {
//					return true;
//				}
			});
			
//			return _.some(lxrArr, function(lxr) {
//				if(equType === lxr.equType && (equType === Const.EquType_MP || recordId === lxr.recordId)) {
//					return true;
//				}
//			});
		},
		
		onRender: function() {
			//注册事件放在这里而不是initialize方法中是因为
			//先调用了initialize方法，后调用了destroy方法
			//这样导致卸载了所有事件，因为Radio事件是全局的
			Radio.channel("yhz").on("addLxr", this.addVidSrc, this);
			Radio.channel("yhz").on("subLxr", this.subVidSrc, this);
			
			this.stickit().fixCheckbox();
			this.ui.equSrc.append(this._getOptions(this._getVidSrcArr()));
			this.setSelectEquSrc();
		},
		_getVidSrcArr: function() {
			return [{equType: Const.EquType_MP, addrName: "多画面"}].concat(this.options.vidSrcArr);
		},
		
		onAttach: function() {
			this.selectmenu();
		},
		
		onDestroy: function() {
			Radio.channel("yhz").off("addLxr", this.addVidSrc);
			Radio.channel("yhz").off("subLxr", this.subVidSrc);
		}
	});
	
	return LzbmView;
});