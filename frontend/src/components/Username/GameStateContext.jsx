import React, { createContext, useContext, useState, useEffect } from 'react';
// その他のコード...


const GameStateContext = createContext();

export const GameStateProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [collectedItems, setCollectedItems] = useState([]);
  const [currentStage, setCurrentStage] = useState(0); // 現在のステージを追跡するステート

  useEffect(() => {
    // マウント時にlocalStorageからユーザー名を読み込む
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    // usernameステートが変更されたらlocalStorageに保存する
    localStorage.setItem('username', username);
  }, [username]);

  // ステージを更新する関数
  const nextStage = () => {
    setCurrentStage(currentStage + 1);
  };

  // アイテムを追加する関数
  const addItem = (item) => {
    setCollectedItems((prevCollectedItems) => {
      // 以下の条件分岐で、新しいアイテムリストを作成する
      // 「賢者の石」の取得ロジック
      if (item.name === "賢者の石") {
        const alreadyCollectedInStage = prevCollectedItems.some(i => i.name === "賢者の石" && i.stage === currentStage);
        if (alreadyCollectedInStage) {
          // 既に取得している場合は、何も変更せずに現在のアイテムリストをそのまま返す
          console.log("このステージでは既に賢者の石を取得しています。");
          return prevCollectedItems;
        }
        // 未取得の場合は、新しいアイテムをアイテムリストに追加する
        return [...prevCollectedItems, { ...item, count: 1, stage: currentStage }];
      } else {
         // 「賢者の石」以外のアイテムの取得ロジック
        const existingItem = prevCollectedItems.find(i => i.name === item.name);
        if (existingItem) {
          // 既にリストにあるアイテムの場合は、そのアイテムの数を増やす
          return prevCollectedItems.map(i => i.name === item.name ? { ...i, count: i.count + 1 } : i);
        } else {
           // 新しいアイテムの場合はリストに追加
          return [...prevCollectedItems, { ...item, count: 1 }];
        }
      }
    });
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

