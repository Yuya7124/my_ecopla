class PaymentsBalance < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  
  # with_options presence: true do
  #   validates :amount
  #   validates :purpose
  #   validates :payment_id, numericality: { other_than: 0, message: "が選択されていません" }
  #   validates :payment_times
  #   validates :budget_id, presence: true
  # end
  
  belongs_to :budget
  belongs_to :payment
  # has_ancestry
end