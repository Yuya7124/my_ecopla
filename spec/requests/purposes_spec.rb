require 'rails_helper'

RSpec.describe "Purposes", type: :request do
  describe "GET /new" do
    it "returns http success" do
      get "/purposes/new"
      expect(response).to have_http_status(:success)
    end
  end

end
