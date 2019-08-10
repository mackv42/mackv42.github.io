
/*var x = document.getElementById("demo");
function getLocationInit() {
  if (navigator.geolocation) {
    timedLoop();
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
  
}
var fired = false;
navigator.geolocation.watchPosition(function (position) {
   //alert("i'm tracking you!");
   fired = true;
   if(fired){
		showPosition(position);
	}
});

function getLocation(){
	preventDefault();
	navigator.geolocation.getCurrentPosition(showPosition);
}

*/

function showPosition(lon, lat) {
  x.innerHTML = "Latitude: " + lat +
  "<br>Longitude: " + position.coords.longitude;
  console.log(position.coords.latitude +" " +lon);
}

var id, target, options;

var positionArray = [];
var distanceTraveled = 0;

function distance(pos1, pos2){
	var dx = (pos1.longitude - pos2.longitude);
	var dy = pos1.latitude - pos2.latitude;

	return Math.sqrt(dx*dx + dy*dy);
}

function getDistance(arr){
	var total = 0;
	for(let i=0; i<arr.length-1; i+= 2){
		total += distance(arr[i], arr[i+1])
	}

	return total;
}

var tmp = false;

function success(pos) {
  var crd = pos.coords;
  positionArray.push(pos.coords);
  if(tmp){
  	distanceTraveled += distance(positionArray[positionArray.length-2], positionArray[positionArray.length-1]);
  	demo.innerHTML += distanceTraveled + "<br/>";
	}
  tmp = true;
  console.log(pos.coords);
  if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
    console.log('Congratulations, you reached the target');
    navigator.geolocation.clearWatch(id);
  }
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

target = {
  latitude : 0,
  longitude: 0
};

options = {
  enableHighAccuracy: true,
  timeout: 60000,
  maximumAge: 0
};

id = navigator.geolocation.watchPosition(success, error, options);
/*
function loop(){
	showPosition(target.longitutde, target.latitude);
	setTimeout(loop, 3500);
}*/

//getLocation();