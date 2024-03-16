import React, { useState } from 'react';

function WeaponSelector() {
  const [weapon, setWeapon] = useState(null);
  const [damage, setDamage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeapon = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3000/api/v1/weapons/select_weapon');
      if (!response.ok) {
        throw new Error('武器の取得に失敗しました。');
      }
      const data = await response.json();
      setWeapon(data.weapon);
      setDamage(data.damage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchWeapon} disabled={loading}>
        {loading ? '読み込み中...' : '武器を選択'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weapon && (
        <div>
          <h2>選択された武器: {weapon.name}</h2>
          <img src={weapon.direct_link} alt="Selected Weapon" className="w-96" />
          <p>ダメージ値: {damage}</p>
        </div>
      )}
    </div>
  );
}

export default WeaponSelector;

