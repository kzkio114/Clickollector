import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const ImageMetaComponent = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    // APIから画像データを取得する
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/images`)
      .then(response => response.json())
      .then(data => {
        const selectedImage = data[Math.floor(Math.random() * data.length)];
        setImage(selectedImage);
      })
      .catch(error => console.error('Error fetching image data:', error));
  }, []);

  return (
    <div>
      <Helmet>
        <title>Clickollector</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kzkio_114" />
        <meta name="twitter:title" content="Clickollector" />
        <meta name="description" content="画像をクリックしてアイテムを探してお金持ちになろう！！" />
        <meta name="twitter:image" content={image?.direct_link || 'https://lh3.googleusercontent.com/d/1AfcdsCMSQ-5Z0M9-Sj5cymEDCCJUCaCg'} />
        {/* その他のメタタグ */}
      </Helmet>
      {/* 画像を削除したのでここには何も表示されない */}
    </div>
  );
};

export default ImageMetaComponent;

