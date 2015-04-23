(function(){
    'use strict';
    var module = angular.module('app', ['onsen']);

    module.controller('AppController', function($scope, $data) {
        $scope.doSomething = function() {
        ons.notification.alert({message: 'Hello, World!'});
        };
    });

    module.controller('DetailController', function($scope, $data) {
        $scope.profil = $data.selectedItem;
    });

    module.controller('MasterController', function($scope, $data, $http) {
        $scope.profil = $data.profil;  
        $scope.updateGeoloc = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    $scope.successFunction, $scope.errorFunction
                );
            }else{
                alert("pas cool");
            }
        };

        $scope.errorFunction = function(error){
            console.log(error);
        };

        $scope.successFunction = function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            $scope.codeLatLng(lat, lng, $scope);
        };

        $scope.codeLatLng = function(lat, lng) {
            
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(lat, lng);
            geocoder.geocode({'latLng': latlng}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        for (var i=0; i<results[0].address_components.length; i++) {
                            for (var b=0;b<results[0].address_components[i].types.length;b++) {
                                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                                    var city = results[0].address_components[i];
                                    break;
                                }
                            }
                        }
                        $scope.profil.geolocation = city.long_name;
                        $scope.$apply();
                    } else {
                        alert("No results found");
                    }
                } else {
                    alert("Geocoder failed due to: " + status);
                }
            });
        };

        $scope.updatePhoto = function() {
            var pictureSource=navigator.camera.PictureSourceType;
            var destinationType=navigator.camera.DestinationType;
            // $scope.capturePhoto();
            $scope.getPhoto(pictureSource.SAVEDPHOTOALBUM , destinationType);
        };

        $scope.onPhotoDataSuccess = function(imageData) {
            var smallImage = document.getElementById('smallImage');
            smallImage.style.display = 'block';
            smallImage.src = "data:image/jpeg;base64," + imageData;
        }

        $scope.onPhotoURISuccess = function(imageURI) {
            $scope.profil.image = imageURI;
            $scope.$apply();
        }

        $scope.capturePhoto = function() {
            navigator.camera.getPicture(
                $scope.onPhotoDataSuccess,
                $scope.onFail,
                {   quality: 50,
                    destinationType: destinationType.DATA_URL
                }
            );
        }

        $scope.capturePhotoEdit = function() {
            navigator.camera.getPicture(
                $scope.onPhotoDataSuccess,
                $scope.onFail,
                {   quality: 20,
                    allowEdit: true,
                    destinationType: destinationType.DATA_URL
                }
            );
        }

        $scope.getPhoto = function(source, destinationType) {
            navigator.camera.getPicture(
                $scope.onPhotoURISuccess,
                $scope.onFail,
                {   quality: 50,
                    destinationType: destinationType.FILE_URI,
                    sourceType: source
                }
            );
        }

        $scope.onFail = function(message) {
            alert('Failed because: ' + message);
        }

        $scope.share = function(){
            var options      = new ContactFindOptions();
            var fields = ["name","emails"];
            navigator.contacts.find(fields, $scope.onFindContacts, $scope.onError, {multiple: true});
        }

        $scope.onFindContacts = function(contacts){
            var contact = [];
            for (var i = 0; i < contacts.length; i++) {
                // for (var a = 0; a < contacts[i].emails.length; a++) {
                //     // alert(contacts[i].emails[a].value);
                // }
                // alert(contacts[i].name);
                if(contacts[i].emails != null){
                    var obj = {};
                    obj["name"] = contacts[i].name.givenName;
                    contact.push( obj );    
                }
                
            }
            var selectedItem = contact;
            $data.selectedItem = selectedItem;
            $scope.navi.pushPage('listcontact.html', {title : selectedItem.title});
        }

        $scope.onError = function(contactError){
            alert('onError!');
        }

        $scope.openAjax = function(){
            $http({method: 'POST', url: "http://juglet-mathieu.fr/schonck/index.json"}).success(function(data){
                $scope.profil.name = data.data.firstname;
                $scope.profil.email = data.data.email;
                $scope.$apply();
            });
        }

    });

    module.controller('ContactController', function($scope, $data) {
        $scope.contacts = $data.selectedItem;
    });

    module.factory('$data', function() {
        var data = {};
        data.profil = { 
            name: 'your name',
            email: 'example@example.com',
            geolocation: 'Need geolocation',
            image: ''
        };
        return data;
    });
  
})();

 document.addEventListener("deviceready", onDeviceReady, false);
 
 // device APIs are available
 //
 function onDeviceReady() {
    navigator.splashscreen.show();
}
