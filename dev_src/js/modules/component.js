export default () => {

  $(() => {
    const $window = $(window)

    $('.js-openModal').on('click', function() {
      $('#' + $(this).attr('aria-controls')).addClass('is-active')
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
    
  })

}