var express = require('express'),
	app = express();

var port = 8080;

app.get('/', function (req, res){
	res.sendFile(__dirname + '/public_html/index.html');
});

app.use(express.static(__dirname + '/public_html' ));

app.use('/js', express.static(__dirname + 'js'));
app.use('/assets', express.static(__dirname + 'assets'));
app.use('/img', express.static(__dirname + 'img'));

app.listen(port);