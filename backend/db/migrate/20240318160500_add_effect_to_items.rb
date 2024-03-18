class AddEffectToItems < ActiveRecord::Migration[7.0]
  def change
    add_column :items, :effect, :string
  end
end
