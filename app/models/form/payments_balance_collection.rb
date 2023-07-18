class Form::PaymentsBalanceCollection < Form::Base
  extend ActiveHash::Associations::ActiveRecordExtensions
  FORM_COUNT = 1

  attr_accessor :payments_balances, :date, :user_id

  def initialize(attributes = {})
    super attributes
    self.payments_balances = Array.new(FORM_COUNT) { PaymentsBalance.new } unless self.payments_balances.present?
  end

  def payments_balances_attributes=(attributes)
    self.payments_balances = attributes.map { |_key, value| PaymentsBalance.new(value) }
  end

  def payments_balances
    @payments_balances ||= []
  end

  def save
    PaymentsBalance.transaction do
      self.payments_balances.each do |balance|
        balance.user_id = user_id
        balance.save
      end
    end
    return errors.empty?
  rescue => e
    return false
  end
end