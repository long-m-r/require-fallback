// RequireJS Extension to Allow for Dependencies/Fallbacks and Multi-Module Loading
//  by long-m-r on 8/30/2015
//  https://github.com/long-m-r/require-fallback
define(function(){

	var loadFunction=function(names,req,onLoad,errP){
		// If no fallbacks left, let require know we have a problem
		if(names.length===0) (errP ? onLoad.error(errP) : onLoad.error());

		// Allow the !&! tag to define multiple required packages
		var reqList=names.shift().split(/\s*!&!\s*/);

		req(reqList,
			function(){
				onLoad.apply(null,arguments);
			},
			function(err){
				loadFunction(names,req,onLoad,err)
			}
		)
	};

	return {
		load : function(name,req,onLoad,config){
			var nl=name.split(/\s*!!\s*/);
			loadFunction(nl,req,onLoad);
		},
		normalize : function(name,normalize){
			// We don't want to do any normalization! Let the tool we'll call in a second do it instead.
			return name;
		}	
	}
})
