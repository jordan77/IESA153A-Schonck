var translation = (function ($) {

    var currentLanguage = "en-US"; //default value

    function init() {
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
        } else { // display ENGLISH
            $( "[data-en]" ).each(function( index ) {
                var translation = $(this).data("en");
                 $( this ).empty().append(translation);
                 $( "#setLangEn" ).addClass("active");
                 $( "#setLangFr" ).removeClass( "active" );
            });
        }
    }


       
    
    
    


    

    return {
        init : init
    };

}(jQuery));