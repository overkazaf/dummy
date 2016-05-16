var guid = 1;
var randArrayItem = function (array) {
	var rnd = ~~(Math.random() * array.length);
	return array[rnd];
};
var ruleStretagy = {
	Code : function () {
		return 200;
	},
	NullFn : function () {
		return null;
	},
	Incremental : function (params) {
		params = params || [1];
		var no = '' + guid;
		guid++;
		while (no.length < params[0]) {
			no = '0' + no;
		}

		return no;
	},
	RandID : function (params) {
		var id = ~~(Math.random() * 100)
		if (params) {
			id = '' + id;
			while (id.length < params[0]) {
				id = '0' + id;
			}
		}
		return id;
	},
	Position : function () {
		var pos = [
			'市场',
			'运营',
			'销售',
			'前端',
			'美工',
			'后台'
		];

		return randArrayItem(pos);
	},
	FixedNumber : function () {
		return 2;
	},
	Smoke : function (){
		return Math.random() > 0.5;
	},
	QQ : function (array){
		var diff  = Math.pow(10, array[1] - array[0]);
		var target=  (~~(Math.random() * diff)) + Math.pow(10, array[0]);
		return target;
	}
};

module.exports = ruleStretagy;