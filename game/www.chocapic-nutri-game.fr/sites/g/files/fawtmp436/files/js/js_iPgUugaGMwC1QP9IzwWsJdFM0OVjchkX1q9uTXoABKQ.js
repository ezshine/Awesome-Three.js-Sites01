/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, once) {
  var deprecatedMessageSuffix = "is deprecated in Drupal 9.3.0 and will be removed in Drupal 10.0.0. Use the core/once library instead. See https://www.drupal.org/node/3158256";
  var originalJQOnce = $.fn.once;
  var originalJQRemoveOnce = $.fn.removeOnce;

  $.fn.once = function jQueryOnce(id) {
    Drupal.deprecationError({
      message: "jQuery.once() ".concat(deprecatedMessageSuffix)
    });
    return originalJQOnce.apply(this, [id]);
  };

  $.fn.removeOnce = function jQueryRemoveOnce(id) {
    Drupal.deprecationError({
      message: "jQuery.removeOnce() ".concat(deprecatedMessageSuffix)
    });
    return originalJQRemoveOnce.apply(this, [id]);
  };

  var drupalOnce = once;

  function augmentedOnce(id, selector, context) {
    originalJQOnce.apply($(selector, context), [id]);
    return drupalOnce(id, selector, context);
  }

  function remove(id, selector, context) {
    originalJQRemoveOnce.apply($(selector, context), [id]);
    return drupalOnce.remove(id, selector, context);
  }

  window.once = Object.assign(augmentedOnce, drupalOnce, {
    remove: remove
  });
})(jQuery, once);;
window.mrm = {
  config: {
    breakpoints: {
      XS: 'xs',
      SM: 'sm',
      MD: 'md',
      LG: 'lg',
      XL: 'xl'
    },
    externalLinkWhitelist: ['localhost'],
    linkDisclaimer: false,
    lightboxCloseText: 'Close',
    cpw_fusepump_data: true,
    localStorage:{
      contrast: 'cpw_wcagContrast',
      pinkRibbonPledge: 'cpw_pinkRibbonCampaignPledge'
    }
  },
  modules: {}
};

/**
 * @see http://shauninman.com/tmp/retina/
 */
// if ((window.devicePixelRatio === undefined ? 1 : window.devicePixelRatio) > 1){
//     document.cookie = 'HTTP_IS_RETINA=1;path=/';
// }

document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/, '');

// enable CSS active pseudo styles in Mobile Safari
document.addEventListener("touchstart", function() {},false);
;
/**
 * @file
 * Contains JS function
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.breakpointsHelper = {
    setOnChangeCallback: function (callback) {
      this.onChangeCallback = callback;
    },

    setBreakpointList: function (breakPointList) {

      if (Array.isArray(breakPointList)) {
        this.breakPointList = breakPointList;

      } else {
        this.breakPointList = Object.keys(breakPointList).map(function (value) {
          return breakPointList[value];
        });
      }

      this.currentBreakPoint = this.getBreakpointSize();

      this.addResizeListener();
    },

    addResizeListener: function () {

      if (!this.isListenerAdded) {

        window.addEventListener('resize', this.onResize.bind(this));

        this.isListenerAdded = true;
      }
    },

    onResize: function () {

      var current = this.getBreakpointSize();

      if (this.breakPointList.indexOf(current) !== -1 && this.currentBreakPoint !== current) {

        this.currentBreakPoint = current;
        this.setOnChangeCallback(current);
      }
    },

    trigger: function () {
      this.setOnChangeCallback(this.currentBreakPoint);
    },

    getBreakpointSize: function () {

      var size = window.getComputedStyle(document.querySelector('body'), ':after')
        .getPropertyValue('content')
        .replace(/["']/g, '');

      return size;
    },

    isBreakpoint: function (breakpointId) {

      var isBreakpoint = false;
      var sizeIndex = this.breakPointList.indexOf(breakpointId);

      if (sizeIndex < 0) {
        throw 'mrm.util.isBreakpoint: Invalid breakpoint identifier "' + breakpointId + '"';
      }

      return this.currentBreakPoint === breakpointId;
    },

    isBreakpointOrLarger: function (breakpointId) {

      var sizeIndex = this.breakPointList.indexOf(breakpointId);
      var currentComparisonIndex;

      if (sizeIndex < 0) {
        throw 'isBreakpointOrLarger: Invalid breakpoint identifier "' + breakpointId + '"';
      }

      while (sizeIndex++ < this.breakPointList.length) {

        currentComparisonIndex = sizeIndex - 1;

        if (this.currentBreakPoint === this.breakPointList[currentComparisonIndex]) {
          return this.breakPointList[currentComparisonIndex];
        }
      }

      return false;
    },

    isBreakpointOrSmaller: function (breakpointId) {

      var sizeIndex = this.breakPointList.indexOf(breakpointId),
        currentComparisonIndex;

      if (sizeIndex < 0) {
        throw 'isBreakpointOrSmaller: Invalid breakpoint identifier "' + breakpointId + '"';
      }

      while (sizeIndex-- > -1) {

        currentComparisonIndex = sizeIndex + 1;

        if (this.currentBreakPoint === this.breakPointList[currentComparisonIndex]) {
          return this.breakPointList[currentComparisonIndex];
        }
      }

      return false;
    }
  }
})(jQuery, Drupal);
;
/**
 * @file
 * Contains JS function
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.commons = {
    /**
     * Returns object with top and bottom offset of the page.
     *
     * @returns {{top: *, bottom: *}}
     */
    getPageOffset: function () {
      //  for cross-browser compatibility (https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY)
      var supportPageOffset = window.pageYOffset !== undefined;
      var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

      var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

      return {
        top: y,
        bottom: y + window.innerHeight
      }
    },

    /**
     * Calculates the progress of an element scrolling through the viewport.
     * Returns 0 when the element is below the viewport and 1 when it is above the viewport.
     * Returns something between 0 and 1 while it is passing the viewport.
     *
     * @param $element
     * @returns {number}
     */
    getParallaxProgress: function ($element) {
      var windowBottom = this.getPageOffset().bottom,
        windowHeight = $(window).height(),
        elementTop = $element.offset().top,
        elementHeight = $element.outerHeight(),
        progress = (windowBottom - elementTop) / (windowHeight + elementHeight);

      if (progress > 1) {
        return 1;
      } else if (progress < 0) {
        return 0;
      } else {
        return progress;
      }
    },

    /**
     * Touch device detection (based on Modernizr)
     *
     * @returns {boolean}
     */
    isTouchDevice: function () {
      return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) ? true : false;
    },
  }
})(jQuery, Drupal);
;