document.addEventListener("deviceready", onDeviceReady, false);
var geocoder;

    // device APIs are available
    function onDeviceReady() {
        
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
          initialize();
      } 
      
    }

//Get the latitude and the longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    codeLatLng(lat, lng)
}

function errorFunction(){
    alert("Geocoder failed");
}

function initialize() {
    geocoder = new google.maps.Geocoder();
}

  function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results)
      } else {
        
      }
    });
  }