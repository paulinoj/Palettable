var http  = require('http');
var cache = {};

// Utility function that downloads a URL and invokes
// callback with the data.

function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}

exports.palettes = function(req, res){
  var url = "http://www.colourlovers.com/api/palettes?numResults=100";
  download(url, function(data) {
    if (data) { 
      res.writeHead(200, {"Content-Type": "application/xml"});
      res.end(data);
    };
  });
};

exports.top20Palettes = function(req, res){
  var url = "http://www.colourlovers.com/api/palettes/top";
  download(url, function(data) {
    if (data) { 
      res.writeHead(200, {"Content-Type": "application/xml"});
      res.end(data);
    };
  });
};

exports.newPalettes = function(req, res){
  var url = "http://www.colourlovers.com/api/palettes/new";
  download(url, function(data) {
    if (data) { 
      res.writeHead(200, {"Content-Type": "application/xml"});
      res.end(data);
    };
  });
};