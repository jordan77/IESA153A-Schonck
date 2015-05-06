var contact = (function ($) {

	$modal = $( "#Sharecontact" );

    function init() {
    	$modal.find("ul").html("");
    	var options      = new ContactFindOptions();
        var fields = ["name","emails"];
        navigator.contacts.find(fields, onFindContacts, onError, {multiple: true});
    };

    var onFindContacts = function(contacts){
        var contact = [];
        for (var i = 0; i < contacts.length; i++) {
            if(contacts[i].emails != null){
                var obj = {};
                obj["name"] = contacts[i].name.givenName;
                $modal.find("ul").append( "<li>"+contacts[i].name.givenName+"</li>" );  
            }
            
        }
        $( "#Sharecontact" ).modal('show');
    }

	var onError = function(contactError){
		alert('onError!');
    }

    return {
        init : init
    };

}(jQuery));