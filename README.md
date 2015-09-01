# require-fallback

<h2>Description</h2>
This package implements a form of fallback for requirejs that can be used in require() calls and with other plugins in requirejs.config(). While Require.js implements a path config fallback (http://requirejs.org/docs/api.html#pathsfallbacks), you can't utilize plugins in the 'paths' section. 
It is nice to have an easy way to implement fallback in require() calls or for plugin-capable assets (i.e. css elements using guybedford/require-css or json from millermedeiros/requirejs-plugins). This plugin allows for fallback for other plugin assets. 

You can utilize require-fallback either in a require call (good for implementing fallback for non-defined resources):

<code>require(["flbk!cdn/resource!!fallback/resource"],function(mod){

  ...do stuff here...
  
});</code>

or by adding to the requirejs.config (good for loading non-js resources with fallback):

<code>requirejs.config({

  map:{
  
    "*":{
    
      "mycsspkg": "flbk!css!https://cdn.com/a.css!!css!local/a.css"
      
    }
    
  }
  
});</code>

<h2>Install</h2>

Add <code>flbk:"require-fallback/flbk"</code> to your requirejs.config paths (http://requirejs.org/docs/api.html#config).

<h2>API</h2>
To utilize, start your request with "flbk!" like any other require.js plugin.

Then separate any valid require.js request with "!!". require-fallback will start at the first entry and continue to the right. If all fail, it will throw an error through Require.js, so the error callback will work. 

Here's a basic example:

<code>require["flbk!https://cdn.com/asset!!local/asset"],function(pkg){

  ...do stuff with pkg...
  
})</code>

which will attempt to load asset from a cdn and fallback to a local resource.

Require-fallback also supports loading multiple resources, separated by "!&!". For example, the following two commands behave identically:

<code>require(["asset1","asset2"],function(a1,a2){})</code>

 and 
 
<code>require(["flbk!asset1!&!asset2"],function(a1,a2){})</code>

This allows a single failure in a group of files to trigger a single error resulting in a fall back. So now:

<code>require(["flbk!https://cdn.com/asset1!!local/asset1","https://cdn.com/asset2!!local/asset2"],function(a1,a2){})</code>

may be written as:

<code>require(["flbk!https://cdn.com/asset1!&!https://cdn.com/asset2!!local/asset1!&!local/asset2"],function(a1,a2){})</code>


This could be advantageous since whichever asset fails to load first will automatically cause both assets to move to the fall back. Originally, both files would have to fail independently before each move to the next. If you're using the same CDN/package for both files then if one is down, the other will be too.

require-fallback supports the use of child plugins. So if you want to do <code>"flbk!json!cdn/to.json!!json!local/to.json"</code> have at it.

<em>Note that require-fallback needs any plugins to implement the requireJS error callback (http://requirejs.org/docs/api.html#errbacks) to detect a failed module load. If none is triggered, it will erroneously assume that there is no problem. </em>

(I am aware that require-css does not support this; however, there is a pull request to implement this feature)
