# x86_64アーキテクチャ用にビルド
FROM --platform=linux/amd64 node:21.5.0

WORKDIR /app

# bunのインストール
RUN curl -fsSL https://bun.sh/install | bash

# PATHを設定
ENV PATH="/root/.bun/bin:${PATH}"

# package.jsonとyarn.lockをコピー
COPY package.json yarn.lock ./

# Tailwind CSSとDaisyUIを含むすべての依存関係をインストール
RUN bun add tailwindcss@latest postcss@latest autoprefixer@latest daisyui@latest

# 依存関係をインストール
RUN bun install

# Tailwind CSSの設定ファイルを生成
RUN npx tailwindcss init

# その他のファイルをコピー
COPY . .

# アプリケーションをビルド
RUN bun run build

# serveを含むすべての依存関係をインストール
RUN bun add serve

# ポート3000を公開
EXPOSE 3000

# serveを使用してビルドされたアプリを提供
CMD sh -c 'serve -s build -l tcp://0.0.0.0:$PORT'
