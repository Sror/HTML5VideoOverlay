	// TODO: add video loop support
Sashless.Overlay = function(config){
	this.defaults = {'cssClass':'overlay'};
	
	this.start = null;
	this.end = null;
	this.element = null;
	this.visible = false;
	
	this.setup(config);
};

Sashless.Overlay.prototype.setup = function(config){
	this.start = config.start;
	this.end = config.end;
	this.element = $(config.element);
	if( typeof config.cssClass == 'undefined'){
        config.cssClass = "";
    }
	this.element.addClass(this.defaults.cssClass + " " + config.cssClass);
};
Sashless.Overlay.prototype.appendTo = function(el){
        $(el).append(this.element);
}
Sashless.Overlay.prototype.live = function(){
	if(!this.visible){
		this.show();
	}
	//TODO: add more functionality than just displaying message
};
Sashless.Overlay.prototype.show = function(){
	this.visible = true;
	this.element.fadeIn();
	//TODO: show element
};
Sashless.Overlay.prototype.die = function(){
	// TODO: cleanup
	this.element.fadeOut();
    this.visible = false;
};