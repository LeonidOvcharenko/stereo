/**
 * StereoKartinki v1.0 - Shows stereo images and image sequences
 * Copyright 2010-2013, Leonid Ovcharenko - http://leonidovcharenko.ru
 * Released under the MIT license
 */

;(function($){
	var plugin = {};
	var defaults = {
		joined: false,
		frames: 2,
		speed: 125
	}
	$.fn.stereo = function(options){
		if(this.length == 0) return;

		// support mutltiple elements
		if(this.length > 1){
			this.each(function(){$(this).stereo(options)});
			return this;
		}
		
		// create a namespace to be used throughout the plugin
		var stereo = {};
		// set a reference to our stereopic element
		var el = this;
		plugin.el = this;

		var init = function(){
			// merge user-supplied options with the defaults
			stereo.settings = $.extend({}, defaults, options);

			stereo.images = el.find('img');
			if (stereo.settings.joined) {
				var fr = parseInt(el.attr('data-frames'));
				if (fr > 2) stereo.settings.frames = fr;
			}
			else { stereo.settings.frames = stereo.images.length; }
			stereo.frame = -1;
			stereo.direction = 1;

			// preload all images, then perform final DOM / CSS modifications that depend on images being loaded
			el.children().imagesLoaded(function(){
				var w = stereo.images.width();
				var h = stereo.images.height();
				if (stereo.settings.joined) {
					stereo.images.addClass('stereo-slides');
					var width = w/stereo.settings.frames;
				}
				else {
					var i = stereo.images.detach();
					var wrapper = $('<span class="stereo-slides" />')
						.css({ 'height':h+'px', 'width':stereo.settings.frames*w+'px' });
					el.append(wrapper);
					i.appendTo(el.children().first());
					var width = stereo.images.first().width();
				};
				el.css({ 'width':width, 'height':h }).addClass('ui-stereo');
				stereo.slides = el.find('.stereo-slides');
			});
		}
		var run = function(){
			stereo.shows = setInterval(
			function (){
				var posl = -stereo.slides.position().left;
				stereo.frame += stereo.direction*1;
				var offs = stereo.frame*el.width();
				// change picture
				offs = -offs+'px';
				stereo.slides.css('left',offs);
				// change direction if needed
				if (stereo.frame==0) stereo.direction = 1;
				if (stereo.frame==(stereo.settings.frames-1)) stereo.direction = -1;
			} ,stereo.settings.speed);
		}
		var stop = function(){
			clearInterval(stereo.shows);
		}
		init();
		el.bind('mouseover',run).bind('mouseout',stop);
		return this;
	}
})(jQuery);

/*!
 * jQuery imagesLoaded plugin v2.1.0
 * http://github.com/desandro/imagesloaded
 *
 * MIT License. by Paul Irish et al.
 */

/*jshint curly: true, eqeqeq: true, noempty: true, strict: true, undef: true, browser: true */
/*global jQuery: false */

(function(c,n){var l="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(f){function m(){var b=c(i),a=c(h);d&&(h.length?d.reject(e,b,a):d.resolve(e));c.isFunction(f)&&f.call(g,e,b,a)}function j(b,a){b.src===l||-1!==c.inArray(b,k)||(k.push(b),a?h.push(b):i.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),o&&d.notifyWith(c(b),[a,e,c(i),c(h)]),e.length===k.length&&(setTimeout(m),e.unbind(".imagesLoaded")))}var g=this,d=c.isFunction(c.Deferred)?c.Deferred():
0,o=c.isFunction(d.notify),e=g.find("img").add(g.filter("img")),k=[],i=[],h=[];c.isPlainObject(f)&&c.each(f,function(b,a){if("callback"===b)f=a;else if(d)d[b](a)});e.length?e.bind("load.imagesLoaded error.imagesLoaded",function(b){j(b.target,"error"===b.type)}).each(function(b,a){var d=a.src,e=c.data(a,"imagesLoaded");if(e&&e.src===d)j(a,e.isBroken);else if(a.complete&&a.naturalWidth!==n)j(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=l,a.src=d}):m();return d?d.promise(g):
g}})(jQuery);