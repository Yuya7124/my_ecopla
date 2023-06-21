class Form::PaymentsBalanceCollection < Form::Base
  FORM_COUNT = 10
  attr_accessor :payments_balances

  def initalize(attributes = {})
    super attributes
    self.payments_balances = FORM_COUNT.times.map { payments_balance.new() } unless self.payments_balances.present?
  end

  def payments_balances_attributes=(attributes)
    self.payments_balances = attributes.map { |_, v| payments_balance.new(v) }
  end

  # def save
  #   payments_balance.transaction do 
  #     self.payments_balances.map do |payments_balance|
  #       if payments_balance.availability
  #         payments_balance.save
  #       end
  #     end
  #   end
  #     return true
  #   rescue => e
  #     return false
  # end
end