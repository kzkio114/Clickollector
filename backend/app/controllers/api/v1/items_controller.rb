class Api::V1::ItemsController < ApplicationController
    include GoogleApiConcern
  
    def index
      @items = Item.all
      render json: @items
    end
  
    def search
      keyword = params[:keyword]
      @items = Item.where("name LIKE ?", "%#{keyword}%")
      render json: @items
    end
  end