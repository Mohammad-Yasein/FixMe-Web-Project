import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ChangingProgressProvider from './ChangingProgressProvider';
import 'react-circular-progressbar/dist/styles.css';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import '../styles/ProfilePage.css';

import gainData from '../assets/data/gainWeightPlan.json';
import loseData from '../assets/data/loseWeightPlan.json';

const ProfilePage = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [results, setResults] = useState({});
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState([]);
  const [isActive, setIsActive] = useState(true);

  const doCalculations = data => {
    // BMI = Weight (kg) / Height (m)²
    const bmi = data.weight / Math.pow(data.height, 2);
    // (Adult) body fat percentage = (1.39 * BMI) + (0.16 * age) - (10.34 * gender) - 9
    // gender is 0 if female and 1 if male to account for the lower body fat percentage of men.
    const gender = data.gender == 'female' ? 0 : 1;
    const bf = 1.39 * bmi + 0.16 * data.age - 10.34 * gender - 9;
    const wtStatus =
      bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normalweight' : bmi < 30 ? 'Overweight' : 'Obese';
    const femaleFatStatus = bf < 20 ? 'Athletes' : bf < 25 ? 'Fitness' : bf < 31 ? 'Average' : 'Obese';
    const maleFatStatus = bf < 14 ? 'Athletes' : bf < 18 ? 'Fitness' : bf < 25 ? 'Average' : 'Obese';
    const fatStatus = data.gender == 'female' ? femaleFatStatus : maleFatStatus;
    setResults({ bmi, bf, wtStatus, fatStatus });
  };

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');

    document.title = 'User Profile';

    axios
      .get(`http://localhost:8000/api/users/${userId}`, { withCredentials: true })
      .then(response => doCalculations(response.data))
      .catch(error => error.response.data);
  }, []);
  console.log(results);

  const onSubmitHandler = e => {
    e.preventDefault();
    const userId = sessionStorage.getItem('userId');

    axios
      .put(
        `http://localhost:8000/api/users/${userId}`,
        { gender, age, weight, height },
        { withCredentials: true }
      )
      .then(response => doCalculations(response.data))
      .catch(error => error.response.data);
  };

  return (
    <Box component="div" className="profile-bg">
      <Box component="div" className="profile-overlay">
        <Container maxWidth="lg" className="profile py-5">
          <Grid
            container
            style={{
              backgroundImage: '#fff',
              color: '#000',
            }}
            className="m-0 px-4"
          >
            <Grid item lg={6} md={12} sm={12} xs={12} className="px-5 py-5">
              <form
                noValidate
                autoComplete="off"
                className="w-75 mx-auto py-5"
                onSubmit={e => onSubmitHandler(e)}
              >
                <h2>{sessionStorage.getItem('username')}</h2>
                <p>Fill your information to get your plan</p>
                <FormGroup className="mb-4">
                  <TextField id="gender" label="Gender" onChange={e => setGender(e.target.value)} />
                </FormGroup>
                <FormGroup className="mb-4">
                  <TextField type="number" id="age" label="Age" onChange={e => setAge(e.target.value)} />
                </FormGroup>
                <FormGroup className="mb-4">
                  <TextField
                    type="number"
                    id="weight"
                    label="Weight"
                    onChange={e => setWeight(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="mb-4">
                  <TextField
                    type="number"
                    id="height"
                    label="Height"
                    onChange={e => setHeight(e.target.value)}
                  />
                </FormGroup>
                <Box component="div" className="text-right">
                  <Button type="submit" variant="outlined" color="secondary" className="px-5 py-2">
                    Submit
                  </Button>
                </Box>
              </form>
            </Grid>
            {results.bmi && (
              <Grid item lg={6} md={12} sm={12} xs={12} className="px-5 py-5">
                <Grid container>
                  <Grid item xs={6}>
                    <div className="text-center px-3">
                      <ChangingProgressProvider values={[0, Math.round(results.bmi)]}>
                        {percentage => (
                          <CircularProgressbar
                            value={percentage}
                            text={`${percentage}%`}
                            styles={
                              results.bmi < 18.5
                                ? ''
                                : results.bmi < 25
                                ? buildStyles({
                                    textColor: '#28a745',
                                    pathColor: '#28a745',
                                  })
                                : results.bmi < 30
                                ? buildStyles({
                                    textColor: '#ffc107',
                                    pathColor: '#ffc107',
                                  })
                                : buildStyles({
                                    textColor: '#dc3545',
                                    pathColor: '#dc3545',
                                  })
                            }
                          />
                        )}
                      </ChangingProgressProvider>
                      <div className="mt-4">
                        <h6 className="font-weight-bold">BMI Body Mass Index</h6>
                        <h5
                          className={`font-weight-bold ${
                            results.bmi < 18.5
                              ? 'text-primary'
                              : results.bmi < 25
                              ? 'text-success'
                              : results.bmi < 30
                              ? 'text-warning'
                              : 'text-danger'
                          }`}
                        >
                          {results.wtStatus}
                        </h5>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="text-center px-3">
                      <ChangingProgressProvider values={[0, Math.round(results.bf)]}>
                        {percentage => (
                          <CircularProgressbar
                            value={percentage}
                            text={`${percentage}%`}
                            styles={
                              gender == 'female'
                                ? results.bf < 20
                                  ? ''
                                  : results.bf < 25
                                  ? buildStyles({
                                      textColor: '#28a745',
                                      pathColor: '#28a745',
                                    })
                                  : results.bf < 31
                                  ? buildStyles({
                                      textColor: '#ffc107',
                                      pathColor: '#ffc107',
                                    })
                                  : buildStyles({
                                      textColor: '#dc3545',
                                      pathColor: '#dc3545',
                                    })
                                : results.bf < 14
                                ? ''
                                : results.bf < 18
                                ? buildStyles({
                                    textColor: '#28a745',
                                    pathColor: '#28a745',
                                  })
                                : results.bf < 25
                                ? buildStyles({
                                    textColor: '#ffc107',
                                    pathColor: '#ffc107',
                                  })
                                : buildStyles({
                                    textColor: '#dc3545',
                                    pathColor: '#dc3545',
                                  })
                            }
                          />
                        )}
                      </ChangingProgressProvider>
                      <div className="mt-4">
                        <h6 className="font-weight-bold">BFP Body Fat Percentage</h6>
                        <h5
                          className={`font-weight-bold ${
                            gender == 'female'
                              ? results.bf < 20
                                ? 'text-primary'
                                : results.bf < 25
                                ? 'text-success'
                                : results.bf < 31
                                ? 'text-warning'
                                : 'text-danger'
                              : results.bf < 14
                              ? 'text-primary'
                              : results.bf < 18
                              ? 'text-success'
                              : results.bf < 25
                              ? 'text-warning'
                              : 'text-danger'
                          }`}
                        >
                          {results.fatStatus}
                        </h5>
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <div className="text-center mt-5">
                  {results.bmi < 25 ? (
                    <>
                      <h1 className="user-plan text-danger">Gain Weight Plan</h1>
                      <Link
                        component="button"
                        onClick={() => {
                          setDisplay(true);
                          setData(gainData);
                        }}
                      >
                        check your plan
                      </Link>
                    </>
                  ) : (
                    <>
                      <h1 className="user-plan text-danger">Lose Weight Plan</h1>
                      <Link
                        component="button"
                        onClick={() => {
                          setDisplay(true);
                          setData(loseData);
                        }}
                      >
                        check your plan
                      </Link>
                    </>
                  )}
                </div>
              </Grid>
            )}
          </Grid>
          <div className="px-5">
            {display == true &&
              data.map((day, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={idx} id={idx}>
                        <h6 className="font-weight-bold">{`DAY ${idx + 1}`}</h6>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ul class="nav nav-tabs w-100">
                          <li class="nav-item">
                            <button
                              class={`nav-link${isActive ? ' active' : ''} px-5`}
                              onClick={() => {
                                setIsActive(true);
                              }}
                            >
                              Meals
                            </button>
                          </li>
                          <li class="nav-item">
                            <button
                              class={`nav-link${!isActive ? ' active' : ''} px-5`}
                              onClick={() => {
                                setIsActive(false);
                              }}
                            >
                              Workouts
                            </button>
                          </li>
                        </ul>
                      </AccordionDetails>
                      {isActive && (
                        <div className="p-4">
                          {day.meals.map((meal, idx) => {
                            return (
                              <React.Fragment key={idx}>
                                <Card className="mb-3">
                                  <CardActionArea>
                                    <CardContent>
                                      <Typography gutterBottom variant="h5" component="h2">
                                        {Object.keys(meal)[0]}
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" component="p">
                                        <div>{meal[`${Object.keys(meal)[0]}`]}</div>
                                      </Typography>
                                    </CardContent>
                                  </CardActionArea>
                                </Card>
                              </React.Fragment>
                            );
                          })}
                        </div>
                      )}
                      {!isActive && (
                        <div className="p-4">
                          {day.workouts.map((workout, idx) => {
                            return (
                              <React.Fragment key={idx}>
                                {idx == 0 ? (
                                  <h4 className="font-weight-bold text-uppercase text-primary mb-4 ml-1">
                                    {workout[`${Object.keys(workout)[0]}`]}
                                  </h4>
                                ) : (
                                  <Card className="mb-3">
                                    <CardActionArea>
                                      <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                          {Object.keys(workout)[0]}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                          <div>{workout[`${Object.keys(workout)[0]}`]}</div>
                                        </Typography>
                                      </CardContent>
                                    </CardActionArea>
                                  </Card>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      )}
                    </Accordion>
                  </React.Fragment>
                );
              })}
          </div>
        </Container>
      </Box>
    </Box>
  );
};

export default ProfilePage;
