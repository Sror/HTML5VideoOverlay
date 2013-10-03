Sashless.OverlayController = function(config){
	this.container_overlay = null;
    this.overlayList = null;
	this.videoplayer = null;
	this.timeLine = [];
	this.livingList = [];
	this.interval = null;
	this.setup(config);
};

Sashless.OverlayController.prototype.observe = function(){
	
	var currentTime = Math.floor(this.videoplayer.currentTime());
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
		if(this.livingList[i].end <= currentTime ){
			this.livingList[i].die();
			this.livingList.splice(i, 1);
		}
	}
};

Sashless.OverlayController.prototype.setup = function(config){
	
	this.overlayList = config.data;
    this.container_overlay = config.container_overlay;

	// create a timeline...
	
	for(var i = 0, l = this.overlayList.length; i < l; i++){
		var time = Math.floor(this.overlayList[i].start);
		if( typeof this.timeLine[time] === 'undefined'){
			this.timeLine[time] = [];
		}
		var overlay = new Sashless.Overlay(this.overlayList[i]);
        // add element to container
        overlay.appendTo(this.container_overlay);
		this.timeLine[time].push(overlay);
	}
	
	var that = this;
	videojs(config.videoplayer).ready(function(){

        $('#container_video').append($('#container_overlay'));

        that.videoplayer = this;

        var interval = function(){
            that.interval = setInterval(function(){
                that.observe();
                console.log(that.videoplayer.currentTime())
            },500);
        };

		that.videoplayer.on('play', interval);
		that.videoplayer.on('ended', function(){
			console.log("end")
            clearInterval(interval);
		});
	});
};
