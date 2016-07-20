/**
 * Enable thumbnail support for Swiper
 * @param swiper (pass swiper element)
 * @param settings (pass custom options)
 */
var swiperThumbs = function (swiper, settings) {

  /**
   * Default settings
   */
  var options = {
    element: 'swiper-thumbnails',
    activeClass: 'is-active'
  }

  /**
   * Merge user settings and default settings
   */
  $.extend(options, settings);

  /**
   * Helper vars
   */
  var element = $('.' + options.element);
  var startIndex = swiper.activeIndex;

  /**
   * Get real activeIndex
   * @returns {*}
   */
  var realIndex = function () {
    return swiper.slides.eq(swiper.activeIndex).attr('data-swiper-slide-index');
  }

  var app = {

    init: function () {
      app.bindUIevents();
    },

    bindUIevents: function () {
      /**
       * Bind click events to thumbs
       */
      element.children().each(function () {
        $(this).on('click', function () {
          var index = $(this).index();
          app.moveToSlide(index);
        })
      })

      /**
       * Update thumbs on slideChange
       */
      swiper.on('slideChangeStart', function (swiper) {
        app.updateActiveClasses(realIndex())
      });
    },

    moveToSlide: function (index) {
      swiper.slideTo(startIndex + index);
    },

    updateActiveClasses: function (index) {
      element.children().removeClass(options.activeClass);
      element.children().eq(index).addClass(options.activeClass);
    }
  }

  app.init();

};