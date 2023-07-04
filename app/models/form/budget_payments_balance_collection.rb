class Form::BudgetPaymentsBalanceCollection < Form::Base
  extend ActiveHash::Associations::ActiveRecordExtensions
  FORM_COUNT = 3

  attr_accessor :date, :payments_balances, :user_id, :budget_id

  with_options presence: true do
    validates :user_id
    validates :date
    validates :budget_id
  end

  def initialize(attributes = {})
    super attributes
    self.date = Date.today unless self.date.present?
    self.payments_balances = Array.new(FORM_COUNT) { PaymentsBalance.new } unless self.payments_balances.present?
  end

  def payments_balances_attributes=(attributes)
    self.payments_balances = attributes.map { |_key, value| PaymentsBalance.new(value) }
  end
  
  def save
    budget = Budget.create(date: date, user_id: user_id)
    payments_balances.each do |balance|
      payment_balance = PaymentsBalance.create(
        amount: balance.amount,
        purpose: balance.purpose,
        payment_id: balance.payment_id,
        payment_times: balance.payment_times,
        budget_id: budget.id
      )
      payment_balance.budget = budget
      unless payment_balance.save
        balance.errors.add(:base, payment_balance.errors.full_messages.join(", "))
      end
    end
    return errors.empty?
  rescue => e
    return false
  end
end