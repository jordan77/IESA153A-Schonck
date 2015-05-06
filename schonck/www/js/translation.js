var translation = (function ($) {

    var currentLanguage = "en-US"; //default value

    function init() {

        ibeacon.init();

        getCurrentLanguage();

        $( "#setLangFr" ).on( "click" , function(){
            updateContent("fr-FR");
            
        });

        $( "#setLangEn" ).on( "click" , function(){
            updateContent("en-US");
        });
    };

    var getCurrentLanguage = function(){
        navigator.globalization.getPreferredLanguage(
            function (language){
                // alert('language: ' + language.value + '\n');
                currentLanguage = language.value;

                updateContent(currentLanguage);
                ibeacon.changeLanguage(currentLanguage);
            },
            function (){
                 alert('Error getting language\n');
            }
        );
    }

    var updateContent = function(currentLanguage){
        if (currentLanguage === "fr-FR"){
            $( "[data-fr]" ).each(function( index ) {
                var translation = $(this).data("fr");
                 $( this ).empty().append(translation);
                 $( "#setLangFr" ).addClass( "active" );
                 $( "#setLangEn" ).removeClass("active");
            });
            ibeacon.changeLanguage("fr-FR");
        } else { // display ENGLISH
            $( "[data-en]" ).each(function( index ) {
                var translation = $(this).data("en");
                 $( this ).empty().append(translation);
                 $( "#setLangEn" ).addClass("active");
                 $( "#setLangFr" ).removeClass( "active" );
            });
            ibeacon.changeLanguage("en-EN");
        }

    }


       
    
    
    


    

    return {
        init : init
    };

}(jQuery));