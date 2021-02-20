import React from 'react';
import { Router } from '@reach/router';

import Header from './components/Header';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <RegistrationForm path="/register" />
        <LoginForm path="/login" />
      </Router>
    </>
  );
};

export default App;
