var oScript = document.createElement("script");
oScript.type = "text/javascript";
oScript.src = "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
document.getElementsByTagName("head")[0].appendChild(oScript);


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
const storage = getStorage(firebaseApp);

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

clickup.toggleAttribute = function() {
  $.ajax({
    type: 'GET',
    url:'/getup',
    success: function(data) {
        alert(data)
    }
  });
}

clickdown.toggleAttribute = function() {
  $.ajax({
    type: 'GET',
    url:'/getdown',
    success: function(data) {
        alert(data)
    }
  });
}

clickleft.toggleAttribute = function() {
  $.ajax({
    type: 'GET',
    url:'/getleft',
    success: function(data) {
        alert(data)
    }
  });
}

clickright.toggleAttribute = function() {
  $.ajax({
    type: 'GET',
    url:'/getright',
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

}

clickcam.addEventListener('DOMContentLoaded', function () {
  const storageRef = firebase.storage().ref();
  let selectedFile;

  // File 선택
  document.querySelector('.file-select').addEventListener('change', e => {
      selectedFile = e.target.files[0];
  });

  // File 업로드
  document.querySelector('.file-submit').addEventListener('click', () => {
      storageRef
              .child(`images/${selectedFile.name}`)
              .put(selectedFile)
              .on('state_changed', snapshot => {
                                          console.log(snapshot)
                                      }, error => {
                                          console.log(error);
                                      }, () => {
                                          console.log('성공');
                                      }
              );
  });
});



