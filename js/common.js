// Credits - https://developer.chrome.com/extensions/cookies.html
// Last Accessed: 8-Apr-2013

BASE_URL_HTTP = "http://capsule.adityabasu.me/"
BASE_URL_HTTPS = "https://capsule.adityabasu.me/"
BASE_URL_LOCAL = "http://localhost:8000/"
// BASE_URL_LOCAL = "http://localhost/"
BASE_URL = BASE_URL_LOCAL

// function Login() {
// 	var check        = check;
// 	var clearCookie        = clearCookie;

// 	function check() {
// 		Login.lock = true;
// 		details = {'url':BASE_URL, 'name':'sessionid'};
// 		chrome.cookies.get(details, function(cookie) {
// 			if(cookie.value)
// 				this.login_status = true;
// 			else
// 				this.login_status = false;
// 			// Release the lock
// 			this.lock = false;
// 		});
// 		return this.login_status;
// 	}

// 	function clearCookie() {
// 		this.lock = true;
// 		details = {'url':BASE_URL, 'name':'sessionid'};
// 		chrome.cookies.remove(details, function(details) {
// 			this.login_status = false;
// 			// Release the lock
// 			this.lock = false;
// 		});
// 	}
// }

login_status = false;
login_lock   = false; // Initially no function is invoked

function checkLoginCookie() {
	login_lock = true;
	details = {'url':BASE_URL, 'name':'sessionid'};
	chrome.cookies.get(details, function(cookie) {
		if(cookie.value) {
			login_status = true;
		} else {
			login_status = false;
		}
		login_lock = false;
	});
	return login_status;
}

function clearLoginCookie() {
	details = {'url':BASE_URL, 'name':'sessionid'};
	chrome.cookies.remove(details, function(details) {
		login_status = false;
	});
}

function closePopup() {
	window.close();
}

/* Deprecated, in favour of the Login() class.
function checkLoginCookie() {
	details = {'url':BASE_URL, 'name':'sessionid'};
	chrome.cookies.get(details, function(cookie) {
		if(cookie.value)
			this.login_status = true;
		else
			this.login_status = false;
	});
	return this.login_status;
}

function clearLoginCookie() {
	details = {'url':BASE_URL, 'name':'sessionid'};
	chrome.cookies.remove(details, function(details) {
		this.login_status = false;
	});
}
*/	
// Credits - http://www.w3schools.com/jsref/jsref_prototype_date.asp
// Last Accessed: 7-Apr-2013
Date.prototype.getMonthName = function() {
	if (this.getMonth()==0){return "January"};
	if (this.getMonth()==1){return "February"};
	if (this.getMonth()==2){return "March"};
	if (this.getMonth()==3){return "April"};
	if (this.getMonth()==4){return "May"};
	if (this.getMonth()==5){return "June"};
	if (this.getMonth()==6){return "July"};
	if (this.getMonth()==7){return "August"};
	if (this.getMonth()==8){return "September"};
	if (this.getMonth()==9){return "October"};
	if (this.getMonth()==10){return "November"};
	if (this.getMonth()==11){return "December"};
}

Date.prototype.getShortMonthName = function() {
	if (this.getMonth()==0){return "Jan"};
	if (this.getMonth()==1){return "Feb"};
	if (this.getMonth()==2){return "Mar"};
	if (this.getMonth()==3){return "Apr"};
	if (this.getMonth()==4){return "May"};
	if (this.getMonth()==5){return "Jun"};
	if (this.getMonth()==6){return "Jul"};
	if (this.getMonth()==7){return "Aug"};
	if (this.getMonth()==8){return "Sept"};
	if (this.getMonth()==9){return "Oct"};
	if (this.getMonth()==10){return "Nov"};
	if (this.getMonth()==11){return "Dec"};
}

Date.parseTimestamp = function(timestamp_str) {
	var date_str = timestamp_str.split(' ')[0];
	var parts = date_str.match(/(\d+)/g);
	// new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
	return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
}

Date.prototype.toShortString = function() {
	return this.getDate()+' '+this.getShortMonthName()+' '+this.getFullYear()
}

