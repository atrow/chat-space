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
    var message_ids = [];
    $('.main-content__messages').each(function(i,value) {
      message_ids.push($(value).data('message-id'));
    });
    last_message_id = Math.max.apply(null,message_ids);
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      if (messages.length !== 0) {
        messages.forEach(function(message) {
          insertHTML.push(buildHTML(message));
        })
      }
      $('.main-content').append(insertHTML);
    })
    .fail(function() {
      console.log('error');
    });
  };
  setInterval(reloadMessages, 5000);
})
