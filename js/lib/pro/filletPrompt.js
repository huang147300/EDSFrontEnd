/*
�������ʾAPI
author��huangjun
*/
define(function() {
	require("jquery");
    
    //Ϊ����򴴽���ʾ������ʱ������������
    function buildPrompt(promptText, id){
    	var caller = "#"+id;
        var divFormError = document.createElement('div');
		var formErrorContent = document.createElement('div');
		var itSelf = id + "formError";
        
        $(divFormError).addClass("formError");
        $(divFormError).addClass(itSelf);
		$(formErrorContent).addClass("formErrorContent");
		
		$("body").append(divFormError);
		$(divFormError).append(formErrorContent);
			
        var arrow = document.createElement('div');
        $(arrow).addClass("formErrorArrow");

        $(divFormError).append(arrow);
        
        $(arrow).html('<div class="line10"><!-- --></div><div class="line9"><!-- --></div><div class="line8"><!-- --></div><div class="line7"><!-- --></div><div class="line6"><!-- --></div><div class="line5"><!-- --></div><div class="line4"><!-- --></div><div class="line3"><!-- --></div><div class="line2"><!-- --></div><div class="line1"><!-- --></div>');

		$(formErrorContent).html(promptText)
	
		var callerTopPosition = $(caller).offset().top;
		var callerleftPosition = $(caller).offset().left;
		var callerWidth =  $(caller).width();
		var inputHeight = $(divFormError).height();
	
		
		callerleftPosition +=  callerWidth; 
        callerTopPosition += -inputHeight; 

		$(divFormError).css({
			top:callerTopPosition,
			left:callerleftPosition,
			opacity:0
		})

        //����Ч��
		$(divFormError).animate({"opacity":1},function(){return true;});
        return true;
    }
    //����һ����ʾ�е�����
    function updatePromptText(promptText, id){
        //ɾ������ԭ������
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
    //ɾ��һ����ʾ
    function closePromptText(id){
        //ɾ����ʾ��, ����ʽ����Ч��
        var linkTofield = "." + id + "formError";
        $(linkTofield).fadeOut(150,function(){
            $(this).remove();
        }); 
        return false;
    }
    
    
    var returnVar = {
        buildPrompt:buildPrompt,
        updatePromptText:updatePromptText,
        closePromptText:closePromptText
	}
	
	return returnVar;
});