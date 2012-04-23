/**
 * ::JEDI:: Web Site
 * @file Main Javascript file
 * @author Fabien Crespel
 */

var static_dir = document.location.protocol + '//static.jediholo.net/';
var theme_dir = '/wp-content/themes/jediholonet/';
var timezone = -14400000; // Subject to DST changes


/* Misc. functions ***********************************************************/

function slideToggle(id) {
	var elt = $(id);
	if (elt.getStyle('display') == 'none') {
		elt.setStyle('display', null);
		elt.slide('hide');
	}
	elt.slide('toggle');
}


/* Image preloading **********************************************************/

function preloadImage(path) {
	if (static_dir == '') return;
	img = new Image();
	img.src = static_dir + path;
}

function preloadImages() {
	// Navigation - HoloNet
	preloadImage('img/nav_holonews_r.gif');
	preloadImage('img/nav_holonews_i.png');
	preloadImage('img/nav_temple_r.gif');
	preloadImage('img/nav_temple_i.png');
	preloadImage('img/nav_archives_r.gif');
	preloadImage('img/nav_archives_i.png');
	preloadImage('img/nav_residents_r.gif');
	preloadImage('img/nav_residents_i.png');
	preloadImage('img/nav_data_r.gif');
	preloadImage('img/nav_data_i.png');
	preloadImage('img/nav_comport_r.gif');
	preloadImage('img/nav_comport_i.png');

	// Navigation - Comport
	preloadImage('img/nav_cpanel_i.png');
	preloadImage('img/nav_cpanel_r.gif');
	preloadImage('img/nav_inbox_i.png');
	preloadImage('img/nav_inbox_r.gif');
	preloadImage('img/nav_index_i.png');
	preloadImage('img/nav_index_r.gif');
	preloadImage('img/nav_members_i.png');
	preloadImage('img/nav_members_r.gif');
	preloadImage('img/nav_rulestips_i.png');
	preloadImage('img/nav_rulestips_r.gif');
	preloadImage('img/nav_search_i.png');
	preloadImage('img/nav_search_r.gif')

	// Header backgrounds
	preloadImage('img/header_default.png');
	preloadImage('img/header_temple.png');
	preloadImage('img/header_archives.png');
	preloadImage('img/header_residents.png');
	preloadImage('img/header_data.png');
	preloadImage('img/header_comport.png');
}


/* SqueezeBox ****************************************************************/

function initSqueezeBox() {
	SqueezeBox.assign($$('a[rel=boxed]'), {
		size: {x: 640, y: 450},
		classWindow: 'content',
		ajaxOptions: {
			method: 'get',
			noCache: true
		}
	});
}


/* Main navigation (cross-site) **********************************************/

function initMainNav() {
	$$('#mainNav li').each(function(navItem) {
		navItem.store('originalMarginRight', navItem.getStyle('margin-right'));
		navItem.set('tween', {
			duration: 300,
			link: 'cancel'
		});
		navItem.addEvents({
			'mouseover': function() {
				this.tween('margin-right', '-3px');
			},
			'mouseout': function() {
				this.tween('margin-right', this.retrieve('originalMarginRight'));
			}
		});
	});
}


/* JEDI Galactic Clock *******************************************************/

function updateClock(clock) {
	var localTime = new Date();
	var jediTime = new Date(localTime.getTime() + localTime.getTimezoneOffset()*60000 + timezone);
	
	var baseRL = 2000;
	var baseSW = 154;
	
	var year = baseSW + ((jediTime.getFullYear() - baseRL) * 12) + jediTime.getMonth();
	var date = jediTime.getDate(); if (date < 10) date = '0' + date;
	var hour = jediTime.getHours(); if (hour < 10) hour = '0' + hour;
	var min = jediTime.getMinutes(); if (min < 10) min = '0' + min;
	var sec = jediTime.getSeconds(); if (sec < 10) sec = '0' + sec;
	
	var fullTime = year + '.' + date + ' ABY - ' + hour + min + '/' + sec + ' GST';
	clock.set('text', fullTime);
	updateClock.pass(clock).delay(1000);
}

