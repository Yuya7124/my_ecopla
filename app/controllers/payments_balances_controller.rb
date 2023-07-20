class PaymentsBalancesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_payments_balance, only: [:edit, :show, :update, :destroy]
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

  # def update
  #   ids = params[:id].split(',').map(&:to_i)
  #   attributes = params[:payments_balance][:payments_balances].values
  #   if @payments_balance.update(ids, attributes)
  #     redirect_to payments_balances_path(date: @selected_date)
  #   else
  #     render :edit
  #   end
  # end
  def update
    # パラメータから削除するフォームのIDを取得
    deleted_form_ids = params[:payments_balance].reject { |_, v| v.present? }.keys.map(&:to_i)
  
    # 削除したフォームのIDを用いて、該当するレコードをデータベースから削除
    PaymentsBalance.where(id: deleted_form_ids).destroy_all
  
    # 残ったフォームの属性を更新
    params[:payments_balance][:payments_balances].each do |index, attributes|
      payment_id = attributes[:payment_id].to_i
      date = attributes[:date]
      purpose = attributes[:purpose]
      amount = attributes[:amount].to_i

      # ここで該当するレコードを更新するか、新しいレコードを作成する処理を行う
      # 例えば、以下のようにするとIDが存在する場合は該当するレコードを更新し、IDが存在しない場合は新しいレコードを作成します。
      if index.present?
        payments_balance = PaymentsBalance.find(index)
        payments_balance.update(payment_id: payment_id, date: date, purpose: purpose, amount: amount)
      else
        PaymentsBalance.create(payment_id: payment_id, date: date, purpose: purpose, amount: amount)
      end
    end
  
    redirect_to payments_balances_path(date: @selected_date)
  end
  

  def show
  end

  def destroy
    @payments_balance = PaymentsBalance.find(params[:id])
    @payments_balance.destroy
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
  end

  def no_found_page
    if @payments_balance.none?
      redirect_to root_path
    end
  end
end