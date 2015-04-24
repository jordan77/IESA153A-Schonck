var geolocation = (function ($) {

    var geocoder = "";

    function init() {
        initialize();

        if (navigator.geolocation) {
            
            navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
        } 
    };

    var successFunction = function(position) {

        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        codeLatLng(lat, lng);
    }

    var  errorFunction = function(){
        alert("Geocoder failed");
    }

    var initialize = function() {
        geocoder = new google.maps.Geocoder();
        
    }

    var codeLatLng = function(lat, lng) {
        
        var latlng = new google.maps.LatLng(lat, lng);
            geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    for (var i=0; i<results[0].address_components.length; i++) {
                        for (var b=0;b<results[0].address_components[i].types.length;b++) {
                            if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                                city= results[0].address_components[i];
                                break;
                            }
                        }
                    }
                    $( ".inputprofillocation" ).attr( "value", city.long_name );
                } else {
                    alert("No results found");
                }
            } else {
                alert("Geocoder failed due to: " + status);
            }
        });
    }

    return {
        init : init
    };

}(jQuery));