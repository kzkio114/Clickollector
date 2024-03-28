import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Mountain() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(500); // タイマーを60秒に設定
  const navigate = useNavigate(); // ナビゲーションのためのフック

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

   // ランダムな画像を選択する関数
   const selectRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);
  };

  // コンポーネントがマウントされた時に初めてランダムな画像を選択
  useEffect(() => {
    if(images.length > 0) {
      selectRandomImage();
    }
  }, [images]);

  if (isLoading) return <div>Loading...</div>;
  if (!images.length) return <div>火山の画像がありません。</div>;

  return (
    <div className="relative"> {/* ここで relative を設定 */}
      {/* 画像を含むdiv */}
      {selectedImage && (
        <div className="relative"> {/* 画像を囲むdivにも relative を設定 */}
          <img src={selectedImage.direct_link} alt={selectedImage.name} draggable="false"  className="w-full h-auto" />
          {/* タイマーとボタンを囲むdiv */}
          <div className="absolute top-0 left-0 p-4"> {/* 絶対位置指定 */}
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