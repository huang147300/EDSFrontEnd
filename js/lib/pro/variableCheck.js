define(['require', 'filletPrompt'], function(){
    var prompt = require("filletPrompt");
    
    //非空
    function notNull(id){
        var val = document.getElementById(id).value;
        if(val == ""){
            ret = prompt.buildPrompt("不能为空", id);
            return false;
        }else{
            ret = prompt.closePromptText(id);
            return true;
        }
    }
	//登录框校验
	function check(id){
		var reg = /^\s+|\s+$/;
        var val = document.getElementById(id).value;
		var ret = reg.test(val);
		if(!ret){
			prompt.closePromptText(id);
		}
        else {
            prompt.buildPrompt("首尾不能为空白字符", id); 
        }
        return !ret;
	}
    
    //密码校验
    function passCheck(id){
        //var regPass = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{1,31}');
        var regPass = new RegExp('(^[0-9a-z_]*$)');
        var val = document.getElementById(id).value;
		var retPass = regPass.test(val);
        if(retPass){
        	prompt.closePromptText(id);
		}
        else {
            prompt.buildPrompt("密码只能包含字母 数字 _", id);
        }
		return retPass;
    }
    
    //数字 * #
    function e164Check(id){
        var reg = new RegExp('^[0-9\*#]*$');
        var val = document.getElementById(id).value;
        var ret = reg.test(val);
        if(ret){
        	prompt.closePromptText(id);
		}
        else {
            prompt.buildPrompt("只能输入数字*#", id);
        }
        return ret;
    }
    
    //纯数字
    function numberCheck(id){
        var reg = new RegExp('^[0-9]*$');
        var val = document.getElementById(id).value;
        var ret = reg.test(val);
        if(ret){
        	prompt.closePromptText(id);
		}
        else {
            prompt.buildPrompt("只能输入数字", id);
        }
        return ret;
    }
    
    //ip地址校验
    function ipCheck(id){
        //var reg = new RegExp('((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))');
        //var reg=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
        var reg=/^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/ 
        var val = document.getElementById(id).value;
        var ret = reg.test(val);
        if(ret){
        	prompt.closePromptText(id);
		}
        else {
            prompt.buildPrompt("请输入合法的IP地址", id);
        }
        return ret;
    }
    //URL校验
    function urlCheck(id){
        var reg = new RegExp('^(http://|https://)?((?:[A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/\?\:]?.*$');
        var val = document.getElementById(id).value;
        var ret = reg.test(val);
        if(ret){
        	prompt.closePromptText(id);
		}
        else {
            prompt.buildPrompt("请输入合法的url", id);
        }
        return ret;
    }

	var returnVar = {
        check:check,
        passCheck:passCheck,
        numberCheck:numberCheck,
        ipCheck:ipCheck,
        urlCheck:urlCheck,
        e164Check:e164Check,
        notNull:notNull
	}
	
	return returnVar;
});