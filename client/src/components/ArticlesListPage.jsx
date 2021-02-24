import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../styles/ArticlesListPage.css';

import data from '../assets/data/articles.json';

const Add = () => {
  data.forEach(article =>
    axios
      .post('http://localhost:8000/api/articles', article)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      })
  );
};

const ArticlesListPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    document.title = 'Health Articles';
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
    <Box component="div" className="articles-bg">
      <Box component="div" className="articles-overlay">
        <Container maxWidth="md" className="articles py-5">
          <h3 className="font-weight-bold mb-4">Health Articles</h3>
          {articles.length > 0 &&
            articles.map((article, idx) => {
              return (
                <React.Fragment key={idx}>
                  <Card className="mb-4">
                    <CardActionArea>
                      <CardMedia image={`../imgs/${article.title}.jpg`} style={{ height: '150px' }} />
                      <CardContent>
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
                </React.Fragment>
              );
            })}
        </Container>
      </Box>
      <Button onClick={Add}>Add Article</Button>
    </Box>
  );
};

export default ArticlesListPage;
