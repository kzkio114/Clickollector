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
        fields: 'files(id, name, web_view_link, web_content_link)',
      )
      response.files # これは検索結果のファイルの配列
    # 検索結果のファイルからファイル名を解析し、特定の文字を含むものを抽出する
      files_with_keyword = response.files.select do |file|
      file.name.include?(keyword) # ファイル名に指定したキーワードが含まれるかどうか
    end

      files_with_keyword # 特定の文字を含むファイルの情報を返す
    end

    # このメソッドをItemsControllerのアクション内で使う
    def search
      keyword = params[:keyword]
      @items = search_in_google_drive(keyword)
      render json: @items
    end
end