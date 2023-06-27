class PaymentsBalancesController < ApplicationController
  before_action :authenticate_user!

  def index
    # @payments_balances = PaymentsBalance.all
  end

  def new
    @form = Form::PaymentsBalanceCollection.new
  end

  def create
    @form = Form::PaymentsBalanceCollection.new(budget_payments_balance_params.merge(user_id: current_user.id))
    if @form.save
      redirect_to root_path
    else
      render :new
    end
  end
  
  private
  
  def budget_payments_balance_params
    params.require(:form_payments_balance_collection)
    .permit(:date, payments_balances_attributes: [:amount, :purpose, :payment_id, :payment_times])
  end
end
