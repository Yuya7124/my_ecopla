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
    @form = Form::PaymentsBalanceCollection.new(payments_balance_params)
    if @form.save
      redirect_to root_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    ids = params[:id].split(',').map(&:to_i)
    attributes = params[:payments_balance][:payments_balances].values
    if @payments_balance.update(ids, attributes)
      redirect_to payments_balances_path(date: @selected_date)
    else
      render :edit
    end
  end

  def show 
  end
   
  private
  
  def payments_balance_params
    params.require(:form_payments_balance_collection)
          .permit(:date, payments_balances_attributes: [:amount, :purpose, :payment_id, :payment_times])
    .merge(user_id: current_user.id)
  end

  def payments_balances_update_params
    params.require(:payments_balance).permit(payments_balances: [:id, :date, :amount, :purpose, :payment_id, :payment_times, :_destroy])
  end

  def set_payments_balance
    @selected_date = Date.parse(params[:date])
    @payments_balance = PaymentsBalance.where(date: @selected_date, user_id: current_user.id)
  end
end
