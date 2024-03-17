class Api::V1::ItemsController < ApplicationController
    include GoogleApiConcern
  
    def index
      @items = Item.all
      render json: @items
    end
  
    # GoogleApiConcern でGoogle Drive内を検索するメソッドを定義
    def search_in_google_drive(keyword)
      service = initialize_google_api
      response = service.list_files(
        q: "name contains '#{keyword}'",
        spaces: 'drive',
        fields: 'files(id, name, webViewLink, webContentLink)',
      )
      response.files # これは検索結果のファイルの配列
    end
    # このメソッドをItemsControllerのアクション内で使う
    def search
      keyword = params[:keyword]
      @items = search_in_google_drive(keyword)
      render json: @items
    end
end