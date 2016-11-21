/* Common JS */
$(document).ready(function () {

	//for IE9
	svg4everybody();
	initPhoneMask();
	initSubmit();
	initModals();

	google.maps.event.addDomListener(window, 'load', initMap());

	(function () {
		var tabs = $('.js-tabs-for');
		if (tabs.length) {
			$(window).resize(function () {
				tabs.css({height: 'auto'});
			});
			var tabsItem = tabs.children(),
				tabsButton = $('.js-tabs-nav').children(),
				currentHeight;

			currentHeight = tabsItem.outerHeight();
			tabsItem.next().hide();
			tabs.css({height: currentHeight});

			tabsButton.on('click', function () {
				var index = $(this).index(),
					tabsHeight = 0;
				tabsButton.removeClass('is-active');
				$(this).addClass('is-active');
				tabsItem.fadeOut('fast').promise().done(function () {
					tabsHeight = tabsItem.eq(index).outerHeight();
					tabs.css({height: tabsHeight});
					tabsItem.eq(index).fadeIn('fast');
				});
			});
		}
	})();

	function initMap() {
		var myLatLng = {lat: 53.355467, lng: 50.213700};
		var mapProp = {
			center: myLatLng,
			zoom: 15,
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

	function initSubmit() {
		var form = $('.js-form');
		form.unbind();
		initValidator();
		form.submit(function (e) {
			e.preventDefault();
			var _this = $(this),
				popup = $('.js-modal');
			$.ajax({
				type: "POST",
				url: "mail.php",
				data: _this.serialize()
			}).done(function () {
				if ($('.js-modal').length) {
					$('.js-modal').children().fadeOut(function () {
						$(this).remove();
						$.get('modals/modal_ty.html', function (data) {
							$('.js-modal').append(data);
							$('.js-modal').children().fadeIn();
							initModalClose();
						});
					});
				} else {
					$.get('modals/modal_ty.html', function (data) {
						$('body').append('<div class="modal js-modal">' + data + '</div>');
						$('body').addClass('is-locked');
						$('.js-modal').fadeIn();
						initModalClose();
					});
				}
			});
		});
	}

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
					$('form').trigger('reset');
				});
			}
		});
	}

	function initModals() {
		var modalBtn = $('.js-init-modal');
		modalBtn.on('click', function (e) {
			e.preventDefault();
			var _thisBtn = $(this),
				ref = _thisBtn.data('href');
			$('body').addClass('is-locked');
			$.get('modals/' + ref + '.html', function (data) {
				$('body').append(data);
				$('.js-modal').fadeIn();
				initSubmit();
				initPhoneMask();
				initModalClose();
			});
		});
	}

	function initValidator() {
		$.validate({
			validateOnBlur: true,
			showHelpOnFocus: false,
			addSuggestions: false,
			scrollToTopOnError: false,
			borderColorOnError: '#FF0000'
		});
	}

	function initPhoneMask() {
		var phoneInput = $(".js-phone-mask");

		phoneInput.mask("+9(999)999-99-99");

		//SET CURSOR POSITION
		$.fn.setCursorPosition = function (pos) {
			this.each(function (index, elem) {
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

		phoneInput.on('focus', function () {
			var _this = $(this);

			setTimeout(function () {
				_this.setCursorPosition(1);
			}, 100);
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
			dots: false,
			adaptiveHeight: true
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