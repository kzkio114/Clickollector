import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState({});
  const [showImage, setShowImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 読み込み状態のステート
  const [showButton, setShowButton] = useState(true); // ボタンの表示状態を追加
  const navigate = useNavigate();

  useEffect(() => {
    console.log('API URL:', process.env.REACT_APP_API_URL); // ここで環境変数の値をログに出力
    setIsLoading(true); // データの読み込みを開始
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/images`)
      .then(response => response.json())
      .then(data => {
        setImages(data);
        setIsLoading(false); // データの読み込みが完了
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setIsLoading(false); // エラーが発生したら読み込み状態を解除
      });
  }, []);

  const showRandomImage = () => {
    selectRandomImage();
    setShowImage(true);
    setShowButton(false); // ボタンを非表示に設定
  };

  const selectRandomImage = () => {
    if (!images || images.length === 0) {
      console.log('画像がありません。');
      setShowButton(true);
      return;
    }
    // 各画像に等確率でランダムに選択する
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);
  };


  const handleImageClick = () => {
    const route = getRouteBasedOnImageName(selectedImage.name);
    navigate(route);
  };

  const getRouteBasedOnImageName = (imageName) => {
   // ルートの条件分岐
   // if (imageName.includes('砂漠')) {
   //   return '/desert';
   // } else if (imageName.includes('海')) {
   //  return '/sea';
    if (imageName.includes('火山')) { //} else削除ずみ
      return '/mountain';
    }
   // return '/default-route'; // デフォルトのルート
  };

  return (
    <div>
      {showButton && !isLoading && ( // ボタンはロード中でない、かつshowButtonがtrueの時のみ表示
        <button
          onClick={showRandomImage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          マップ選択！！
        </button>
      )}
      {showImage && selectedImage.direct_link && (
        <div>
          <img
            src={selectedImage.direct_link}
            alt={selectedImage.name}
            style={{ width: '500px', height: 'auto' }}
            onClick={handleImageClick}
          />
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
