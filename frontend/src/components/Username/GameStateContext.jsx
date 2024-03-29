import React, { createContext, useContext, useState } from 'react';

const GameStateContext = createContext();

export const GameStateProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [collectedItems, setCollectedItems] = useState([]);

  // アイテムを追加する関数
  const addItem = (item) => {
    setCollectedItems(prevItems => [...prevItems, item]);
  };

  return (
    <GameStateContext.Provider value={{ username, setUsername, collectedItems, addItem }}>
      {children}
    </GameStateContext.Provider>
  );
};

// コンテキストを使用するためのカスタムフック
export const useGameState = () => useContext(GameStateContext);

