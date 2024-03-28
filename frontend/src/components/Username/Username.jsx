import React, { useState } from 'react';

function Username() {
  const [username, setUsername] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // ここでユーザーネームを使用する処理を実装
    alert(`ユーザーネーム: ${username}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">ユーザーネーム:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button type="submit">登録</button>
    </form>
  );
}

export default Username;
