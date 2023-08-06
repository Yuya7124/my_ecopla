class PaymentsBalancesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_payments_balance, only: [:edit, :show, :update]
  before_action :new_form_ids, only: :update
  before_action :no_found_page, only: :show
  before_action :amount_calculation, only: :index

  def index
    @payments_balances = PaymentsBalance.where(user_id: current_user.id)
    payments_balance_id = params[:payments_balance_id]
    date = params[:date]
  end

  def new
    @form = Form::PaymentsBalanceCollection.new
    @purpose = Purpose.new
    @main_purpose = Purpose.all.order("id ASC").limit(2)
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
    @selected_purpose_ids = @payments_balance.map { |balance| balance.purpose.path_ids }
  end

  def update
    binding.pry
    ids = params[:id].split(',').map(&:to_i)
    if params[:payments_balance] && params[:payments_balance][:payments_balances]
      attributes = params[:payments_balance][:payments_balances].values
      existing_form_ids = attributes.map { |nested_hash| nested_hash["id"].to_i }
      deleted_form_ids = ids - existing_form_ids
      # 既存フォーム更新
      if @payments_balance.update(existing_form_ids, attributes)
        attributes.each do |value|
          purpose_id = value["purpose_id"]
          parent_id = Purpose.find(purpose_id).root_id
          ancestry = Purpose.find(purpose_id).ancestry
        
          # valueハッシュに更新したデータを格納
          value["parent_id"] = parent_id
          value["ancestry"] = ancestry
        end
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
      redirect_to payments_balances_path(date: @selected_date)
    end    
  end  
  
  def show
  end

  private
  
  def payments_balance_params
    params.require(:form_payments_balance_collection)
          .permit(:date, payments_balances_attributes: [:date, :amount, :payment_id, :ancestry, :parent_id, :purpose_id])
    .merge(user_id: current_user.id)
  end

  def set_payments_balance
    @selected_date = Date.parse(params[:date])
    @payments_balance = PaymentsBalance.where(date: @selected_date, user_id: current_user.id)
    @payments_balances = PaymentsBalance.where(user_id: current_user.id)
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

  def get_amount
    @amount = PaymentsBalance.where(amount: amount).all.to_json
  end

  def amount_calculation
    @user = current_user
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
    @sum_cash = (@cash_minus + @cash_input + @cashless_charge) - (@cash_plus + @cash_output)
    @sum_atm = (@atm_minus + @debt_num_past + @cash_output + @atm_charge) - (@atm_plus + @cash_input) 
  end
end