import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Home from './pages/Home';
import Showcase from './pages/Showcase';

function App() {
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home hasSeenWelcome={hasSeenWelcome} onWelcomeComplete={() => setHasSeenWelcome(true)} />} />
        <Route path="/showcase" element={<Showcase />} />
      </Routes>
    </Router>
  );
}

export default App;
