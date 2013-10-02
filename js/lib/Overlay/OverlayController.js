function OverlayController(config){
	this.overlayList = null;
	this.videoplayer = null;
	this.timeLine = [];
	this.livingList = [];
	this.interval = null;
	this.setup(config);
};

OverlayController.prototype.observe = function(){
	
	var currentTime = Math.floor(this.videoplayer.currentTime());
	if(typeof this.timeLine[currentTime] !== 'undefined'){
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

OverlayController.prototype.setup = function(config){
	
	this.overlayList = config.data;
	
	// create a timeline...
	
	for(var i = 0, l = this.overlayList.length; i < l; i++){
		var time = Math.floor(this.overlayList[i].start);
		if( typeof this.timeLine[time] === 'undefined'){
			this.timeLine[time] = [];
		}
		var overlay = new Overlay(this.overlayList[i]);
		this.timeLine[time].push(overlay);
	}
	
	var that = this;
	videojs(config.videoplayer).ready(function(){
		that.videoplayer = this;
		var interval = function(){
			that.interval = setInterval(function(){
				that.observe();
			},1000);
		};
		$('#container_video').append($('#container_overlay'))
		
		that.videoplayer.on('play', interval);
		that.videoplayer.on('ended', function(){
			clearInterval(interval);
		});
	});
};
