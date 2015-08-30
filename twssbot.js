var fs = require('fs');
var classifier = require('classifier');

var bayes = new classifier.Bayesian();

fs.readFileSync("data/positive.txt").toString().toLowerCase().replace(/[^\w\s]/g, "").split("\n").forEach(function (v) {
	if (v.length) {
		bayes.train(v, true);
	}
});

fs.readFileSync("data/negative.txt").toString().toLowerCase().replace(/[^\w\s]/g, "").split("\n").forEach(function (v) {
	if (v.length) {
		bayes.train(v, false);
	}
});

bayes.classify("then i said, thats not a duck", function (category) { console.log("classified as " + category); });
