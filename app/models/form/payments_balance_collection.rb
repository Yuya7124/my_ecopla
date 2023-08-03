class Form::PaymentsBalanceCollection < Form::Base
  extend ActiveHash::Associations::ActiveRecordExtensions
  FORM_COUNT = 1

  attr_accessor :payments_balances, :date, :user_id

  def initialize(attributes = {})
    super attributes
    self.payments_balances = Array.new(FORM_COUNT) { PaymentsBalance.new } unless self.payments_balances.present?
  end

  def payments_balances_attributes=(attributes)
    binding.pry
    self.payments_balances = attributes.map do |_key, value|
      purpose_id = value.fetch("purpose_id")
      purpose = Purpose.find(purpose_id).path_ids
      parent_id = Purpose.find(purpose_id).root_id
      ancestry = Purpose.find(purpose_id).ancestry
      balance = if purpose
        PaymentsBalance.new(value.merge(ancestry: ancestry, parent_id: parent_id, purpose_id: purpose_id))  # Purposeが存在する場合は、PaymentsBalanceにpurposeを紐付ける
      else
        PaymentsBalance.new(value)
      end
      balance
    end
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