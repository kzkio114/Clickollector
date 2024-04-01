import React, { createContext, useContext, useState, useEffect } from 'react';
// その他のコード...


const GameStateContext = createContext();

export const GameStateProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [collectedItems, setCollectedItems] = useState([]);
  const [currentStage, setCurrentStage] = useState(0); // 現在のステージを追跡するステート

  // ステージを更新する関数
  const nextStage = () => {
    setCurrentStage(currentStage + 1);
  };

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

  useEffect(() => {
    console.log('GameStateProviderでセットされたユーザー名:', username);
  }, [username]);


  return (
    <GameStateContext.Provider value={{ username, setUsername, collectedItems, addItem, currentStage, nextStage }}>
      {children}
    </GameStateContext.Provider>
  );
};

// コンテキストを使用するためのカスタムフック
export const useGameState = () => useContext(GameStateContext);

