import React from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import DescriptionOutlined from '@material-ui/icons/DescriptionOutlined';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import LockOpenOutlined from '@material-ui/icons/LockOpenOutlined';
import LockOutlined from '@material-ui/icons/LockOutlined';
import BorderColorOutlined from '@material-ui/icons/BorderColorOutlined';
import '../styles/Header.css';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    boxShadow: 'none',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderLeft: '2px solid rgba(60, 60, 60, 0.6)',
    color: '#ddd',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    axios
      .get('http://localhost:8000/api/logout', { withCredentials: true })
      .then(response => {
        sessionStorage.clear();
        navigate('/');
      })
      .catch(error => console.log(error.response.data));
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography noWrap variant="h5" className={classes.title}>
            <a href="/">
              <img src="../imgs/logo.png" alt="FixMe Logo" height="75px" className="py-2" />
            </a>
            <span className="web-title ml-2">FixMe Fitness</span>
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon style={{ color: '#aaa' }} />
            ) : (
              <ChevronRightIcon style={{ color: '#aaa' }} />
            )}
          </IconButton>
        </div>
        <Divider variant="middle" style={{ backgroundColor: '#666' }} />
        <List>
          <ListItem
            button
            onClick={() => {
              handleDrawerClose();
              navigate('/');
            }}
          >
            <ListItemIcon>
              <HomeOutlined style={{ color: '#aaa' }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              handleDrawerClose();
              navigate('/articles');
            }}
          >
            <ListItemIcon>
              <DescriptionOutlined style={{ color: '#aaa' }} />
            </ListItemIcon>
            <ListItemText primary="Articles" />
          </ListItem>
          <Divider variant="middle" style={{ backgroundColor: '#666' }} className="my-4" />
          {!sessionStorage.getItem('userId') && (
            <>
              <ListItem
                button
                onClick={() => {
                  handleDrawerClose();
                  navigate('/register');
                }}
              >
                <ListItemIcon>
                  <BorderColorOutlined style={{ color: '#aaa' }} />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  handleDrawerClose();
                  navigate('/login');
                }}
              >
                <ListItemIcon>
                  <LockOpenOutlined style={{ color: '#aaa' }} />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            </>
          )}
          {sessionStorage.getItem('userId') && (
            <>
              <ListItem
                button
                onClick={() => {
                  handleDrawerClose();
                  navigate(`/profiles/${sessionStorage.getItem('userId')}`);
                }}
              >
                <ListItemIcon>
                  <AccountCircleOutlined style={{ color: '#aaa' }} />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  handleDrawerClose();
                  handleLogout();
                }}
              >
                <ListItemIcon>
                  <LockOutlined style={{ color: '#aaa' }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
