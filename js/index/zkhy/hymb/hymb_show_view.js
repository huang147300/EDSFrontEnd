define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var AckId = require("web/common/ackid");
	
	var tmpl = require("text!web/index/zkhy/hymb/hymb_show_template.html");
	
	var HymbShowView = Mn.ItemView.extend({
		id: "zkhy_hymb_show",
		template: Handlebars.compile(tmpl),
		events: {
			"click .delBtn": "delHymb"
		},
		delHymb: function(e) {
			e.preventDefault();
			var $btn = $(e.target);
			var id = $btn.data("id");
			
			$.getJSON("delMeetingTemp.psp", JSON.stringify({
				recordId: id
			})).done(function(res) {
				if(res.code === 0) {
					$btn.parents("li").remove();
				} else {
					if(res.code == AckId.AckId_SysInCalling)
					{
						alert("模板在使用，不允许删除!");
					}
					else
					{
						alert("删除会议模板失败！");	
					}
				}
			}).fail(function() {
				alert("删除会议模板失败！");
			});
			
		},
		
		onAttach: function() {
			Radio.channel("index").command("activeLink");
		}
	});
	
	return HymbShowView;
});
