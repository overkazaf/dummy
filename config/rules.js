var guid = 1;

var ruleStretagy = {
	Incremental : function () {
		return guid++;
	},
	NameDict : function () {
		var names = [
			"John Smith",
			"Kevin Mitnick",
			"Elvis Fan",
			"Wesley Xiao",
			"Alex Tian"
		];

		var rnd = ~~(Math.random() * names.length);

		return names[rnd];
	},
	AgeLimit : function (min, max) {
		var diff = max - min;
		return ~~(Math.random(diff) + min);
	},
	RandNumber : function () {
		
	}
};

module.exports = ruleStretagy;