class PurposesController < ApplicationController
  before_action :set_purpose, only: [:new, :edit]
  def new
    
  end

  def edit
  end

  def search
    purpose = Purpose.find(params[:id])
    children_purpose = purpose.children
    render json:{ purpose: children_purpose }
  end

  private

  def set_purpose
    @purpose = Purpose.new
    @mainpurpose = Purpose.all.order("id ASC").limit(2)
  end
end
