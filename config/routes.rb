Rails.application.routes.draw do
  devise_for :users
  get 'payments_balances/index'
  root to: "payments_balances#index"
  resources :payments_balances, except: :update, format: false do
    collection do
      get :show, format: false
      get :edit, format: false
      patch :update_multiple, format: false
    end
  end
end
