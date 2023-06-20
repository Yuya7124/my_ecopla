class CreateMoney < ActiveRecord::Migration[6.0]
  def change
    create_table :money do |t|
      t.integer     :cash,    null: false
      t.integer     :debt,    null: false
      t.integer     :savings, null: false
      t.references  :user,    null: false, foreign_key: true
      t.timestamps
    end
  end
end