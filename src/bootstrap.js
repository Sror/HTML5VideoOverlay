$(document).ready(function(){
	// setup some fixture data..
	var overlayList = [];
	overlayList.push({ start: '0', end: '5', cssClass: 'first', element: '<div>holy.. ..</div>' });
	overlayList.push({ start: '2', end: '3', cssClass: 'second', element: '<div>another holy..</div>' });
	overlayList.push({ start: '4', end: '5', cssClass: 'third', element: '<div>amazing...</div>' });
	overlayList.push({ start: '7', end: '9', cssClass: 'fourth', element: '<div>really impressive video.. </div>' });
    overlayList.push({ start: '10', end: '25', cssClass: 'second', element: '<div>the..... </div>' });
    overlayList.push({ start: '14', end: '25', cssClass: 'first', element: '<div>end.... </div>' });
    overlayList.push({ start: '16', end: '25', cssClass: 'fourth', element: '<div>is... </div>' });
    overlayList.push({ start: '18', end: '25', cssClass: 'third', element: '<div>near.. </div>' });
    overlayList.push({ start: '40', end: '45', cssClass: 'fourth', element: '<div>Thanks for watching</div>' });


	var controller = new Sashless.OverlayController({
		container_overlay: "#container_overlay",
		container_video: '#container_video',
		data: overlayList,
		videoplayer: document.getElementById('container_video')
	});


});
	

