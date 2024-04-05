import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageGallery from './components/ImageGallery/ImageGallery';
import WeaponSelector from './components/WeaponSelector/WeaponSelector';
import ItemSearch from './components/ItemSearch/ItemSearch';
import NextPageComponent from './components/NextPageComponent/NextPageComponent';
import Desert from './components/Map/Desert';
import Sea from './components/Map/Sea';
import Mountain from './components/Map/Mountain';
import Username from './components/Username/Username';
import { GameStateProvider } from './components/Username/GameStateContext'; // UserContextからUserProviderをインポート
import Title from './components/Title/Title';
import RankingPage from './components/RankingPage/RankingPage';



function App() {
  return (
    <GameStateProvider> {/* UserProviderで全体をラップ */}
      <Router>
        <div className="App">
        <Title>Clickollector</Title> {/* アプリのタイトル */}
          <Routes>
            <Route path="/" element={
              <>
                <Username />
                {/* <WeaponSelector /> */}
                {/* <ImageGallery />*/}
                {/* 他に表示したいコンポーネントがあればここに追加 */}
              </>
            } />
            <Route path="/next" element={<NextPageComponent />} />
            <Route path="/weapons" element={<WeaponSelector />} />
            <Route path="/items" element={<ItemSearch />} />
            <Route path="/desert" element={<Desert />} />
            <Route path="/sea" element={<Sea />} />
            <Route path="/mountain" element={<Mountain />} />
            <Route path="/ranking" element={<RankingPage />} />
          </Routes>
        </div>
      </Router>
    </GameStateProvider>
  );
}

export default App;
