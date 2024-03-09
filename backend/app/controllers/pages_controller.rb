class PagesController < ApplicationController
  include GoogleApiConcern

   before_action :initialize_google_api, only: [:index]
 
    def index
    end

end
  
