import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';

import { AddTopic, AllTopics, LandingPage, SingleTopic, Scan, ScanSuccess} from './components';
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/topics/add" component={AddTopic} />
      <Route exact path="/topics/:id" component={SingleTopic} />
      <Route path="/topics" component={AllTopics} />
      <Route exact path="/scanSuccess" component={ScanSuccess} />
      <Route path="/scan" component={Scan} />
    </Switch>
  );
}

export default Routes;
