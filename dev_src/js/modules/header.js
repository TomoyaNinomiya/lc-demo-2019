export default () => {

  /**
   * タッチイベントの振り分け
   * @type {Object}
   */
  const EVENT = {}
  if ('ontouchstart' in window) {
    EVENT.TOUCH_START = 'touchstart'
    EVENT.TOUCH_MOVE = 'touchmove'
    EVENT.TOUCH_END = 'touchend'
  } else {
    EVENT.TOUCH_START = 'mousedown'
    EVENT.TOUCH_MOVE = 'mousemove'
    EVENT.TOUCH_END = 'mouseup'
  }
  
  window.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementsByClassName('l-header')[0];

    let prevTouchPosition = false;;
    let prevScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let isRunning = true;

    window.addEventListener(EVENT.TOUCH_START, e => {
      prevTouchPosition = {};
      prevTouchPosition['top'] = e.pageY ? e.pageY : e.changedTouches[0].pageY;
    });
    window.addEventListener(EVENT.TOUCH_MOVE, e => {
      if (prevTouchPosition) {
        let currentPageY = e.pageY ? e.pageY : e.changedTouches[0].pageY;
        if ('top' in prevTouchPosition) {
          if (prevTouchPosition.top - currentPageY > 0) {
            document.body.classList.add('is-scrollUp');
          } else if (prevTouchPosition.top - currentPageY < 0) {
            document.body.classList.remove('is-scrollUp');
          }
        }
      }
    });
    window.addEventListener(EVENT.TOUCH_END, e => {
      prevTouchPosition = false;
    });
    window.addEventListener('scroll', () => {
      if (isRunning) {
        isRunning = false;
        requestAnimationFrame(function () {
          isRunning = true;
          const winScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          onScroll (winScrollTop);
          prevScrollTop = winScrollTop;
        })
      }
    });

    onScroll(document.documentElement.scrollTop || document.body.scrollTop)
    function onScroll (winScrollTop) {
      if (winScrollTop > 0) {
        if (winScrollTop - prevScrollTop > 0) {
          document.body.classList.add('is-scrollUp');
        } else if (winScrollTop - prevScrollTop < 0) {
          document.body.classList.remove('is-scrollUp');
        }
        if (winScrollTop >= 300) {
          document.body.classList.remove('is-pageTopHide');
        } else {
          document.body.classList.add('is-pageTopHide');
        }
      } else {
        document.body.classList.remove('is-scrollUp');
        document.body.classList.add('is-pageTopHide');
      }
      if (header.classList.contains('l-header--top')) {
        if (winScrollTop > header.offsetHeight + window.innerHeight - 120) {
          document.body.classList.add('is-headerFixed');
        } else {
          document.body.classList.remove('is-headerFixed');
        }
      } else {
        if (winScrollTop > window.innerHeight) {
          document.body.classList.add('is-headerFixed');
        } else {
          document.body.classList.remove('is-headerFixed');
        }
      }
    }

    const toggleMenuTriggers = document.getElementsByClassName('js-toggleMenu');
    toggleMenuTriggers.forEach(toggleMenuTrigger => {
      toggleMenuTrigger.addEventListener('click', () => {
        if (document.body.classList.contains('is-menuActive')) {
          document.body.classList.remove('is-menuActive');
        } else {
          document.body.classList.add('is-menuActive');
        }
      });
    });
    const closeMenuTriggers = document.getElementsByClassName('js-closeMenu');
    closeMenuTriggers.forEach(closeMenuTrigger => {
      closeMenuTrigger.addEventListener('click', () => {
        document.body.classList.remove('is-menuActive');
      });
    });

  });



}