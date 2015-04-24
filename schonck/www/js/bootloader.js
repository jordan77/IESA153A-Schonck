var bootLoader = (function ($) {

	var currentPage = "index";

    function init() {
       	
    	
        navigator.globalization.getPreferredLanguage(
            function (language){
                alert('language: ' + language.value + '\n');
            },
           	function (){
                 alert('Error getting language\n');
            }
		);
             

    	camera.init();
    	window.analytics.startTrackerWithId('UA-62203033-1');

    	$.getJSON( "http://juglet-mathieu.fr/schonck/index.json", function( data ) {
			$( ".page.account" ).find( "h3" ).html( data.data.firstname+" "+data.data.lastname );
			$( ".page.account" ).find( ".email span" ).html( data.data.email );
		});



    	$( ".index" ).css( "display" , "block" );

    	$( ".openpage" ).on( "click" , function(){
    		newpage = $( this ).attr( "data-page" );
    		pageOpen(newpage);
    		window.analytics.trackView(newpage);
    	});

    	$( "#takephoto" ).on( "click" , function(){
    		camera.capturePhoto();
    		window.analytics.trackView("takephoto");
    	});
    	$( "#photogallery" ).on( "click" , function(){
    		camera.getPhoto();
    		window.analytics.trackView("photogallery");
    	});

    	$( ".buttonprofillocation" ).on( "click" , function(){
    		geolocation.init();
    	});

    	$( ".contactshare" ).on( "click" , function(){
    		contact.init();
    		window.analytics.trackView("contactShare");
    	});

    };

    var pageOpen = function(pageName){
    	if( currentPage == pageName ){
    		return false;
    	}else{
    		$( "."+pageName ).velocity(
    			{ translateX: "-100%" },
		    	{
		    		duration: 0,
		    		display: "block",
		    		complete: function(elements) {
		    			$( "."+currentPage ).velocity( { translateX: "100%" }, { display: "none" } );
		    			$( "."+pageName ).velocity( { translateX: "0%" });
		    			currentPage = pageName;
		    			$( ".openpage" ).parent().removeClass( "active" );
		    			$( ".openpage[data-page="+currentPage+"]" ).parent().addClass( "active" );
		    		}
		    	}
		    );
    	}
    };

    return {
        init : init
    };

}(jQuery));
(function($){
	document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady() {
    	bootLoader.init();
	}
    
})(jQuery);