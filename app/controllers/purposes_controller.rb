class PurposesController < ApplicationController
  def new
    @purpose = Purpose.new
    @mainpurpose = Purpose.all.order("id ASC").limit(2)
  end

  def update_money
    if @user.update(money_params)
      redirect_to root_path, notice: '金銭情報を更新しました。'
    else
      render :edit_money
    end
  end


  def search
    purpose = Purpose.find(params[:id])
    children_purpose = purpose.children
    render json:{ purpose: children_purpose }
  end

  private
end
