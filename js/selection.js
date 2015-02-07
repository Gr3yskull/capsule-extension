var color = 'yellow';
var userSelection;
var newNode;
var selection_no = 0;
var selection_class = "capsule"+selection_no;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.method == "getSelection") {
		color = request.color;
	
		
		sendResponse({data: window.getSelection().toString()});
		userSelection = window.getSelection().getRangeAt(0);
		//chrome.tabs.executeScript(null, {file: "inject.js"});
		highlightRange(userSelection);
		selection_no+=1;
	} 
	else if(request.method =="clear") {
		
		var div = document.getElementsByClassName(selection_class);
		var no_of_div = div.length;
		for(i = 0;i<no_of_div;i++)
		{
		div[i].style.backgroundColor =  'white';
		}

		sendResponse({data: "clear"});
	}
	else
	  sendResponse({ error: "method is null"}); // snub them.
});

// chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
// 	if (request.method == "getSelection") {
// 		color = request.color;
// 		sendResponse({data: window.getSelection().toString()});

// 		var userSelection = window.getSelection().getRangeAt(0);
// 		highlightRangeSpan(userSelection);
// 	} else
// 	  sendResponse({}); // snub them.
// });

// function highlightRangeSpan(range) {
// 	highlight(range);
// }

// function highlightSpan(range) {
// 	var newNode = document.createElement("span");
// 	newNode.setAttribute(
// 		"style": color,
// 	);
// 	range.surroundContents(newNode);
// }


function highlightRange(range) {
	var Selection = range;
	var safeRanges = getSafeRanges(Selection);
	//alert (safeRanges[0]);
	for (var i = 0; i < safeRanges.length; i++) {
		highlight(safeRanges[i]);
	}
}

function getSafeRanges(dangerous) {
	var a = dangerous.commonAncestorContainer;
	// Starts -- Work inward from the start, selecting the largest safe range
	var s = new Array(0), rs = new Array(0);
	if (dangerous.startContainer != a)
		for(var i = dangerous.startContainer; i != a; i = i.parentNode)
			s.push(i)
	;
	if (0 < s.length) for(var i = 0; i < s.length; i++) {
		var xs = document.createRange();
		if (i) {
			xs.setStartAfter(s[i-1]);
			xs.setEndAfter(s[i].lastChild);
		}
		else {
			xs.setStart(s[i], dangerous.startOffset);
			xs.setEndAfter(
				(s[i].nodeType == Node.TEXT_NODE)
				? s[i] : s[i].lastChild
			);
		}
		rs.push(xs);
	}

	// Ends -- basically the same code reversed
	var e = new Array(0), re = new Array(0);
	if (dangerous.endContainer != a)
		for(var i = dangerous.endContainer; i != a; i = i.parentNode)
			e.push(i)
	;
	if (0 < e.length) for(var i = 0; i < e.length; i++) {
		var xe = document.createRange();
		if (i) {
			xe.setStartBefore(e[i].firstChild);
			xe.setEndBefore(e[i-1]);
		}
		else {
			xe.setStartBefore(
				(e[i].nodeType == Node.TEXT_NODE)
				? e[i] : e[i].firstChild
			);
			xe.setEnd(e[i], dangerous.endOffset);
		}
		re.unshift(xe);
	}

	// Middle -- the uncaptured middle
	if ((0 < s.length) && (0 < e.length)) {
		var xm = document.createRange();
		xm.setStartAfter(s[s.length - 1]);
		xm.setEndBefore(e[e.length - 1]);
	}
	else {
		return [dangerous];
	}

	// Concat
	rs.push(xm);
	response = rs.concat(re);    

	// Send to Console
	return response;
}



function highlight(range) {
	newNode = document.createElement("em");
	newNode.setAttribute(
	   "style",
	   "display: inline;"
	);
	selection_class = "capsule"+selection_no;

	console.log(selection_class);
	newNode.setAttribute("class",selection_class);
	newNode.style.backgroundColor =  color;
	range.surroundContents(newNode);
}
