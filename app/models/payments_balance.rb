class PaymentsBalance < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  
  with_options presence: true do
    validates :date
    validates :amount
    validates :payment_id, numericality: { other_than: 0, message: "が選択されていません" }
  end
  
  has_many   :users, through: :budgets
  belongs_to :purpose
  belongs_to :payment

  def self.total_amount_by_date(date)
    where(date: date).sum(:amount)
  end

  #バリデーションの重複撤去
  def remove_unnecessary_error_messages
    errors.messages.delete(:payments_balance)
  end
end