
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

function SIN( n ){
	return Math.sin(n);
}

function ACOS( n ){
	return Math.acos(n);
}

function COS( n ){
	return Math.cos(n);
}

function PI(){
	return Math.PI;
}

function latLongToMiles(pos1, pos2){
	Lat_start = pos1.latitude;
	Lat_end = pos2.latitude;
	Long_start = pos1.longitude;
	Long_end = pos2.longitutde;
	//if going a certain direction
	return ACOS(SIN(PI()*[Lat_start]/180.0)*SIN(PI()*[Lat_end]/180.0)+COS(PI()*[Lat_start]/180.0)*COS(PI()*[Lat_end]/180.0)*COS(PI()*[Long_start]/180.0-PI()*[Long_end]/180.0))*3963 - 4260.09837987635546597;
}

function success(pos) {
  var crd = pos.coords;
  positionArray.push(pos.coords);
  if(tmp){
  	distanceTraveled += latLongToMiles(positionArray[positionArray.length-2], positionArray[positionArray.length-1]);
  	demo.innerHTML += distanceTraveled + " " + pos.speed + "meters/second" + "<br/>";
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
  speed: true,
  maximumAge: 0
};

id = navigator.geolocation.watchPosition(success, error, options);
/*
function loop(){
	showPosition(target.longitutde, target.latitude);
	setTimeout(loop, 3500);
}*/

//getLocation();