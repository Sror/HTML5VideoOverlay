$(document).ready(function () {
    // setup some fixture data..
    var overlayList = [];
    overlayList.push({ start: '0', end: '5', cssClassList: ['first'], element: '<div>holy.. ..</div>' });
    overlayList.push({ start: '0', end: '5', cssClassList: ['fourth'], element: '<div>holy.. ..</div>' });
    overlayList.push({ start: '2', end: '3', cssClassList: ['second'], element: '<div>another holy..</div>' });
    overlayList.push({ start: '4', end: '5', cssClassList: ['third'], element: '<div>amazing...</div>' });
    overlayList.push({ start: '7', end: '9', cssClassList: ['fourth'], element: '<div>really impressive video.. </div>' });
    overlayList.push({ start: '10', end: '25', cssClassList: ['second'], element: '<div>the..... </div>' });
    overlayList.push({ start: '14', end: '25', cssClassList: ['first'], element: '<div>end.... </div>' });
    overlayList.push({ start: '16', end: '25', cssClassList: ['fourth'], element: '<div>is... </div>' });
    overlayList.push({ start: '18', end: '25', cssClassList: ['third'], element: '<div>near.. </div>' });
    overlayList.push({ start: '40', end: '45', cssClassList: ['fourth'], element: '<div>Thanks for watching</div>' });


    var controller = new HTML5VideoOverlay.Controller({
        data: overlayList,
        videoplayer_id: "container_video"
    });


});
	

