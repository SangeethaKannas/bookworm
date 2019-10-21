import React from 'react';
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import HomePage from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import DashboardPage from './components/pages/DashboardPage'
import SignupPage from './components/pages/SignupPage'
import ConfirmationPage from './components/pages/ConfirmationPage'
import ForgotPasswordPage from './components/pages/ForgotPasswordPage'
import ResetPasswordPage from './components/pages/ResetPasswordPage'
import NewBookPage from './components/pages/NewBookPage'

import TopNavigation from './components/navigation/TopNavigation'
import UserRoute  from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";

const App = ({ location }) => {
  return (<div className='ui container'>
    <TopNavigation />
    <Route location={location} path='/' exact component={HomePage} />
    <Route location={location} path='/confirmation/:token' exact component={ConfirmationPage} />
    <GuestRoute location={location} path='/login' exact component={LoginPage} />
    <GuestRoute location={location} path='/forgot_password' exact component={ForgotPasswordPage} />
    <GuestRoute location={location} path='/signup' exact component={SignupPage} />
    <UserRoute location={location} path='/dashboard' exact component={DashboardPage} />
  </div>)
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired 
  })
}

export default App
