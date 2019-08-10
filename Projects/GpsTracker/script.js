
var x = document.getElementById("demo");
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

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
  console.log(position.coords.latitude +" " +position.coords.longitude);
}

function timedLoop(){
	
}

timedLoop();

//getLocation();