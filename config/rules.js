var guid = 1;
var randArrayItem = function (array) {
	var rnd = ~~(Math.random() * array.length);
	return array[rnd];
};
var ruleStretagy = {
	Incremental : function (paddingZeroLength) {
		paddingZeroLength = paddingZeroLength || 10;
		var no = '' + guid;
		guid++;

		while (no.length < paddingZeroLength) {
			no = '0' + no;
		}

		return no;
	},
	NameDict : function () {
		var names = [
			"John Smith",
			"Kevin Mitnick",
			"Elvis Fan",
			"Wesley Xiao",
			"Alex Tian"
		];

		return randArrayItem(names);
	},
	AgeLimit : function (min, max) {
		min = min || 10;
		max = max || 100;
		var diff = max - min;
		return ~~(Math.random() * diff + min);
	},
	RandNumber : function (min, max) {
		min = min || 0;
		max = max || 100;
		var diff = max - min;
		return ~~(Math.random() * diff + min);
	},
	FormatDate : function (value, format) {
		var maps = {
		  'yyyy' : function (d) {return d.getFullYear();},
		  'MM' : function (d){return fix(d.getMonth()+1);},
		  'dd' : function (d){return fix(d.getDate());},
		  'HH' : function (d){return fix(d.getHours());},
		  'mm' : function (d){return fix(d.getMinutes());},
		  'ss' : function (d){return fix(d.getSeconds());}
		};

		var chunk = new RegExp(Object.keys(maps).join('|'), 'g');

		function fix (d) {
		  d = "" + (d||"");
		  if (d.length <= 1) {
		    d = '0' + d;
		  }
		  return d;
		}

		function formatDate(value, format){
		  format = format || 'yyyy-MM-dd HH:mm:ss';
		  value = new Date(value)
		  return format.replace(chunk, function (capture){
		    return maps[capture]?maps[capture](value):'';
		  })
		}

		return formatDate(new Date(value).getTime());
	},
	CareerDict : function () {
		var careers = [
			'Police',
			'Doctor',
			'Soldier',
			'Student',
			'Teacher'
		];

		return randArrayItem(careers);
	},
	LevelDict : function () {
		var levels = [
			'P1',
			'P2',
			'P3',
			'P4',
			'P5'
		];

		return randArrayItem(levels);
	}
};

module.exports = ruleStretagy;