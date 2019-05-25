json.body @message.body
json.image @message.image.url if @message.image.present?
json.user @message.user.name
json.datetime Time.now.strftime("%Y/%m/%d %H:%M")
json.id @message.id
