import React, { useEffect } from 'react';
import { loadCSS } from 'fg-loadcss';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import BusinessOutlined from '@material-ui/icons/BusinessOutlined';
import PhoneOutlined from '@material-ui/icons/PhoneOutlined';
import MailOutlined from '@material-ui/icons/MailOutlined';
import '../styles/Footer.css';
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
    <div className="footer-bg">
      <Grid
        container
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          color: '#fff',
        }}
        className="m-0 px-4"
      >
        <Grid item lg={6} md={12} sm={12} xs={12} className="text-justify px-5 pt-5">
          <Typography noWrap variant="h5" className="text-lg-left text-center mb-2">
            <img src="../imgs/logo.png" alt="FixMe Logo" height="75px" className="py-2" />
            <span className="web-title ml-2">FixMe Fitness</span>
          </Typography>
          <div>
          FixMe is a platform specialized in providing up-to-date advice on fitness and nutrition. 
          You can browse through our well-written and highly-informative health articles, as well as our high-quality workout guides. 
          You can get customized meal and workout plans based on your body measurements. Stay healthy and enjoy using FixMe!
          </div>
        </Grid>
        <Grid item lg={3} md={12} sm={12} xs={12} className="text-lg-left text-center px-5 pt-5">
          <h5 className="text-danger font-weight-bold mb-4">CONTACT US</h5>
          <Link component="button" className="mb-3">
            <BusinessOutlined color="primary" style={{ fontSize: '1.6rem' }} />
            <span className="text-white ml-3">Ramallah, Palestine.</span>
          </Link>
          <br />
          <Link component="button" className="mb-3">
            <PhoneOutlined color="primary" style={{ fontSize: '1.6rem' }} />
            <span className="text-white ml-3">(02) 240-2983</span>
          </Link>
          <br />
          <Link component="button" className="mb-3">
            <MailOutlined color="primary" style={{ fontSize: '1.6rem' }} />
            <span className="text-white ml-3">info@fixme.com</span>
          </Link>
        </Grid>
        <Grid item lg={3} md={12} sm={12} xs={12} className="text-lg-left text-center px-5 pt-5">
          <h5 className="text-danger font-weight-bold mb-4">SOCIAL MEDIA</h5>
          <Link component="button" className="mr-3">
            <Icon color="primary" style={{ fontSize: '2rem' }} className="fab fa-facebook" />
          </Link>
          <Link component="button" className="mr-3">
            <Icon color="primary" style={{ fontSize: '2rem' }} className="fab fa-whatsapp" />
          </Link>
          <Link component="button" className="mr-3">
            <Icon color="primary" style={{ fontSize: '2rem' }} className="fab fa-instagram" />
          </Link>
          <Link component="button">
            <Icon color="primary" style={{ fontSize: '2rem' }} className="fab fa-twitter" />
          </Link>
        </Grid>
        <Grid container style={{ borderTop: '#777 1px solid' }} className="mx-5 mt-5">
          <div className="mx-auto p-4">Copyright &copy; 2021, All Rights Reserved</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
