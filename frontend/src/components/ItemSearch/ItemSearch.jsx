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
        //setFilteredItems(data); // 初期状態では全アイテムを表示
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

   // handleSearch関数の実装
const handleSearch = () => {
  // 入力された検索語に基づいてアイテムを検索するAPIエンドポイントにリクエストを送信
  fetch(`http://localhost:3000/api/v1/items/search?keyword=${encodeURIComponent(searchTerm)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // レスポンスデータ（検索結果）をfilteredItemsにセット
      setFilteredItems(data);
    })
    .catch(error => {
      console.error('検索中にエラーが発生しました:', error);
    });
};


  return (
    <div>
      <input
        type="text"
        placeholder="アイテムを検索..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input"
      />
      <button onClick={handleSearch}>検索</button>
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
