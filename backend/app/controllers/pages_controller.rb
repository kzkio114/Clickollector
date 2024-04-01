class PagesController < ApplicationController
    include GoogleApiConcern
  
    def special
      @meta_title = "特別なページのタイトル"
      @meta_description = "このページの素晴らしい内容についての説明"
      image = select_image_by_keyword('特別')
      @meta_image = image ? image[:direct_link] : "デフォルトの画像URL"
    end
  end