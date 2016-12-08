var express = require('express');
var config = require('./config/admin');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var methodOverride = require('method-override');

var app = express();

//--------------------configure app----------------------
var pub = __dirname + '/public';
var view = __dirname + '/views';

app.set('view engine', 'html');
app.set('views', view);
app.engine('html', require('ejs').__express);

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('basepath', __dirname);

if(process.env.NODE_ENV === 'development'){
    app.use(express.static(pub));
	app.use(errorhandler({
		dumpExceptions: true,
		showStack: true
	}));
} else {
	var oneYear = 31557600000;
	app.use(express.static(pub, {
		maxAge: oneYear
	}));
	app.use(errorhandler());
}


app.on('error', function(err) {
	console.error('app on error:' + err.stack);
});

app.get('/', function(req, resp) {
	resp.render('index', config);
});

app.get('/module/:mname', function(req, resp) {
	resp.render(req.params.mname);
});

app.listen(7001);
console.log('[AdminConsoleStart] visit http://localhost:7001');