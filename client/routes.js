import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';

import { AllTopics, LandingPage, SingleTopic } from './components';
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/topics/:id" component={SingleTopic} />
      <Route path="/topics" component={AllTopics} />
    </Switch>
  );
}

export default Routes;
