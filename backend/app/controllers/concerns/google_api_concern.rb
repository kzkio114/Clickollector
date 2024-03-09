require 'google/apis/drive_v3'
require 'googleauth'
require 'googleauth/stores/file_token_store'

    # app/controllers/concerns/google_api_concern.rb
    module GoogleApiConcern
       extend ActiveSupport::Concern
  
       included do
        before_action :initialize_google_api
       end

     def initialize_google_api
    
        service = Google::Apis::DriveV3::DriveService.new
        service.client_options.application_name = 'reptile-recommend'
        service.key = ENV['GOOGLE_API_KEY'] #Google Drive APIクライアントを初期化する際に、APIキーを設定するコード
        
        # ここに認証情報を設定
    
        client_id = Google::Auth::ClientId.from_hash(JSON.parse(ENV['GOOGLE_CLIENT_SECRET']))
        token_store = Google::Auth::Stores::FileTokenStore.new(file: Rails.root.join('config', 'tokens.yaml'))
        authorizer = Google::Auth::UserAuthorizer.new(client_id, Google::Apis::DriveV3::AUTH_DRIVE_READONLY, token_store)
        user_id = 'kzkio114@gmail.com'
        credentials = authorizer.get_credentials(user_id)
        service.authorization = credentials
    
    
        # 画像ファイルのリストを取得するためのDrive APIの使用
        folder_id = '113FpN_5gjtwSbYGSNo9li4DlXomt4lIN' # ここに検索したいフォルダのIDを設定
        response = service.list_files(
          q: "('#{folder_id}' in parents) and (mimeType='image/jpeg' or mimeType='image/png')",
          spaces: 'drive',
          fields: 'files(id, name, web_view_link, web_content_link)',
          # page_token: page_token
        )
    
         # 画像URLの取得
         # ファイルリストからファイル名とURLを取得する
         @images = response.files.map do |file|
         { name: file.name, web_view_link: file.web_view_link }
         end

      
         # 例として最初の画像をランダムに選択する
         image = @images.sample
         @random_image_url = image[:web_view_link]
         @random_image_name = image[:name]
      end
    end