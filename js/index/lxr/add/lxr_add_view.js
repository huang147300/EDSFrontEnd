define(function(require) {
	var FormView = require("web/common/formView");
	var Handlebars = require("handlebars");
	var tmpl = require("text!web/index/lxr/add/lxr_add_template.html");
	var Const = require("web/common/const");
	var AckId = require("web/common/ackid");
	
    var check    = require("variableCheckAPI");
    var inspect  = require("variableCheck");
    var prompt = require("filletPrompt");
	
	var LxrAddView = FormView.extend({
		id: "lxr_add",
		template: Handlebars.compile(tmpl),
		
		bindings: {
			"#addrName": "addrName",
			"#camPort": "camPort",
			"#vgaPort": "vgaPort",
			"#voiIncentive": "voiIncentive",
			"[name=micPort]": "micPort",
			"#e164": "e164",
			"#ip": "iplxr",
			"#url": "url",
			"#storNum": "storNum",
			
			"#equType": {
				observe: "equType",
				selectName: "equType"
			},
			"#presetNum": {
				observe: "presetNum",
				selectName: "presetNum"
			},
			"#incPriLev": {
				observe: "incPriLev",
				selectName: "incPriLev"
			},
			"#bandwidth": {
				observe: "bandwidth",
				selectName: "bandwidth"
			}
		},
		
		events: {
			"click .saveBtn": "saveLxr",
			"click .cancelBtn": "cancelLxr"
		},
		saveLxr: function(e) {
			e.preventDefault();
            var curHclx = this.model.get("equType");
            var boolCheck = true;
            switch (curHclx){
            	case Const.EquType_SDI:
            		boolCheck = (inspect.notNull("addrName")&&inspect.check("addrName"));
            		if(!boolCheck){
            			return;
            		}
            		if(this.model.get("camPort") == Const.VidInPort_Cnt && this.model.get("vgaPort") == Const.VidInPort_Cnt)
            		{
            			boolCheck = false;
            			alert("摄像机跟VGA至少选择一个");
            		}
            		break;
        		case Const.EquType_H323:
        		case Const.EquType_SIP:
        			boolCheck = (inspect.notNull("addrName")&&inspect.check("addrName")&&inspect.e164Check("e164")&&inspect.ipCheck("ip")&&inspect.numberCheck("storNum"));
        			break;
        		case Const.EquType_RTSP:
        			boolCheck = (inspect.notNull("addrName")&&inspect.check("addrName")&&inspect.urlCheck("url")&&inspect.numberCheck("storNum"));
        			break;
            	default:
            		break;
            }
            if(!boolCheck)
            {
            	return;
            }
/*            if(!inspect.notNull("addrName") || !inspect.check("addrName") ||
                !inspect.e164Check("e164") ||
                !inspect.ipCheck("iplxr") ||
                !inspect.urlCheck("url")||
                !inspect.numberCheck("storNum"))
            {
                return;
            }*/
            
			var self = this;
			this.model.save().done(function(res) {
				self.saveSuccess(res);
			}).fail(function() {
				self.saveError();
			});
		},
		saveSuccess: function(res) {
			if(res.code != AckId.AckId_Suc)
			{
				switch (res.code){
					case AckId.AckId_NameDup:
						alert("会场名称重复,保存联系人失败！");
						prompt.buildPrompt("会场名称重复", "addrName");
						$("#addrName").focus();
						break;
					case AckId.AckId_NumberDup:
						alert("号码重复,保存联系人失败！");
						prompt.buildPrompt("号码重复", "e164");
						$("#e164").focus();
						break;
					case AckId.AckId_SysInCalling:
						alert("在召开的会议中，不允许修改！");
						break;
					default:
						alert("保存联系人失败！");
						this.cancelLxr();
						break;
				}
			}
			else
			{
				this.cancelLxr();
			}
		},
		saveError: function() {
			alert("保存联系人失败！");
		},
		cancelLxr: function() {
			this.navigate("lxr", {trigger: true});
		},
		
		initialize: function(opt) {
			this.listenTo(this.model, "change:equType", this.changeEquType);
			
			this.setSelectBindings(this.bindings);
		},
		changeEquType: function() {
			var curHclx = this.model.get("equType");
			var preHclx = this.model.previous("equType");
			this.$("[equType*="+preHclx+"]").hide();
			this.$("[equType*="+curHclx+"]").show();
		},
		onRender: function() {
			this.stickit().fixCheckbox().changeEquType();
		},
		onAttach: function() {
			this.activeLink().selectmenu();
            check.notNull("addrName");
            check.e164Check("e164");
            check.ipCheck("iplxr");
            check.urlCheck("url");
            check.numberCheck("storNum");
		},
		onDestroy:function(){
			prompt.closePromptText("addrName");
			prompt.closePromptText("e164");
			prompt.closePromptText("iplxr");
			prompt.closePromptText("url");
			prompt.closePromptText("storNum");
		}
	});
	
	return LxrAddView;
});