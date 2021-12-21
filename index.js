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

clickup.onclick = function() {
  $.ajax({
    type: 'GET',
    url:'/getup',
    success: function(data) {
        alert(data)
    }
  });
}

clickdown.onclick = function() {
  $.ajax({
    type: 'GET',
    url:'/getdown',
    success: function(data) {
        alert(data)
    }
  });
}

clickleft.onclick = function() {
  $.ajax({
    type: 'GET',
    url:'/getleft',
    success: function(data) {
        alert(data)
    }
  });
}

clickright.onclick = function() {
  $.ajax({
    type: 'GET',
    url:'/getright',
    success: function(data) {
        alert(data)
    }
  });
}

clickcam.onclick = function() {
  $.ajax({
    type: 'GET',
    url:'/getcam',
    success: function(data) {
        alert(data)
    }
  });
}

clickgal.onclick = function() {
  $.ajax({
    type: 'GET',
    url:'/getgal',
    success: function(data) {
        alert(data)
    }
  });

  storage;
}



import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: 'AIzaSyBgbAWLbIyg10Z3I4RpkYPxdQMSfvprfyo',
  authDomain: 'landdroneproject.firebaseapp.com',
  databaseURL: 'gs://landdroneproject.appspot.com',
  storageBucket: 'landdroneproject.appspot.com'
};
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);