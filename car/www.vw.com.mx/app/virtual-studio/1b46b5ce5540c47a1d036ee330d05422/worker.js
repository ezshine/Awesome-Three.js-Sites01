onmessage=function(e){if(!this.requestAnimationFrame)return console.warn("requestAnimationFrame() in web worker is unsupported"),void this.postMessage(-1);let s=!1,t=0;const i=()=>{t++,s||this.requestAnimationFrame(i)};this.requestAnimationFrame(i),this.setTimeout((()=>{t*=.2,this.postMessage(t),s=!0}),5e3)};