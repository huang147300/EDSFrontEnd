define(function(require) {
	var Model = require("web/common/model");
	
	var LylxModel = Model.extend({
		//idAttribute: "recIdx",
		defaults: {
			"enbRec":0,
			
			"equSrc.camPort":0,
			"equSrc.equType":0,
			"equSrc.recordId":0,
			"equSrc.vgaPort":0,
			
			"vidHdCfg.enbHandle": 0,
			"vidHdCfg.enbStoreHd": 0,
			"vidHdCfg.vodServeParam.enable": 0,
			"vidHdCfg.vodServeParam.name": "",
			"vidHdCfg.pushDumpParam.enable": 0,
			"vidHdCfg.pushDumpParam.url": "",
			"vidHdCfg.vidEncParam.bitRate": 1920000,
			"vidHdCfg.vidEncParam.fmt": 7,
			"vidHdCfg.vidEncParam.frameRate": 30,
			"vidHdCfg.vidEncParam.vidProt": 5,
			
			"vidSdCfg.enbHandle": 0,
			"vidSdCfg.enbStoreHd": 0,
			"vidSdCfg.vodServeParam.enable": 0,
			"vidSdCfg.vodServeParam.name": "",
			"vidSdCfg.pushDumpParam.enable": 0,
			"vidSdCfg.pushDumpParam.url": "",
			"vidSdCfg.vidEncParam.bitRate": 1920000,
			"vidSdCfg.vidEncParam.fmt": 4,
			"vidSdCfg.vidEncParam.frameRate": 30,
			"vidSdCfg.vidEncParam.vidProt": 5,
			
			"audCfg.enbHandle": 0,
			"audCfg.audEncParam.audProt": 8,
			"audCfg.audEncParam.sampleRate": 48000,
			"audCfg.audEncParam.bitRate": 128000,
			
			"osdCfg.endShowTheme": 0,
			"osdCfg.enbShowVolume": 0,
			"osdCfg.volPos": 0,
			"osdCfg.enbShowMark": 0,
			"osdCfg.dispPos": 0,
			"osdCfg.enbShowCaption": 0,
			"osdCfg.capPos": 0,
			"osdCfg.scrollSpeed": 0,
			"osdCfg.caption": "",
			
			"osdCfg.capParam.bgColor":0,
			"osdCfg.capParam.bgTrans":0,
			"osdCfg.capParam.fontColor":0,
			"osdCfg.capParam.fontSize":0,
			"osdCfg.capParam.fontTrans":0,
			
			"osdCfg.markParam.bgColor":0,
			"osdCfg.markParam.bgTrans":0,
			"osdCfg.markParam.fontColor":0,
			"osdCfg.markParam.fontSize":0,
			"osdCfg.markParam.fontTrans":0
			
			
//			"vidHdCfg":{"enbHandle":0,"enbStoreHd":0,
//			"vodServeParam":{"enable":0,"name":""},
//			"pushDumpParam":{"enable":0,"url":""},
//			"vidEncParam":{"bitRate":384000,"fmt":7,"frameRate":15,"vidProt":2}},
//			
//			"vidSdCfg":{"enbHandle":0,"enbStoreHd":0,
//			"vodServeParam":{"enable":0,"name":""},
//			"pushDumpParam":{"url":""},
//			"vidEncParam":{"vidProt":2,"frameRate":20,"fmt":4,"bitRate":384000}},
//			
//			"audCfg":{"enbHandle":0,
//			"audEncParam":{"audProt":8,"sampleRate":8000,"bitRate":8000}},
//			
//			"osdCfg":{"endShowTheme":0,"enbShowVolume":0,"volPos":0,"enbShowMark":0,"dispPos":1,"enbShowCaption":0,"capPos":1,"scrollSpeed":1,"caption":""}
		},
		urls: {
			"create": "addAddr.psp",
			"update": "modifyAddr.psp",
			"delete": "delAddr.psp",
			"read": "getAddrDetail.psp"
		},
		parse: function(res, options) {
			if(options.collection) {
				return res;
			} else {
				return res.data;
			}
		}
	});
	
	return LylxModel;
});