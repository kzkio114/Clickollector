import React, { useEffect, useState } from 'react';

function ImageGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Rails APIから画像データを取得
    fetch('http://localhost:3000/api/v1/images')
      .then(response => response.json())
      .then(data => setImages(data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div>
      {images.map(image => (
        <div key={image.name}>
          <img src={image.direct_link} alt={image.name} />
          <p>{image.name}</p>
        </div>
      ))}
    </div>
  );
}

export default ImageGallery;
