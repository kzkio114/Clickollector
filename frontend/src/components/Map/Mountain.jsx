import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemRespawn from './ItemRespawn'; // ItemRespawn コンポーネントをインポート

function Mountain() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(500); // タイマーを60秒に設定
  const navigate = useNavigate(); // ナビゲーションのためのフック
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });// 画像の読み込み完了時にサイズを取得するための状態
  const [imageKey, setImageKey] = useState(Date.now());// 画像とアイテム配置を更新するための状態変数を追加

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/images`)
      .then(response => response.json())
      .then(data => {
        const mountain = data.filter(image => image.name.includes('火山'));
        setImages(mountain);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const countdown = timer > 0 && setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      // タイマーが0になったら指定したページに遷移
      navigate('/'); // ここでは例としてホームページへの遷移を設定
    }
  }, [timer, navigate]);

   // 画像読み込み完了時のハンドラ
   const onImageLoad = ({ target: img }) => {
    setImageSize({
      width: img.offsetWidth,
      height: img.offsetHeight,
    });
  };

   // ランダムな画像を選択する関数
   const selectRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);
    // 新しい画像が選択されるたびにサイズの状態をリセット
    //setImageSize({ width: 0, height: 0 });
     // 新しい画像が選択されるたびに key を更新
    setImageKey(Date.now());
  };

  // コンポーネントがマウントされた時に初めてランダムな画像を選択
  useEffect(() => {
    if(images.length > 0) {
      selectRandomImage();
    }
  }, [images]);

  if (isLoading) return <div>Loading...</div>;
  if (!images.length) return <div>火山の画像がありません。</div>;

  // Mountain コンポーネントの例
  return (
    <div className="relative"> {/* ここで relative を設定 */}
      {selectedImage && (
        <div className="relative w-full h-auto"> {/* ここで画像の幅と高さを指定 */}
        {/* onLoad を使って画像の読み込み完了時にサイズを取得 */}
        <img
          src={selectedImage.direct_link}
          alt={selectedImage.name}
          draggable="false"
          className="w-full h-auto"
          onLoad={onImageLoad}
        />
        
        {/* ItemRespawn コンポーネントに画像サイズを渡す */}
        <ItemRespawn key={imageKey} imageUrl={selectedImage.direct_link} width={imageSize.width} height={imageSize.height} />
          {/* タイマーとボタンを囲むdiv */}
          <div className="absolute top-0 left-0 p-4">
            {/* タイマー表示 */}
            <p className="text-white bg-black bg-opacity-50 p-2 rounded">
              残り時間: {timer}秒
            </p>
            {/* ボタン */}
            <button
              onClick={() => selectRandomImage(images)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
            >
              次のステージを表示
            </button>
          </div>
        </div>
      )}
      {/* 他のメッセージ表示 */}
      {isLoading && <div>Loading...</div>}
      {!isLoading && !images.length && <div>火山の画像がありません。</div>}
    </div>
  );
}

export default Mountain;