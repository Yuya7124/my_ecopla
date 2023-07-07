class PaymentsBalancesController < ApplicationController
  before_action :authenticate_user!

  def index
    @payments_balances = PaymentsBalance.all
  end

  def new
    @form = Form::PaymentsBalanceCollection.new
  end

  def create
    date = Date.today
    @form = Form::PaymentsBalanceCollection.new(payments_balance_params)
    if @form.save
      redirect_to root_path
    else
      render :new
    end
  end
  
  
  private
  
  def payments_balance_params
    params.require(:form_payments_balance_collection)
    .permit(:date, payments_balances_attributes: [:amount, :purpose, :payment_id, :payment_times])
    .merge(user_id: current_user.id)
  end
end
