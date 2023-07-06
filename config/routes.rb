Rails.application.routes.draw do
  devise_for :users
  get 'payments_balances/index'
  root to: "payments_balances#index"
  resources :payments_balances do
    resources :orders, only: [:index, :create]
  end
end