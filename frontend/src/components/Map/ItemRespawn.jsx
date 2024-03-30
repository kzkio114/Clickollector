import React, { useState, useEffect } from 'react';
import { useGameState } from '../Username/GameStateContext'; // 正確なパスに注意してください

const itemNames = ["石", "溶岩石", "火の石", "強い炎の石", "賢者の石"];

function ItemRespawn({ imageUrl, width, height }) {
  const [items, setItems] = useState([]);
  const { addItem, collectedItems } = useGameState();
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
    addItem({ name: itemName });
  };

  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, width: `${width}px`, height: `${height}px` }}>
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => handleItemClick(item.name)}
            style={{ position: 'absolute', top: `${item.top}%`, left: `${item.left}%`, opacity: 1 }}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="absolute right-0 top-0 p-4">
        <h2 className="text-lg font-semibold">獲得アイテム:</h2>
        {collectedItems.map((item, index) => (
          <p key={index}>{`${item.name} × ${item.count}` }</p>
        ))}
      </div>
    </>
  );
}

export default ItemRespawn;
