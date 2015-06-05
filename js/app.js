define(function(require) {
	var _ = require("underscore");
	var Backbone = require("backbone");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Const = require("web/common/const");
	
	var Radio = require("radio");
	var SelectObj = require("web/common/select");
	
	var LoginRouter = require("web/login/login_router");
	var PortalRouter = require("web/portal/portal_router");
	var LxrRouter = require("web/index/lxr/lxr_router");
	var ZkhyRouter = require("web/index/zkhy/zkhy_router");
	var HykzRouter = require("web/index/hykz/hykz_router");
	var PzRouter = require("web/index/pz/pz_router");
	var WjllRouter = require("web/index/wjll/wjll_router");
	
	require("stickit");
	require("jqueryui");
	require("timepicker");
	require("datepickerzhCN");
	require("mousewheel");
	require("jplayer");
	
	var AppView = Mn.LayoutView.extend({
		el: document,
		regions: {
			container: "body"
		}
	});
	
	var App = Mn.Application.extend({
		initialize: function() {
			this.layout = new AppView();
			$.ajaxSetup({
				cache: false
			});
			this.initRouters(this.layout.container);
			this.initRenderer();
			this.initChannel();
			this.initHandlebarsHelpers();
			this.initStickitHandler();
		},

		initRouters: function(container) {
			var opt = { container: container };
			
			new LoginRouter(opt);
			new PortalRouter(opt);
			new LxrRouter(opt);
			new ZkhyRouter(opt);
			new HykzRouter(opt);
			new PzRouter(opt);
			new WjllRouter(opt);
		},
		
		initRenderer: function() {
			Mn.Renderer.render = function(template, data) {
				return _.isFunction(template) ? template(data) : template;
			};
		},
		
		initChannel: function() {
			Radio.DEBUG = true;
			Radio.channel("app").reply("setSelectBindings", this.setSelectBindings, this);
		},
		
		// 从公共的JSON中获取select的bindings属性
		setSelectBindings: function(bindings) {
			for(var key in bindings) {
				var value = bindings[key];
				if(_.isEmpty(value.selectName)) continue;
				
				value.selectOptions = {};
				value.selectOptions.collection = SelectObj[value.selectName];
			}
		},
		
		initHandlebarsHelpers: function() {
			var classes = ["sxj","zkhy","zkhy", "zk"];
			Handlebars.registerHelper("getLxrClass", function(equType) {
				return classes[equType];
			});
			Handlebars.registerHelper("getLxrInfo", function(equType) {
				var result;
				if(equType === 0) {
					if(this.camPort != Const.VidInPort_Cnt)
					{
						result = this.camName;
					}
					if(this.vgaPort != Const.VidInPort_Cnt)
					{
						result = result?(result+"<br/>"+this.vgaName):this.vgaName;
					}
					
				} else if(equType === 1 || equType === 2) {
					result = "IP:"+this.ip+"<br/>号码:"+this.e164;
				} else if(equType === 3) {
					result = this.url;
				}
				return new Handlebars.SafeString(result);
			});
			Handlebars.registerHelper("getPartLxrInfo", function(equType) {
				var result;
				if(equType === 0) {
					result = this.camPort;
				} else if(equType === 1 || equType === 2) {
					result = "IP:"+this.ip;
				} else if(equType === 3) {
					result = this.url;
				}
				return new Handlebars.SafeString(result);
			});
			Handlebars.registerHelper("addOne", function(index) {
				return index+1; //索引加1
			});
			Handlebars.registerHelper("isActive", function(active) {
				if(active === 1) return "active"; //判断按钮是否是on状态
				return "";
			});
			Handlebars.registerHelper("getMetClass", function(meetingState) {
				if(meetingState === 1) return "begin";
				return "end";
			});
			Handlebars.registerHelper("getBeginInfo", function(meetingState) {
				if(meetingState === 1) return "结束会议"; //判断会议召开
				return "召开会议";
			});
			Handlebars.registerHelper('loop', function(count, options) {
				var out = "", index = 0;
				while (index++ < count) {
					out+= options.fn({index:index});
				}
				return out;
			});
			
			Handlebars.registerHelper("getFileType", function(fileType) {
				if(fileType === 0) {
					return "音频";
				} else if(fileType === 1) {
					return "视频";
				} 
				return "";
			});
			
			Handlebars.registerHelper("getFileSize", function(fileSize) {
				if(fileSize == 0)
				{
					return "0KB";
				}
				if(fileSize < 1024*1024)
				{
					var size = (fileSize/1024).toFixed(0);
					size = size > 0?size :1;
					return size+"KB";
				} else{
					return (fileSize/(1024*1024)).toFixed(2)+"MB";
				} 
				return "";
			});
			
			Handlebars.registerHelper("getPlayTime", function(playTime) {
				var hour = parseInt(playTime/3600);
				var minute = parseInt((playTime-3600*hour)/60);
				var second = (playTime-3600*hour)%60;
				return hour+":"+minute+":"+second;
			});
			
		},
		
		initStickitHandler: function() {
			Backbone.Stickit.addHandler({
				selector: "input[type=checkbox]",
				update: function($el, val, model, options) {
				    if ($el.length > 1) {
				        val || (val = []);
				        $el.each(function(i, el) {
				            var checkbox = Backbone.$(el);
				            var checked = _.contains(val, +checkbox.val());
				            checkbox.prop('checked', checked);
				        });
				    } else {
				        var checked = val ? true : false;
				        $el.prop('checked', checked);
				    }
				},
				getVal: function($el) {
				    var val;
				    if ($el.length > 1) {
				        val = _.reduce($el, function(memo, el) {
				            var checkbox = Backbone.$(el);
				            if (checkbox.prop('checked')) memo.push(+checkbox.val());
				            return memo;
				        }, []);
				    } else {
				        val = $el.prop('checked');
				        val = val ? 1 : 0;
				    }
				    return val;
				}
			});
			
			Backbone.Stickit.addHandler({
				selector: ".sliderValue",
				// 移除可编辑属性，避免人为编辑
				initialize: function($el) {
					$el.removeAttr("contenteditable");
				},
				getVal: function($el) {
					return +$el.text();
				}
			});
		},
		
		onStart: function() {
			Backbone.history.start();
		}
	});
	
	return App;
});