// App.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';

function Card({ content }) {
  return (
    <motion.div
      className="card"
      style={{
        width: '300px',
        height: '400px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {content}
    </motion.div>
  );
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = [
    { id: 1, content: 'Card 1' },
    { id: 2, content: 'Card 2' },
    { id: 3, content: 'Card 3' },
  ];

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };
  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="App" style={{ backgroundColor: '#fff', height: '100vh' }}>
      <motion.div
        className="cards-wrapper"
        style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
        animate={{ x: -activeIndex * 320 }} // 카드 하나의 너비 + gap(대략)
        transition={{ ease: 'easeInOut', duration: 0.5 }}
      >
        {cards.map((card) => (
          <Card key={card.id} content={card.content} />
        ))}
      </motion.div>

      {/* 좌우 이동 버튼 (필요하다면 최소화하거나 hover 시만 노출 가능) */}
      <div style={{ position: 'absolute', bottom: 50, width: '100%' }}>
        <button onClick={prevCard} style={{ marginRight: '20px' }}>Left</button>
        <button onClick={nextCard}>Right</button>
      </div>
    </div>
  );
}

export default App;