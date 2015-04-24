var bootLoader = (function ($) {

	var currentPage = "index";
    var localStorage = false;

    function init() {

       	StatusBar.overlaysWebView(false);
        checkConnection();
        translation.init();
        
        if(window.localStorage.getItem("name") && window.localStorage.getItem("email")){
            localStorage=true;
            var name = window.localStorage.getItem("name");
            var email = window.localStorage.getItem("email");

            $( ".page.account" ).find( ".accountData h3" ).html( name);
            $( ".page.account" ).find( ".accountData .email span" ).html( email );

        }

        showAccount();

        $( ".accountlogout" ).on( "click",function(){
            window.localStorage.removeItem("name");
            window.localStorage.removeItem("email");
            localStorage=false;
            showAccount();
        });

        $('.formConnexion').submit(function(event){

            var email = $('.formConnexion .email').val();
            var password = $('.formConnexion .password').val();
            
            $.post( "http://juglet-mathieu.fr/schonck/index.php",{log: email, pass: password}, function( data ) {
                if(data.status == "ok"){
                    $( ".page.account" ).find( ".accountData h3" ).html( data.data.firstname+" "+data.data.lastname );
                    $( ".page.account" ).find( ".accountData .email span" ).html( data.data.email );

                    window.localStorage.setItem("name", data.data.firstname+" "+data.data.lastname);
                    window.localStorage.setItem("email", data.data.email);
        

                    $('.accountData').css("display","block"); 
                    $('.accountDisconnect').css("display","none");
                    $( "#accountconnexion" ).modal('hide');
                }else{
                    alert("adresse mail ou mot de passe éronné ");
                }
            });

            event.preventDefault();
        });  

    	camera.init();
    	window.analytics.startTrackerWithId('UA-62203033-1');

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

    var showAccount = function(){
        if(localStorage == false){
            $('.accountData').css("display","none"); 
            $('.accountDisconnect').css("display","block");          
        }else{
            $('.accountData').css("display","block"); 
            $('.accountDisconnect').css("display","none"); 
        }
    }

    var checkConnection = function() {
            var networkState = navigator.connection.type;
            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            alert('Connection type: ' + states[networkState]);
    }

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