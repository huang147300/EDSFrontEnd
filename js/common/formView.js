define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Radio = require("radio");
	var Mn = require("marionette");
	
	var FormView = Mn.ItemView.extend({
		
		navigate: function(url, options) {
		    Backbone.history.navigate(url, options);
  		},
  		
  		setSelectBindings: function(bindings) {
  			Radio.channel("app").request("setSelectBindings", bindings);
  		},
  		
  		activeLink: function() {
	  		Radio.channel("index").command("activeLink");
	  		return this;
  		},
  		
  		toggleSwitch: function(e) {
  			$(e.target).toggleClass("active");
  		},
  		
		// 刷新表单，主要是为了同步数据
		refreshForm: function() {
			this.refreshSelectmenu();
			this.refreshSlider();
		},
		// 刷新jqueryui中的selectmenu
		refreshSelectmenu: function() {
			this.$("select").selectmenu("refresh");
		},
		// 刷新jqueryui中的slider
		refreshSlider: function() {
			this.$(".slider").each(function() {
				var $this = $(this);
				$this.slider("value", $this.siblings(".sliderValue").text());
			});
		},
		
		// 使用jqueryui中的selectmeu控件
		selectmenu: function() {
			this.$("select").selectmenu({
				change: this._selectChangeEvent,
				appendTo: this.$(".formBox")
			}).change();
			return this;
		},
		_selectChangeEvent: function(event, ui) {
			$(this).change();
		},
		
		// 使用jqueryui中的slider控件
		initSlider: function() {
			var self = this;
			this.$(".slider").each(function() {
				var $this = $(this);
				var options = self._getSliderOptions($this);
				$this.slider(options);
			});
			return this;
		},
		// 目前只有两种情况，以vertical字段作为判断条件
		// 如果将来增加其它情况，最好换一个字段作为判断条件
		_getSliderOptions: function($slider) {
			var $sliderValue = $slider.siblings(".sliderValue");
			var options = {
				range: "min",
				value: +$sliderValue.text(),
				min: $slider.data("min"),
				max: $slider.data("max")
			};
			if($slider.data("vertical")) {
				options.orientation = "vertical";
				options.slide = this._slideVerticalEvent;
				options.create = this._slideVerticalEvent;
				options.change = this._slideVerticalEvent;
			} else {
				options.slide = this._slideHorizontalEvent;
				options.change = this._slideHorizontalChangeEvent;
			}
			return options;
		},
		_slideHorizontalEvent: function(event, ui) {
			$(this).siblings(".sliderValue").text(ui.value);
		},
		_slideHorizontalChangeEvent: function(event, ui) {
			$(this).siblings(".sliderValue").change();
		},
		_slideVerticalEvent: function(event, ui) {
			//不同slider的高度以及取值范围不一样
			//由于现在大多数的高度都是261所以当作默认值
			var $this = $(this);
			
			var value = _.isNumber(ui.value) ? ui.value : $this.slider("value");
			var height = $this.data("height") || 261;
			var max = $this.data("max");
			var min = $this.data("min");
			
			$this.siblings(".color").height((value-min) * height / (max-min));
		},
		
		//自定义checkbox
		fixCheckbox: function() {
			this.initCheckboxClass().addCheckboxEvent();
			return this;
		},
		initCheckboxClass: function() {
			this.$(".checkbox-label").each(this._initClass);
			return this;
		},
		addCheckboxEvent: function() {
			this.$el.on("click", ".checkbox-label", function() {
				var $label = $(this);
				var $checkbox = $label.prev();
				var box = $checkbox.get(0);
				box.checked = !box.checked;
				box.checked ? $label.addClass("active") : $label.removeClass("active");
				$checkbox.change();
				return false;
			});
		},
		_initClass: function() {
			var $label = $(this);
			$label.prev().is(":checked") ? $label.addClass("active") : $label.removeClass("active");
		},
		
		//自定义radio
		fixRadio: function() {
			this.initRadioClass().addRadioEvent();
			return this;
		},
		initRadioClass: function() {
			this.$(".radio-label").each(this._initClass);
			return this;
		},
		addRadioEvent: function() {
			this.$el.on("click", ".radio-label", function() {
				var $label = $(this);
				if($label.is(".active")) return;
				
				var $radio = $label.prev();
				
				if($radio.parent().is("td")) {
					//表格布局，比如垂直排列的编组
					var name = $radio.attr("name");
					$radio.parents("table").find('[name=' + name + ']').next().removeClass("active");
				} else {
					//多个radio水平排列，比如radio-set
					$radio.siblings(".radio-label").removeClass("active");
				}
				
				$radio.prop("checked", true);
				$label.addClass("active");
				$radio.change();
				return false;
			});
		}
  		
	});
	
	return FormView;
});