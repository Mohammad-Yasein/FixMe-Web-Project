import React from 'react';
import { Router } from '@reach/router';

import RegistrationForm from './components/RegistrationForm';

const App = () => {
  return (
    <Router>
      <RegistrationForm path="/register" />
    </Router>
  );
};

export default App;
