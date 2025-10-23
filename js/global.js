/**
 * ::JEDI:: Web Site
 * @file Main Javascript file, using the jQuery library.
 * @author Fabien Crespel
 */

var static_dir = document.location.protocol + '//static.jediholo.net/';
var timezone = -18000000; // Winter time (EST)
//var timezone = -14400000; // Summer time (EDT)


/* Misc. functions ***********************************************************/

function slideToggle(id) {
	jQuery('#' + id).slideToggle();
}


/* Main navigation (cross-site) **********************************************/

function initMainNav() {
	jQuery('#mainNav li').each(function() {
		jQuery(this).data('originalMarginRight', jQuery(this).css('marginRight'));
		jQuery(this).hover(
			// Mouse over
			function() {
				jQuery(this).clearQueue().animate({marginRight: '-3px'}, 300);
			},
			// Mouse out
			function() {
				jQuery(this).clearQueue().animate({marginRight: jQuery(this).data('originalMarginRight')}, 300);
			}
		);
	});
}


/* JEDI Galactic Clock *******************************************************/

function getJediDate(date) {
	var baseRL = 2000;
	var baseSW = 153;

	var yearRL = date.getFullYear();
	var monthRL = date.getMonth() + 1; // 1 to 12
	var yearSW = baseSW + ((yearRL - baseRL) * 12) + monthRL;
	var daySW = date.getDate();

	// Time freeze:
	// Year 461 (August 2025) is extended through September and October 2025, then November 2025 becomes year 462
	// 100 days are added every month, so October 31, 2025 becomes 461.231
	if (yearRL == 2025 && monthRL > 8 && monthRL < 11) {
		yearSW -= (monthRL - 8); // skip remaining months of 2025
		daySW += (monthRL - 8) * 100; // add 100 days every month
	} else if ((yearRL == 2025 && monthRL >= 11) || yearRL > 2025) {
		yearSW -= 2; // skip September/October 2025
	}

	return yearSW + '.' + daySW.toString().padStart(2, "0");
}

function getJediTime(date) {
	var hour = date.getHours().toString().padStart(2, "0");
	var min = date.getMinutes().toString().padStart(2, "0");
	var sec = date.getSeconds().toString().padStart(2, "0");
	return hour + min + '/' + sec;
}

function updateClock() {
	var localTime = new Date();
	var jediTime = new Date(localTime.getTime() + (localTime.getTimezoneOffset() * 60000) + timezone);

	// Format date and time
	var dateSW = getJediDate(jediTime);
	var timeSW = getJediTime(jediTime);
	var fullTime = dateSW + ' ABY - ' + timeSW + ' GST';

	// Update clock display
	jQuery('#clock').text(fullTime);

	// Update body class based on time of day
	if (jediTime.getHours() < 5 || jediTime.getHours() >= 21) {
		jQuery(document.body).addClass('night');
	} else {
		jQuery(document.body).removeClass('night');
	}
	if (jediTime.getHours() >= 5 && jediTime.getHours() < 7) {
		jQuery(document.body).addClass('sunrise');
	} else {
		jQuery(document.body).removeClass('sunrise');
	}
	if (jediTime.getHours() >= 19 && jediTime.getHours() < 21) {
		jQuery(document.body).addClass('twilight');
	} else {
		jQuery(document.body).removeClass('twilight');
	}

	// Refresh in 1 second
	setTimeout(updateClock, 1000);
}

function initClock() {
	updateClock();
}


/* Fading menu ***************************************************************/

function initMenu() {
	var navItems = jQuery.merge(jQuery('.navItem'), jQuery('.navList > li'));
	navItems.each(function() {
		var navItem = jQuery(this);
		var help = navItem.find('ul');
		
		help.css('display', 'block');
		help.css('opacity', 0);
		
		navItem.data('help', help);
		navItem.hover(
			// Mouse over
			function() {
				jQuery(this).data('help').clearQueue().animate({opacity: 1}, 300);
				jQuery('#clock').clearQueue().animate({opacity: 0}, 300);
			},
			// Mouse out
			function() {
				jQuery(this).data('help').stop(true).animate({opacity: 0}, 300);
				jQuery('#clock').clearQueue().delay(500).animate({opacity: 1}, 300);
			}
		);
	});
}


/* Random header class *******************************************************/

function initRandomHeader() {
	var header = jQuery('.headerContainer').first();
	var id = header.attr('id') === undefined ? 'header-default' : header.attr('id');
	var num = Math.floor((Math.random() * 3) + 1);
	header.addClass(id + '-' + num);
}


/* Collapsable groups ********************************************************/

function initCollapsableGroups() {
	jQuery('.collapsableGroup').each(function() {
		var header = jQuery(this).find('.groupHeader');
		var content = jQuery(this).find('.groupContent');
		
		// Create and inject the arrows
		var arrowLeft = jQuery('<img class="arrow" src="' + static_dir + 'img/arrow_down.gif" />');
		var arrowRight = arrowLeft.clone();
		var arrows = new Array(arrowLeft, arrowRight);
		header.prepend(arrowLeft);
		header.append(arrowRight);
		header.css('cursor', 'pointer');
		
		// Header click event
		header.click(function(e) {
			content.slideToggle(300, function() {
				var src = (jQuery(this).css('display') == 'none') ? static_dir + 'img/arrow_down.gif' : static_dir + 'img/arrow_up.gif';
				jQuery(arrows).each(function() { this.attr('src', src)});
			});
		});
		
		content.hide();
	});
}


/* Tabs **********************************************************************/

function initTabs() {
	jQuery('.tabContainer').each(function() {
		var container = jQuery(this);
		var contents = container.find('.tabContent');
		var tabs = container.find('.tabList');
		var buttons = tabs.find('li a');
		var active = tabs.find('li a[href="' + window.location.hash + '"]');
		if (active.length == 0) active = jQuery(buttons[0]);
		
		// Display the tabs (originally hidden by CSS)
		tabs.show();
		
		// Rewrite tab IDs to prevent scroll jump when switching tabs
		contents.each(function() {
			jQuery(this).attr('id', 'tab_' + this.id);
		});
		
		// Bind the click event on each button
		buttons.click(function(e) {
			e.preventDefault();
			var button = jQuery(this);
			var target = this.hash.replace('#', '#tab_');
			contents.filter(target).fadeIn();
			contents.not(target).hide();
			buttons.removeClass('active');
			button.addClass('active');
		});
		
		// Trigger a fake click on the active tab
		active.trigger('click');
	});
}


/* Links that should open in a new window ************************************/

function initNewWinLinks() {
	jQuery('#phpbb .postbody .content a').each(function() {
		jQuery(this).attr('target', '_blank');
	});
}


/* Global announcement, such as planned maintenance **************************/

function initAnnouncement() {
	//var message = 'The JEDI web server will be under maintenance today. <a href="https://www.jediholo.net/maintenance/">Click here for more information</a>';
	//var message = 'The JEDI web server\'s scheduled maintenance is now over. <a href="https://www.jediholo.net/maintenance/">Click here for more information</a>';
	var message = null;
	var status = 'warning';
	if (message) {
		var announcement = jQuery('<div class="global-announcement global-announcement-' + status + '">' + message + '</div>');
		jQuery('#contentContainer #content #contentHeader').after(announcement);
	}
}


/* DOMReady event ************************************************************/

jQuery(document).ready(function() {
	initMainNav();
	initClock();
	initMenu();
	initRandomHeader();
	initCollapsableGroups();
	initTabs();
	initNewWinLinks();
	initAnnouncement();
});
