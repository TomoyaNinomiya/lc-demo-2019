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
  
  $(() => {

    const $window = $(window)
    const $body = $('body')
    const $header = $('.l-header')

    let prevTouchPosition = false;
    let prevScrollTop = $window.scrollTop();
    let isRunning = true

    $window
      .on(EVENT.TOUCH_START, e => {
        prevTouchPosition = {}
        prevTouchPosition['top'] = e.originalEvent.pageY ? e.originalEvent.pageY : e.originalEvent.changedTouches[0].pageY
      })
      .on(EVENT.TOUCH_MOVE, e => {
        if (prevTouchPosition) {
          let currentPageY = e.originalEvent.pageY ? e.originalEvent.pageY : e.originalEvent.changedTouches[0].pageY
          if ('top' in prevTouchPosition) {
            if (prevTouchPosition.top - currentPageY >= 0) {
              $body.addClass('is-scrollUp')
            } else {
              $body.removeClass('is-scrollUp')
            }
          }
        }
      })
      .on(EVENT.TOUCH_END, e => {
        prevTouchPosition = false;
      })
      .on('scroll', () => {
        if (isRunning) {
          isRunning = false
          requestAnimationFrame(function () {
            isRunning = true
            const winScrollTop = $window.scrollTop()
            onScroll (winScrollTop)
            prevScrollTop = winScrollTop;
          })
        }
      })

    onScroll($window.scrollTop())
    function onScroll (winScrollTop) {
      if (winScrollTop > 0) {
        if (winScrollTop - prevScrollTop >= 0) {
          $body.addClass('is-scrollUp')
        } else {
          $body.removeClass('is-scrollUp')
        }
        if (winScrollTop >= 300) {
          $body.removeClass('is-pageTopHide')
        } else {
          $body.addClass('is-pageTopHide')
        }
      } else {
        $body.removeClass('is-scrollUp')
        $body.addClass('is-pageTopHide')
      }
      if ($header.hasClass('l-header--top')) {
        if (winScrollTop > $header.outerHeight() + $window.height() - 120) {
          $body.addClass('is-headerFixed')
        } else {
          $body.removeClass('is-headerFixed')
        }
      } else {
        if (winScrollTop > $header.outerHeight()) {
          $body.addClass('is-headerFixed')
        } else {
          $body.removeClass('is-headerFixed')
        }
      }
    }

    $('.js-toggleMenu').on('click', () => {
      $body.toggleClass('is-menuActive')
    })
    $('.js-closeMenu').on('click', () => {
      $body.removeClass('is-menuActive')
    })

  })



}