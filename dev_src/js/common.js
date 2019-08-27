/**
 *  common.js
 */

/**
 * global; ユーザーエージェント
 * @type {String}
 */
window.userAgent = window.navigator.userAgent.toLowerCase()
/**
 * global; APPバージョン
 * @type {String}
 */
window.appVersion = window.navigator.appVersion.toLowerCase()

/**
 * global; ページスクロールの対象要素
 * @type {String}
 */
window.g_scrollBody = (userAgent.indexOf('msie') > -1 || userAgent.indexOf('trident') > -1 || userAgent.indexOf('firefox') > -1 ) ? 'html' : 'body'
/*　chrome61以上　*/
if (userAgent.indexOf('chrome') > -1 && userAgent.indexOf('edge') == -1) {
  let chromeVersion = window.appVersion.match(/chrome\/.* /)
  chromeVersion = chromeVersion[0].replace('chrome/', '').replace(' ', '')
  chromeVersion = Number(chromeVersion.split('.')[0])
  if (chromeVersion >= 61) {
    window.g_scrollBody = 'html'
  }
}

if (userAgent.indexOf('msie') > -1 || userAgent.indexOf('trident')) {
  window.isIE = true
}

/**
 * - テンプレートの {{キー}} にアイテムの値を置換
 * - テンプレートの {%if:キー%}{%endif%}で囲まれた箇所を
 *     値が true のときは表示、false のときは非表示
 * @param  {String} template アイテムのテンプレート
 * @param  {Object} item     アイテムのデータ
 * @return {String}          実際の値が入ったアイテムの文字列
 */
window.setItemValues = (template, item) => {
  for(let key in item) {
    template = template.replace(new RegExp("\\{\\{" + key + "\\}\\}", "g"), item[key])
    template = template.replace(
      new RegExp("\\{%if:" + key + "%\\}.+?\\{%endif%\\}", "g"),
      match => item[key] ? match.replace('\{%if:' + key + '%\}', '').replace('{%endif%}', '') : ''
    )
  }
  template = template.replace(new RegExp("\\{\\{.*?\\}\\}", "g"), "")
  return template
}

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
(() => {
  let lastTime = 0;
  const vendors = ['ms', 'moz', 'webkit', 'o'];
  for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame']
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                || window[vendors[x]+'CancelRequestAnimationFrame']
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = (callback, element) => {
      const currTime = new Date().getTime()
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = window.setTimeout(() => {
        callback(currTime + timeToCall)
      }, timeToCall)
      lastTime = currTime + timeToCall
      return id
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = id => {
      clearTimeout(id)
    }
})()

const $window = $(window)

/**
 * スムーススクロール
 * @param {String} href スムーススクロール対象のIDセレクタもしくはURL
 * @param {Boolean} isForce スムーススクロールを強制的に実行
 * @param {Number} duration スクロールアニメーションのスピード(単位: ms)
 */
window.smoothScroll = (href, isForce, duration) => {
  /**
   * スクロールアニメーションのスピード(単位: ms)
   * @type {Number}
   */
  let ANIMATION_DURATION = typeof duration !== 'undefined' ? duration : 800
  /**
   * 対象ページのURL
   * @type {String}
   */
  let hrefPageUrl = href.split('#')[0]
  /**
   * 現在表示しているページのURL
   * @type {String}
   */
  let currentUrl = location.href //現在のページの絶対パスを取得
  currentUrl = currentUrl.split('#')[0] //現在のページの絶対パスについて、#より前のURLを取得

  //#より前の絶対パスが、リンク先と現在のページで同じだったらスムーススクロールを実行
  if (hrefPageUrl == currentUrl || isForce){
    //リンク先の#からあとの値を取得
    href = href.split('#')
    href = href.pop()
    href = '#' + href

    //スムースクロールの実装
    /**
     * 対象要素の位置
     * @type {Number}
     */
    let position = $(href == '#' || href == '' ? 'html' : href).offset().top
    if ($window.width() <= 768) {
      position = position - 70
    } else {
      position = position - 112
    }
    if (href == '#top') {
      position = 0
    }
    $(g_scrollBody).animate({
        scrollTop: position
      }, ANIMATION_DURATION, 'swing', () => {
        // let state = { 'targetPageUrl': href }
        // history.pushState(state, '', href)
    });
  } else {
    location.href = href
  }

}

import header from './modules/header'
import checkDevice from './modules/checkDevice'
import animation from './modules/animation'
import component from './modules/component'

(($) => {

  document.createElement('main')

  header()
  checkDevice()
  animation()
  component()

})(jQuery);