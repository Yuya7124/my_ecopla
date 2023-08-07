class Form::PaymentsBalanceCollection < Form::Base
  extend ActiveHash::Associations::ActiveRecordExtensions
  FORM_COUNT = 1

  attr_accessor :payments_balances, :date, :user_id

  def initialize(attributes = {})
    super attributes
    self.payments_balances = Array.new(FORM_COUNT) { PaymentsBalance.new } unless self.payments_balances.present?
  end

  def payments_balances_attributes=(attributes)
    self.payments_balances = attributes.map do |_key, value|
      purpose_id = value.fetch("purpose_id")
      unless purpose_id.blank?
        purpose = Purpose.find(purpose_id).path_ids
        parent_id = Purpose.find(purpose_id).root_id
        ancestry = Purpose.find(purpose_id).ancestry
        balance = if purpose
          PaymentsBalance.new(value.merge(ancestry: ancestry, parent_id: parent_id, purpose_id: purpose_id))  # Purposeが存在する場合は、PaymentsBalanceにpurposeを紐付ける
        else
          PaymentsBalance.new(value)
        end
  
        if balance.valid?
          balance
        else
          # エラーメッセージを設定して新規登録画面にリダイレクト
          errors.add(:base, "#{balance.errors.full_messages.join(', ')}")
          return false
        end
      else
        # エラーメッセージを設定して新規登録画面にリダイレクト
        errors.add(:base, "使用目的を入力してください")
        return false
      end
    end.compact
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