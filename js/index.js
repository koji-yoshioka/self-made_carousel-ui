const slider = (function () {
  // アニメーションの速度
  const DURATION = 1000;
  // 画像要素数
  const $totalImgNum = $('.js-slide-img-area__img').length;
  // 1画像あたりの幅
  const $imgWidh = $('.js-slide-img-area__img').innerWidth();
  // 画像を格納するブロック要素
  const $imgContainerWidth = $('.js-slide-img-area');

  return {
    prev() {
      $('.js-slide-img-area:not(:animated)').prepend($('.slide-img-area__img:last-of-type'))   // 右端の要素を左端に移動させ、
        .css('margin-left', -1 * $('.slide-img-area__img').width())             // ネガティブマージンをつけておく(隠す為)
        .animate({ marginLeft: '0' }, DURATION);                                // 付与したネガティブマージンをアニメーションで0にすると、隠した要素が左から出てくる
    },
    // 単純にprevと反対の記述をさせればよいというわけではない
    next() {
      $('.js-slide-img-area:not(:animated)').animate({ marginLeft: -1 * $('.slide-img-area__img').width() }, DURATION, function () {
        // 左端の画像要素を右端へ移動させる
        $('.js-slide-img-area').append($('.slide-img-area__img:first-of-type'));
        $('.js-slide-img-area').css('margin-left', '0');
      });
    },
    init() {
      $imgContainerWidth.attr('style', 'width:' + $totalImgNum * $imgWidh + 'px');
      const that = this;
      // アイコンにイベントをバインド
      $('.js-nav-prev').on('click', function () {
        that.prev();
      });
      $('.js-nav-next').on('click', function () {
        that.next();
      });
    }
  }
})();

slider.init();
