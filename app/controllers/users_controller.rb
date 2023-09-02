class UsersController < ApplicationController
  attr_accessor :remember_token, :activation_token, :reset_token
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

  # パスワード再設定の属性を設定する
  def created_at_before_last_save
    self.reset_token = User.new_token
    update_attribute(:reset_password_token,  User.digest(reset_token))
    update_attribute(:reset_password_sent_at, Time.zone.now)
  end

  # パスワード再設定のメールを送信する
  def send_password_change_notification
    UserMailer.password_reset(self).deliver_now
  end

  private

  def amount_calculation
    # 現金
    @cash_plus = PaymentsBalance.where("date <= ? AND user_id = ? AND payment_id = ? AND parent_id = ?", Time.zone.now, current_user.id, 1, 1).sum(:amount) 
    @cash_minus = PaymentsBalance.where("date <= ? AND user_id = ? AND payment_id = ? AND parent_id = ?", Time.zone.now, current_user.id, 1, 2).sum(:amount)
    @cash_input = PaymentsBalance.where("date <= ? AND user_id = ? AND payment_id = ? AND parent_id = ?", Time.zone.now, current_user.id, 1, 3).sum(:amount)
    @cashless_charge = PaymentsBalance.where("date <= ? AND user_id = ? AND payment_id = ? AND parent_id = ?", Time.zone.now, current_user.id, 1, 4).sum(:amount) 
    # クレジット決済
    @debt_num_past = PaymentsBalance.where("date <= ? AND user_id = ? AND payment_id = ? AND parent_id = ?", Time.zone.now, current_user.id, 2, 2).sum(:amount) 
    @debt_num_future = PaymentsBalance.where("date > ? AND user_id = ? AND payment_id = ? AND parent_id = ?", Time.zone.now, current_user.id, 2, 2).sum(:amount)
    # 口座振込
    @atm_plus = PaymentsBalance.where("date <= ? AND user_id = ? AND payment_id = ? AND parent_id = ?", Time.zone.now, current_user.id, 3, 1).sum(:amount) 
    @atm_minus = PaymentsBalance.where("date <= ? AND user_id = ? AND payment_id = ? AND parent_id = ?", Time.zone.now, current_user.id, 3, 2).sum(:amount)
    @cash_output = PaymentsBalance.where("date <= ? AND user_id = ? AND payment_id = ? AND parent_id = ?", Time.zone.now, current_user.id, 3, 3).sum(:amount)
    @atm_charge = PaymentsBalance.where("date <= ? AND user_id = ? AND payment_id = ? AND parent_id = ?", Time.zone.now, current_user.id, 3, 4).sum(:amount) 
    # 合計値を表示
    @sum_cash = @cash_minus + @cash_input + @cashless_charge - @cash_plus - @cash_output
    @sum_atm = @atm_minus + @debt_num_past + @cash_output + @atm_charge - @atm_plus - @cash_input
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
    params.require(:user).permit(:cash, :cash_over_short, :debt, :savings, :annual_income)
  end
end
