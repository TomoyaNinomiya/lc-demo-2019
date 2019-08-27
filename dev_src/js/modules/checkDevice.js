export default () => {

  const $w = $(window)

  const checkImg = () => {
    $('img').each(function () {
      const $img = $(this);
      if (this.naturalWidth / this.naturalHeight < $img.parent().outerWidth() / $img.parent().outerHeight()) {
        $img.addClass('is-portrait')
      } else {
        $img.removeClass('is-portrait')
      }
    })
  }

  const checkDevice = () => {
    $('body').append('<div class="windowSize" /><div class="deviseSize" />');
    $('.windowSize').css({
      'position': 'fixed',
      'left': '0',
      'bottom': '0',
      'z-index': '-1',
      'width': '100%'
    });
    $('.deviseSize').css({
      'position': 'fixed',
      'left': '0',
      'bottom': '0',
      'z-index': '-1',
      'width': '100vw'
    });
    if($('.windowSize').outerWidth() !== $('.deviseSize').outerWidth()) {
      $('body').addClass('has-scroll-bar')
    }
    if(window.userAgent.indexOf('iphone') > -1 || window.userAgent.indexOf('ipod') > -1) {
      $('.windowSize').css({
        'bottom': 'auto',
        'top': '0',
        'width': '0',
        'height': '100%'
      });
      $('.deviseSize').css({
        'bottom': 'auto',
        'top': '0',
        'width': '0',
        'height': '100vh'
      });
      if(Math.round($('.windowSize').outerHeight()) !== Math.round($('.deviseSize').outerHeight())) {
        $('body').addClass('is-not-fit-100vh')
      } else {
        $('body').removeClass('is-not-fit-100vh')
      }
    }
    $('.windowSize, .deviseSize').remove()

    checkImg()
  }

  $(() => {

    let isIe = false

    if (window.userAgent.indexOf('msie') != -1 || window.userAgent.indexOf('trident') != -1) {
      isIe = true
      $('body').addClass('is-IE')
      if (window.appVersion.indexOf("msie 9.") != -1) {
        $('body').addClass('is-IE9')
      }
    }
  
    if (window.userAgent.indexOf('iphone') != -1 || window.userAgent.indexOf('ipod') != -1) {
      $('body').addClass('is-ios')
    }

    var elm = document.createElement('div')
    window.deviceInfo = {
      css: {
        display: {
          contents: true,
          grid: true
        },
        position: {
          sticky: true
        }
      }
    }
    elm.style.display = isIe ? '-ms-grid' : 'grid'
    if (elm.style.display !== 'grid' && elm.style.display !== '-ms-grid') {
      $('body').addClass('no-css--dispGrid')
      deviceInfo.css.display.grid = false;
    }
    elm.style.display = 'contents'
    if (elm.style.display !== 'contents') {
      $('body').addClass('no-css--dispContents')
      deviceInfo.css.display.contents = false;
    }
    elm.style.position = 'sticky'
    if (elm.style.position !== 'sticky' && userAgent.indexOf('iphone') === -1 && userAgent.indexOf('ipad') === -1) {
      $('body').addClass('no-css--posSticky')
      deviceInfo.css.position.sticky = false;
    }
    elm = null;

    checkDevice()

    const $img = $('img')
    let isAllImgCompleted = false
    const confirmImgCompleted = () => {
      if (!isAllImgCompleted) {
        let countImgComplete = 0
        $img.each((index, img) => {
          if (img.complete) {
            $(img).parent().addClass('is-loaded hasImg')
            countImgComplete++
          }
        })
        if (countImgComplete === $img.length) {
          isAllImgCompleted = true
        } else {
          requestAnimationFrame(confirmImgCompleted)
        }
      }
    }

    requestAnimationFrame(confirmImgCompleted)

  })

  $w.on('pageshow', () => {
    checkDevice()
  })
  
  /**
   * @type {Boolean} - リサイズイベントに紐付いたイベントがが実行中かどうか
   */
  let isRunning = true
  /**
   * @type {Number} - 前のリサイズイベント時の window の横幅
   */
  let prevWndWidth = $w.width()
  $w.on('resize', e => {
    if (isRunning) {
      isRunning = false
      requestAnimationFrame(function () {
        isRunning = true
        if ($w.width() !== prevWndWidth) {
          prevWndWidth = $w.width()
          checkDevice()
        }
      })
    }
  })

}