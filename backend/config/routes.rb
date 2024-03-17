Rails.application.routes.draw do
  
  root "pages#index"
  
  namespace :api do
    namespace :v1 do
      resources :images, only: [:index]
      resources :items, only: [:index] do
        collection do
          get 'search' # これで`items#search`に対するルートを追加
        end
      end
      get 'weapons/select_weapon', to: 'weapons#select_weapon'
    end
  end
end