import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Alert from '@material-ui/lab/Alert';
import '../styles/LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Sign In';
  }, []);

  const onSubmitHandler = e => {
    e.preventDefault();

    axios
      .post('http://localhost:8000/api/login', { email, password }, { withCredentials: true })
      .then(response => {
        const userId = response.data.userId;

        console.log(response.data);
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('username', response.data.username);
        navigate(`/profiles/${userId}`);
      })
      .catch(error => {
        console.log(error);
        setError('INVALID EMAIL OR PASSWORD!');
      });
  };

  return (
    <Box component="div" className="login-form-bg">
      <Box component="div" className="login-form-overlay">
        <Container maxWidth="sm" className="login-form py-5">
          {error && (
            <Box component="div" className="w-75 mx-auto">
              <Alert severity="error" variant="outlined" className="mb-2">
                {error}
              </Alert>
            </Box>
          )}
          <form
            noValidate
            autoComplete="off"
            className="w-75 mx-auto py-5"
            onSubmit={e => onSubmitHandler(e)}
          >
            <h3 className="font-weight-bold mb-4">Sign In</h3>
            <FormGroup className="mb-4">
              <TextField id="email" label="Email" onChange={e => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup className="mb-4">
              <TextField
                type="password"
                id="password"
                label="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </FormGroup>
            <Box component="div" className="mb-5">
              <span className="text-muted">Not registered yet? </span>
              <Link href="/register">register now</Link>
            </Box>
            <Box component="div" className="text-right">
              <Button type="submit" variant="outlined" color="secondary" className="px-5 py-2">
                Login
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default LoginForm;
