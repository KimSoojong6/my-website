import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const cardsData = [
  { id: 0, title: 'Pet Store Locator Calgary', link: 'https://example.com/0' },
  { id: 1, title: 'Capstone Project W2025', link: 'https://example.com/1' },
  { id: 2, title: 'Project 2', link: 'https://example.com/2' },
  { id: 3, title: 'Project 3', link: 'https://example.com/3' },
  { id: 4, title: 'Project 4', link: 'https://example.com/4' },
  { id: 5, title: 'Project 5', link: 'https://example.com/5' },
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500); // Delay for fade-in animation
  }, []);

  const getVisibleCards = () => {
    return [-1, 0, 1].map((offset) => {
      const index = (activeIndex + offset + cardsData.length) % cardsData.length;
      return { ...cardsData[index], position: offset };
    });
  };

  const handleCardClick = (card) => {
    if (card.position === 0) {
      window.open(card.link, '_blank');
    }
  };

  const handleNext = () => {
    if (!isAnimating) {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % cardsData.length);
      setIsAnimating(true);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setDirection(-1);
      setActiveIndex((prev) => (prev - 1 + cardsData.length) % cardsData.length);
      setIsAnimating(true);
    }
  };

  const getCardPosition = (position) => {
    if (position === -1 && direction === -1) return -800;
    if (position === 1 && direction === 1) return 800;
    return position * 500;
  };

  return (
    <motion.div
      className="app-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      {/* Menu Bar */}
      <div className="menu-bar">
        <a
          href="https://www.linkedin.com/in/soojongkim6/"
          target="_blank"
          rel="noopener noreferrer"
          className="menu-link"
        >
          About Me
        </a>
      </div>

      {/* Previous button "<" */}
      <button className="nav-button prev-button" onClick={handlePrev}>
        {'<'}
      </button>
      {/* Next Button ">" */}
      <button className="nav-button next-button" onClick={handleNext}>
        {'>'}
      </button>

      {/* Card Container */}
      <div className="card-container">
        <AnimatePresence
          initial={false}
          custom={direction}
          onExitComplete={() => setIsAnimating(false)}
        >
          {getVisibleCards().map((card) => (
            <motion.div
              key={card.id}
              onClick={() => handleCardClick(card)}
              initial={{
                x: getCardPosition(card.position),
                opacity: 0,
              }}
              animate={{
                x: card.position * 500,
                opacity: 1,
                scale: card.position === 0 ? 1 : 0.9,
                zIndex: card.position === 0 ? 10 : card.position === 1 ? 5 : 1,
                filter: card.position === 0 ? 'none' : 'blur(4px)',
              }}
              whileHover={card.position === 0 ? { scale: 1.1 } : {}}
              exit={{
                x: direction === 1 ? -800 : 800,
                opacity: 0,
              }}
              transition={{ type: 'spring', stiffness: 150, damping: 25 }}
              className="card"
            >
              {card.title}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default App;
