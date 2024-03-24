class Api::V1::WeaponsController < ApplicationController
    include GoogleApiConcern

    def select_weapon
      initialize_google_api
      keyword = params[:keyword]
      selected_weapon = select_image_by_keyword(keyword)

      if selected_weapon
        # ダメージ値の計算や選択された画像に基づく追加のロジックをここで実装
        damage_value = calculate_damage(selected_weapon)
        render json: { weapon: selected_weapon, damage: damage_value }
      else
        render json: { error: '適切な武器が見つかりませんでした。' }, status: :not_found
      end
    end


    private


    def calculate_damage(image)
      # 画像名に基づいてダメージ値を計算するロジック
      # 例: ファイル名から特定のパターンを検出してダメージ値を決定
      10 + rand(5..15000) # 仮の計算方法：基本ダメージ+ランダムな追加ダメージ
    end
  end


