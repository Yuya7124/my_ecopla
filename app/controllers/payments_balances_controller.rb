class PaymentsBalancesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_payments_balance, only: [:edit, :show, :update, :destroy]

  def index
    @payments_balances = PaymentsBalance.where(user_id: current_user.id)
  end

  def new
    @form = Form::PaymentsBalanceCollection.new
  end

  def create
    @form = Form::PaymentsBalanceCollection.new(payments_balance_collection_params)
    if @form.save
      redirect_to root_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @payments_balance.update(payments_balances_params)
      redirect_to payments_balances_path(date: @selected_date)
    else
      render :edit
    end
  end
  
  def destroy 
    date = @payments_balance.date
    @payments_balance.destroy
    redirect_to payments_balances_path(date: date)
  end

  def show 
  end
  
  def update_multiple
    binding.pry
    @payments_balance.each do |balance|
      balance.update(payments_balances_params)
    end
    redirect_to payments_balances_path(date: @selected_date)
  end 
  
  private
  
  def payments_balance_collection_params
    params.require(:form_payments_balance_collection)
          .permit(:date, payments_balances_attributes: [:amount, :purpose, :payment_id, :payment_times])
    .merge(user_id: current_user.id)
  end

  def payments_balances_params
    params.require(:payments_balance)
          .permit(payments_balances_attributes: [:id, :amount, :purpose, :payment_id, :payment_times, :_destroy])
  end

  def set_payments_balance
    @selected_date = Date.parse(params[:date])
    @payments_balance = PaymentsBalance.where(date: @selected_date, user_id: current_user.id)
  end
end
