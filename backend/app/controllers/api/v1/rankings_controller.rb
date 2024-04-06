# app/controllers/api/v1/rankings_controller.rb
module Api
    module V1
      class RankingsController < ApplicationController
        def create
          ranking = Ranking.new(ranking_params)
          if ranking.save
            # 保存に成功した場合は、保存されたオブジェクトを含むレスポンスを返す
            render json: ranking, status: :created
          else
            # 保存に失敗した場合は、エラーメッセージを含むレスポンスを返す
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
    end
  end
