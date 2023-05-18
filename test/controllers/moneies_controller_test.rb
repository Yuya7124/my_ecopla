require 'test_helper'

class MoneiesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get moneies_index_url
    assert_response :success
  end

end
