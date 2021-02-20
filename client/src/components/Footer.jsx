import React, { useEffect } from 'react';
import { loadCSS } from 'fg-loadcss';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import BusinessOutlined from '@material-ui/icons/BusinessOutlined';
import PhoneOutlined from '@material-ui/icons/PhoneOutlined';
import MailOutlined from '@material-ui/icons/MailOutlined';

const Footer = () => {
  useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css')
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  return (
    <Grid
      container
      style={{
        backgroundImage: 'linear-gradient(to bottom right, #292420 , #000)',
        color: '#fff',
      }}
      className="m-0 px-4"
    >
      <Grid item lg={6} md={12} sm={12} xs={12} className="text-justify px-5 py-5">
        <h5 className="font-weight-bold">FixMe</h5>
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim ipsum neque ad quidem maiores autem
          illo amet possimus natus aspernatur itaque, consequuntur, molestiae voluptate odit! Repellat maiores
          cum odio deleniti excepturi inventore! Dolores sunt cupiditate quae, voluptatem ad saepe cum
          incidunt officia quidem hic magni distinctio, cumque molestiae sit! Facilis.
        </div>
      </Grid>
      <Grid item lg={3} md={12} sm={12} xs={12} className="px-5 py-5">
        <h5 className="text-danger font-weight-bold">CONTACT US</h5>
        <List>
          <ListItem button>
            <ListItemIcon>
              <BusinessOutlined color="primary" style={{ fontSize: '2rem' }} />
            </ListItemIcon>
            <ListItemText primary="25 Lorem ipsum, dolor sit consectetur." />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PhoneOutlined color="primary" style={{ fontSize: '2rem' }} />
            </ListItemIcon>
            <ListItemText primary="(555) 123-4567" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MailOutlined color="primary" style={{ fontSize: '2rem' }} />
            </ListItemIcon>
            <ListItemText primary="info@fixme.com" />
          </ListItem>
        </List>
      </Grid>
      <Grid item lg={3} md={12} sm={12} xs={12} className="px-5 py-5">
        <h5 className="text-danger font-weight-bold">SOCIAL MEDIA</h5>
        <List>
          <ListItem button>
            <ListItemIcon>
              <Icon color="primary" style={{ fontSize: '2rem' }} className="fab fa-facebook" />
            </ListItemIcon>
            <ListItemText primary="fixme/facebook.com" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Icon color="primary" style={{ fontSize: '2rem' }} className="fab fa-whatsapp" />
            </ListItemIcon>
            <ListItemText primary="fixme/whatsapp.com" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Icon color="primary" style={{ fontSize: '2rem' }} className="fab fa-instagram" />
            </ListItemIcon>
            <ListItemText primary="fixme/instagram.com" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Icon color="primary" style={{ fontSize: '2rem' }} className="fab fa-twitter" />
            </ListItemIcon>
            <ListItemText primary="fixme/twitter.com" />
          </ListItem>
        </List>
      </Grid>
      <Grid container style={{ borderTop: '#777 1px solid' }} className="mx-5">
        <div className="mx-auto p-4">Copyright &copy; 2020, All Rights Reserved</div>
      </Grid>
    </Grid>
  );
};

export default Footer;
