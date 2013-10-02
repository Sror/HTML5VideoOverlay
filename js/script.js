$(document).ready(function(){
	// setup some fixture data.. 
	var overlay_container = "#container_overlay";
	var overlayList = [];
	overlayList.push({parent: overlay_container, start: '0', end: '30', cssClass: 'first', element: '<div></div>', message: "first .."});
	overlayList.push({parent: overlay_container, start: '2', end: '3', cssClass: 'second', element: '<div></div>', message: "second ...."});
	overlayList.push({parent: overlay_container, start: '4', end: '5', cssClass: 'third', element: '<div></div>', message: "tripppleX .."});
	overlayList.push({parent: overlay_container, start: '7', end: '9', cssClass: 'fourth', element: '<div></div>', message: "last one.."});
	
	var controller = new OverlayController({
		container_overlay: overlay_container,
		container_video: '#container_video',
		data: overlayList,
		videoplayer: document.getElementById('container_video')
	});
});
	

