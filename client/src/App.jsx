import React from 'react';
import { Router } from '@reach/router';

import Header from './components/Header';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import ArticlesListPage from './components/ArticlesListPage';
import ArticlePage from './components/ArticlePage';
import ProfilePage from './components/ProfilePage';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <RegistrationForm path="/register" />
        <LoginForm path="/login" />
        <HomePage path="/" />
        <ArticlesListPage path="/articles" />
        <ArticlePage path="/articles/:id" />
        <ProfilePage path="/profiles/:id" />
      </Router>
      <Footer />
    </>
  );
};

export default App;
