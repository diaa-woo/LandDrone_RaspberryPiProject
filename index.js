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