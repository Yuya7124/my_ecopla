class Budget < ApplicationRecord
  belongs_to  :user
  has_many    :payments_balances
  # validates :date, presence: true
end
