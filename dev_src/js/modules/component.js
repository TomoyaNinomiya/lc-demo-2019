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

    $('.js-openModal').on('click', function() {
      $('#' + $(this).attr('aria-controls')).addClass('is-active')
      $('#' + $(this).attr('aria-controls')).find('.l-modal__body').css({
        top: ($window.scrollTop() + 60) + 'px'
      });
    })
    $('.js-closeModal').on('click', () => {
      $('.l-modal').removeClass('is-active')
    })

    if ($('.mainvisual').length) {
      $('.mainvisual').slick({
        infinite: false,
        arrows: false,
        dots: true
      });
    }

    if ($('.productImages__main').length) {
      const $productImages__thumbnails__list = $('.productImages__thumbnails__list')
      const $productImages__thumbnails__items = $('.productImages__thumbnails__item')
      $productImages__thumbnails__items.eq(0).addClass('is-current')

      $('.productImages__main').slick({
        infinite: false
      }).on('beforeChange', (e, slick, currentSlide, nextSlide) => {
        $productImages__thumbnails__items.removeClass('is-current')
        $productImages__thumbnails__items.eq(nextSlide).addClass('is-current')
      });

      if ($('.productImages__thumbnails').length) {
        let prevTouchPosition = false;
        let prevStyleLeft = 0;
        $productImages__thumbnails__items
          .on(EVENT.TOUCH_START, e => {
            if (!prevTouchPosition) {
              e.preventDefault();
              prevTouchPosition = {}
              prevTouchPosition['left'] = e.originalEvent.pageX? e.originalEvent.pageX : e.originalEvent.changedTouches[0].pageX
              $productImages__thumbnails__list.css({
                'transition': 'none'
              })
              prevStyleLeft = Number(($productImages__thumbnails__list.css('left')).replace('px', ''))
            }
          })
          .on(EVENT.TOUCH_MOVE, e => {
            if (prevTouchPosition) {
              e.preventDefault();
              let currentPageX = e.originalEvent.pageX ? e.originalEvent.pageX : e.originalEvent.changedTouches[0].pageX
              $productImages__thumbnails__list.css({
                'left': (prevStyleLeft + currentPageX - prevTouchPosition.left) + 'px'
              })
            }
          })
          .on(EVENT.TOUCH_END, function (e) {
            if (prevTouchPosition) {
              e.preventDefault()
              let currentPageX = e.originalEvent.pageX ? e.originalEvent.pageX : e.originalEvent.changedTouches[0].pageX
              const distanceTouchMove = prevTouchPosition.left - currentPageX
              const maxTouchMove = ($productImages__thumbnails__items.outerWidth(true) * $productImages__thumbnails__items.length) - $('.productImages__thumbnails').outerWidth()
              if (distanceTouchMove - prevStyleLeft < 0 || maxTouchMove < 0) {
                $productImages__thumbnails__list.css({
                  'transition': '0.3s',
                  'left': '0'
                })
              } else if (distanceTouchMove - prevStyleLeft > maxTouchMove) {
                $productImages__thumbnails__list.css({
                  'transition': '0.3s',
                  'left': '-' + maxTouchMove + 'px'
                })
              }
              if (Math.abs(distanceTouchMove) === 0) {
                const index = $(this).data('index')
                $('.productImages__main').slick('slickGoTo', index);
              }
              prevTouchPosition = false
            }
          })
      }
    }

    const $form__items = $('.l-form__item')
    if ($form__items.length) {
      $form__items.each((index, form__item) => {
        const $form__item = $(form__item)
        const $label = $form__item.find('.l-form__label')
        const $input = $form__item.find('input, select, textarea')
        $label.filter(':has(.error)').addClass('is-errored')
        $input.on('focus', () => {
          $label.addClass('is-focused')
        }).on('blur', () => {
          $label.removeClass('is-focused')
        })
      })
    }

    if ($('.l-tab').length) {
      $('.l-tab').each(function () {
        const $wrapper = $(this)
        const $tab = $wrapper.find('.l-tab__tab')
        const $tabPanel = $wrapper.find('.l-tab__panel')
        $tab.on('click', function () {
          const $currentTab = $(this)
          $tab.removeClass('is-active')
          $tabPanel.removeClass('is-active')
          $currentTab.addClass('is-active')
          $('#' + $currentTab.attr('aria-controls')).addClass('is-active')
        })
      })
    }
    
    
  })

}