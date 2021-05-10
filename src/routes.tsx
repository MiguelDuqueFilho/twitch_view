import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import TwitchUserList from './pages/TwitchUserList';
import DashboardBot from './pages/DashboardBot';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Landing} />
      <Route path='/twitch-user-list' component={TwitchUserList} />
      <Route path='/dashboard-bot' component={DashboardBot} />
    </BrowserRouter>
  );
};

export default Routes;
