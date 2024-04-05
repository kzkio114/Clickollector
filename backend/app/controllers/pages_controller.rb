class PagesController < ApplicationController
  include GoogleApiConcern

  def special
    @meta_title = "特別なページのタイトル"
    @meta_description = "このページの素晴らしい内容についての説明"
    @page_url = "https://clickollector-4d5bda395d4c.herokuapp.com/"

    # Google Driveからランダムに画像を選択
    image = select_image_by_keyword('特別')
    @meta_image = image ? image[:direct_link] : "デフォルトの画像URL"
    @random_image_url = @meta_image # この例では同じ画像URLを使用
  end
end