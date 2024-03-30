import React from 'react';
import { motion } from 'framer-motion';
import './Title.css';

function Title({ children }) {
  return (
    <div className="title">
      <motion.h1
        className="app-title"
        initial={{ y: -550, opacity: 0 }} // 初期状態
        animate={{ y: 0, opacity: 1 }} // アニメーション後の状態
        transition={{ duration: 5.0 }} // アニメーションの持続時間
      >
        {children}
      </motion.h1>
    </div>
  );
}

export default Title;
