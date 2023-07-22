class PaymentsBalancesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_payments_balance, only: [:edit, :show, :update]
  before_action :new_form_ids, only: :update
  before_action :no_found_page, only: :show

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
    # binding.pry
    ids = params[:id].split(',').map(&:to_i)
    if params[:payments_balance] && params[:payments_balance][:payments_balances]
      attributes = params[:payments_balance][:payments_balances].values
      existing_form_ids = attributes.map { |nested_hash| nested_hash["id"].to_i }
      deleted_form_ids = ids - existing_form_ids
      # 既存フォーム更新
      if @payments_balance.update(existing_form_ids, attributes)
        # 既存フォーム削除
        PaymentsBalance.where(id: deleted_form_ids).destroy_all
        redirect_to payments_balances_path(date: @selected_date)
      else
        render :edit
      end
    else
      # 既存フォーム全削除
      PaymentsBalance.where(id: ids).destroy_all
      # 新規フォーム作成
      # new_form_ids
      redirect_to payments_balances_path(date: @selected_date)
    end    
  end  
  
  def show
  end

  private
  
  def payments_balance_params
    params.require(:form_payments_balance_collection)
          .permit(:date, payments_balances_attributes: [:date, :amount, :purpose, :payment_id])
    .merge(user_id: current_user.id)
  end

  def payments_balance_params_id
    params.require(:payments_balance).permit(payments_balances_attributes: [:id, :date, :purpose, :amount, :payment_id, :_destroy])
  end

  def set_payments_balance
    @selected_date = Date.parse(params[:date])
    @payments_balance = PaymentsBalance.where(date: @selected_date, user_id: current_user.id)
    @payments_balances = PaymentsBalance.where(user_id: current_user.id)
    # @balances = PaymentsBalance.find(params[:id])
  end

  def new_form_ids
    if params.key?(:form_payments_balance_collection)
      new_form_ids = Form::PaymentsBalanceCollection.new(payments_balance_params)
      unless new_form_ids.save
        render :edit
      end
    end
  end

  def no_found_page
    if @payments_balance.none?
      redirect_to root_path
    end
  end
end