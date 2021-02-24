import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../styles/HomePage.css';
import siteAd from '../assets/videos/home.mp4';

const HomePage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    document.title = 'Welcome to FixMe Fitness';
    axios
      .get('http://localhost:8000/api/articles')
      .then(response => {
        console.log(response.data);
        setArticles(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }, []);

  return (
    <Box component="div" className="home-bg">
      <Box component="div" className="home-overlay">
        <video autoPlay loop muted className="home-video">
          <source src={siteAd} type="video/mp4" />
        </video>
        <Container maxWidth="lg" className="home p-5">
          <h1 className="intro text-danger text-lg-left text-center">BE FiT</h1>
          <p style={{ fontSize: '20px' }} className="text-justify mb-5">
          FixMe is a platform specialized in providing up-to-date advice on fitness and nutrition. 
          You can browse through our well-written and highly-informative health articles, as well as our high-quality workout guides. 
          You can get customized meal and workout plans based on your body measurements. Stay healthy and enjoy using FixMe!
          </p>
          <h1 className="intro text-danger text-lg-left text-center">Health Articles</h1>
          <Grid container>
            {articles.length > 0 &&
              articles.map((article, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <Grid item lg={4} md={12} sm={12} xs={12} className="px-2">
                      <Card className="mb-4">
                        <CardActionArea>
                          <CardMedia image={`../imgs/${article.title}.jpg`} style={{ height: '150px' }} />
                          <CardContent style={{ height: '175px' }}>
                            <Typography gutterBottom variant="h5" component="h2">
                              {article.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              <div>{article.author}</div>
                              <div>{article.publishedIn}</div>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => navigate(`/articles/${article._id}`)}
                          >
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  </React.Fragment>
                );
              })}
          </Grid>
          <h1 className="intro text-primary text-center mb-5">Our Trainers</h1>
          <Grid container>
            <Grid item lg={6} md={12} sm={12} xs={12} className="px-2">
              <Card className="mb-4" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <CardActionArea>
                  <CardMedia
                    image="../imgs/trainer1.jpg"
                    style={{ height: '150px', borderRadius: '50%', margin: '10px 37%' }}
                  />
                  <CardContent
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '5px',
                      height: '175px',
                      textAlign: 'center',
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="h2">
                      Trainer
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <div>Ghada Qaraeen</div>
                      <div>
                        Ghada is one of our highly-qualified trainers at FixMe. She is qualified to provide dietry plans along side training plans.
                        Her speciality is weight-loss and muscule building.

                      </div>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12} className="px-2">
              <Card className="mb-4" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <CardActionArea>
                  <CardMedia
                    image="../imgs/trainer1.jpg"
                    style={{ height: '150px', borderRadius: '50%', margin: '10px 37%' }}
                  />
                  <CardContent
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '5px',
                      height: '175px',
                      textAlign: 'center',
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="h2">
                      Trainer
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <div>Lorem, ipsum.</div>
                      <div>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos eaque, quia saepe dicta
                        sequi facere, tenetur ut doloremque illum perferendis maiores ducimus vel voluptatum
                        aliquid eum? Magnam optio architecto eveniet!
                      </div>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
