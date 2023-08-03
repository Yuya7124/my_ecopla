class PurposesController < ApplicationController
  def new
    @purpose = Purpose.new
    @mainpurpose = Purpose.all.order("id ASC").limit(2)
  end

  def edit
    
  end

  def search
    purpose = Purpose.find(params[:id])
    children_purpose = purpose.children
    render json:{ purpose: children_purpose }
  end

  private
end
