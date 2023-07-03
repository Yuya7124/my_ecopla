# class BudgetPaymentsBalance
#   include ActiveModel::Model
#   attr_accessor :user_id, :date, :payments_balances

#   validates :user_id, :date, presence: true

#   def save
#     budget = Budget.create(date: date, user_id: user_id)

#     payments_balances.each do |attributes|
#       budget.payments_balances.build(attributes)
#     end

#     budget.save
#   end
# end

class BudgetPaymentsBalance < ApplicationRecord
  include ActiveModel::Model
  attr_accessor: :user_id, :date, :amount, :purpose, :payment_id, :payment_times, :budget_id

  with_options presence: true do
    validates :user_id
    validates :date
    validates :amount
    validates :purpose
    validates :payment_id, numericality: { other_than: 0, message: "can't be blank" }
    validates :payment_times
    validates :budget_id
  end
end