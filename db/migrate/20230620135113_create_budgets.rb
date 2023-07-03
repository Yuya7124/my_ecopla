class CreateBudgets < ActiveRecord::Migration[6.0]
  def change
    create_table :budgets do |t|
      t.references :user, null: false, foreign_key: true
      t.date :date, null: false
      t.timestamps
    end
  end
end