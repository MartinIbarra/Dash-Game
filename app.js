"use strict";

var express = require('express'),
	fs = require('fs'),
	app = express();

var port = 8080;
var folders = [];

function uploadHtml(htmlFolder){
	htmlFolder.forEach(function (e){
		app.use( e , express.static(__dirname + e));
	});
}

fs.readdir('./', function (err, folder){
	if(err){
		return err;
	} else{
		folder.forEach(function (e, i){
			if(e === 'public_html'){
				fs.readdir(e, function (err, fldrWeb){
					if(err){
						return err;
					} else{
						fldrWeb.forEach(function (e, i){
							if(e.indexOf('.') !== -1){
								return;
							} else{
								folders.push(e);
							}
							return uploadHtml(folders);
						});
					}
				});
			}
		});
	}
});

app.use(express.static(__dirname + '/public_html' ));

app.get('/', function (req, res){
	res.sendFile(__dirname + '/public_html/index.html');
});

app.listen(port, function(){
	console.log('running on port: ' + port);
});