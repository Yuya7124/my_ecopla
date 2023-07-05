class Form::BudgetPaymentsBalanceCollection < Form::Base
  extend ActiveHash::Associations::ActiveRecordExtensions

  FORM_COUNT = 3

  attr_accessor :date, :payments_balances, :user_id, :budget_id

  with_options presence: true do
    validates :user_id
    validates :date
    validates :budget_id
  end

  validate :validate_payments_balances_and_budget

  def initialize(attributes = {})
    super attributes
    self.date = Date.today unless self.date.present?
    self.payments_balances = Array.new(FORM_COUNT) { PaymentsBalance.new } unless self.payments_balances.present?
    set_default_values_for_payments_balances
  end

  def payments_balances_attributes=(attributes)
    self.payments_balances = attributes.map { |_key, value| PaymentsBalance.new(value) }
    set_default_values_for_payments_balances
  end

  def set_default_values_for_payments_balances
    self.payments_balances.each do |balance|
      balance.amount ||= 0
      balance.payment_id ||= 1
      balance.payment_times ||= 1
    end
  end

  def validate_payments_balances_and_budget
    valid = true

    self.payments_balances.each_with_index do |balance, index|
      balance.valid?
      balance.errors.full_messages.each do |message|
        errors.add("payments_balances[#{index}].#{message.split(' ')[0]}", message)
      end
      valid = false if balance.errors.any?
    end

    budget = Budget.new(date: date, user_id: user_id)
    budget.valid?
    budget.errors.full_messages.each do |message|
      errors.add("budget.#{message.split(' ')[0]}", message)
    end
    valid = false if budget.errors.any?

    valid
  end

  def save
    binding.pry
    budget = Budget.create(date: date, user_id: user_id)
    saved = true

    payments_balances.each do |balance|
      payment_balance = PaymentsBalance.new(
        amount: balance.amount,
        purpose: balance.purpose,
        payment_id: balance.payment_id,
        payment_times: balance.payment_times,
        budget_id: budget.id
      )
      payment_balance.budget = budget

      unless payment_balance.save   
        balance.errors.add(:base, payment_balance.errors.full_messages.join(", "))
        saved = false
      end
    end
    return errors.empty?
  rescue => e
    return false
  end
end