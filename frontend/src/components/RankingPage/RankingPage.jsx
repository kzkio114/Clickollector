import React, { useEffect, useState } from 'react';

function RankingPage() {
  const [ranking, setRanking] = useState([]);

  // ランキングをローカルストレージから読み込む
  useEffect(() => {
    const loadedRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    setRanking(loadedRanking);
  }, []);

  return (
    <div>
      <h1>ランキング</h1>
      <ol>
        {ranking.map((entry, index) => (
          <li key={index}>{entry.username}: {entry.score}点</li>
        ))}
      </ol>
      {/* ここで updateRanking を呼び出すトリガーを配置する */}
    </div>
  );
}

export default RankingPage;
