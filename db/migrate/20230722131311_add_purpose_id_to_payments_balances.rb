class AddPurposeIdToPaymentsBalances < ActiveRecord::Migration[6.0]
  def change
    add_reference :payments_balances, :purpose, null: false, foreign_key: true
  end
end