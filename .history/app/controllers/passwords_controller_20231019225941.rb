class PasswordsController < ApplicationController

  def new
  end

  def create
    @user = User.find_by(email: password_reset_params)
    if @user.present?     
      user&.send_reset_password_instructions
      render json: {}
      redirect_to root_path
    else
      flash.now[:danger] = "Email address not found"
      render new_user_password_path
    end
  end

  def edit
    
  end

  private

  def password_reset_params
    params.require(:user).parmit(:email)
  end
end
