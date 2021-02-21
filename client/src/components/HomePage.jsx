import React from 'react'
import ReactPlayer from "react-player"
import { makeStyles } from '@material-ui/core/styles';
import { Link, navigate } from '@reach/router';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from 'react-avatar';
import '../styles/HomePage.css';

// import Image from 'material-ui-image'

// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    maxWidth: 700,
    marginBottom: 30
  },
});
const HomePage = () => {
  const classes = useStyles();
  return (
    <Box component="div" className="main-bg">
      <Box component="div" className="main-overlay">
        <center>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=wtFPIOV2bWM"
            // autoPlay={true}
            // muted={true}
            // loop={false} 
            playing
            muted
            config={{ file: { attributes: {autoPlay: true,muted: true} } }}
          /> 
          <hr></hr>
        </center>
        <Container className="main">
          <div>
            <h2>Be Fit With Us!</h2>
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
            <hr></hr>
          </div>
          <div>
            <center>
              <Card className={classes.root}>
                {/* <Card> */}
                {/* <CardActionArea> */}
                  <CardMedia
                    component="img"
                    alt="First Image"
                    height="200"
                    maxWidth="200"
                    image="http://www.likecovers.com/covers/original/bro-do-you-lift.jpg?i"
                    title="First Image"
                  />
                  {/* <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                      across all continents except Antarctica
                    </Typography>
                  </CardContent> */}
                {/* </CardActionArea> */}
                {/* <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions> */}
              </Card>
            </center>
          </div>
          <div style={{paddingLeft: "50px", paddingRight: "50px"}}>
            <div style={{display:'inline-block', width:"500px"}}>
              <CardMedia
                component="img"
                alt="First Image"
                height="300"
                image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/salad-mix-plate-shot-from-above-on-rustic-wooden-royalty-free-image-1018199524-1556130377.jpg?crop=0.66635xw:1xh;center,top&resize=768:*"
                title="First Image"
              />
            </div>
            <div style={{display:'inline-block', width:"500px", float:"right"}}>
              <CardMedia
                component="img"
                alt="First Image"
                height="300"
                image="https://gabrielefitness.com/wp-content/uploads/2019/05/testimonials-bg.jpg"
                title="First Image"
              />
            </div>
            <hr></hr>
          </div>
          <div>
            <h2>Topics</h2>
            <div style={{display: 'inline-block', width: '500px'}}>
              <h4>Some text 1</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <Link to='/login'>Read More ...</Link>
            </div>
            <div style={{display: 'inline-block', width: '500px', float:'right'}}>
              <h4>Some text 2</h4>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <a href={'/'}>Read More...</a>
            </div>
            <hr></hr>
          </div>
          <div>
            <center>
              <h2>Our Trainers</h2>
              <div style={{display: 'inline-block', width: '500px'}}>
                <h3>Trainer 1</h3>
                <Avatar alt="Trainer 1" src="https://onedesign.bg/wp-content/uploads/2016/05/our-team-4-1.jpg" />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
              <div style={{display: 'inline-block', width: '500px', float:'right'}}>
                <h3>Trainer 2</h3>
                <Avatar alt="Trainer 2" src="https://www.praxistraining.be/images/Wantedtrainer.jpg" />
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
              <hr></hr>
            </center>
          </div>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage
