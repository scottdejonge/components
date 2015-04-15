// Browserfy Requires (npm modules)
var $ = require('jquery');
global.jQuery = require('jquery');

// Lib includes
var tab = require('tab');
var modal = require('modal');
var ajaxForm = require('ajaxForm');


/*
 * Initialisation
 */

initialiseMenu();
initialiseDonateFormAmounts(document);
initialiseShareLinks();
initialiseSelectPerson();

// Re-initialise on ajax.replace
$(document).on('ajax.replace', function(event) {
	initialiseDonateFormAmounts(event.target);
});


/*
 * Toggle
 */

function initialiseMenu() {
	var $toggle = $('[data-menu]');
	var $sidebar = $('[data-sidebar]');
	var $content = $('[data-content]');
	
	// Toggle Mobile Navigaiton Menun on Toggle Click/Tap
	$toggle.on('click', function(event) {

		if ($(event.target).is('[data-menu]') || $(event.target).is('[data-menu] .bar')) {
			var open = !$sidebar.is('.open');

			event.preventDefault();

			$(this).toggleClass('open');
			$sidebar.toggleClass('open', open);
			$content.toggleClass('open');
			$('body').toggleClass('open');
		}
	});

	$content.on('click', function(event) {

		if ($(event.target).is('[data-menu]') || $(event.target).is('[data-menu] .bar')) {
			return;
		}

		if ($sidebar.is('.open')) {

			event.preventDefault();
			$toggle.removeClass('open');
			$sidebar.removeClass('open');
			$content.removeClass('open');
			$('body').removeClass('open');
		}
	});
}


/*
 * Donate Form Toggles
 */

function initialiseDonateFormAmounts(container) {
	var $donateForm = $(container).is('[data-donation-form]') ? $(container) : $('[data-donation-form]', container);
	var $radioControls = $donateForm.find('input[type="radio"]');
	var $other = $donateForm.find('[data-donation-other]');

	$radioControls.each(function() {
		var $this = $(this);

		$this.change(function(event) {
			
			if ($this.val() == 'other') {
				$other.removeClass('hide');
				if (!event.isTrigger) $other.focus();
			} else {
				$other.addClass('hide');
			}
		});
	});
	
	$radioControls.filter(':checked').trigger('change');
}


/**
 * Select Person
 */

function initialiseSelectPerson() {
	$(document).on('click', '[data-select-person]', function(event) {
		var personId = $(event.target).data('select-person');
		$('[data-donation-form] #DonationPersonId').val(personId);
	});
}


/**
 * Button Scroll
 */

function initialiseSelectPerson() {

	$('[data-button-scroll]').on('click', function(event) {
		event.preventDefault();

		$('html, body').animate({
			scrollTop: $('[data-team]').offset().top
		}, 600);
	});
}


/*
 * Social Links
 */

function initialiseShareLinks() {
	
	$('[data-social-link]').on('click', function(event) {
		var url = $(this).attr('href');
		
		event.preventDefault();
		shareWindowOpen(url, 500, 300);
	});
}

function shareWindowOpen(url, width, height) {
	var left = (screen.width / 2) - (width / 2);
	var top = (screen.height / 2) - (height / 2);
	
	window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=' + width + ',height=' + height + ',top=' + top + ',left=' + left);
}

