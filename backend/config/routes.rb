Rails.application.routes.draw do

  root "pages#index"
  
  namespace :api do
    namespace :v1 do
      resources :images, only: [:index]
    end
  end
end