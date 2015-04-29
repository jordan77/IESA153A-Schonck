var ibeacon = (function ($) {

    // var id = 'iBKS',
    // uuid = '17586a9d-1fd4-4b05-8a50-ac08b6fdc91c',
    // minor = 1,
    // major = 5,
    // beaconRegion = "";


    var my_media = null;
    var mediaTimer = null;

    var musiqueplay = false;

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

        var delegate = new cordova.plugins.locationManager.Delegate();

        delegate.didDetermineStateForRegion = function (pluginResult) {

            console.log(2);
        };

        delegate.didStartMonitoringForRegion = function (pluginResult) {
           
            console.log( 1 );
           
        };

        delegate.didRangeBeaconsInRegion = function (pluginResult) {
         
            var beaconsFound = pluginResult.beacons;
            
            if ( beaconsFound && beaconsFound.length>0 && beaconsFound[0].major == 5) {
                console.log(5);
                if( beaconsFound[0].accuracy < 0.3 ){
                    console.log(5.5);
                    playAudio("http://juglet-mathieu.fr/sound/violoncelle.mp3");
                    
                }
            }

            if ( beaconsFound && beaconsFound.length>0 && beaconsFound[0].major == 4) {
                console.log(4);
                if( beaconsFound[0].accuracy < 0.3 ){
                    console.log(4.4);

                    playAudio("http://juglet-mathieu.fr/sound/guitarre.mp3");
                }
            }

            if ( beaconsFound && beaconsFound.length>0 && beaconsFound[0].major == 3) {
                console.log(3);
                if( beaconsFound[0].accuracy < 0.3 ){
                    console.log(3.3);
                    playAudio("http://juglet-mathieu.fr/sound/harmonica.mp3");
                    
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
        // var major = 4;
        // var beaconRegion1 = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);
        //cordova.plugins.locationManager.setDelegate(delegate);
        // cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion1).fail(console.error).done();
        // required in iOS 8+
        
        // or cordova.plugins.locationManager.requestAlwaysAuthorization()
        

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
            document.getElementById('audio_position').innerHTML = position;
        }


    return {
        init : init
    };

}(jQuery));




// var app = (function()
// {
//     // Application object.
//     var app = {};

//     // Specify your beacon 128bit UUIDs here.
//     var regions =
//     [
//         // Estimote Beacon factory UUID.
//         {uuid:'B9407F30-F5F8-466E-AFF9-25556B57FE6D'},
//         // Sample UUIDs for beacons in our lab.
//         {uuid:'F7826DA6-4FA2-4E98-8024-BC5B71E0893E'},
//         {uuid:'8DEEFBB9-F738-4297-8040-96668BB44281'},
//         {uuid:'A0B13730-3A9A-11E3-AA6E-0800200C9A66'},
//         {uuid:'E20A39F4-73F5-4BC4-A12F-17D1AD07A961'},
//         {uuid:'A4950001-C5B1-4B44-B512-1370F02D74DE'}
//     ];

//     // Dictionary of beacons.
//     var beacons = {};

//     // Timer that displays list of beacons.
//     var updateTimer = null;

//     app.initialize = function()
//     {
//         document.addEventListener('deviceready', onDeviceReady, false);
//     };

//     function onDeviceReady()
//     {
//         // Specify a shortcut for the location manager holding the iBeacon functions.
//         window.locationManager = cordova.plugins.locationManager;

//         // Start tracking beacons!
//         startScan();

//         // Display refresh timer.
//         updateTimer = setInterval(displayBeaconList, 500);
//     }

//     function startScan()
//     {
//         // The delegate object holds the iBeacon callback functions
//         // specified below.
//         var delegate = new locationManager.Delegate();

//         // Called continuously when ranging beacons.
//         delegate.didRangeBeaconsInRegion = function(pluginResult)
//         {
//             //console.log('didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult))
//             for (var i in pluginResult.beacons)
//             {
//                 // Insert beacon into table of found beacons.
//                 var beacon = pluginResult.beacons[i];
//                 beacon.timeStamp = Date.now();
//                 var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
//                 beacons[key] = beacon;
//             }
//         };

//         // Called when starting to monitor a region.
//         // (Not used in this example, included as a reference.)
//         delegate.didStartMonitoringForRegion = function(pluginResult)
//         {
//             //console.log('didStartMonitoringForRegion:' + JSON.stringify(pluginResult))
//         };

//         // Called when monitoring and the state of a region changes.
//         // (Not used in this example, included as a reference.)
//         delegate.didDetermineStateForRegion = function(pluginResult)
//         {
//             //console.log('didDetermineStateForRegion: ' + JSON.stringify(pluginResult))
//         };

//         // Set the delegate object to use.
//         locationManager.setDelegate(delegate);

//         // Request permission from user to access location info.
//         // This is needed on iOS 8.
//         locationManager.requestAlwaysAuthorization();

//         // Start monitoring and ranging beacons.
//         for (var i in regions)
//         {
//             var beaconRegion = new locationManager.BeaconRegion(
//                 i + 1,
//                 regions[i].uuid);

//             // Start ranging.
//             locationManager.startRangingBeaconsInRegion(beaconRegion)
//                 .fail(console.error)
//                 .done();

//             // Start monitoring.
//             // (Not used in this example, included as a reference.)
//             locationManager.startMonitoringForRegion(beaconRegion)
//                 .fail(console.error)
//                 .done();
//         }
//     }

//     function displayBeaconList()
//     {
//         // Clear beacon list.
//         $('#found-beacons').empty();

//         var timeNow = Date.now();

//         // Update beacon list.
//         $.each(beacons, function(key, beacon)
//         {
//             // Only show beacons that are updated during the last 60 seconds.
//             if (beacon.timeStamp + 60000 > timeNow)
//             {
//                 // Map the RSSI value to a width in percent for the indicator.
//                 var rssiWidth = 1; // Used when RSSI is zero or greater.
//                 if (beacon.rssi < -100) { rssiWidth = 100; }
//                 else if (beacon.rssi < 0) { rssiWidth = 100 + beacon.rssi; }

//                 // Create tag to display beacon data.
//                 var element = $(
//                     '<li>'
//                     +   '<strong>UUID: ' + beacon.uuid + '</strong><br />'
//                     +   'Major: ' + beacon.major + '<br />'
//                     +   'Minor: ' + beacon.minor + '<br />'
//                     +   'Proximity: ' + beacon.proximity + '<br />'
//                     +   'RSSI: ' + beacon.rssi + '<br />'
//                     +   '<div style="background:rgb(255,128,64);height:20px;width:'
//                     +       rssiWidth + '%;"></div>'
//                     + '</li>'
//                 );

//                 $('#warning').remove();
//                 $('#found-beacons').append(element);
//             }
//         });
//     }

//     return app;
// })();

// app.initialize();