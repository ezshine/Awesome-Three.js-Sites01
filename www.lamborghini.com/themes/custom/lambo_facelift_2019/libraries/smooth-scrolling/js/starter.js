"use strict";!function(a,o,s){var n=a("[data-scrollbar]"),t=0<n.length;s.isSafari()&&(t=!1),"ie"==s.isIE()&&(t=!1);function i(o){o=o||a(window).scrollTop(),.5<Math.abs(e-Math.round(10*o)/10)&&(s.triggerEvent("smoothScrolling::scrolling",[o,o-e]),e=Math.round(10*o)/10)}var e=0;t?(n.addClass("vs-section"),window.smooth=new o({preload:!1,native:!0,section:n[0],ease:0,callback:i,vs:"limitInertia"}),window.smooth.init(),n.data("scrollbar","true")):a(window).scroll(function(o){i(a(window).scrollTop())}),a(window).on("load",function(){a('a[href^="#"]').click(function(o){var s=a(this).attr("href");if("#"==s)return!1;if(!(0==i.indexOf("#/"))){var n=a(s);if(0<n.length){var t=!a(this).hasClass("with-header");l(n,t)}}});var i=window.location.hash;if(i&&"#"!=i){if(0==i.indexOf("#/"))return;var o=a(i);0<o.length&&setTimeout(function(){l(o)},500)}a(".collapse").on("shown.bs.collapse hidden.bs.collapse",function(){window.smooth&&window.smooth.resize()}),a(window).on("wcag-change",function(){window.smooth&&window.smooth.resize()})});var l=function(o,s){var n=!(1<arguments.length&&void 0!==s)||s;o.hasClass("collapse")&&!o.hasClass("show")?a("html").hasClass("layout-desktop")?(o.one("show.bs.collapse",function(){r(o.offset().top,n)}),o.collapse("show")):r(o.closest("section").offset().top,n):r(o.offset().top,n)},r=function(o,s){var n=o-(!(1<arguments.length&&void 0!==s)||s?a("header").outerHeight():0);window.smooth?window.smooth.scrollTo(n):a(window).scrollTop(n)}}(jQuery,Smooth,App);