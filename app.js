var fs = require('fs');
var util = require('util');

var CACHE = {};
var BASE_RULE = './config/base_rules.js';
var __default = {
	output : './output',
	model : './config/xiupin_model.json',
	rule : './config/xiupin_rules.js',
	resultName : 'xiupin_mock.json'
};

function Dummy (options) {
	this.options = options || __default;
	this.cache = {};
	this.init();
};

function merge(des, src, override){
   if(src instanceof Array){
       for(var i = 0, len = src.length; i < len; i++)
            merge(des, src[i], override);
   }
   for( var i in src){
       if(override || !(i in des)){
           des[i] = src[i];
       }
   } 
   return des;
}


function buildRuleFactory (ruleFile) {
	var base = require(BASE_RULE);
	var rule = require(ruleFile);
	var factory = merge(base, rule || {}, true);
	return factory;
}

Dummy.prototype = {
	constructor : Dummy,
	init : function (){
		// load config file
		var modelFile = this.options.model;
		var ruleFile = this.options.rule;
		var that = this;


		var ruleFactory = buildRuleFactory(ruleFile);

		fs.readFile(modelFile, 'utf8', function (err, data) {
			if (err) throw err;

			if (typeof data === 'string') {
				data = JSON.parse(data);
			}

			var result = that.parse(data, ruleFactory)

			that.writeResult(result);

		});
	},
	parse : function (json, ruleFactory) {
		var target = json.target;
		var refs = json.refs;
		
		// 1. 解析refs里的对象,注入缓存
		for (var moduleName in refs) {
			if (!CACHE[moduleName]) {
				CACHE[moduleName] = doParse(refs[moduleName], ruleFactory, refs);
			}
		}

		// 2. 解析目标对象
		var parsedJSON = doParse(target, ruleFactory, refs);

		return parsedJSON;
	},
	writeResult : function (result) {
		var that = this;
		var resName = [that.options.output, that.options.resultName].join('/');
		fs.writeFile(resName, JSON.stringify(result), function (err){
			if(err) throw err;
			console.log('File ' + resName + ' has been successfully written to disk');
		});
	}
};


/************************ Methods **********************/

function doParse (obj, ruleFactory, refs) {

	var paramArray,
		array,
		type,
		model,
		count,
		tmp,
		params,
		ret = {};


	for (var key in obj) {

		paramArray = obj[key].split('$');

		// 无参数
		array = paramArray[0].split(',');
		t = array[0];
		f = array[1];
		if(!!paramArray[1]){
			params = paramArray[1].split(',');
		}

		(function (type, fn){
			switch (type) {
				case 'Object': 
					ret[key] = doParse(refs[fn], ruleFactory, refs);
					break;
				case 'Array': 
					ret[key] = [];
					for (var i = 0; i < params[0]; i++) {
						ret[key].push(doParse(refs[fn], ruleFactory, refs));
					}
					break;
				case 'String':
					ret[key] = ruleFactory[fn](params);
					break;
				case 'Number':
					ret[key] = +ruleFactory[fn](params);
					break;
				case 'Boolean':
					ret[key] = !!ruleFactory[fn](params);
					break;
				default:
					ret[key] = ruleFactory[fn](params);
					break;

			}
		})(t, f);
	}
	return ret;
}


var d = new Dummy();



