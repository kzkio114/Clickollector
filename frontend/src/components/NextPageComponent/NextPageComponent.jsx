// NextPageComponent.js
import React, { useEffect, useState } from 'react';
import { useGameState } from '../Username/GameStateContext'; // 正確なパスに注意
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const itemPrices = {
  "石": 10,
  "溶岩石": 550,
  "火の石": 3330,
  "強い炎の石": 7000,
  "賢者の石": 1000000
};


function NextPageComponent() {
  const { username, setUsername, collectedItems, setCollectedItems } = useGameState(); // setCollectedItemsを追加
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const price = collectedItems.reduce((acc, item) => acc + (itemPrices[item.name] * item.count), 0);
    setTotalPrice(price);
  }, [collectedItems]);

 // コンポーネントのマウント時に localStorage からユーザー名を取得
  useEffect(() => {
  const username = localStorage.getItem('username');
  if (username) {
    setUsername(username);
  }
}, []);

  // Twitterに投稿する関数
  const postToTwitter = () => {
    const appUrl = "https://clickollector-4d5bda395d4c.herokuapp.com";
    let message;

    if (totalPrice >= 100000000) {
      message = "🎉 すごい！合計金額が1億円以上です！ 🎉";
    } else if (totalPrice >= 10000000) {
      message = "🥳 合計金額が1000万円以上です！ 🥳";
    } else if (totalPrice >= 5000000) {
      message = "😮 合計金額が500万円以上です！ 😮";
    } else {
      message = "高得点を目指して頑張りましょう！";
    }

    const tweetText = `${username}、${message} 合計金額: ${totalPrice.toLocaleString('ja-JP')}円でした！ #Clickollector ${appUrl}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(url, '_blank');
  };

 // ホームに戻る関数を修正
const goToHome = () => {
  // アイテムをリセット
  setCollectedItems([]); // こちらを修正

  // ホームページに遷移
  navigate('/');
};

// ランキングページへ遷移する関数
const goToRanking = async () => {
  try {
    // バックエンドにランキングデータを送信し、
    // ローカルストレージにも保存する
    await updateRanking();
    updateLocalRanking(); // こちらは非同期ではないのでawaitは不要

    // ランキングページへ遷移
    navigate('/ranking');
  } catch (error) {
    console.error('Ranking update failed:', error);
    // エラーハンドリングをここに記述
  }
};

// ランキングを更新し、バックエンドに送信する関数
const updateRanking = async () => {
  const newEntry = { username: username, score: totalPrice };

console.log(process.env.REACT_APP_API_URL)

// バックエンドに新しいランキングエントリーをPOSTリクエストで送信
try {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/rankings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ranking: newEntry }),
  });
  if (!response.ok) {
    const errorText = await response.text(); // もしくは response.json() もしそのレスポンスがJSONの場合
    throw new Error(`Server response wasn't OK: ${errorText}`);
  }
  // ここで必要に応じてレスポンスを処理
} catch (error) {
  console.error('Error posting ranking:', error);
}
};

// ローカルランキングを更新する関数（オプション）
const updateLocalRanking = () => {
  let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
  const newEntry = { username: username, score: totalPrice };

  // 新しいスコアをランキングに追加
  ranking.push(newEntry);

  // スコアでランキングを降順にソート
  ranking.sort((a, b) => b.score - a.score);

  // ランキングをトップ10に制限
  ranking = ranking.slice(0, 10);

  // ランキングをローカルストレージに保存
  localStorage.setItem('ranking', JSON.stringify(ranking));
};


  return (
    <div>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>結果</h1>
        <p>ユーザー名: {username}</p>
        <h2>獲得アイテム</h2>
        <ul>
        {Array.from(collectedItems.reduce((map, item) => {
            if (!map.has(item.name)) {
            map.set(item.name, { ...item, count: 0 });
        }
            map.get(item.name).count += item.count;
          return map;
        }, new Map()).values()).map((item, index) => (
        <p key={index} className="text-back">{`${item.name} × ${item.count}`}</p>
        ))}
      </ul>
        <p>合計金額: {totalPrice.toLocaleString('ja-JP')}円</p>
          {totalPrice >= 100000000 ? (
          <p>🎉 すごい！合計金額が1億円以上です！ 🎉</p>
          ) : totalPrice >= 10000000 ? (
          <p>🥳 合計金額が1000万円以上です！ 🥳</p>
          ) : totalPrice >= 5000000 ? (
          <p>😮 合計金額が500万円以上です！ 😮</p>
          ) : (
          <p>高得点を目指して頑張りましょう！</p>
          )}
        <button onClick={postToTwitter}>Twitterに投稿する</button>
        <h2>プレイありがとう</h2>
      </motion.div>
      <div>
      <button onClick={goToHome}>ホームに戻る</button>
      <button onClick={goToRanking}>ランキングを見る</button>
    </div>
    </div>
  );
}

export default NextPageComponent;
