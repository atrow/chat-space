class RenameGroupUsersToMembers < ActiveRecord::Migration[5.0]
  def change
    rename_table :group_users, :members
  end
end
