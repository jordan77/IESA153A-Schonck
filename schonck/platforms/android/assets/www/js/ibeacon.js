var ibeacon = (function ($) {

    var my_media = null;
    var mediaTimer = null;

    var musiqueplay = false;
    var path = "";
    var playInit = false;
    var currentsound = false;
    var useRotator = false;
    var language = "";

    beaconRegions =
    [
        {
            id: 'iBKS',
            uuid:'17586a9d-1fd4-4b05-8a50-ac08b6fdc91c',
            major: 5,
            minor: 1
        },
        {
            id: 'iBKS',
            uuid:'A4950001-C5B1-4B44-B512-1370F02D74DE',
            major: 4,
            minor: 1
        },
        {
            id: 'iBKS',
            uuid:'A4950001-C5B1-4B44-B512-1370F02D74DE',
            major: 3,
            minor: 1
        },
        {
            id: 'iBKS',
            uuid:'A4950001-C5B1-4B44-B512-1370F02D74DE',
            major: 12,
            minor: 7
        }
    ];

    function init() {

        path = window.location.pathname;
        
        path = path.substr( path, path.length - 10 );
        

        var options = {
            frequency: 50
        }; 
        var watchID = navigator.compass.watchHeading(onSuccesscompass, onErrorcompass, options);


        var delegate = new cordova.plugins.locationManager.Delegate();

        delegate.didDetermineStateForRegion = function (pluginResult) {

        };

        delegate.didStartMonitoringForRegion = function (pluginResult) {
           
        };

        delegate.didRangeBeaconsInRegion = function (pluginResult) {

            var beaconsFound = pluginResult.beacons;
            
            if ( beaconsFound && beaconsFound.length>0 && beaconsFound[0].major == 5) {
                if( beaconsFound[0].accuracy < 0.3 ){
                    changeSong("violon");
                }
            }

            if ( beaconsFound && beaconsFound.length>0 && beaconsFound[0].major == 4) {
                if( beaconsFound[0].accuracy < 0.3 ){
                    changeSong("guitarre");
                    
                }
            }

            if ( beaconsFound && beaconsFound.length>0 && beaconsFound[0].major == 3) {
                if( beaconsFound[0].accuracy < 0.3 ){
                    changeSong("harmonica");
                }
            }
        };

        var uuid = '17586a9d-1fd4-4b05-8a50-ac08b6fdc91c';
        var identifier = 'iBKS';
        var minor = 1;
        var major = 5;
        var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);
        cordova.plugins.locationManager.setDelegate(delegate);
        cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
        cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion).fail(console.error).done();

        var beaconRegion2 = new cordova.plugins.locationManager.BeaconRegion("2", uuid, 4, minor);
        cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion2).fail(console.error).done();        


        var beaconRegion2 = new cordova.plugins.locationManager.BeaconRegion("3", uuid, 3, minor);
        cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion2).fail(console.error).done();        

        $('.sound').velocity( { opacity: "0" }, { display: "none" } );
        $( ".quitsong" ).click( function(){
            $('.sound').velocity( { opacity: "0" }, { display: "none" } );
            useRotator = false;
        });
    };

    var playAudio = function(src) {

            // Create Media object from src
            my_media = new Media(src, onSuccess, onError);

            // Play audio
            my_media.play();

            // Update my_media position every second
            if (mediaTimer == null) {
                mediaTimer = setInterval(function() {
                    // get my_media position
                    my_media.getCurrentPosition(
                        // success callback
                        function(position) {
                            if (position > -1) {
                                setAudioPosition((position) + " sec");
                            }
                        },
                        // error callback
                        function(e) {
                            console.log("Error getting pos=" + e);
                            setAudioPosition("Error: " + e);
                        }
                    );
                }, 1000);
            }
        }

        var changeSong = function(song){
            
            if( song == "violon" ){
                song = "sound/violoncelle2.mp3";
                
                if( language == "fr-FR" ){
                    console.log(language);
                    $(".instrument").html( "le Violon" );
                }else{
                    $(".instrument").html( "Violin" );
                }
            }

            if( song == "guitarre" ){
                song = "sound/guitare2.mp3";
                if( language == "fr-FR" ){
                    $(".instrument").html( "la guitarre" );
                }else{
                    $(".instrument").html( "guitar" );
                }
            }

            if( song ==  "harmonica"){
                song = "sound/harmonica.mp3";
                if( language == "fr-FR" ){
                    $(".instrument").html( "l'harmonica" );
                }else{
                    $(".instrument").html( "harmonica" );
                }
            }

            $('.sound').css("display","block");
            $('.sound').velocity( { opacity: "1" });
            useRotator = true;
            currentsound = path+song;
        }

        // Pause audio
        //
        var pauseAudio = function() {
            if (my_media) {
                my_media.pause();
            }
        }

        // Stop audio
        //
        var stopAudio = function() {
            if (my_media) {
                my_media.stop();
            }
            clearInterval(mediaTimer);
            mediaTimer = null;
        }

        // onSuccess Callback
        //
        var onSuccess = function() {
            console.log("playAudio():Audio Success");
        }

        // onError Callback
        //
        var onError = function(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }

        // Set audio position
        //
        var setAudioPosition = function(position) {
            // document.getElementById('audio_position').innerHTML = position;
        }

        var onSuccesscompass = function (heading) {
            if(useRotator && currentsound != false){
                if( parseInt(heading.magneticHeading) > 350 && playInit == false || parseInt(heading.magneticHeading) < 190 && playInit == false){
                    playInit = true;
                    playAudio( currentsound );
                }
                if( parseInt(heading.magneticHeading) < 350 && playInit == true && parseInt(heading.magneticHeading) > 190){
                    playInit = false;
                }
            }
        }

        var changeLanguage = function(Nlanguage){
            language = Nlanguage;
        }

        var onErrorcompass = function(compassError) {
            console.log(compassError);
            // alert('Compass error: ' + compassError.code);
        }
        
    return {
        init : init,
        changeSong : changeSong,
        changeLanguage : changeLanguage
    };

}(jQuery));