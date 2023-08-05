class User < ApplicationRecord
  after_validation :remove_unnecessary_error_messages
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  attr_accessor :skip_password_validation

  VALID_PASSWORD_REGEX = /\A(?=.*?[a-z])(?=.*?[\d])[a-z\d]+\z/i.freeze
  
  with_options presence: true do
    validates :nickname
    validates :cash, numericality: { greater_than_or_equal_to: 0, message: "は0未満にできません" }
    validates :cash_over_short
    validates :debt, numericality: { greater_than_or_equal_to: 0, message: "は0未満にできません" }
    validates :savings
    validates :annual_income, numericality: { greater_than_or_equal_to: 0, message: "は0未満にできません" }
  end

  # パスワード変更のバリデーション
  validates :password, presence: true, format: { with: VALID_PASSWORD_REGEX, allow_blank: true }, length: { minimum: 6 }, unless: :skip_password_validation
  validates :password_confirmation, presence: true, format: { with: VALID_PASSWORD_REGEX, allow_blank: true }, unless: :skip_password_validation

  # その他のバリデーションや関連するコード

  validates :reset_password_token, uniqueness: true, allow_nil: true
  
  has_many :payments_balances, through: :budgets

  #バリデーションの重複撤去
  def remove_unnecessary_error_messages
    errors.messages.delete(:users)
  end
end
