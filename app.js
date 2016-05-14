var fs = require('fs');

var CACHE = {};
var __default = {
	output : './output',
	model : './config/model.json',
	rule : './config/rules.js'
};

function Dummy (options) {
	this.options = options || __default;
	this.cache = {};
	this.init();
};

Dummy.prototype = {
	constructor : Dummy,
	init : function (){
		// load config file
		var modelFile = this.options.model;
		var ruleFile = this.options.rule;
		var that = this;


		var rule = require(ruleFile);

		fs.readFile(modelFile, 'utf8', function (err, data) {
			if (err) throw err;

			if (typeof data === 'string') {
				data = JSON.parse(data);
			}

			that.parse(data, rule)
		});
	},
	parse : function (json, rule) {
		var target = json.target;
		var refs = json.refs;
		// 1. 解析refs里的对象
		for (var moduelName in refs) {
			CACHE[moduleName] = doParse(refs[moduleName], rule);
		}

		return doParse(target, rule);
	}
};

/************************ Methods **********************/
function doParse (obj, rule) {
	// {
	// 	"Name" : "String,9,RandNumber",
	// 	"Phone" : "Number,11,RandNumber"
	// }
	
	
}


/************************ Utils ************************/

var d = new Dummy();



