class BudgetPaymentsBalance
  include ActiveModel::Model
  attr_accessor :user_id, :date, :amount, :purpose, :payment_id, :payment_times, :budget_id

  with_options presence: true do
    validates :user_id
    validates :date
    validates :amount
    validates :purpose
    validates :payment_id, numericality: { other_than: 0, message: "が選択されていません" }
    validates :payment_times
    validates :budget_id
  end
end