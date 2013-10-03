	// TODO: add video loop support
HTML5VideoOverlay.Overlay = function(config){
	this.defaults = {'cssClass':'overlay'};
	
	this.start = null;
	this.end = null;
	this.element = null;
	this.visible = false;
	
	this.setup(config);
};

HTML5VideoOverlay.Overlay.prototype.setup = function(config){
	this.start = config.start;
	this.end = config.end;
	this.element = $(config.element);
	if( typeof config.cssClass == 'undefined'){
        config.cssClass = "";
    }
	this.element.addClass(this.defaults.cssClass + " " + config.cssClass);
};
HTML5VideoOverlay.Overlay.prototype.appendTo = function(el){
        $(el).append(this.element);
}
HTML5VideoOverlay.Overlay.prototype.live = function(){
	if(!this.visible){
		this.show();
	}
	//TODO: add more functionality than just displaying message
};
HTML5VideoOverlay.Overlay.prototype.show = function(){
	this.visible = true;
	this.element.fadeIn();
	//TODO: show element
};
HTML5VideoOverlay.Overlay.prototype.die = function(){
	// TODO: cleanup
	this.element.fadeOut();
    this.visible = false;
};