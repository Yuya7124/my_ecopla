class BudgetsController < ApplicationController
  
  private
  def budget_params
    params.require(:budget).merge(user_id: current_user.id, payments_balance_id: params[:payments_balance_id])
  end
end
