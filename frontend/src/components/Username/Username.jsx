import React, { useState, useEffect } from 'react'; // useState と useEffect をインポート
import { motion } from 'framer-motion';
import ImageGallery from '../ImageGallery/ImageGallery'; // 仮定のパス、実際のインポートパスに合わせてください

function App() {
  const [username, setUsername] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  // コンポーネントのマウント時に localStorage からユーザー名を取得
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
      setIsRegistered(true);
    }
  }, []);


  const handleRegister = (event) => {
    event.preventDefault();
    const name = event.target.elements.username.value; // 正確な要素の参照方法
    localStorage.setItem('username', name);
    setUsername(name);
    setIsRegistered(true); // 登録処理後、登録状態を true に設定
  };

  // この関数で localStorage からユーザー名を削除
  const handleClearUsername = () => {
    localStorage.setItem('username', username);
    setUsername('');
    setIsRegistered(false);
  };



  return (
    <>
      {!isRegistered && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}// 初期状態 motion上から下に移動し、透明度を0から1に変化
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center h-screen" // これによりボタンは画面の中央に配置されます
        >
           {/* 冒険者かどうかを尋ねるセクション */}
           <p className="mb-4 text-xl font-semibold text-gray-800">画像をクリックしてアイテムを探して<br />お金持ちになろう！！</p>
           <button
             onClick={() => setIsRegistered(true)}
             className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
             >
             はい
             </button>
              <form onSubmit={handleRegister} className="registration-form">
            <label htmlFor="username">あなたの名前は？:</label>
            <input
              id="username"
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
            <p>冒険を楽しんでください！</p>
            {/* <div>初めまして、{username}さん！ 冒険スタートです！！</div> */}
          </motion.div>
          <ImageGallery />
          {/* ユーザー名をクリアするボタンを追加 */}
          <button onClick={handleClearUsername}>ユーザー名をクリア</button>
        </>
      )}
    </>
  );
}

export default App;
