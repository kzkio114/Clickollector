class Api::V1::RankingsController < ApplicationController
    # POST /api/v1/rankings
    # 新しいランキングを作成するアクション
    def create
      # 新しいランキングをパラメータから作成
      ranking = Ranking.new(ranking_params)
      if ranking.save
        # 保存に成功した場合、作成されたランキングを JSON 形式でクライアントに返す
        render json: ranking, status: :created
      else
        # 保存に失敗した場合は、エラーメッセージを JSON 形式で返す
        render json: { errors: ranking.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # GET /api/v1/rankings
    # 登録されているランキングを全て取得するアクション
    def index
      # スコアの降順でランキングを全取得し、JSON 形式でクライアントに返す
      rankings = Ranking.all.order(score: :desc)
      render json: rankings
    end

    private

    # リクエストからランキングデータを安全に取得するためのストロングパラメータ設定
    def ranking_params
      params.require(:ranking).permit(:username, :score)
    end
  end
