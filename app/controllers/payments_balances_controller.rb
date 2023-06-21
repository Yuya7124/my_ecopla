class PaymentsBalancesController < ApplicationController
  before_action :authenticate_user!

  def index

  end

  def new
    @payments_balance = Form::PaymentsBalanceCollection.new
  end

  def create
    @payments_balance = Form::PaymentsBalanceCollection.new(payments_balance_collection_params)
    if @payments_balance.save
      redirect_to root_path
    else
      render :new
    end
  end

  private
  def payments_balance_collection_params
    params.require(:form_payments_balance_collection)
    .permit(payments_balances_attributes: [:date,:amount,:purpose,:payment_id,:payment_times])
    .merge(user_id:current_user.id)
  end
end
