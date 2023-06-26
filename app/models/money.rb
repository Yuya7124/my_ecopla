class Money < ApplicationRecord
  belongs_to :user
  has_one    :budget
end
