Rails.application.routes.draw do

  root "pages#index"
  
  # 画像データを取得するためのAPIエンドポイントを設定

  namespace :api do
    namespace :v1 do
      resources :images, only: [:index]
      resources :items, only: [:index]
      get 'weapons/select_weapon', to: 'weapons#select_weapon'
      end
    end
  end
