class PaymentsBalance < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  
  with_options presence: true do
    validates :date
    validates :amount
    validates :purpose
    validates :payment_id, numericality: { other_than: 0, message: "が選択されていません" }
    validates :payment_times
  end
  
  has_many   :users, through: :budgets
  has_many   :budgets
  belongs_to :payment
  # has_ancestry
end