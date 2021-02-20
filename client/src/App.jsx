import React from 'react';
import { Router } from '@reach/router';

import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';

const App = () => {
  return (
    <Router>
      <RegistrationForm path="/register" />
      <LoginForm path="/login" />
    </Router>
  );
};

export default App;
