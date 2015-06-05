define(function(require) {
	var Backbone = require("backbone");
	
	var Model = Backbone.Model.extend({
		
  		getFetchOptions: function(obj) {
  			return {
  				data: JSON.stringify(obj)
  			};
  		},
  		
  		myFetch: function(options) {
  			if(options && options.id) {
  				return this.fetch(this.getFetchOptions({
  					recordId: options.id
  				}));
  			}
  		}
  		
	});
	
	return Model;
});