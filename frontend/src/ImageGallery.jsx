import React, { useEffect, useState } from 'react';

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/images')
      .then(response => response.json())
      .then(data => setImages(data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowImage(true);
  };

  // ランダムに画像を選択する関数
  const selectRandomImage = () => {
    if (images.length > 0) {
      const randomIndex = Math.floor(Math.random() * images.length);
      const randomImage = images[randomIndex].direct_link;
      setSelectedImage(randomImage);
    }
  };

  return (
    <div>
      {images.map(image => (
        <div key={image.name} onClick={() => handleImageClick(image.direct_link)}>
          <img src={image.direct_link} alt={image.name} style={{ width: '100px', height: 'auto' }} />
          <p>{image.name}</p>
        </div>
      ))}
      {showImage && (
        <div>
          <img src={selectedImage} alt="Selected" style={{ width: '300px', height: 'auto' }} />
        </div>
      )}
      <button onClick={selectRandomImage}>Show Random Image</button>
    </div>
  );
}

export default ImageGallery;
