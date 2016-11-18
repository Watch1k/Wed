/* Common JS */
$(document).ready(function () {

	//for IE9
	svg4everybody();

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