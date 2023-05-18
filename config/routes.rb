Rails.application.routes.draw do
  get 'moneies/index'
  root to: "moneies#index"
end