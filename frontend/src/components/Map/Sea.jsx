import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Sea() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(600); // タイマーを60秒に設定
  const navigate = useNavigate(); // ナビゲーションのためのフック

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/images`)
      .then(response => response.json())
      .then(data => {
        // 「山」ではなく「砂漠」を含む画像のみをフィルタリング
        const SeaImages = data.filter(image => image.name.includes('海'));
        setImages(SeaImages);
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
  if (!images.length) return <div>Mapがありません。</div>;

  return (
    <div>
      <p>残り時間: {timer}秒</p>
      <button onClick={selectRandomImage}>次のステージを表示</button>
      {selectedImage && (
        <div>
          <img src={selectedImage.direct_link} alt={selectedImage.name} />
          <p>{selectedImage.description}</p>
        </div>
      )}
    </div>
  );
}

export default Sea;