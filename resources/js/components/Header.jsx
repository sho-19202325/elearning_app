import React, { Component } from 'react'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import DropdownMenu from './material-ui/DropdownMenu';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: 'red',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBarButton(props) {
  if(this.props.user == null){
    return (
      <div>
        <Link to="/signup">
        <Button color="inherit" style={{ marginRight: 5}}>Sign up</Button>
        </Link>
        <Link to="/login">
          <Button color="inherit">Login</Button>
        </Link> 
      </div>
    );
} else {
    return (
      <div className="row">
        <Link to="/questions">
          <Button color="inherit">Questions</Button>
        </Link>      
        <Link to="/users">
          <Button color="inherit">Users</Button>
        </Link>      
        <DropdownMenu user={this.props.user} style={{ display: 'inline-block' }} />    
      </div>
    );
  }
}

function NavBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root + " " + "header-navbar" }>
      <CssBaseline />
        <AppBar position="fixed" className={clsx(classes.appBar, {
            [classes.appBarShift]: open
            })}
        >
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    Super E-learning
                  </Link>  
                </Typography>
                <NavBarButton />      
            </Toolbar>
        </AppBar>
    </div>
  );
}

class Header extends Component {
  constructor(props) {
    super(props)
    NavBar = NavBar.bind(this)
    NavBarButton = NavBarButton.bind(this)
  }
  render() { 
    return ( 
        <NavBar />        
     );
  }
}
 
export default Header;
