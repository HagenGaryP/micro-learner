import React from 'react';
import { MenuSlide } from './components';
import Routes from './routes';

const App = () => {
  return (
    <div className="app-container">
      <MenuSlide />
      <Routes />
    </div>
  );
};

export default App;
