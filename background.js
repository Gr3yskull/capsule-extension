chrome.contextMenus.create({
	title: "Link image to Capsule", 
	contexts:["image"], 
	onclick: function(info, tab){
		// For future enhancements.
		// var page_url = info.pageUrl;
		var request = {
			'url': info.srcUrl,
			'title': tab.title,
			'kind': 'I'
		};
		requestService(BASE_URL+'api/notes/add/', request, function(response) {
			alert("Image linked to your capsule.");
		});
	}
});
