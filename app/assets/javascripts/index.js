$(function() {
  var search_result = $("#user-search-result");

  function appendUser(user) {
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
    search_result.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html =`<li>
                <div class="chat-group-user__name">${msg}</div>
              </li>`
    search_result.append(html);
  }

  function appendChatUser(user) {
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                <p class='chat-group-user__name'>${user.name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
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
          appendUser(user);
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
    var id = $(this).attr('data-user-id');
    var name = $(this).attr('data-user-name');
  });
});
