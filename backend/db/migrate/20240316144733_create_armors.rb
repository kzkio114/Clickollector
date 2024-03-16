class CreateArmors < ActiveRecord::Migration[7.0]
  def change
    create_table :armors do |t|
      t.string :name
      t.integer :defense_power
      t.string :image_url

      t.timestamps
    end
  end
end
