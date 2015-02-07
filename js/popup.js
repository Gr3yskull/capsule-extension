// Handle if you select no content.

$(document).ready(function() {
	// checkLoginCookie();
	// while(login_lock) {};
	// // alert(login_status);
	// if (!login_status) {
	// 	goto_page('sign-in');
	// };

	// $.get(BASE_URL+"api/user/login_status", function(response) {
	// 	if (response['success']) {
	// 		alert('Success');
	// 	};
	// });
		var color = "#ffba01";
		fetchTags(tags);
		var availableTags = tags.tags;
	// 	var availableTags = [
	//   "ActionScript",
	//   "AppleScript",
	//   "Asp",
	//   "BASIC",
	//   "C",
	//   "C++",
	//   "Clojure",
	//   "COBOL",
	//   "ColdFusion",
	//   "Erlang",
	//   "Fortran",
	//   "Groovy",
	//   "Haskell",
	//   "Java",
	//   "JavaScript",
	//   "Lisp",
	//   "Perl",
	//   "PHP",
	//   "Python",
	//   "Ruby",
	//   "Scala",
	//   "Scheme"
	// ];
	
	$("#sign-in-btn").click(function(){
		goto_page('login-form-box');
	});

	$("#sign-up-btn").click(function(e){
		e.preventDefault();
		chrome.tabs.create({'url': BASE_URL});
	});
	$("#goto-my-dashboard").click(function(e){
		e.preventDefault();
		chrome.tabs.create({'url': BASE_URL+'dashboard/'});
	});

	$("#highlight-btn").click(function(){
		goto_page('highlight-form');
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendRequest(tab.id, {method: "getSelection", color:color}, function (response) {
				if(response.data == ""){
					alert ("Please select text before highlighting.");
					window.close();
				} else {
				$("#highlight-url").val(tab.url);
				$("#highlight-title").val(tab.title);
					
				$("#highlight-content").val(response.data);
				console.log(color);
				if (color == "#6eaaf5"){
					console.log(color);
					$("#highlight-color").val("Blue");
				}
				else if (color == "#7bbd3f"){
					$("#highlight-color").val("Green");
				}
				else if (color == "#ffba01"){
					$("#highlight-color").val("Yellow");
				}
				else if (color == "#ff9c9c"){
					$("#highlight-color").val("Red");
				}
				}
				//$("#highlight-tag").autocomplete({source:availableTags,multiple:"true"}) 
			});
		});
	});
	$("#stackup-btn").click(function(){
		goto_page('stackup-form');
		chrome.tabs.getSelected(null, function(tab) {
				$("#stackup-url").val(tab.url);
				$("#stackup-title").val(tab.title);
				$("#stackup-tag").autocomplete({source:availableTags,multiple:"true"}) 
			
		});		
	});
	$("#color-blue").click(function(){
		color = "#6eaaf5";
		$("#highlight-btn").css("color","#6eaaf5");
		
	});
	$("#color-green").click(function(){
		color = "#7bbd3f";
		$("#highlight-btn").css("color","#7bbd3f");
		
	});
	
	$("#color-yellow").click(function(){
		color = "#ffba01";
		$("#highlight-btn").css("color","#ffba01");
		
	});
	
	$("#color-red").click(function(){
		color = "#ff9c9c";
		$("#highlight-btn").css("color","#ff9c9c");
		
	});
	function split( val ) {
      return val.split( /,\s*/ );
    }
    function extractLast( term ) {
      return split( term ).pop();
    }
	$( "#highlight-tag" )
      // don't navigate away from the field on tab when selecting an item
      .bind( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).data( "ui-autocomplete" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 2,
        source: function( request, response ) {
          // delegate back to autocomplete, but extract the last term
          response( $.ui.autocomplete.filter(
            availableTags, extractLast( request.term ) ) );
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function( event, ui ) {
          var terms = split( this.value );
          // remove the current input
          terms.pop();
          // add the selected item
          terms.push( ui.item.value );
          // add placeholder to get the comma-and-space at the end
          terms.push( "" );
          this.value = terms.join( ", " );
          return false;
        }
      });
	  $( "#stackup-tag" )
      // don't navigate away from the field on tab when selecting an item
      .bind( "keydown", function( event ) {
        if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).data( "ui-autocomplete" ).menu.active ) {
          event.preventDefault();
        }
      })
      .autocomplete({
        minLength: 2,
        source: function( request, response ) {
          // delegate back to autocomplete, but extract the last term
          response( $.ui.autocomplete.filter(
            availableTags, extractLast( request.term ) ) );
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function( event, ui ) {
          var terms = split( this.value );
          // remove the current input
          terms.pop();
          // add the selected item
          terms.push( ui.item.value );
          // add placeholder to get the comma-and-space at the end
          terms.push( "" );
          this.value = terms.join( ", " );
          return false;
        }
      });
	$("#highlight-form-submit").click(function(e) {
		e.preventDefault();
		var request = $("#highlight-form-actual").serializeObject();
		requestService(BASE_URL+'api/notes/add/', request, function(response) {
			window.close();
		});
	});
	$("#stackup-form-submit").click(function(e){
		e.preventDefault();
		var request = $("#stackup-form-actual").serializeObject();
		requestService(BASE_URL+'api/notes/add/', request, function(response) {
			window.close();
		});
	});
	$("#highlight-cancel-form-btn").click(function(e){
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendRequest(tab.id, {method: "clear"}, function (response) 				{
				if(response.data == "clear"){
					alert ("clear");
					//window.close();
				} 
//$("#highlight-tag").autocomplete({source:availableTags,multiple:"true"}) 
			});
		});
		e.preventDefault();
		window.close();
	});
	$("#stackup-cancel-form-btn").click(function(e){
		e.preventDefault();
		window.close();
	});
	$('#login-form').submit(function(e) {
		e.preventDefault();
		data = $("#login-form").serializeObject();
 		requestService(BASE_URL+"api/user/login_no_redirect/", data, function(response){
 			if(response['success']) {
 				alert('You logged in successfully.');
 			} else {
 				$('#login-form').markErrors(response);
 			}
 		});
	});

	// requestServiceFullResponse(BASE_URL+"api/user/login_no_redirect/", $("#login-form").serializeObject(), function(response, status, httpRequest){r = response;st=status;rq= httpRequest;console.log(response)});
	$('#get-sample').click(function(e) {
		e.preventDefault();
		goto_page('login-form-box');
		// data = {'kind':'h'};
		// requestServiceFullResponse(BASE_URL+"api/notes/page/", data, function(response, status, httpRequest){
 	// 		rq = response;
 	// 	});
	});

 
 });

function goto_page(page) {
	var $old_active = $('#popup div:first');
	var old_id = $old_active.attr('id')

	var $new_active = $('#'+page)
	var new_id = $new_active.attr('id')

	// Moving the old pane
	$old_active.appendTo('#popup-storage');

	// Making the new pane active
	$new_active.appendTo('#popup');
}
