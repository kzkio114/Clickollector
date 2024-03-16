class Api::V1::ImagesController < ApplicationController
    include GoogleApiConcern
  
      def index
        initialize_google_api # GoogleApiConcernモジュールで定義されたメソッドを呼び出し
        render json: @images # 画像データをJSON形式でフロントエンドに送信
      end
      
  
end
  