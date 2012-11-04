/**
 * ::JEDI:: Web Site
 * @file Main Javascript file, using the jQuery library.
 * @author Fabien Crespel
 */

var static_dir = document.location.protocol + '//static.jediholo.net/';
var theme_dir = '/wp-content/themes/jediholonet/';
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

function updateClock() {
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
	jQuery('#clock').text(fullTime);
	
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


/* Mini Trackers *************************************************************/

function initMiniTrackers() {
	jQuery('.widget_tracker').each(function() {
		var tracker = jQuery(this);
		var content = tracker.find('ul');
		var server = content.find('dl dd').text();
		
		// Create the Refresh link and spinner
		var refreshContainer = jQuery('<div class="refresh">');
		var refreshLink = jQuery('<a href="#">Refresh</a>');
		refreshLink.click(function(e) {
			e.preventDefault();
			jQuery.ajax({
			url: theme_dir + 'minitracker.php',
			type: 'POST',
			data: {server: server},
			dataType: 'html',
			beforeSend: function(jqXHR, settings) {
				refreshContainer.addClass('spinning');
			},
			success: function(data, textStatus, jqXHR) {
				content.html(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				content.html('<li>Error: ' + textStatus + '</li>');
			},
			complete: function(jqXHR, textStatus) {
				refreshContainer.removeClass('spinning');
			}
			});
		});
		refreshContainer.append(refreshLink);
		content.before(refreshContainer);
		
		// Trigger the first update
		refreshLink.trigger('click');
	});
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
	//var message = 'The JEDI web server will be under maintenance today. <a href="http://www.jediholo.net/maintenance/">Click here for more information</a>';
	//var message = 'The JEDI web server\'s scheduled maintenance is now over. <a href="http://www.jediholo.net/maintenance/">Click here for more information</a>';
	var message = null;
	var status = 'success';
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
	initMiniTrackers();
	initCollapsableGroups();
	initTabs();
	initNewWinLinks();
	initAnnouncement();
});
