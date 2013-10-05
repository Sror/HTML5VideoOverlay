HTML5VideoOverlay = {
    Controller: null,
    Overlay: null
};
HTML5VideoOverlay.Overlay = function(config) {
    this.defaults = {'cssClass': 'overlay'};

    this.cssClassList = null;
    this.start = null;
    this.end = null;
    this.element = null;
    this.visible = false;

    this.setup(config);
};
HTML5VideoOverlay.Overlay.prototype.setup = function (config) {
    this.start = config.start;
    this.end = config.end;
    this.element = $(config.element);
    if (typeof config.cssClass == 'undefined') {
        config.cssClass = "";
    }
    this.addCssClassList(config.cssClassList);

};
HTML5VideoOverlay.Overlay.prototype.addCssClassList = function (cssClassList) {
    var classString = this.defaults.cssClass;
    for (var i = 0, l = cssClassList.length; i < l; i++) {
        classString += " " + cssClassList[i];
    }
    this.element.addClass(classString);
};
HTML5VideoOverlay.Overlay.prototype.appendTo = function (el) {
    $(el).append(this.element);
};
HTML5VideoOverlay.Overlay.prototype.live = function () {
    if (!this.visible) {
        this.show();
    }
    //TODO: add more fancy effects
};
HTML5VideoOverlay.Overlay.prototype.show = function () {
    this.visible = true;
    this.element.fadeIn();
};
HTML5VideoOverlay.Overlay.prototype.die = function () {
    this.element.fadeOut();
    this.visible = false;
};
HTML5VideoOverlay.Controller = function (config) {
    this.defaults = {'container_overlay': 'container_overlay' }

    this.container_overlay = null;
    this.overlayList = null;
    this.videoplayer = null;
    this.timeline = [];
    this.livingList = [];

    this.setup(config);
};

HTML5VideoOverlay.Controller.prototype.kill = function (index) {
    this.livingList[index].die();
    this.livingList.splice(index, 1);
};
HTML5VideoOverlay.Controller.prototype.observe = function () {
    var currentTime = Math.floor(this.getCurrentTime());
    if (typeof this.timeline[currentTime] != 'undefined') {
        for (var i = 0, l = this.timeline[currentTime].length; i < l; i++) {
            if (this.timeline[currentTime][i].start >= currentTime && this.timeline[currentTime][i].end >= currentTime) {
                this.timeline[currentTime][i].live();
                this.livingList.push(this.timeline[currentTime][i]);
            }
        }
    }

    for (var i = 0; i < this.livingList.length; i++) {
        if (currentTime >= this.livingList[i].end && this.livingList[i].start < currentTime) {
            this.kill(i);
        }
    }
};

HTML5VideoOverlay.Controller.prototype.setupTimeline = function () {
    for (var i = 0, l = this.overlayList.length; i < l; i++) {
        var time = Math.floor(this.overlayList[i].start);
        if (typeof this.timeline[time] === 'undefined') {
            this.timeline[time] = [];
        }
        var overlay = new HTML5VideoOverlay.Overlay(this.overlayList[i]);
        // add element to container
        overlay.appendTo(this.container_overlay);
        this.timeline[time].push(overlay);
    }
};
HTML5VideoOverlay.Controller.prototype.setupVideoplayer = function (videoplayer_id) {
    var that = this;
    videojs(videoplayer_id).ready(function () {
        that.videoplayer = this;
    });

    var observer = null;

    var createObserver = function () {
        if (!observer) {
            observer = setInterval(function () {
                that.observe();
            }, 500);
        };
    };
    var removeObserver = function () {
        clearInterval(observer);
        observer = null;
    };
    that.videoplayer.on("play", createObserver);
    that.videoplayer.on('ended', removeObserver);
};
HTML5VideoOverlay.Controller.prototype.getCurrentTime = function () {
    return this.videoplayer.currentTime();
};
HTML5VideoOverlay.Controller.prototype.setup = function (config) {
    this.overlayList = config.data;
    this.container_overlay = $('<div id="' + this.defaults.container_overlay + '"></div>');
    if(config.container_overlay != 'undefined' ) {
        this.container_overlay = $('<div id="' + config.container_overlay + '"></div>');
    }

    $('body').append(this.container_overlay);

    this.setupVideoplayer(config.videoplayer_id);
    this.setupTimeline();

};