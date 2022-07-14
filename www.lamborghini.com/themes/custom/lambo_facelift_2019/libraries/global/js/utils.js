"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var App=App||{},developmentHost=["lambo.local","lambo.facelift","lamborghini.staging.lamborghini.nohup.it","com.lamborghini.localhost"];!function(s){App={mobileDetect:new MobileDetect(window.navigator.userAgent),DEBUG:function(){var n=!1;return developmentHost.forEach(function(t,e){n=n||-1<window.location.host.indexOf(t)}),n},triggerEvent:function(t,e,n){var o=1<arguments.length&&void 0!==e?e:[],i=2<arguments.length&&void 0!==n?n:window;if(App.DEBUG()){var a="[event] "+t;i!=window&&(i.id||i.className)?(a+=" "+i.tagName,a+=""!=i.id?" (#"+i.id+")":" ("+i.className+")"):a+=" (window)",console.log(a)}s(i).trigger(t,o)},debounce:function(o,i,a){var r;return function(){var t=this,e=arguments,n=a&&!r;clearTimeout(r),r=setTimeout(function(){r=null,a||o.apply(t,e)},i),n&&o.apply(t,e)}},throttle:function(n,o){var i,a;return function(){var t=this,e=arguments;a?(clearTimeout(i),i=setTimeout(function(){Date.now()-a>=o&&(n.apply(t,e),a=Date.now())},o-(Date.now()-a))):(n.apply(t,e),a=Date.now())}},clipCoverInit:function(){s(".cover-clip").each(function(t,e){var n=s(e),u=1/n.data("clip-w"),d=1/n.data("clip-h");n.find("clipPath").children().each(function(t,e){var n=s(e);if("rect"==e.nodeName){var o=s(e).attr("x"),i=s(e).attr("y"),a=s(e).attr("width"),r=s(e).attr("height");s(e).attr("x",o*u),s(e).attr("y",i*d),s(e).attr("width",a*u),s(e).attr("height",r*d)}if("polygon"==e.nodeName){var c=n.attr("points").split(" "),l="";for(t=0;t<c.length;t+=2)l+=c[t].replace(/,/i,"")*u+" ",l+=c[t+1].replace(/,/i,"")*d+" ";n.attr("points",l.trim())}})})},detectSwipe:function(t){var n=document.querySelector(t),o=null;function i(t){return t.changedTouches?t.changedTouches[0]:t}function e(t){o=i(t).clientX}function a(t){if(o||0===o){var e=i(t).clientX-o;if(Math.abs(e)<30)return;e<0?App.triggerEvent("global::swipeLeft",{delta:e},n):App.triggerEvent("global::swipeRight",{delta:e},n),o=null}}n.classList.add("detect-swipe"),n.addEventListener("mousedown",e,!1),n.addEventListener("touchstart",e,!1),n.addEventListener("touchmove",function(t){t.preventDefault()},!1),n.addEventListener("mouseup",a,!1),n.addEventListener("touchend",a,!1)},isIE:function(){var t=window.navigator.userAgent;return 0<t.indexOf("Trident/")||0<t.indexOf("MSIE ")?"ie":0<t.indexOf("Edge/")&&"edge"},isSafari:function(){return-1==window.navigator.userAgent.toLowerCase().indexOf("chrome")&&-1!=window.navigator.userAgent.toLowerCase().indexOf("safari")&&-1!=window.navigator.userAgent.toLowerCase().indexOf("macintosh")},loadJS:function(t,e,n,o){var i=document.createElement("script");n&&(i.id=n),i.src=t,i.onload=e,i.onreadystatechange=e,(o=o||document.body).appendChild(i)},log:function(t,e){App.DEBUG()&&(e?console.log("[log] "+t,e):console.log("[log] ",t))}},"object"===("undefined"==typeof Languages?"undefined":_typeof(Languages))&&(Languages.getCurrentLanguageName=function(){var t=Languages.all.filter(function(t){return!0===t.active});return 0===t.length?"":(t=t[0]).title.charAt(0).toUpperCase()+t.title.slice(1)})}(jQuery),String.prototype.trimRight=function(t){return void 0===t&&(t="s"),this.replace(new RegExp("["+t+"]+$"),"")};