"use strict";!function(i,e){var o=App.isIE(),n=document.querySelector("html");"ie"==o&&n.classList.add("ie"),"edge"==o&&n.classList.add("edge"),App.triggerEvent("::mainScriptLoaded"),i(window).on("global::debouncedScroll",function(e,o){l(o),window.smooth&&window.smooth.resize()}),i(window).on("::appReady",function(){i(window).on("resize",App.debounce(function(){App.triggerEvent("global::debouncedResize")},250)),i(window).on("scroll",App.throttle(function(){App.triggerEvent("global::debouncedScroll",[d>i(window).scrollTop()?"up":"down"])},250)),s(),l(),a(),i('[data-hide="collapse"]').click(function(e){var o=i(e.currentTarget).closest(".collapse");o.collapse&&o.collapse("hide")})});var t=[];window.addInViewportElementsToCheck=function(e){t.push(e)};var r=i("footer");function l(n){t.forEach(function(e){var o=i(e);o.lenght<1||(o.inViewport()?App.triggerEvent("in-viewport",[n],o[0]):App.triggerEvent("out-viewport",[n],o[0]))})}0<r.length&&window.addInViewportElementsToCheck(r[0]),i(n).find("section").each(function(e,o){window.addInViewportElementsToCheck(o)});var a=function(){var e=i(".emissions-banner.fixed-bottom"),o=0<e.length?e.outerHeight():0,n=.01*(window.innerHeight-o),t=.01*window.innerHeight;document.documentElement.style.setProperty("--vh",n+"px"),document.documentElement.style.setProperty("--vh-no-ce",t+"px")},d=i(window).scrollTop();var s=function(){i(window).on("init.bs.breakpoint",function(e){var o=e.breakpoint;c(o)}),i(window).on("new.bs.breakpoint",function(e){a();var o=e.breakpoint,n=i("html").attr("class"),t=c(o);n!=i("html").attr("class")&&App.triggerEvent("global::layoutChanged",{layout:t})}),e.init()},c=function(e){return"small"==e||"xSmall"==e?(i("html").addClass("layout-mobile").removeClass("layout-desktop"),"mobile"):(i("html").removeClass("layout-mobile").addClass("layout-desktop"),"desktop")};i("section.hero-banner").length<1&&i("#breadcrumbs").removeClass("hidden")}(jQuery,bsBreakpoints);