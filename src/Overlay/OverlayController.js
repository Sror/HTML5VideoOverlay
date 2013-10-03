HTML5VideoOverlay.OverlayController = function(config){
	this.container_overlay = null;
    this.overlayList = null;
	this.videoplayer = null;
	this.timeLine = [];
	this.livingList = [];
	this.interval = null;
	this.setup(config);
};
HTML5VideoOverlay.OverlayController.prototype.getCurrentTime = function(){
    return this.videoplayer.currentTime();
}

HTML5VideoOverlay.OverlayController.prototype.kill = function(index){
    this.livingList[index].die();
    this.livingList.splice(index, 1);
}


HTML5VideoOverlay.OverlayController.prototype.observe = function(){
	var currentTime = Math.floor(this.getCurrentTime());
	if(typeof this.timeLine[currentTime] != 'undefined'){
		for(var i = 0, l = this.timeLine[currentTime].length ; i < l; i++){
		//maybe multiple items start at once..todo..
			if(this.timeLine[currentTime][i].start >= currentTime && this.timeLine[currentTime][i].end >= currentTime ){
				this.timeLine[currentTime][i].live();
				this.livingList.push(this.timeLine[currentTime][i]);
			}
		}
	}
	
	for(var i = 0; i < this.livingList.length; i++){
		if(currentTime >= this.livingList[i].end){
            this.kill(i);
		}
	}
};

HTML5VideoOverlay.OverlayController.prototype.setupTimeline = function(){
    for(var i = 0, l = this.overlayList.length; i < l; i++){
        var time = Math.floor(this.overlayList[i].start);
        if( typeof this.timeLine[time] === 'undefined'){
            this.timeLine[time] = [];
        }
        var overlay = new HTML5VideoOverlay.Overlay(this.overlayList[i]);
        // add element to container
        overlay.appendTo(this.container_overlay);
        this.timeLine[time].push(overlay);
    }
}
HTML5VideoOverlay.OverlayController.prototype.setupObserver = function(){
    var that = this;
    var interval = function(){
        that.interval = setInterval(function(){
            that.observe();
        },500);
    };
    return interval;
}
HTML5VideoOverlay.OverlayController.prototype.setupVideoplayer = function (videoplayer_id) {

    var that = this;
    var observer = this.setupObserver();
    videojs(videoplayer_id).ready(function(){

        $('#container_video').append($('#container_overlay'));

        that.videoplayer = this;
        that.videoplayer.on('play', observer);
        that.videoplayer.on('ended', function(){
            clearInterval(observer);
        });
    });
};
HTML5VideoOverlay.OverlayController.prototype.setup = function(config){
	
	this.overlayList = config.data;
    this.container_overlay = config.container_overlay;

    this.setupTimeline();
	this.setupVideoplayer(config.videoplayer);

};