function initClock() {
	var clock = $('clock');
	clock.set('tween', {
		duration: 300,
		link: 'cancel'
	});
	updateClock(clock);
}


/* Fading menu ***************************************************************/

function initMenu() {
	$$('.navItem').each(function(navItem) {
		var help = $(navItem.getElement('ul'));
		
		navItem.store('help', help);
		help.setStyle('display', 'block');
		help.set('tween', {
			duration: 300,
			link: 'cancel'
		});
		help.fade('hide');

		navItem.addEvents({
			'mouseover': function() {
				var help = this.retrieve('help');
				help.fade('in');

				var clock = $('clock');
				var clockTimer = clock.retrieve('timer');
				if ($defined(clockTimer)) $clear(clockTimer);
				clock.fade('out');
			},
			'mouseout': function() {
				var help = this.retrieve('help');
				help.fade('out');

				var clock = $('clock');
				var clockTimer = clock.fade.pass('in', clock).delay(500);
				clock.store('timer', clockTimer);
			}
		});
	});
}


/* Mini Trackers *************************************************************/

function initMiniTrackers() {
	$$('.widget_tracker').each(function(tracker) {
		var content = tracker.getElement('ul');
		var server = content.getElement('dl dd').get('text');
		
		// Request object
		var req = new Request.HTML({
			url: theme_dir + 'minitracker.php',
			update: content,
			link: 'ignore'
		});
		
		// Create the Refresh link and spinner
		var refreshContainer = new Element('div', {'class': 'refresh'});
		var refreshLink = new Element('a', {'href': '#', 'text': 'Refresh'});
		refreshLink.store('req', req);
		refreshLink.addEvent('click', function() {
			var req = this.retrieve('req');
			req.post({'server': server});
			return false;
		});
		refreshContainer.grab(refreshLink);
		refreshContainer.inject(tracker.getFirst(), 'after');
		
		// Request events
		req.addEvents({
			request: function() {
				this.setStyle('background-image', "url('" + static_dir + "img/spinner.gif')");
			}.bind(refreshContainer),
			
			complete: function() {
				this.setStyle('background-image', null);
			}.bind(refreshContainer),
			
			failure: function() {
				this.set('html', '<li>Unknown Error</li>');
			}.bind(content)
		});
		
		// Trigger the first update
		refreshLink.fireEvent('click');
	});
}


/* Collapsable groups ********************************************************/

function initCollapsableGroups() {
	$$('.collapsableGroup').each(function(group) {
		var header = group.getElement('.groupHeader');
		var content = group.getElement('.groupContent');
		var slide = content.get('slide');
		
		// Create and inject the arrows
		var arrowLeft = new Element('img', {'class': 'arrow', 'src': static_dir + 'img/arrow_down.gif'});
		var arrowRight = arrowLeft.clone();
		var arrows = new Array($(arrowLeft), $(arrowRight));
		arrowLeft.inject(header, 'top');
		arrowRight.inject(header, 'bottom');
		header.setStyle('cursor', 'pointer');
		
		// Store DOM Elements needed for collapsing/extending
		header.store('contentSlide', slide);
		content.store('headerArrows', arrows);
		
		// Header click event
		header.addEvent('click', function(e) {
			var slide = this.retrieve('contentSlide');
			slide.toggle();
		});
		
		// Animation complete event
		slide.addEvent('complete', function() {
			var arrows = this.element.retrieve('headerArrows');
			var src = this.element.get('slide').open ? static_dir + 'img/arrow_up.gif' : static_dir + 'img/arrow_down.gif';
			arrows.each(function(a) { a.set('src', src); });
		});
		
		// Collapse the group by default
		slide.hide();
	});
}


/* DOMReady event ************************************************************/

window.addEvent('domready', function() {
	preloadImages();
	initSqueezeBox();
	initMainNav();
	initClock();
	initMenu();
	initMiniTrackers();
	initCollapsableGroups();
});
