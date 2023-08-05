class UsersController < ApplicationController
  before_action :amount_calculation, only: [:show, :edit]
  before_action :set_user, only: [:edit, :update]
  before_action :user_info, only: [:show, :edit]
  # before_action :password_required? only: [:update]
  def show

  end

  def edit
    
  end

  def update
    # binding.pry
    # パスワード変更のバリデーションを一時的に無効化
    @user.skip_password_validation = true
    @user.password_confirmation = nil
    if @user.update(money_params)
      redirect_to "/users/#{current_user.id}"
    else
      render :edit
    end
    # 無効化を解除
    @user.skip_password_validation = false
  end


  def amount_calculation
    @cash_plus = PaymentsBalance.where("date <= ? AND user_id = ? AND payment_id = ? AND parent_id = ?", Time.zone.now, current_user.id, 1, 1).sum(:amount) 
    @cash_minus = PaymentsBalance.where("date <= ? AND user_id = ? AND payment_id = ? AND parent_id = ?", Time.zone.now, current_user.id, 1, 2).sum(:amount) 
    @debt_num_past = PaymentsBalance.where("date <= ? AND user_id = ? AND payment_id = ? AND parent_id = ?", Time.zone.now, current_user.id, 2, 2).sum(:amount) 
    @debt_num_future = PaymentsBalance.where("date > ? AND user_id = ? AND payment_id = ? AND parent_id = ?", Time.zone.now, current_user.id, 2, 2).sum(:amount) 
    @atm_plus = PaymentsBalance.where("date <= ? AND user_id = ? AND payment_id = ? AND parent_id = ?", Time.zone.now, current_user.id, 3, 1).sum(:amount) 
    @atm_minus = PaymentsBalance.where("date <= ? AND user_id = ? AND payment_id = ? AND parent_id = ?", Time.zone.now, current_user.id, 3, 2).sum(:amount) 
    @sum_cash = @cash_minus - @cash_plus
    @sum_atm = (@atm_minus + @debt_num_past) - @atm_plus
  end

  def set_user
    @user = current_user
  end

  def user_info
    user = User.find(params[:id])
    @nickname = user.nickname
    @cash = user.cash
    @cash_over_short = user.cash_over_short
    @debt = user.debt
    @savings = user.savings
    @annual_income = user.annual_income
  end

  def password_required?
    false
  end

  def money_params
    params.require(:user).permit(:cash, :debt, :savings, :annual_income)
  end
end
