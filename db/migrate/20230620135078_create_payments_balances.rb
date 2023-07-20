class CreatePaymentsBalances < ActiveRecord::Migration[6.0]
  def change
    create_table :payments_balances do |t|  
      t.date        :date,          null: false
      t.integer     :amount,        null: false
      t.string      :purpose,       null: false
      t.integer     :payment_id,    null: false
      t.references  :user,          null: false, foreign_key: true
      t.timestamps
    end
  end
end
