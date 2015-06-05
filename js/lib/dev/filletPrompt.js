/*

author:huangjun
*/
define(function() {
	require("jquery");
    var oldId;
    
    //创建一个新提示
    function buildPrompt(promptText, id){
    	var caller = "#"+id;
        var divFormError = document.createElement('div');
		var formErrorContent = document.createElement('div');
		var itSelf = id + "formError";
        var bindID = "#";
        var addWidth;
        var addHeight;
        //解决调试上的问题
        if(oldId == id){
            return;
        }
        oldId = id;
        //解决位置显示，需要绑定到一个标签上
        switch(id){
            case "username":
            case "password":
                bindID  += "logion-box";addWidth = 250;addHeight=0;
                break;
            case "confNum":
                bindID += "confNumCell";addWidth=0;addHeight=-10;
                break;
            case "confName":
                bindID += "confNameCell";addWidth=0;addHeight=-10;
                break;
            case "convenor":
                bindID += "convenorCell";addWidth=0;addHeight=-10;
                break;
            case "name":
                bindID += "nameCell";addWidth=0;addHeight=-10;
                break;
            case "number":
                bindID += "numberCell";addWidth=0;addHeight=-10;
                break;
            case "pwMeeting":
                bindID += "pwMeetingCell";addWidth=0;addHeight=-10;
                break;
            case "pwChairman":
                bindID += "pwChairmanCell";addWidth=0;addHeight=-10;
                break;
            case "lineName":
                bindID += "nameLine";addWidth=0;addHeight=-10;
                break;
            case "desc":
                bindID += "descLine";addWidth=0;addHeight=-10;
                break;
            case "anotherName":
                bindID += "anotherNameCell";addWidth=0;addHeight=-10;
                break;
            case "xydk_min":
            case "xydk_max":
                bindID += "xydkLine";addWidth=0;addHeight=-10;
                break;
            case "mtdk_min":
            case "mtdk_max":
                bindID += "mtdkLine";addWidth=0;addHeight=-10;
                break;
            case "gkIp":
                bindID += "gkIpCell";addWidth=0;addHeight=-10;
                break;
            case "regNum":
                bindID += "regNumCall";addWidth=0;addHeight=-10;
                break;
            case "regName":
                bindID += "regNameCell";addWidth=0;addHeight=-10;
                break;
            case "regPwd":
                bindID += "regPwdCell";addWidth=0;addHeight=-10;
                break;
            case "externalIp":
                bindID += "externalIpCell";addWidth=0;addHeight=-10;
                break;
            case "callBeginPort":
                bindID += "callBeginPortCell";addWidth=0;addHeight=-10;
                break;
            case "callEndPort":
                bindID += "callEndPortCell";addWidth=0;addHeight=-10;
                break;
            case "rtpBeginPort":
                bindID += "rtpBeginPortCell";addWidth=0;addHeight=-10;
                break;
            case "rtpEndPort":
                bindID += "rtpEndPortCell";addWidth=0;addHeight=-10;
                break;
            case "cm":
                bindID += "cmCell";addWidth=0;addHeight=-10;
                break;
            case "mc":
                bindID += "mcCell";addWidth=0;addHeight=-10;
                break;
            case "bdsxj":
                bindID += "bdsxjCell";addWidth=0;addHeight=-10;
                break;
            case "bdys":
                bindID += "bdysCell";addWidth=0;addHeight=-10;
                break;
            case "ydsxj":
                bindID += "ydsxjCell";addWidth=0;addHeight=-10;
                break;
            case "ydys":
                bindID += "ydysCell";addWidth=0;addHeight=-10;
                break;
            case "fwqdz":
                bindID += "fwqdzCell";addWidth=0;addHeight=-10;
                break;
            case "dlfwqdz":
                bindID += "dlfwqdzCell";addWidth=0;addHeight=-10;
                break;
            case "hyfwhm":
                bindID += "hyfwhmCell";addWidth=0;addHeight=-10;
                break;
            case "hchm":
                bindID += "hchmCell";addWidth=0;addHeight=-10;
                break;
            case "yhm":
                bindID += "yhmCell";addWidth=0;addHeight=-10;
                break;
            case "mm":
                bindID += "mmCell";addWidth=0;addHeight=-10;
                break;
            case "ip":
                bindID += "ipCell";addWidth=0;addHeight=-10;
                break;
            case "mask":
                bindID += "maskCell";addWidth=0;addHeight=-10;
                break;
            case "gateway":
                bindID += "gatewayCell";addWidth=0;addHeight=-10;
                break;
            case "mainDns":
                bindID += "mainDnsCell";addWidth=0;addHeight=-10;
                break;
            case "user":
                bindID += "userCell";addWidth=0;addHeight=-10;
                break;
            case "pwd":
                bindID += "pwdCell";addWidth=0;addHeight=-10;
                break;
            case "addrName":
                bindID += "addrNameLine";addWidth=0;addHeight=-10;
                break;
            case "e164":
                bindID += "e164Line";addWidth=0;addHeight=-10;
                break;
            case "iplxr":
                bindID += "iplxrLine";addWidth=0;addHeight=-10;
                break;
            case "url":
                bindID += "urlLine";addWidth=0;addHeight=-10;
                break;
            case "storNum":
                bindID += "storNumLine";addWidth=0;addHeight=-10;
                break;
            default:
                break;
        }

        $(divFormError).addClass("formError");
        $(divFormError).addClass(itSelf);
		$(formErrorContent).addClass("formErrorContent");

        $(bindID).append(divFormError);
		$(divFormError).append(formErrorContent);
			
        var arrow = document.createElement('div');
        $(arrow).addClass("formErrorArrow");

        $(divFormError).append(arrow);
        
        $(arrow).html('<div class="line10"><!-- --></div><div class="line9"><!-- --></div><div class="line8"><!-- --></div><div class="line7"><!-- --></div><div class="line6"><!-- --></div><div class="line5"><!-- --></div><div class="line4"><!-- --></div><div class="line3"><!-- --></div><div class="line2"><!-- --></div><div class="line1"><!-- --></div>');

		$(formErrorContent).html(promptText);
	
		var callerTopPosition = $(caller).position().top;
		var callerleftPosition = $(caller).position().left;
		var callerWidth =  $(caller).width();
		var inputHeight = $(divFormError).height();
	
		
		callerleftPosition +=  callerWidth + addWidth;
        callerTopPosition += -inputHeight+addHeight;

		$(divFormError).css({
			top:callerTopPosition,
			left:callerleftPosition,
			opacity:0
		});

        //显示提示
		$(divFormError).animate({"opacity":1},function(){return true;});
        return true;
    }
    //更新提示内容
    function updatePromptText(promptText, id){
        var caller = "#"+id;
        var linkTofield = id + "formError";

        linkTofield = linkTofield.replace(/\[/g,""); 
		linkTofield = linkTofield.replace(/\]/g,"");
        
        var updateThisPrompt =  "."+linkTofield;
        
        $(updateThisPrompt).find(".formErrorContent").html(promptText);
		var callerTopPosition  = $(caller).offset().top;
        
		var inputHeight = $(updateThisPrompt).height();
        
        callerTopPosition = callerTopPosition  -inputHeight;
		
		$(updateThisPrompt).animate({ top:callerTopPosition });
    }
    //删除提示
    function closePromptText(id){
        var linkTofield = "." + id + "formError";
        oldId = null;
        $(linkTofield).fadeOut(150,function(){
            $(this).remove();
        }); 
        return false;
    }


    var returnVar = {
        buildPrompt:buildPrompt,
        updatePromptText:updatePromptText,
        closePromptText:closePromptText
	};
	
	return returnVar;
});