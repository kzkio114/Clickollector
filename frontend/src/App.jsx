import React from 'react';
import ImageGallery from './components/ImageGallery/ImageGallery';
import WeaponSelector from './components/WeaponSelector/WeaponSelector';
import ItemSearch from './components/ItemSearch/ItemSearch';


function App() {
  return (
    <div className="App">
      <h1>何が出るかな？？どうかな？？</h1>
      <ImageGallery />  {/* ImageGalleryコンポーネントを呼び出す */}
      <WeaponSelector /> {/* WeaponSelectorコンポーネントを呼び出す */}
      <ItemSearch />     {/* ItemSearchコンポーネントを呼び出す */}
    </div>
  );
}

export default App;