class PaymentsBalance < ApplicationRecord

  with_options presence: true do
    validates :date
    validates :amount
    validates :purpose
    validates :payment_times
  end

  with_options numericality: { other_than: 0, message: "can't be blank"} do
    validates :payment_id
  end
  
  belongs_to  :user
  belongs_to  :budget
  belongs_to  :payment_id
  has_ancestry
end
