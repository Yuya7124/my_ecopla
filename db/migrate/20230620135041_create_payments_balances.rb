class CreatePaymentsBalances < ActiveRecord::Migration[6.0]
  def change
    create_table :payments_balances do |t|
      t.references  :user,          null: false, foreign_key: true
      t.integer     :amount,        null: false
      t.string      :purpose,       null: false
      t.integer     :payment_id,    null: false
      t.integer     :payment_times, null: false
      t.timestamps
    end
  end
end
