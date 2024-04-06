import React, { useEffect, useState } from 'react';

function RankingPage() {
  const [onlineRanking, setOnlineRanking] = useState([]);
  const [recentLocalScores, setRecentLocalScores] = useState([]);

  useEffect(() => {
    // オンラインランキングデータをAPIから取得して加工する
    const fetchOnlineRankingData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/rankings`);
        const data = await response.json();

        // 取得したデータから各ユーザーの累計スコアと最高スコアを計算
        const userScores = data.reduce((acc, current) => {
          const user = acc.find(u => u.username === current.username);
          if (user) {
            user.totalScore += current.score;
            user.highestScore = Math.max(user.highestScore, current.score);
          } else {
            acc.push({
              username: current.username,
              totalScore: current.score,
              highestScore: current.score,
            });
          }
          return acc;
        }, []);

        // 集計したスコアを基にランキングをソートして設定
        userScores.sort((a, b) => b.totalScore - a.totalScore);
        setOnlineRanking(userScores);
      } catch (error) {
        console.error('Failed to fetch online ranking data:', error);
      }
    };

  // ローカルランキングデータをローカルストレージから取得
  const loadRecentLocalScores = () => {
    const storedData = JSON.parse(localStorage.getItem('ranking')) || [];
    // 最新5件の成績を取得
    const recentScores = storedData.slice(-10).reverse();
    setRecentLocalScores(recentScores);
  };

  fetchOnlineRankingData();
  loadRecentLocalScores();
}, []);

return (
  <div className="container mx-auto p-1">
    <div className="flex justify-center gap-8">
      {/* みんなのランキング */}
      <div className="w-1/2 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl text-center font-semibold mb-4">みんなのランキング</h2>
        {/* ランキングのリスト */}
        <ol>
          {onlineRanking.map((entry, index) => (
            <li key={index} className="flex justify-between py-1">
            <div className="bg-blue-50 p-2 rounded w-full text-center">
            <span className="mr-7">{index + 1}. {entry.username}</span>
            <span className="mr-5">最高 {entry.highestScore.toLocaleString('ja-JP')}円</span>
            <span className="mr-5">累計 {entry.totalScore.toLocaleString('ja-JP')}円</span>
            </div>
          </li>
        ))}
      </ol>
    </div>

      {/* 最近の成績 */}
      <div className="w-1/2 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-xl text-center font-semibold mb-4">最近の成績</h2>
        {/* 成績のリスト */}
        <div className="flex flex-wrap justify-center">
          {recentLocalScores.map((score, index) => (
            <div key={index} className="w-1/2 p-2">
                <div className="bg-blue-50 p-2 rounded">
                  {score.date} {score.username} {score.score.toLocaleString()}円
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
</div>
);
}

export default RankingPage;