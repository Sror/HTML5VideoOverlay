	// TODO: add video loop support
Sashless.Overlay = function(config){
	this.defaults = {'cssClass':'overlay'};
	
	this.start = null;
	this.end = null;
	this.element = null;
	this.message = null;
	this.visible = false;
	this.parent = null;
	
	this.setup(config);
};
Sashless.Overlay.prototype.setup = function(config){
	this.parent = $(config.parent);
	this.start = config.start;
	this.end = config.end;
	this.message = config.message;
	this.element = $(config.element);
	
	this.element.addClass(this.defaults.cssClass + " " + config.cssClass);
	this.element.text(this.message);
	this.parent.append(this.element);
};

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
};