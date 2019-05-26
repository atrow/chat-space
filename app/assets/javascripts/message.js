$(function() {
  function buildHTML(message) {
    imageHtml = message.image !== undefined
              ? `<img class="main-content__image" src="${message.image}">`
              : ``;
    var html = `<div class="main-content__messages" data-message-id="${message.id}">
                  <p class="main-content__user">
                    ${message.user}
                  </p>
                  <p class="main-content__datetime">
                    ${message.datetime}
                  </p>
                  <p class="main-content__message">
                    ${message.body}
                  </p>
                  ${imageHtml}
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType:'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.main-content').append(html)
      $('.main-form__text').val('')
      $('.main-content').animate({
        scrollTop: $('.main-content')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert('投稿できませんでした')
    })
    .always(function(data){
      $('.main-form__submit-button').prop('disabled', false);
    })
  })

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var message_ids = [];
    $('.main-content__messages').each(function(i,value) {
      message_ids.push($(value).data('message-id'));
    });
    last_message_id = Math.max.apply(null,message_ids);
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: 'api/messages',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
    })
    .fail(function() {
      console.log('error');
    });
  };
})
