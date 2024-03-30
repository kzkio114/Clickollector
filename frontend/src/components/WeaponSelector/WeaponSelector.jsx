import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WeaponSelector() {
  const [keyword, setKeyword] = useState('');
  const [weapon, setWeapon] = useState(null);
  const [damage, setDamage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchCount, setSearchCount] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (searchCount >= 3) {
      setError('検索回数の上限に達しました。');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/v1/weapons/select_weapon?keyword=${encodeURIComponent(keyword)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('武器の取得に失敗しました。');
      }
      const data = await response.json();
      setWeapon(data.weapon);
      setDamage(data.damage);
      setSearchCount(searchCount + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    navigate('/map');
  };

  // 3回検索後は全てを非表示にするための条件チェック
  if (searchCount >= 3) {
    return (
      <div>
        <button onClick={handleConfirm}>マップに進む</button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="キーワードを入力..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">
          {loading ? '読み込み中...' : '武器を検索'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weapon && (
        <div>
          <h2>選択された武器: {weapon.name}</h2>
          <img src={weapon.direct_link} alt="Selected Weapon" className="w-64" />
          <p>ダメージ値: {damage}</p>
        </div>
      )}
    </div>
  );
}

export default WeaponSelector;
