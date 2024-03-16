require 'google/apis/drive_v3'
require 'googleauth'
require 'googleauth/stores/file_token_store'

    # app/controllers/concerns/google_api_concern.rb
    module GoogleApiConcern
      extend ActiveSupport::Concern
    
      included do
        before_action :initialize_google_api
      end
    
      private
    
      def initialize_google_api
        service = Google::Apis::DriveV3::DriveService.new
        service.client_options.application_name = 'reptile-recommend'
        service.key = ENV['GOOGLE_API_KEY']
    
        client_id = Google::Auth::ClientId.from_hash(JSON.parse(ENV['GOOGLE_CLIENT_SECRET']))
        token_store = Google::Auth::Stores::FileTokenStore.new(file: Rails.root.join('config', 'tokens.yaml'))
        authorizer = Google::Auth::UserAuthorizer.new(client_id, Google::Apis::DriveV3::AUTH_DRIVE_READONLY, token_store)
        user_id = 'kzkio114@gmail.com'
        credentials = authorizer.get_credentials(user_id)
        service.authorization = credentials
    
        folder_id = '113FpN_5gjtwSbYGSNo9li4DlXomt4lIN'
        response = service.list_files(
          q: "('#{folder_id}' in parents) and (mimeType='image/jpeg' or mimeType='image/png' or mimeType='image/webp')",
          spaces: 'drive',
          fields: 'files(id, name, web_view_link, web_content_link)'
        )
        @images = response.files.map do |file|
          file_id = file.id
          direct_link = "https://lh3.googleusercontent.com/d/#{file_id}"
          { name: file.name, direct_link: direct_link }
        end
      end
    
      def select_image_by_keyword(keyword)
        @images.select { |image| image[:name].include?(keyword) }.sample
      end
    end