import React, { useEffect, useState } from 'react';

function RankingPage() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const loadedRanking = JSON.parse(localStorage.getItem('ranking')) || [];

    const userScores = loadedRanking.reduce((acc, { username, score }) => {
      if (!acc[username]) {
        acc[username] = { username, totalScore: 0, highestScore: 0 };
      }
      acc[username].totalScore += score;
      acc[username].highestScore = Math.max(acc[username].highestScore, score);
      return acc;
    }, {});

    const sortedUserScores = Object.values(userScores).sort((a, b) => b.totalScore - a.totalScore);

    setRanking(sortedUserScores);
  }, []);

  return (
    <div>
      <h1>ランキング</h1>
      <ol>
        {ranking.map((entry, index) => (
          <li key={index}>{index + 1}. {entry.username}: 累計 {entry.totalScore.toLocaleString('ja-JP')}円, 最高 {entry.highestScore.toLocaleString('ja-JP')}円</li>
        ))}
      </ol>
    </div>
  );
}

export default RankingPage;