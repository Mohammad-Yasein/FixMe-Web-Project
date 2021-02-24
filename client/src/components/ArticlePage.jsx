import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../styles/ArticlePage.css';

const ArticlePage = props => {
  const [socket] = useState(() => io(':8000'));
  const [article, setArticle] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/articles/${props.id}`)
      .then(response => {
        document.title = response.data.title;
        setArticle(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }, []);

  socket.on('getComment', data => {
    article.comments && article.comments.push(data);
    setArticle(article);
  });

  const submitHandler = e => {
    e.preventDefault();
    const now = new Date().toISOString();
    const commentInfo = {
      username: sessionStorage.getItem('username'),
      postedAt: `${now.slice(11, 16)} ${now.slice(0, 10)}`,
      comment: e.target.elements.input.value,
    };

    axios
      .put(`http://localhost:8000/api/articles/${props.id}`, commentInfo)
      .then(response => {
        setArticle(response.data);
        socket.emit('addComment', commentInfo);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  return (
    <Box component="div" className="article-bg">
      <Box component="div" className="article-overlay">
        <Container maxWidth="md" className="article p-5">
          <h3 className="font-weight-bold mb-4">{article.title}</h3>
          <h6 className="text-muted mb-2">{article.author}</h6>
          <small className="text-muted d-block mb-4">{article.publishedIn}</small>
          <img
            src={`../imgs/${article.title}.jpg`}
            alt={`${article.title}`}
            width="100%"
            className="d-block mb-4"
          />
          <p className="text-justify mb-4">{article.content}</p>
          <h4 className="font-weight-bold pt-5">Comments:</h4>
          <List className="mb-5">
            {article.comments &&
              article.comments.length > 0 &&
              article.comments.map((comment, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="../imgs/user-avatar.svg" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="h6"
                              className="d-inline"
                              color="textPrimary"
                            >
                              {`${comment.comment}`}
                            </Typography>
                          </React.Fragment>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className="d-inline"
                              color="textPrimary"
                            >
                              {`By ${comment.username}`}
                            </Typography>
                            <br />
                            {`At ${comment.postedAt}`}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                );
              })}
          </List>
          <form onSubmit={e => submitHandler(e)}>
            <TextField
              id="input"
              label="Add your comment"
              multiline
              rows={4}
              variant="outlined"
              fullWidth="true"
              className="d-block bg-light mb-4"
            />
            <div className="text-right">
              <Button type="submit" variant="contained" color="primary" className="px-5 py-2">
                Add
              </Button>
            </div>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default ArticlePage;
