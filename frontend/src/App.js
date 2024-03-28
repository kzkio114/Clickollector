import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Switch ではなく Routes をインポート
import ImageGallery from './components/ImageGallery/ImageGallery';
import WeaponSelector from './components/WeaponSelector/WeaponSelector';
import ItemSearch from './components/ItemSearch/ItemSearch';
import NextPageComponent from './components/NextPageComponent/NextPageComponent';
import Desert from './components/Map/Desert';
import Sea from './components/Map/Sea';
import Mountain from './components/Map/Mountain';
import Username from './components/Username/Username';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Username />
              {/* <WeaponSelector /> この行がコメントアウトされています */}
              <ImageGallery />
              {/* 他に表示したいコンポーネントがあればここに追加 */}
            </>
          } />
          <Route path="/next" element={<NextPageComponent />} />
          <Route path="/weapons" element={<WeaponSelector />} />
          <Route path="/items" element={<ItemSearch />} />
          <Route path="/" element={<WeaponSelector />} />
          <Route path="/desert" element={<Desert />} />
          <Route path="/sea" element={<Sea />} />
          <Route path="/mountain" element={<Mountain />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
