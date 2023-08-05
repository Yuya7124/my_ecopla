class AddDefaultValuesToUserColumns < ActiveRecord::Migration[6.0]
  def change
    change_column_default :users, :cash, 0
    change_column_default :users, :cash_over_short, 0
    change_column_default :users, :debt, 0
    change_column_default :users, :savings, 0
    change_column_default :users, :annual_income, 0
  end
end
