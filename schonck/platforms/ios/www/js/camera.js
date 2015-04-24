var camera = (function ($) {

    var pictureSource = "",
    destinationType = "";

    function init() {
        document.addEventListener("deviceready",onDeviceReady,false);
    };

    var onDeviceReady = function() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    var onPhotoDataSuccess = function(imageData) {
        var smallImage = document.getElementById('smallImage');
        
        smallImage.style.display = 'block';
        
        smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    var onPhotoURISuccess = function(imageURI) {
        $( ".profilImage" ).attr( "src" , imageURI );
        $( "#profilpicture" ).modal('hide');
    }

    var capturePhoto = function() {
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
                                    destinationType: destinationType.DATA_URL });
    }

    var capturePhotoEdit = function() {
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
                                    destinationType: destinationType.DATA_URL });
    }

    var getPhoto = function() {
        navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
                                destinationType: destinationType.FILE_URI,
                                sourceType: pictureSource.PHOTOLIBRARY });
    }

    var onFail = function(message) {
        alert('Failed because: ' + message);
    }

    return {
        init : init,
        capturePhoto: capturePhoto,
        getPhoto: getPhoto
    };

}(jQuery));