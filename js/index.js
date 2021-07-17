$(function () {
  // スライド画像に対してdata-img-id属性を付与
  $('.js-slide-img-area__img').each((index, el) => {
    $(el).attr('data-img-id', index + 1);
  })

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
        $('.js-slide-img-area:not(:animated)').prepend($('.slide-img-area__img:last-of-type'))
          .css('margin-left', -1 * $('.slide-img-area__img').width())
          .animate({ marginLeft: '0' }, DURATION, () => {
            // dotボタンのselect属性を移す
            // DOM走査した際、最初に取得したimgの画像IDを取得
            const targetImgId = $('.js-slide-img-area__img:first').data('img-id');
            // ボタンの「selected」を除去
            $('.js-slide-btn-area__btn.selected').removeClass('selected');
            // 対象ボタンに「selected」を追加
            $($('.js-slide-btn-area__btn').get(targetImgId - 1)).addClass('selected');
          });
      },
      next() {
        $('.js-slide-img-area:not(:animated)').animate({ marginLeft: -1 * $('.slide-img-area__img').width() }, DURATION, () => {
          // 左端の画像要素を右端へ移動させる
          $('.js-slide-img-area').append($('.slide-img-area__img:first-of-type'));
          $('.js-slide-img-area').css('margin-left', '0');

          // dotボタンのselect属性を移す
          // DOM走査した際、最初に取得したimgの画像IDを取得
          const targetImgId = $('.js-slide-img-area__img:first').data('img-id');
          // ボタンの「selected」を除去
          $('.js-slide-btn-area__btn.selected').removeClass('selected');
          // 対象ボタンに「selected」を追加
          $($('.js-slide-btn-area__btn').get(targetImgId - 1)).addClass('selected');
        });
      },
      select(currentBtnIdx, targetBtnIdx) {

        // selected属性の付け替え
        $($('.js-slide-btn-area__btn').get(currentBtnIdx)).removeClass('selected');
        $($('.js-slide-btn-area__btn').get(targetBtnIdx)).addClass('selected');

        // 現在の画像ID
        const currentImgId = currentBtnIdx + 1;
        // 移動先の画像ID
        const targetImgId = targetBtnIdx + 1;
        // 移動距離
        const moveNum = targetBtnIdx - currentBtnIdx;
        // スライドエリア
        const slidArea = $('.js-slide-img-area:not(:animated)');

        if (moveNum > 0) {
          // 結果が正の場合は右へ移動
          slidArea.animate({ marginLeft: -moveNum * $imgWidh }, DURATION, () => {
            // IDが移動先の要素よりも小さいものは、順番に最後尾へ回す
            const elArray = [];
            for (let i = 1; i < targetImgId; i++) {
              elArray.push($('.js-slide-img-area__img[data-img-id="' + i + '"]'));
            }
            elArray.forEach((el) => {
              slidArea.append(el);
            })
            slidArea.css('margin-left', '0');
          });
        } else if (moveNum < 0) {
          // 結果が負の場合は左へ移動
          const elArray = [];
          for (let i = targetImgId; i < currentImgId; i++) {
            elArray.push($('.js-slide-img-area__img[data-img-id="' + i + '"]'));
          }

          elArray.slice().reverse().forEach((el) => {
            slidArea.prepend(el)
              .css('margin-left', '-=' + $imgWidh);
          })
          slidArea.animate({ marginLeft: '0' }, DURATION);
        }
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
        $('.js-slide-btn-area__btn').on('click', function () {
          // クリックした要素自身も検索対象するため、addBackを使用
          let currentBtnIdx = $(this).siblings('.selected').addBack('.selected').index();
          let targetBtnIdx = $(this).index();
          that.select(currentBtnIdx, targetBtnIdx);
        });
      }
    }
  })();
  slider.init();
})
