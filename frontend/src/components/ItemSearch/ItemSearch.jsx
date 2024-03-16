import React, { useEffect, useState } from 'react';

function ItemSearch() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // アイテムデータをAPIから取得
    fetch('http://localhost:3000/api/v1/items')
      .then(response => response.json())
      .then(data => {
        setItems(data);
        setFilteredItems(data); // 初期状態では全アイテムを表示
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // searchTermが変更されたらフィルタリングを実行
    const results = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(results);
  }, [searchTerm, items]);

  return (
    <div>
      <input
        type="text"
        placeholder="アイテムを検索..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input"
      />
      {filteredItems.map((item) => (
        <div key={item.id} className="item">
          <h3>{item.name}</h3>
          <img src={item.image_url} alt={item.name} className="w-32 h-auto" />
          <p>{item.effect}</p>
        </div>
      ))}
    </div>
  );
}

export default ItemSearch;
