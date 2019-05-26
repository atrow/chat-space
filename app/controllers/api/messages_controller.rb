class Api::MessagesController < ApplicationController
  def index
    respond_to do |format|
      format.json { @messages = Message.where('id > ? and group_id = ?', params[:id], params[:group_id]) }
    end
  end
end
