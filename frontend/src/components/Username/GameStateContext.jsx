import React, { createContext, useContext, useState } from 'react';

const GameStateContext = createContext();

export const GameStateProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [collectedItems, setCollectedItems] = useState([]);

  // アイテムを追加する関数
  const addItem = (item) => {
    // 既存のアイテムを検索
    const existingItem = collectedItems.find(i => i.name === item.name);

    if (existingItem) {
      // 既存のアイテムが見つかった場合、数量を増やす
      setCollectedItems(
        collectedItems.map(i =>
          i.name === item.name ? { ...i, count: i.count + 1 } : i
        )
      );
    } else {
      // 新しいアイテムの場合、リストに追加
      setCollectedItems([...collectedItems, { ...item, count: 1 }]);
    }
  };

  return (
    <GameStateContext.Provider value={{ username, setUsername, collectedItems, addItem }}>
      {children}
    </GameStateContext.Provider>
  );
};

// コンテキストを使用するためのカスタムフック
export const useGameState = () => useContext(GameStateContext);
