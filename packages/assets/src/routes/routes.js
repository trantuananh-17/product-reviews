import React, {Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '@assets/loadables/Home/Home';
import NotFound from '@assets/loadables/NotFound/NotFound';
import {routePrefix} from '@assets/config/app';
import Loading from '@assets/components/Loading';
import ManageReviews from '@assets/loadables/ManageReviews';

// eslint-disable-next-line react/prop-types
const Routes = ({prefix = routePrefix}) => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route exact path={prefix + '/'} component={Home} />
      <Route exact path={prefix + '/review/list'} component={ManageReviews} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;
