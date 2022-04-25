import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Switch, Redirect, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectIsAuth, selectCheckLogin, selectIsAdmin } from './redux/user/user.selector';
import { history, userList, checkAuthenticationStatus } from './redux/user/user.action';

import './App.css';

import Preloader from './components/preloader/preloader.component';
import ErrorPop from './components/error-popup/error-popup.component';
import ConfirmationPopup from './components/confirmation-popup/confirmation-popup.component';
// import ErrorBoundary from './components/error-boundary/error-boundary.component';

const Dashboard = lazy(() => import('./pages/dashboard/dashboard.component'));
const Admin = lazy(() => import('./pages/admin/admin.component'));
const Profile = lazy(() => import('./pages/profile/profile.component'));
const LandingPage = lazy(() => import('./pages/landing-page/landing-page.component'));

const addScripts = () => {
  const scripts = [
    'assets/js/owl-carousel.js',
    'assets/js/scrollreveal.min.js',
    'assets/js/waypoints.min.js',
    'assets/js/jquery.counterup.min.js',
    'assets/js/imgfix.min.js',
    'assets/js/custom.js'
  ]
  scripts.forEach(file => {
    const script = document.createElement("script");
    script.src = file;
    document.body.appendChild(script);
  })
}

function App({ isAuth, isAdmin, checkLogin, userList, checkAuthenticationStatus }) {

  useEffect(() => {
    checkAuthenticationStatus()
    addScripts();
    userList();
  }, [checkAuthenticationStatus])


  let routes = <Preloader />

  if (!checkLogin) {
    if (isAuth) {
      routes = (
        <Switch>
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/admin' render={() => isAdmin ? <Admin /> : <Redirect to='/dashboard' />} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/' component={LandingPage} />
          {/* <Redirect path="*" to='/' /> */}
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Redirect path="*" to='/' />
        </Switch>

      )
    }
  }


  return (
    <Router history={history}>
      <Suspense fallback={<Preloader />}>
        {routes}
      </Suspense>
      <ErrorPop />
      <ConfirmationPopup />
    </Router >
  );
}
const mapStateToProps = createStructuredSelector({
  isAuth: selectIsAuth,
  isAdmin: selectIsAdmin,
  checkLogin: selectCheckLogin
})

const mapDispatchToProps = dispatch => ({
  checkAuthenticationStatus: () => dispatch(checkAuthenticationStatus()),
  userList: () => dispatch(userList())
})
export default connect(mapStateToProps, mapDispatchToProps)(App);