var oScript = document.createElement("script");
oScript.type = "text/javascript";
oScript.src = "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
document.getElementsByTagName("head")[0].appendChild(oScript);

var clickTimedht = document.querySelector("#now");
var clickup = document.querySelector("#up");
var clickdown = document.querySelector("#down");
var clickleft = document.querySelector("#left");
var clickright = document.querySelector("#right");
var clickcam = document.querySelector("#photo");
var clickgal = document.querySelector("#gallery");

clickTimedht.addEventListener("click", function() {
            $.ajax({
                type: 'GET',
                url:'/insertdb',
                datatype:'json',
                success: function(data) {
                    alert(data)

                    var time = new Date()
                    var tdata = "<tr>"
                    obj = JSON.parse(data)

                    tdata += "<th>1</th>"
                    tdata += "<th>"+obj.temp+"*C</th>"
                    tdata += "<th>"+obj.hum+"%</th>"
                    tdata += "</tr>"
                    document.getElementById("table").innerHTML = tdata
                }
        });
});

var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app) ;
app.use(express.static(__dirname + '/images')) ;

var img_flag = 0 ;

var cameraOptions = {
  width : 600,
  height : 420,
  mode : 'timelapse',
  awb : 'off',
  encoding : 'jpg',
  output : 'images/camera.jpg',
  q : 50,
  nopreview : true,
  th : '0:0:0'
};

var camera = new require('raspicam')(cameraOptions) ;
camera.start() ;
camera.on('exit', function() {
    camera.stop() ;
    console.log('Restart camera') ;
    camera.start() ;
  }) ;

camera.on('read', function() {
    img_flag = 1 ;
  }) ;

app.get('/cam', function(req, res) {
    res.sendfile('cam.html', {root : __dirname}) ;
  }) ;



app.get('/img', function (req, res) {
    console.log('get /img') ;
      if (img_flag == 1) {
        img_flag = 0 ;
      }
  }) ;


server.listen(8000, function() {
    console.log('express server listening on port ' + server.address().port) ;
  }) ;