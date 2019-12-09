export default () => {

  window.addEventListener('DOMContentLoaded', () => {

    /**
     * アニメーションのターゲット各要素のjQueryオブジェクトを配列で格納
     * @type {Array}
     */
    var animationTargets = document.getElementsByClassName('js-animation');

    if(animationTargets.length) {
      let isInitAnimationExcecuted = false;
      window.addEventListener('pageshow', () => {
        isInitAnimationExcecuted = true;
        updateAnimation();
      })
      window.addEventListener('scroll', function() {
        updateAnimation();
      });
      const timer = setTimeout(() => {
        clearTimeout(timer);
        if (!isInitAnimationExcecuted) {
          updateAnimation();
          isInitAnimationExcecuted = true;
        }
      }, 1000);
    }

    /**
     * アニメーションの状態を更新する
     */
    function updateAnimation() {
      var windowScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      var applyPosition = window.innerWidth > 768 ? 4 / 5 : 1;
      animationTargets.forEach(animationTarget => {
        if((windowScrollTop + window.innerHeight * applyPosition) > window.pageYOffset + animationTarget.getBoundingClientRect().top) {
          animationTarget.classList.add('is-animated');
        }
      });
    }

    /**
     * スムーススクロール実装
     */
    const smoothScrollTriggers = document.querySelectorAll('.js-scroll[href*="#"]');
    smoothScrollTriggers.forEach(smoothScrollTrigger => {
      smoothScrollTrigger.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        smoothScroll(smoothScrollTrigger.href);
      });
    });

    /**
     * ハッシュリンクの位置を調整
     */
    const hashPosFix = () => {
      if (location.hash) {
        smoothScroll(location.href, false, 0)
      }
    }
    hashPosFix()
    window.addEventListener('hashchange', () => {
      hashPosFix()
    });

  })

}