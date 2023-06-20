class CreateBudgets < ActiveRecord::Migration[6.0]
  def change
    create_table :budgets do |t|
      t.references  :user,               null: false, foreign_key: true
      t.references  :payments_balances,  null: false, foreign_key: true
      t.references  :money,              null: false, foreign_key: true
      t.timestamps
    end
  end
end