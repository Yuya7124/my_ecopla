class User < ApplicationRecord
  after_validation :remove_unnecessary_error_messages
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  VALID_PASSWORD_REGEX = /\A(?=.*?[a-z])(?=.*?[\d])[a-z\d]+\z/i.freeze
  
  with_options presence: true do
    validates :nickname
    validates :password,        format: { with: VALID_PASSWORD_REGEX, allow_blank: true }
    validates :cash,            numericality: {less_than: 0}
    validates :cash_over_short
    validates :debt,            numericality: {less_than: 0}
    validates :savings
    validates :annual_income,   numericality: {less_than: 0}
  end
  
  has_many :payments_balances, through: :budgets

  #バリデーションの重複撤去
  def remove_unnecessary_error_messages
    errors.messages.delete(:users)
  end
end
