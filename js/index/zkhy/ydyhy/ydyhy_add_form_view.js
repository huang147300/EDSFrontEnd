define(function(require) {
	var $ = require("jquery");
	var Moment = require("moment");
	var Handlebars = require("handlebars");
	var Radio = require("radio");
	var FormView = require("web/common/formView");
	var tmpl = require("text!web/index/zkhy/ydyhy/ydyhy_add_form_template.html");
	var AckId = require("web/common/ackid");
    
    var check    = require("variableCheckAPI");
    var inspect  = require("variableCheck");
    var prompt = require("filletPrompt");
	
	var YdyhyAddFormView = FormView.extend({
		id: "ydyhy_add_form",
		template: Handlebars.compile(tmpl),
		ui: {
			yyrq_con: "#yyrq_container",
			jsrq_con: "#jsrq_container",
			yyrq: "#yyrq",
			jsrq: "#jsrq"
		},
		
		bindings: {
			"#name": "name",
			"#number": "number",
			"#desc": "desc",
			"#meetingType": "meetingType",
			"#tempRecordId": "tempRecordId",
			"#pwChairman": "pwChairman",
			"#yyrq": "yyrq",
			"#jsrq": "jsrq",
			"#tempRecordId": "tempRecordId",
			"#pwMeeting": "pwMeeting",
			
			"#bandwidth": {
				observe: "bandwidth",
				selectName: "bandwidth"
			}
		},
		
		events: {
			"click .saveBtn": "saveMeeting",
			"click .cancelBtn": "cancelMeeting"
		},
		saveMeeting: function(e) {
			e.preventDefault();
            if(!inspect.notNull("name") || !inspect.check("name") ||
            	!inspect.notNull("number") || !inspect.numberCheck("number") ||
                    !inspect.passCheck("pwMeeting") ||
                    !inspect.passCheck("pwChairman") || !inspect.check("desc"))
            {
                return;
            }
			var self = this;
			
			this.saveDateTimeDurationToModel();
			
			var yhzArr = Radio.channel("yhz").request("getYhzArr");
			
			this.model.set("venueId", yhzArr)
					  .save().done(function(res) {
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
						prompt.buildPrompt("会议名称重复", "name");
						$("#name").focus();
						alert("会议名称重复,保存会议失败！");
						break;
					case AckId.AckId_NumberDup:
						prompt.buildPrompt("会议号码重复", "number");
						$("#number").focus();
						alert("会议号码重复,保存会议失败！");
						break;
					default:
						alert("保存会议失败！");
						this.cancelMeeting();
						break;
				}
			}else{
				this.cancelMeeting();
			}
			
		},
		saveError: function() {
			alert("保存会议失败！");
		},
		cancelMeeting: function() {
			this.navigate("zkhy/showYdyhy", {trigger: true});
		},
		
		initialize: function() {
			this.setSelectBindings(this.bindings);
			
			this.listenTo(this.model, "change:tempRecordId", this.changeHymb);
			this.listenTo(this.model, "change:meetingType", this.changeHylx);
		},
		initYyrqAndJsrq: function() {
			this.model.set({
				yyrq: this.getYyrqString(),
				jsrq: this.getJsrqString()
			});
		},
		getYyrqMoment: function() {
			var date = this.model.get("date");
			var time = this.model.get("time");
			if(!date || !time){
				return Moment();
			}
			return Moment(date + " " + time);
		},
		getYyrqString: function() {
			var yyrqMoment = this.getYyrqMoment();
			if(yyrqMoment.isValid()) {
				return yyrqMoment.format("YYYY-MM-DD HH:mm");
			} else {
				return "";
			}
		},
		getJsrqString: function() {
			var duration = this.model.get("duration");
			var yyrqMoment = this.getYyrqMoment();
			if(yyrqMoment.isValid()) {
				yyrqMoment.add(duration, "minutes");
				return yyrqMoment.format("YYYY-MM-DD HH:mm");
			} else {
				return "";
			}
		},
		getDateTime: function() {
			var date, time;
			var yyrqDate = Moment(this.ui.yyrq.val());
			if(yyrqDate.isValid()) {
				date = yyrqDate.format("YYYY-MM-DD");
				time = yyrqDate.format("HH:mm:ss");
				return [date, time];
			}
		},
		getDuration: function() {
			var yyrqDate = Moment(this.ui.yyrq.val());
			var jsrqDate = Moment(this.ui.jsrq.val());
			if(yyrqDate.isValid() && jsrqDate.isValid()) {
				return jsrqDate.diff(yyrqDate, "minutes");
			}
		},
		saveDateTimeDurationToModel: function() {
			if(this.model.get("meetingType") == 2) return; //不是预约会议
			var datetime = this.getDateTime();
			var duration = this.getDuration();
			if(datetime && duration) {
				this.model.set({
					date: datetime[0],
					time: datetime[1],
					duration: duration
				});
			} else {
				alert("日期不合法！");
			}
		},
		getTempRecordId: function() {
			if(this.model.get("tempRecordId")) {
				return this.model.get("tempRecordId");
			} else {
				if(this.options.templateHelpers.allTemp && this.options.templateHelpers.allTemp.length>0)
				{
					var tempId = this.options.templateHelpers.allTemp[0].recordId;
					this.model.set("tempRecordId",tempId);
					return tempId;
				}
					
			}
			return -1;
		},
		changeHymb: function() {
			$.getJSON("getMeetingTempVenue.psp", JSON.stringify({
				recordId: this.getTempRecordId()
			})).done(function(yhzIdArr) {
				var venueId = [];
				if(yhzIdArr && yhzIdArr.data && yhzIdArr.data.venueId) {
					venueId = yhzIdArr.data.venueId;
				}
				Radio.channel("yhz").command("loadHymb", venueId);
			});
			return this;
		},
		changeHylx: function() {
			var hylx = this.model.get("meetingType");
			if(hylx === 1 || hylx === 0) { //预约会议
				this.ui.yyrq_con.show();
				this.ui.jsrq_con.show();
			} else {
				this.ui.yyrq_con.hide();
				this.ui.jsrq_con.hide();
			}
			if(hylx === 0)
			{
				this.ui.yyrq_con.prop("disabled", true).css({"opacity":0.5});
			}
			else
			{
				this.ui.yyrq_con.removeAttr("disabled").css({"opacity":1});
			}
			return this;
		},
		onRender: function() {
			if(this.model.isNew())
			{
				this.stickit().changeHymb();
			}
			else
			{
				Radio.channel("yhz").command("loadHymb", this.model.get("venueId"));
			}
			this.stickit().changeHylx();
		},
		onAttach: function() {
			this.selectmenu();
			this.initYyrqAndJsrq();
			$.timepicker.datetimeRange(
				this.ui.yyrq,
				this.ui.jsrq
			);
			
			if(!this.model.isNew()) {
				this.$("#name").prop("disabled", true).css({"opacity":0.5});
				this.$("#tempRecordId").selectmenu("option", "disabled", true);
			}
			
			check.notNull("name");
            check.notNullNumberCheck("number");
            check.passwordCheck("pwMeeting");
            check.passwordCheck("pwChairman");
            check.universalCheck("desc");
		},
		onDestroy:function(){
			prompt.closePromptText("name");
			prompt.closePromptText("number");
			prompt.closePromptText("pwMeeting");
			prompt.closePromptText("pwChairman");
			prompt.closePromptText("desc");
		}
	});
	
	return YdyhyAddFormView;
});