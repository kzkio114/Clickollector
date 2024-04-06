class Api::V1::RankingsController < ApplicationController

    def create
      ranking = Ranking.new(ranking_params)
      if ranking.save
        render json: ranking, status: :created
      else
        render json: { errors: ranking.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # 追加するindexアクション
    def index
      rankings = Ranking.all.order(score: :desc)
      render json: rankings
    end

    private

    def ranking_params
      params.require(:ranking).permit(:username, :score)
    end

end




