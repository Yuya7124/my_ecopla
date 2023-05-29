Rails.application.routes.draw do
  devise_for :users
  get 'moneies/index'
  root to: "moneies#index"
end