var $ = require('jquery');

function getPageCount() {
	return $('section').length;
}

function getPageHeight() {
	return $('section:first').height();
}

function getCurrentPage() {
	var pageHeight = getPageHeight();
	var scrollPosition = $(document).scrollTop();
	var page = Math.round(scrollPosition / pageHeight);
	return page;
}

function nextPage() {
	var page = Math.min(getCurrentPage() + 1, getPageCount() - 1);
	navigate(page);
}

function previousPage() {
	var page = Math.max(getCurrentPage() - 1, 0);
	navigate(page);
}

function navigate(page) {
	$(document).scrollTop(page * getPageHeight());
}

function activateKeyboardNavigation() {
	$('body').on('keydown', function(event) {
		if (event.isDefaultPrevented()) return;
		switch (event.keyCode) {
			case 40: // DOWN
			case 32: // SPACEBAR
				event.preventDefault();
				nextPage();
				break;
			case 38: // UP
				event.preventDefault();
				previousPage();
				break;
		}
	});
}

module.exports = {
	getPageCount: getPageCount,
	getPageHeight: getPageHeight,
	getCurrentPage: getCurrentPage,
	nextPage: nextPage,
	previousPage: previousPage,
	navigate: navigate,
	activateKeyboardNavigation: activateKeyboardNavigation
};