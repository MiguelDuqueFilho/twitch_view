import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import TwitchUserList from './pages/TwitchUserList';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Landing} />
      <Route path='/twitchuseract' component={TwitchUserList} />
    </BrowserRouter>
  );
};

export default Routes;
