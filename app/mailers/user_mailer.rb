class UserMailer < ApplicationController
  def password_reset(user)
    @user = user
    mail to: user.email, subject: "パスワード再設定"
end