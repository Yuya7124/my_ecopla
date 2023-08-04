class Money < ApplicationRecord

  with_options presence: true do
    validates :cash,           numericality: :less_than 0
    validates :cash_over_short
    validates :debt,           numericality: :less_than 0
    validates :savings
    validates :annual_income,  numericality: :less_than 0
  end

  belongs_to :user
  # has_one    :budget
end