define(function(require) {
	var _ = require("underscore");
	var Mn = require("marionette");
	var Radio = require("radio");
	var Handlebars = require("handlebars");
	var Const = require("web/common/const");
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_lzbm_template.html");
	
	var LylxView = require("web/index/zkhy/hymb/hymb_add_lylx_view");
	var LylxModel = require("web/index/zkhy/hymb/hymb_add_lylx_model");
	
	var Util = require("web/common/util");
	
	var LzbmView = Mn.LayoutView.extend({
		id: "hymb_add_lzbm",
		template: Handlebars.compile(tmpl),
		
		regions: {
			container: "#lzbm_formBox_container"
		},
		
		events: {
			"click .lzbm-box .btn": "clickLylx"
		},
		clickLylx: function(e) {
			var index = $(e.target).index();
			
			this.selectLylx(index);
		},
		selectLylx: function(index) {
			var model = this.flatModelList[index];
			if(_.isEmpty(model)) return;
			
			this.showFormBoxView(model);
		},
		showFormBoxView: function(model) {
			this.showChildView("container", new LylxView({
				model: model,
				vidSrcArr: this.vidSrcArr
			}));
		},
		
		initialize: function() {
			Radio.channel("lzbm").reset();
			Radio.channel("lzbm").reply("getRecList", this.getRecList, this);
			
			Radio.channel("yhz").on("addLxr", this.addVidSrc, this);
			Radio.channel("yhz").on("subLxr", this.subVidSrc, this);
			
			// 初始化录制视频源数组
			this.vidSrcArr = this._getLxrDataById();
			
			this.flatModelList = [];
			
			var recorder = this.model.get("recorder");
			if(!(_.isEmpty(recorder) || _.isEmpty(recorder.recList))) {
				this.flatModelList = _.map(recorder.recList, function(obj) {
					return new LylxModel(Util.flat(obj));
				});
			}
			
			var recNum = this.options.recNum;
			var l = this.flatModelList.length;
			while(l++ < recNum) {
				this.flatModelList.push(new LylxModel());
			}
			
			recorder.recNum = this.flatModelList.length;
		},
		
		getRecList: function() {
			return _.map(this.flatModelList, function(model,index) {
				var attr = model.toJSON();
				attr.recIdx = index;
				return Util.fat(attr);
			});
		},
		addVidSrc: function(addLxrArr) {
			var vidSrcArr = this.vidSrcArr || [];
			this.vidSrcArr = vidSrcArr.concat(addLxrArr);
		},
		subVidSrc: function(subLxrArr) {
			var vidSrcArr = this.vidSrcArr || [];
			var self = this;
			this.vidSrcArr = _.reject(vidSrcArr, function(lxr) {
				return self._isLxrInArr(lxr, subLxrArr);
			});
		},
		_isLxrInArr: function(lxrObj, lxrArr) {
			var equType = lxrObj.equType;
			var recordId = lxrObj.recordId;
			
			return _.some(lxrArr, function(lxr) {
				if(equType === lxr.equType && (equType === Const.EquType_MP|| recordId === lxr.recordId)) {
					return true;
				}
			});
		},
		//与会者页面已经选择的联系人
		_getLxrDataById: function() {
			var allLxr = this.options.allLxr;
			var venueIdArr = this.model.get("venueId");
			
			if(_.isEmpty(allLxr) || _.isEmpty(venueIdArr)) return [];
			
			return _.filter(allLxr, function(lxr) {
				return _.contains(venueIdArr, lxr.recordId);
			});
		},
		
		onBeforeShow: function() {
			this.selectLylx(0);
		}
	});
	
	return LzbmView;
});