import React, { useEffect, useState } from 'react';

function RankingPage() {
  const [ranking, setRanking] = useState([]);

  // ランキングをローカルストレージから読み込む
  useEffect(() => {
    const loadedRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    setRanking(loadedRanking);
  }, []);

  // ランキング情報を更新する関数
  const updateRanking = (username, totalPrice) => {
    let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const newEntry = { username, score: totalPrice };

    ranking.push(newEntry);
    ranking.sort((a, b) => b.score - a.score); // スコアで降順にソート
    ranking = ranking.slice(0, 10); // トップ10のみを保持

    localStorage.setItem('ranking', JSON.stringify(ranking));
    setRanking(ranking); // コンポーネントの状態を更新
  };

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
