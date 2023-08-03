class CreatePaymentsBalances < ActiveRecord::Migration[6.0]
  def change
    create_table :payments_balances do |t|  
      t.date        :date,          null: false
      t.integer     :amount,        null: false
      # t.references  :purpose,       null: false, foreign_key: true
      t.integer     :payment_id,    null: false
      t.references  :user,          null: false, foreign_key: true
      t.timestamps
    end
    add_column :payments_balances, :ancestry, :string
    add_column :payments_balances, :parent_id, :integer
    add_index :payments_balances, :ancestry
  end
end
