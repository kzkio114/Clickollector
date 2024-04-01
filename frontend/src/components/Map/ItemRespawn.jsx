import React, { useState, useEffect } from 'react';
import { useGameState } from '../Username/GameStateContext'; // 正確なパスに注意してください
import { motion } from 'framer-motion';

const itemNames = ["石", "溶岩石", "火の石", "強い炎の石", "賢者の石"];

function ItemRespawn({ imageUrl, width, height }) {
  const [items, setItems] = useState([]);
  const { addItem, collectedItems, currentStage } = useGameState();
  // アイテムの取得回数を管理するオブジェクト


  useEffect(() => {
    if (width > 0 && height > 0) {
      const newItems = generateRandomItems(10);
      setItems(newItems);
    }
  }, [imageUrl, width, height]);

  const generateRandomItems = (count) => {
    return Array.from({ length: count }, () => {
      const randomIndex = Math.floor(Math.random() * itemNames.length);
      return {
        id: Math.random(),
        name: itemNames[randomIndex],
        top: Math.random() * 100,
        left: Math.random() * 100,
      };
    });
  };

  const handleItemClick = (itemName) => {
  // 「賢者の石」は各ステージで1つだけ取得可能
  if (itemName === "賢者の石") {
    // 現在のステージで既に「賢者の石」が取得されているかチェック
    const alreadyCollected = collectedItems.some(item => item.name === "賢者の石" && item.stage === currentStage);
    if (alreadyCollected) {
      return; // 既に取得されていれば何もしない
    }
    // 取得されていなければアイテムを追加（ステージ情報も追加）
    addItem({ name: itemName, count: 1, stage: currentStage });
  } else {
    // その他のアイテムの場合は通常通り追加
    addItem({ name: itemName, count: 1 });
  }
};

  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, width: `${width}px`, height: `${height}px` }}>
        {items.map((item, index) => (
         <motion.button
         key={item.id}
         onClick={() => handleItemClick(item.name)}
         whileHover={{ scale: 1.1, backgroundColor: "#ff0000" }} // ホバー時に拡大し、背景色を赤に
         whileTap={{ scale: 0.95 }} // タップ（クリック）時に少し縮小
         style={{
           position: 'absolute',
           top: `${item.top}%`,
           left: `${item.left}%`,
           backgroundColor: '#000000', // 通常時の背景色をHEX形式に
           border: 'none',
           borderRadius: '50%',
           padding: '10px',
           cursor: 'pointer',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
           color: 'white'
         }}
       >
         {/* アイコンやテキストなど */}
       </motion.button>
        ))}
      </div>
      <div className="absolute right-0 top-0 p-4">
      <h2 className="text-lg font-semibold text-white">獲得アイテム:</h2>
      {collectedItems.map((item, index) => (
      <p key={index} className="text-white">{`${item.name} × ${item.count}`}</p>
     ))}
    </div>
    </>
  );
}

export default ItemRespawn;
