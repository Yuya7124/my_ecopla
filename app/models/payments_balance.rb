class PaymentsBalance < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  
  # with_options presence: true do
  #   validates :amount
  #   validates :purpose
  #   validates :payment_id, numericality: { other_than: 0, message: "can't be blank"}
  #   validates :payment_times
  # end
  
  # belongs_to  :user
  belongs_to  :budget
  belongs_to  :payment
  # has_ancestry
end
