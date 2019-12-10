/**
 *  common.js
 */

/**
 * global; ユーザーエージェント
 * @type {String}
 */
window.userAgent = window.navigator.userAgent.toLowerCase();
/**
 * global; APPバージョン
 * @type {String}
 */
window.appVersion = window.navigator.appVersion.toLowerCase();

/**
 * Easing Functions
 */
const Ease = {
  easeInOut: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1
}

/**
 * Smooth Scroll
 * @param {String}  href     target hash or URL (example: #hoge, https://example.com#hoge)
 * @param {Boolean} isForce  forced execution regardless of the href type
 * @param {Number}  duration animation duration (ms); default: 500ms
 */
window.smoothScroll = (href, isForce, duration) => {

  duration = typeof duration !== 'undefined' ? duration : 800;
  const targetUrl = href.split('#')[0];
  const currentUrl = String(location.href).replace(location.hash, '');

  // Execute smooth scroll if href URL and current page URL are equal.
  if (targetUrl == currentUrl || isForce) {
    const hash = href.split('#')[1];
    const currentPostion = document.documentElement.scrollTop || document.body.scrollTop;
    const targetElement = document.getElementById(hash);

    if (targetElement) {
      const targetPosition = window.pageYOffset + targetElement.getBoundingClientRect().top - (window.innerWidth <= 768 ? 70 : 112);
      const startTime = performance.now();
      const loop = nowTime => {

        const time = nowTime - startTime;
        const normalizedTime = time / duration;

        if (normalizedTime < 1) {
          window.scrollTo(0, currentPostion + ((targetPosition - currentPostion) * Ease.easeInOut(normalizedTime)));
          requestAnimationFrame(loop);
        } else {
          window.scrollTo(0, targetPosition);
        }

      }
      requestAnimationFrame(loop);
    }

  } else {
    location.href = href;
  }

}

import header from './modules/header'
import checkDevice from './modules/checkDevice'
import animation from './modules/animation'
import component from './modules/component'

document.createElement('main');

header();
checkDevice();
animation();

(($) => {
  component()

})(jQuery);