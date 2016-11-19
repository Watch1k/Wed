/* Common JS */
$(document).ready(function () {

	//for IE9
	svg4everybody();
	initValidator();
	initPhoneMask();

	google.maps.event.addDomListener(window, 'load', initMap());

	function initMap() {
		var myLatLng = {lat: 34.0627069, lng: -118.3539114};
		var mapProp = {
			center: myLatLng,
			zoom: 12,
			scrollwheel: false,
			draggable: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("map"), mapProp);
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			title: 'Perfect Wedding'
		});
	}

	(function () {
		var form = $('.js-form'),
			initModalBtn = $('.js-init-modal');

		form.on('submit', function () {
			var href = initModalBtn.data('href');
			$.get('modals/' + href + '.html', function (data) {
				$('body').append(data);
				$('.js-modal').fadeIn();
				initModalClose();
			});
			return false;
		});
	})();

	function initModalClose() {
		var modal = $('.js-modal'),
			closeBtn = $('.js-modal-close');

		closeBtn.on('click', function () {
			$(this).closest(modal).fadeOut(function () {
				$('body').removeClass('is-locked');
				$(this).remove();
				$('form').trigger('reset');
			});
		});

		modal.on('click', function (e) {
			if (!$(this).is(e.target)) {
				//code here
			} else {
				$(this).fadeOut(function () {
					$('body').removeClass('is-locked');
					$(this).remove();
				});
			}
		});
	}

	function initValidator(){
		$.validate({
			validateOnBlur : true,
			showHelpOnFocus : false,
			addSuggestions : false,
			scrollToTopOnError: false,
			borderColorOnError : '#FF0000'
		});
	}

	function initPhoneMask(){
		var phoneInput = $(".js-phone-mask");

		phoneInput.mask("+9(999)999-99-99");

		//SET CURSOR POSITION
		$.fn.setCursorPosition = function(pos) {
			this.each(function(index, elem) {
				if (elem.setSelectionRange) {
					elem.setSelectionRange(pos, pos);
				} else if (elem.createTextRange) {
					var range = elem.createTextRange();
					range.collapse(true);
					range.moveEnd('character', pos);
					range.moveStart('character', pos);
					range.select();
				}
			});
			return this;
		};

		phoneInput.on('focus', function(){
			var _this = $(this);

			setTimeout(function() {
				_this.setCursorPosition(1);
			},100);
		});
	}

	// Clear placeholder
	(function () {
		var el = $('input, textarea');
		el.focus(function () {
			$(this).data('placeholder', $(this).attr('placeholder'));
			$(this).attr('placeholder', '');
		});
		el.blur(function () {
			$(this).attr('placeholder', $(this).data('placeholder'));
		});
	})();

	(function () {
		var slickSlider = $('.js-slick'),
			slickLength = slickSlider.children().length,
			ion = $('.js-ion'),
			wedSlider = $('.js-wed');

		slickSlider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			fade: true,
			arrows: false,
			dots: false
		});

		ion.ionRangeSlider({
			min: 1,
			max: slickLength,
			from: 1,
			hide_min_max: true,
			hide_from_to: true,
			grid: false,
			onChange: function (data) {
				slickSlider.slick('slickGoTo', data.from - 1);
			}
		});

		ion = ion.data('ionRangeSlider');

		slickSlider.on('swipe', function (event, slick, direction) {
			ion.update({
				from: slickSlider.slick('slickCurrentSlide') + 1
			});
		});

		wedSlider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			prevArrow: '<button type="button" class="wed__prev slick-prev"><svg class="icon icon-arrow-left"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-left"></use></svg></button>',
			nextArrow: '<button type="button" class="wed__next slick-next"><svg class="icon icon-arrow-right"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-right"></use></svg></button>'
		});
	})();

});