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
  const { setUsername, username, collectedItems } = useGameState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [localUsername, setLocalUsername] = useState(""); // ユーザー名入力用のローカルステート
  const [isUsernameSubmitted, setIsUsernameSubmitted] = useState(false); // ユーザー名が送信されたかどうか

  useEffect(() => {
    // アイテムの合計金額を計算
    const price = collectedItems.reduce((acc, item) => acc + (itemPrices[item.name] * item.count), 0);
    setTotalPrice(price);
  }, [collectedItems]);

  const handleUsernameChange = (e) => {
    setLocalUsername(e.target.value);
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    setUsername(localUsername);
    setIsUsernameSubmitted(true); // ユーザー名が送信されたとマーク
  };

// Twitterに投稿する関数
const postToTwitter = () => {
  // アプリのURL
  const appUrl = "https://clickollector-4d5bda395d4c.herokuapp.com";
  const tweetText = `${username}、合計金額: ${totalPrice}円でした！ #Clickollector ${appUrl}`;
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
      {username && isUsernameSubmitted ? (
        // ユーザー名が設定されており、送信されている場合は結果を表示
        <>
          <h1>結果</h1>
          <p>ユーザー名: {username}</p>
          <h2>獲得アイテム</h2>
          <ul>
            {collectedItems.map((item, index) => (
              <li key={index}>{`${item.name} × ${item.count}`}</li>
            ))}
          </ul>
          <p>合計金額: {totalPrice}円</p>
          <motion.div
            initial={{ x: 200, opacity: 0 }} // 初期状態 motion　左から右に移動し、透明度を0から1に変化
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
          <button onClick={postToTwitter}>Twitterに投稿する</button>
          </motion.div>
          <h2>プレイありがとう</h2>
        </>
      ) : (
        // ユーザー名が設定されていない、または送信されていない場合はフォームを表示
        <form onSubmit={handleUsernameSubmit}>
          <label htmlFor="username">そういえば、あなたの名前は？</label>
          <input
            id="username"
            value={localUsername}
            onChange={handleUsernameChange}
            required
          />
          <button type="submit">登録</button>
        </form>
      )}
    </motion.div>
  </div>
);
}

export default NextPageComponent;
