class ChangeMembers < ActiveRecord::Migration[5.0]
  def change
    # null制約追加
    change_column_null :members, :group_id, false
    change_column_null :members, :user_id, false
    # デフォルト値変更
    change_column_default :members, :group_id, false
    change_column_default :members, :user_id, false
  end
end
