class PaymentsBalance < ApplicationRecord
  belongs_to  :user
  belongs_to  :budget
  belongs_to  :payment_id
  has_ancestry
end
