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
import '../styles/RegistrationForm.css';

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    document.title = 'Sign Up';
  }, []);

  const onSubmitHandler = e => {
    e.preventDefault();

    axios
      .post(
        'http://localhost:8000/api/register',
        { firstName, lastName, email, password },
        { withCredentials: true }
      )
      .then(response => {
        const userId = response.data.userId;

        console.log(response.data);
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('username', response.data.username);
        navigate(`/profiles/${userId}`);
      })
      .catch(error => {
        const errorResponse = error.response.data.errors;
        const errorList = [];

        for (const key of Object.keys(errorResponse)) {
          errorList.push(errorResponse[key].message);
        }
        setErrors(errorList);
      });
  };

  return (
    <Box component="div" className="reg-form-bg">
      <Box component="div" className="reg-form-overlay">
        <Container maxWidth="sm" className="reg-form py-5">
          {errors.length > 0 && (
            <Box component="div" className="w-75 mx-auto">
              {errors.map((error, idx) => (
                <Alert severity="error" variant="outlined" className="mb-2" key={idx}>
                  {error}
                </Alert>
              ))}
            </Box>
          )}
          <form
            noValidate
            autoComplete="off"
            className="w-75 mx-auto py-5"
            onSubmit={e => onSubmitHandler(e)}
          >
            <h3 className="font-weight-bold mb-4">Sign Up</h3>
            <FormGroup className="mb-4">
              <TextField id="firstName" label="First Name" onChange={e => setFirstName(e.target.value)} />
            </FormGroup>
            <FormGroup className="mb-4">
              <TextField id="lastName" label="Last Name" onChange={e => setLastName(e.target.value)} />
            </FormGroup>
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
              <span className="text-muted">Already registered? </span>
              <Link href="/login">login now</Link>
            </Box>
            <Box component="div" className="text-right">
              <Button type="submit" variant="outlined" color="secondary" className="px-5 py-2">
                Register
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default RegistrationForm;
