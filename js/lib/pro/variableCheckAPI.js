/*

*/
define(['require', 'filletPrompt', 'variableCheck'], function(){
    var prompt = require("filletPrompt");
    var check = require("variableCheck");
    
    var boolRet;
    
    function universalCheck(id){
        var ret = false;
        var caller = "#"+id;
        $(caller).keyup(function(){
            boolRet = check.check(id);
        });
    }
    
    function passwordCheck(id){
        var ret = false;
        var caller = "#"+id;
        $(caller).keyup(function(){
            boolRet = check.passCheck(id);
        });
    }
    
    function numberCheck(id){
        var ret = false;
        var caller = "#"+id;
        $(caller).keyup(function(){
            boolRet = check.numberCheck(id);
        });
    }
    function e164Check(id){
        var ret = false;
        var caller = "#"+id;
        $(caller).keyup(function(){
            boolRet = check.e164Check(id);
        });
    }
    
    function ipCheck(id){
        var ret = false;
        var caller = "#"+id;
        $(caller).keyup(function(){
            boolRet = check.ipCheck(id);
        });
    }
    
    function urlCheck(id){
        var ret = false;
        var caller = "#"+id;
        $(caller).keyup(function(){
            boolRet = check.urlCheck(id);
        });
    }
    
    function notNull(id){
       var caller = "#"+id;
        $(caller).keyup(function(){
            boolRet = check.notNull(id);
            if(boolRet)
            {
            	check.check(id);
            }
        });
    }
    function notNullNumberCheck(id){
        var ret = false;
        var caller = "#"+id;
        $(caller).keyup(function(){
        	boolRet = check.notNull(id);
            if(boolRet)
            {
            	check.numberCheck(id);
            }
        });
    }
    
    return {
        universalCheck:universalCheck,
        passwordCheck:passwordCheck,
        numberCheck:numberCheck,
        ipCheck:ipCheck,
        urlCheck:urlCheck,
        notNull:notNull,
        e164Check:e164Check,
        notNullNumberCheck:notNullNumberCheck
    }
});