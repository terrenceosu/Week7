var express = require('express');

var app = express();

var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3665);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res){
	var param = [];
	for (var p in req.query) {
		param.push({'name': p, 'value': req.query[p]});
	}
	var context = {};
	context.dataList = param;
	res.render('get', context);
});

app.post('/', function(req, res){
	var param = [];
	for (var p in req.query){
		param.push({'name': p, 'value': req.query[p]});
	}
        var bodyParam = [];
	for (var b in req.body) {
		param.push({'name': b, 'value': req.body[b]});
	}
	var context = {};
	context.queryList = param;
        context.bodyList = bodyParam;
	res.render('post', context);
});

app.use(function(req, res){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.log(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});