import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Switch ではなく Routes をインポート
import ImageGallery from './components/ImageGallery/ImageGallery';
import WeaponSelector from './components/WeaponSelector/WeaponSelector';
import ItemSearch from './components/ItemSearch/ItemSearch';
import NextPageComponent from './components/NextPageComponent/NextPageComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>ゲーム作成中</h1>
        <Routes>
          <Route path="/" element={
            <>
              <WeaponSelector />
              <ImageGallery />
              {/* 他に表示したいコンポーネントがあればここに追加 */}
            </>
          } />
          <Route path="/next" element={<NextPageComponent />} />
          <Route path="/weapons" element={<WeaponSelector />} />
          <Route path="/items" element={<ItemSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