// Credits - http://stackoverflow.com/questions/1184624/convert-form-data-to-js-object-with-jquery
// Last Accessed: 2-Mar-2013
$.fn.serializeObject = function()
{
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

// Credits: http://stackoverflow.com/questions/1208067/wheres-my-json-data-in-my-incoming-django-request
// Last Accessed: 2-Mar-2013
function requestService(url_request, json_request, callback) {
	$.ajax({
		url: url_request,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(json_request),
		dataType: 'json',
		success: callback,
		statusCode: {
			302: function() {
				// alert("Please log in.");
			}
		}
	}).fail(function() {
		alert("Please log in.");
		window.close();
		// clearLoginCookie();
		// goto_page('sign-in');
	});
}

function requestServiceFullResponse(url_request, json_request, callback) {
	$.ajax({
		url: url_request,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(json_request),
		dataType: 'json',
		success: callback
	}).fail(function() {
		clearLoginCookie();
	});
}

// Credits: http://stackoverflow.com/questions/68485/how-to-show-loading-spinner-in-jquery
// Last Accessed: 2-Mar-2013
$(document).ajaxStart(function() {
	$('#progress-nav').show();
}).ajaxStop(function() {
	$('#progress-nav').hide();
});

function Highlight() {
	this.state = false;
	this.toggle = toggle;
	this.addHighlights = addHighlights;
	this.removeHighlights = removeHighlights;
	this.addHighlightsStyles = addHighlightsStyles;
	this.removeHighlightsStyles = removeHighlightsStyles;

	function toggle(e) {
		e.preventDefault();
		e.stopPropagation();
		if (this.state == false) {
			addHighlights();
			removeHighlightsStyles(e.target);
			this.state = true;
		} else {
			removeHighlights();
			addHighlightsStyles(e.target);
			this.state = false;
		}
	}

	function addHighlights() {
		requestServce("/api/highlights/", "", function(result){
			highlights = result['highlights'];
			highlights.forEach(function(h){
				var re = new RegExp("("+h+")","g");
				var str = $('body').html();
				$('body').html((str.replace(re, '<span class="mStyle">$1</span>')));
			});
		});
	}

	function removeHighlights() {
		// $('.mStyle').each(function(i) {
		// 	var html = $(this).html();
		// 	$(this).replaceWith(html);
		// });
		$('.mStyle').removeClass('mStyle');
	}

	function addHighlightsStyles($target) {
		$($target).removeClass('btn-danger');
		$($target).addClass('btn-success');
		$($target).text('Add Highlights');
	}

	function removeHighlightsStyles($target) {
		$($target).removeClass('btn-success');
		$($target).addClass('btn-danger');
		$($target).text('Remove Highlights');
	}
}

function regExApply(e) {
	e.preventDefault();
	// $(e.target).toggle();
	requestServce("/api/highlights/", "", function(result){
		highlights = result['highlights'];
		highlights.forEach(function(h){
			var re = new RegExp("("+h+")","g");
			var str = $('body').html();
			$('body').html((str.replace(re, '<span class="mStyle">$1</span>')));
		});
	});
}

function objectWrap(url) {
	return  '<object data="'
	+ url
	+ '" '
	+ 'width="100%" height="100%" type="text/html">Object does not exits.'
	+ '</object>'
}

function iframeWrap(url) {
	return  '<iframe src="'
	+ url
	+ '" '
	+ 'width="100%" height="100%">Frame src does not exits.'
	+ '</iframe>'
}

// Use this on a form
$.fn.markErrors = function(response) {
	$('#' + $(this).attr('id') + '-box').addClass('surround_error')
	
	var context = response['context'];
	var errors = response['errors'];
	var $status = $('#' + $(this).attr('id') + '-status')

	err_msg = '<b>'+ errors[context] +'</b> ';
	for (var key in errors) {
		if (key != context) {
			err_msg += '<br />' +'<b>'+ key +'</b> ' + errors[key];
		}
	}
	$status.html(err_msg);
	$status.slideDown(200);

	// Older version, v1: Every input field is indivisulally marked for errors.
	for (var key in errors) {
		if (key == 'password') {
			// $('input[name='+key+']').attr('placeholder', 'Error')
			$('input[name='+key+']').showError();
		}
	}
}

function Tags() {
	this.initial_run = true;
	this.tags = [];

	this.resetState = function() {
		this.initial_run = true;
	};

}

function fetchTags(tags) {
	if (tags.initial_run) {
		$.get(BASE_URL+'api/notes/tags_frequency/', '', function(response) {
			if (response['success']) {
				tags.search_term = true;
				tags.total_tags = response['total_tags'];
				tags.items = response['tags'];

				for (var i = 0; i < tags.total_tags-1; i++) {
					tags.tags.push(tags.items[i]['tag']);
				};
		} else
			tags.success = false;
		});
		tags.initial_run = false;
	};
}

tags = new Tags();
