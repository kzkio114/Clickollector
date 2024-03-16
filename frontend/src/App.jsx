import React from 'react';
import ImageGallery from './components/ImageGallery/ImageGallery';

function App() {
  return (
    <div className="App">
      <h1>何が出るかな？？どうかな？？</h1>
      <ImageGallery />  {/* ImageGalleryコンポーネントを呼び出す */}
    </div>
  );
}

export default App;