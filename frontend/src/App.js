import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowImage from './pages/load_img'

import ImageWithBoxes from './pages/ImageWithBoxes';
const App = () => {
  return (
    <div>
      <Router>
        <ShowImage />
      </Router>
    </div>
  );
};

export default App;