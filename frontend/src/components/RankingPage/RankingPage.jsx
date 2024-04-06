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
    const recentScores = storedData.slice(-5).reverse();
    setRecentLocalScores(recentScores);
  };

  fetchOnlineRankingData();
  loadRecentLocalScores();
}, []);

return (
  <div className="flex gap-4"> {/* flexとgapでレイアウト調整 */}
    <div className="flex-1 border p-4 rounded-lg flex flex-col"> {/* flex-1で均等に、border,padding,roundedでスタイル調整 */}
      <h1 className="text-center mb-4">みんなのランキング</h1> {/* text-centerで中央揃え */}
      <ol>
        {onlineRanking.map((entry, index) => (
          <li key={index} className="flex justify-between py-2"> {/* pyで縦のパディング調整 */}
            <span>{index + 1}. {entry.username}</span>
            <span>累計 {entry.totalScore.toLocaleString('ja-JP')}円</span>
            <span>最高 {entry.highestScore.toLocaleString('ja-JP')}円</span>
          </li>
        ))}
      </ol>
    </div>

    <div className="flex-1 border p-4 rounded-lg overflow-y-auto max-h-96"> {/* overflow-y-autoでスクロール可能に、max-hで高さ制限 */}
      <h1 className="text-center mb-4">最近の成績</h1>
      <ul className="list-none pl-0">
        {recentLocalScores.map((score, index) => (
          <li key={index} className="py-2"> {/* pyで縦のパディング調整 */}
            {score.date} - {score.username}: {score.score}点
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}

export default RankingPage;