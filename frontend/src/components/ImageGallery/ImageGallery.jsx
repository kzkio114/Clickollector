import React, { useEffect, useState } from 'react';

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [showImage, setShowImage] = useState(false);
  // 最初はfalseにしておく

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/images')
      .then(response => response.json())
      .then(data => setImages(data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  // ランダムに画像を選択して表示する関数
  const showRandomImage = () => {
    selectRandomImage();
    setShowImage(true); // 画像を表示する
  };

  // ランダムに画像を選択する関数
  const selectRandomImage = () => {
    // images が null または undefined、または空配列の場合は処理を中断
    if (!images || images.length === 0) {
      console.log('画像がありません。');
      return;
    }
    // images が空でない場合はランダムに画像を選択
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex].direct_link);
  };


  return (
    <div>
      <button onClick={showRandomImage}className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      > 画像！！</button>
      {showImage && selectedImage && ( // showImageとselectedImageが真の時のみ表示
        <div>
          <img src={selectedImage} alt="Selected" style={{ width: '300px', height: 'auto' }} />
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
