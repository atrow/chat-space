class Api::MessagesController < ApplicationController
  def index
    @messages = Message.where("id > #{@groups.message.id}")
  end
end
