class Form::PaymentsBalanceCollection < Form::Base
  extend ActiveHash::Associations::ActiveRecordExtensions
  FORM_COUNT = 3

  attr_accessor :date, :payments_balances, :user_id
  

  def initialize(attributes = {})
    super attributes
    self.date = Date.today unless self.date.present?
    self.payments_balances = Array.new(FORM_COUNT) { PaymentsBalance.new } unless self.payments_balances.present?
  end

  def payments_balances_attributes=(attributes)
    self.payments_balances = attributes.map { |_key, value| PaymentsBalance.new(value) }
  end
  
  def save
    # binding.pry
    budget = Budget.create(date: date, user_id: user_id)
    payments_balances.each do |balance|
      budget.payments_balances.build(balance.attributes)
      balance.budget_id = budget.id
    end
    budget.save
      return true
    rescue => e
      return false
  end
end