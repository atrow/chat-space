$(function() {
  var search_result = $("#user-search-result");
  var chat_member = $("#chat-group-users");

  function appendUser(user) {
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
    search_result.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html =`<div class="chat-group-user clearfix">
                <div class="chat-group-user__name">${msg}</div>
              </div>`
    search_result.append(html);
  }

  function appendChatUser(id, name) {
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${id}'>
                <p class='chat-group-user__name'>${name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
    chat_member.append(html);
    }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          if ($('#chat-group-users').find('input[value=' + user.id + ']').length === 0) {
            appendUser(user);
          }
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザはいません");
      }
    })
    .fail(function() {
      alert('ユーザ検索に失敗しました');
    })
  });

  $(document).on('click', ".user-search-add", function(){
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    appendChatUser(id, name);
    $(this).parent().remove();
    $('#user-search-field.chat-group-form__input').val('');
  });

  $(document).on('click', ".user-search-remove", function(){
    $(this).parent().remove();
  });
});
