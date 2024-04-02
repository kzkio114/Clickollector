// NextPageComponent.js
import React, { useEffect, useState } from 'react';
import { useGameState } from '../Username/GameStateContext'; // 正確なパスに注意
import { motion } from 'framer-motion';

const itemPrices = {
  "石": 10,
  "溶岩石": 550,
  "火の石": 3330,
  "強い炎の石": 7000,
  "賢者の石": 1000000
};

function NextPageComponent() {
  const { username, setUsername, collectedItems} = useGameState();
  const [totalPrice, setTotalPrice] = useState(0);

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

    if (totalPrice >= 200000000) {
      message = "🎉 すごい！合計金額が2億円以上です！ 🎉";
    } else if (totalPrice >= 100000000) {
      message = "🥳 合計金額が1億円以上です！ 🥳";
    } else if (totalPrice >= 50000000) {
      message = "😮 合計金額が5000万円以上です！ 😮";
    } else {
      message = "高得点を目指して頑張りましょう！";
    }

    const tweetText = `${username}、${message} 合計金額: ${totalPrice.toLocaleString('ja-JP')}円でした！ #Clickollector ${appUrl}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(url, '_blank');
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
          {collectedItems.map((item, index) => (
            <li key={index}>{`${item.name} × ${item.count}`}</li>
          ))}
        </ul>
        <p>合計金額: {totalPrice.toLocaleString('ja-JP')}円</p>
          {totalPrice >= 200000000 ? (
          <p>🎉 すごい！合計金額が2億円以上です！ 🎉</p>
          ) : totalPrice >= 100000000 ? (
          <p>🥳 合計金額が1億円以上です！ 🥳</p>
          ) : totalPrice >= 50000000 ? (
          <p>😮 合計金額が5000万円以上です！ 😮</p>
          ) : (
          <p>高得点を目指して頑張りましょう！</p>
          )}
        <button onClick={postToTwitter}>Twitterに投稿する</button>
        <h2>プレイありがとう</h2>
      </motion.div>
    </div>
  );
}

export default NextPageComponent;
