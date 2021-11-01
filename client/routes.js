import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';

import { AddProduct, AllProducts, LandingPage, SingleProduct, Scan, ScanSuccess} from './components';
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/products/:id" component={SingleProduct} />
      <Route path="/products" component={AllProducts} />
      <Route exact path="/scanSuccess" component={ScanSuccess} />
      <Route path="/scan" component={Scan} />
    </Switch>
  );
}

export default Routes;
