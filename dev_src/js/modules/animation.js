export default () => {

  $(() => {
    const $window = $(window)

    /**
     * アニメーションのターゲット各要素のjQueryオブジェクトを配列で格納
     * @type {Array}
     */
    var $animationTargets = [];
    $(".js-animation").each(function() {
      $animationTargets.push($(this));
    });

    if($animationTargets.length) {
      let isInitAnimationExcecuted = false
      $window.on("pageshow scroll", function() {
        isInitAnimationExcecuted = true
        updateAnimation()
      })
      let timer = setTimeout(() => {
        clearTimeout(timer)
        if (!isInitAnimationExcecuted) {
          updateAnimation()
          isInitAnimationExcecuted = true
        }
      }, 1000)
    }

    /**
     * アニメーションの状態を更新する
     */
    function updateAnimation() {
      /**
       * 画面の縦スクロール位置
       * @type {Number}
       */
      var windowScrollTop = $window.scrollTop();
      /**
       * 画面の高さ
       * @type {Number}
       */
      var windowHeight = $window.height();
      var applyPosition = $window.width() > 768 ? 4 / 5 : 1;
      for(var i = 0; i < $animationTargets.length; i++) {
        if((windowScrollTop + windowHeight * applyPosition) > $animationTargets[i].offset().top) {
          $animationTargets[i].addClass("is-animated");
        }
      }
    }

    /**
     * スムーススクロール実装
     */
    $('a[href*="#"].js-scroll, area[href*="#"].js-scroll').on('click', function (e) {
      e.preventDefault();
      window.smoothScroll($(this).prop('href'))
    })

    /**
     * ハッシュリンクの位置を調整
     */
    const hashPosFix = () => {
      if (location.hash) {
        window.smoothScroll(location.href, false, 0)
      }
    }
    hashPosFix()
    $window.on('hashchange', () => {
      hashPosFix()
    })

  })

}