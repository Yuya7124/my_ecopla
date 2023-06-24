class Form::PaymentsBalanceCollection < Form::Base
  extend ActiveHash::Associations::ActiveRecordExtensions
  FORM_COUNT = 3

  attr_accessor :payments_balances, :user_id

  def initialize(attributes = {})
    super attributes
    self.payments_balances = FORM_COUNT.times.map { PaymentsBalance.new() } unless self.payments_balances.present?
  end

  def payments_balances_attributes=(attributes)
    self.payments_balances = attributes.map { |_, v| PaymentsBalance.new(v.merge(user_id: user_id)) }
  end  

  def save
    PaymentsBalance.transaction do
      payments_balances.each do |balance|
        balance.user_id = user_id
        balance.save!
      end
    end
    true
  rescue => e
    false
  end
end