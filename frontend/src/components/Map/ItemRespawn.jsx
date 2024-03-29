import React, { useState, useEffect } from 'react';

const itemNames = ["剣", "盾", "杖", "弓", "ポーション"];

function ItemRespawn({ imageUrl, width, height }) {
  const [items, setItems] = useState([]);
  // アイテムの取得回数を管理するオブジェクト
  const [collectedItemsCount, setCollectedItemsCount] = useState({});

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
    // 特定のアイテム（例: ポーション）は1個だけ取得可能にする
    if (itemName === "ポーション" && collectedItemsCount[itemName]) {
      // すでにポーションを取得している場合は何もしない
      return;
    }

    // それ以外のアイテム、またはポーションを初めて取得する場合
    setCollectedItemsCount(prev => ({
      ...prev,
      [itemName]: (prev[itemName] || 0) + 1,
    }));
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
        {Object.entries(collectedItemsCount).map(([itemName, count], index) => (
          <p key={index}>{`${itemName} × ${count}`}</p>
        ))}
      </div>
    </>
  );
}

export default ItemRespawn;
