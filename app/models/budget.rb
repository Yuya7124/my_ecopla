class Budget < ApplicationRecord
  belongs_to :user
  belongs_to :payments_balance
end
