Rails.application.routes.draw do
  get 'purposes/new'
  devise_for :users
  get 'payments_balances/index'
  root to: "payments_balances#index"
  resources :payments_balances, format: false do
    collection do
      get :show, format: false
      get :edit, format: false
    end
  end
  resources :purposes, only:[:new, :edit], shallow: true
  get 'purpose/:id', to: 'purposes#search'
  resources :users, only: [:show, :edit, :update]
  # resources :passwords, only: [:new, :create, :edit, :update]
end
