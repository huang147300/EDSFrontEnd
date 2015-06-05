define(function() {

	function flat(obj) {
	  var result = {};
	  
	  function _inner(obj, pre) {
	    for(var key in obj) {
	      if(obj.hasOwnProperty(key)) {
	        pre.push(key);
	        var value = obj[key];
	        if(Object.prototype.toString.apply(value) === "[object Object]") {
	          _inner(value, pre);
	        } else {
	          result[pre.join(".")] = value;
	        }
	        pre.pop();
	      }
	    }
	  }
	
	  _inner(obj, []);
	  return result;
	}
	
	function fat(obj) {
	  var result = {};
	  var pre = [], cur;
	
	    for(var key in obj) {
	      if(obj.hasOwnProperty(key)) {
	        pre = key.split(".");
	        cur = result;
	        for(var i = 0; i < pre.length; i ++) {
	          if(!cur[pre[i]]) {
	            cur[pre[i]] = {};
	          }
	          if(i+1 === pre.length) {
	            cur[pre[i]] = obj[key];
	          }
	          cur = cur[pre[i]];
	        }
	      }
	    }
	
	  return result;
	}
	
	return {
		flat: flat,
		fat: fat
	}
});