$(function() {
  function buildHTML(message) {
    var html = `<div class="main-content__messages">
                  <p class="main-content__user">
                    ${message.user}
                  </p>
                  <p class="main-content__datetime">
                  ${message.datetime}
                  </p>
                  <p class="main-content__message">
                    ${message.body}
                  </p>
                  `
    if(message.image !== undefined) {
      html = html +`<img class="main-content__image" src="${message.image}">
                  </div>`
    } else {
      html = html +`</div>`
    }
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
})
