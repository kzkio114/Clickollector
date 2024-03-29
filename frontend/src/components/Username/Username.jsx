import React, { useState, useEffect } from 'react'; // useState と useEffect をインポート
import { motion } from 'framer-motion';
import ImageGallery from '../ImageGallery/ImageGallery'; // 仮定のパス、実際のインポートパスに合わせてください

function App() {
  const [username, setUsername] = useState('');

  // コンポーネントのマウント時に localStorage からユーザー名を取得
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleRegister = (event) => {
    event.preventDefault();
    const name = event.target.elements.username.value; // 正確な要素の参照方法
    localStorage.setItem('username', name);
    setUsername(name);
  };

  const isRegistered = username.length > 0;

  return (
    <>
      {!isRegistered && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}// 初期状態 motion上から下に移動し、透明度を0から1に変化
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleRegister} className="registration-form">
            <label htmlFor="username">あなたの名前は？:</label>
            <input
              type="text"
              id="username"
              name="username" // input要素にname属性を追加
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <button type="submit">登録</button>
          </form>
        </motion.div>
      )}
      {isRegistered && (
        <>
          <motion.div
            initial={{ x: -100, opacity: 0 }} // 初期状態 motion　左から右に移動し、透明度を0から1に変化
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div>こんにちは、{username}さん！</div>
          </motion.div>
          <ImageGallery />
        </>
      )}
    </>
  );
}

export default App;
