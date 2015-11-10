module.exports = function(app)
{
  var bodyParser = require('body-parser');
  var express = require('express');
  var routes = require('./routes');
  var ejs = require('ejs');

	app.set('views', __dirname + '/views');
	app.use(express.static(__dirname + '/views'));
  app.use(bodyParser());
  app.get('/', function(req,res){
    res.render('index.html');
  });
  app.get('/palettes/all', routes.palettes);
  app.get('/palettes/top', routes.top20Palettes);
  app.get('/palettes/newest', routes.newPalettes);
};