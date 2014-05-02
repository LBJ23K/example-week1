var request = require('request');
var http = require('http');
var fs = require('fs');
var port = 3000;
var url = "https://graph.facebook.com/maimiheat/photos?type=uploaded";
http.createServer(function(req,res){

	
	var data='<html><head><meta charset="utf-8"><link rel="stylesheet" href="style.css"><title>Maimi Heat GO GO GO!!!</title><head><body><article id="main"><div class="container"><ul>';

	request.get(url,function(err,body,result){
		result=JSON.parse(result)
		// console.log(result);
		result.data.forEach(function(val,idx){
			// console.log(idx);
			data += '<li>'+"<div class='yo' ><img src='" + val.source + "'/>";	
			data += '<p>'+val.name+'</p></div>';
			data+='</li>'
    	});
    
    data += "</ul></article></body></html>";
    
    if (req.url.indexOf('.css') != -1) {
        fs.readFile(__dirname + '/style.css', function (err, data) {
            if (err) console.log(err);
            else {
                console.log('fs.readFile is successful');
                res.setHeader("Content-Length", data.length);
                res.setHeader("Content-Type", 'text/css');
                res.statusCode = 200;
                res.end(data);
            }
        });
    }
    else {
    	console.log("hihi");
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    }
	});

		// console.log(data);

	
}).listen(port);